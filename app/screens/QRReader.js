import React, {useEffect} from 'react';
import { Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {useTheme} from '../themes/ThemeProvider';

import {importPCF} from '../utils/ImportPCF';
import {importDivoc} from '../utils/ImportDivoc';
import {importSHC} from '../utils/ImportSHC';
import {importDCC} from '../utils/ImportDCC';
import {importVDS} from '../utils/ImportVDS';

import {decode} from './QRDecoder/index.js'
import JSZip from 'jszip';


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

  const fromHexQR = async hexString => {
    const byteArray = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Manually decode the array
    const str0 = decode(byteArray, 28).text;
    
    const byteArray2 = new Uint8Array(hexString.substring(1).match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // invalid QRs have existed for the deployment in India. These two lines help solve it. 
    const str1 = new TextDecoder().decode(       byteArray2);
    const str2 = String.fromCharCode.apply(null, byteArray2);

    try {
      await new JSZip().loadAsync(str0);
      return str0; 
    } catch {
      try {
        await new JSZip().loadAsync(str1);
        return str1; 
      } catch {
        return str2;
      }
    }
  }

  const toHexString = binaryString =>
    Array.from(new TextEncoder().encode(binaryString)).map(c => c.toString(16).padStart(2, '0')).join('');

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

    if (e.data && e.data.startsWith("HC1:")) {
      await checkResult(await importDCC(e.data));
      return;
    }

    if ((e.data && e.data.startsWith("PK")) || (e.data == null && e.rawData)) {
      if (!e.rawData) {
        showErrorMessage("Phone/OS is unable to read Binary QRs");
        return;
      }

      // Removing the first byte because it's the QR mode 
      await checkResult(await importDivoc(await fromHexQR(e.rawData)));
      return;
    }

    if (e.data && e.data.startsWith("{")) {
      if (e.data.includes("icao")) {
        await checkResult(await importVDS(e.data));
      } else {
        await checkResult(await importDivoc(e.data));
      }
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