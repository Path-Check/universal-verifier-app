import React, {useEffect} from 'react';
import { Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {useTheme} from '../themes/ThemeProvider';

import {importPCF} from '../utils/ImportPCF';
import {importDivoc} from '../utils/ImportDivoc';
import {importSHC} from '../utils/ImportSHC';

const screenHeight = Math.round(Dimensions.get('window').height);

function QRReader({ navigation }) {
  const {colors} = useTheme();

  const showErrorMessage = (message) => {
    navigation.setOptions({ headerTitle: message, 
                            headerTitleStyle: {color: colors.error} });
    // Start counting when the page is loaded
    const timeoutHandle = setTimeout(()=>{
      navigation.setOptions({ headerTitle: 'Point Camera to the QR Code', 
                            headerTitleStyle: {color: colors.text} });
    }, 5000);
  }

  const checkResult = async (result) => {
    if (result.status === "OK") {
      navigation.navigate({name: 'QRResult', params: { result } } );
    } else {
      showErrorMessage(result.status);
    }
  }

  const fromHexString = hexString =>
    new Uint8Array(hexString.substring(1).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  const onQRRead = async (e) => {
    console.log(e);
    if (e.data && e.data.startsWith("CRED:")) {
      await checkResult(await importPCF(e.data));
      return;
    }

    if (e.data && e.data.startsWith("shc:")) {
      await checkResult(await importSHC(e.data));
      return;
    }

    if ((e.data && e.data.startsWith("PK")) || (e.data == null && e.rawData)) {
      if (!e.rawData) {
        showErrorMessage("Phone/OS is unable to read Binary QRs");
        return;
      }

      let string = "PK"+String.fromCharCode.apply(null, fromHexString(e.rawData))
      await checkResult(await importDivoc(string));
      return;
    }

    if (e.data && e.data.startsWith("{")) {
      await checkResult(await importDivoc(e.data));
      return;
    }

    showErrorMessage("Not a supported QR" + e.data);
    return;
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.background }, 
      headerTintColor: colors.text
    });
  });

  return (
    <QRCodeScanner
        onRead={onQRRead}
        reactivate={true}
        reactivateTimeout={5000}
        containerStyle={{backgroundColor: colors.background}}
        cameraStyle={{ height: screenHeight }}
        topViewStyle={{height: 1, flex: 0}}
        bottomViewStyle={{height: 0, flex: 0}}
        cameraProps={{barCodeTypes:[RNCamera.Constants.BarCodeType.qr]}}
      />
  )
}

export default QRReader;