import React, {useEffect} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';

import base64 from 'react-native-base64'

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNSimpleCrypto from "react-native-simple-crypto";
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '../themes/ThemeProvider';

const screenHeight = Math.round(Dimensions.get('window').height);

function QRReader({ navigation }) {
  const {colors, isDark} = useTheme();

  const myDecode = (uriComponent) => {
    return uriComponent ? decodeURIComponent(uriComponent).replace(/\+/g, ' ') : undefined;
  }

  const showErrorMessage = (message) => {
    navigation.setOptions({ headerTitle: message, 
                            headerTitleStyle: {color: colors.error} });
    // Start counting when the page is loaded
    const timeoutHandle = setTimeout(()=>{
      navigation.setOptions({ headerTitle: 'Point Camera to the QR Code', 
                            headerTitleStyle: {color: colors.text} });
    }, 5000);
  }

  const onVaccineRead = async (e) => {
    const queryString = require('query-string');

    const msg = e.data.split("?");
    const what = msg[0].split(":");
    if (what[0] != "healthpass") {
      return;
    }

    const params = queryString.parse(msg[1], {decode:false});
    
    try {
      let pub_key_response = await fetch(params.vaccinator_pub_key);
      let pub_key = await pub_key_response.text();
      
      try {
        const message = e.data.replace("&signature="+params.signature, ""); 
        const signedCert = decodeURIComponent(params.signature).replace(/\n/g, '');
        const validSignature2 = await RNSimpleCrypto.RSA.verify(
          signedCert,
          message,
          pub_key,
          "SHA256"
        );
        
        if (validSignature2) {
          const vaccine = { type: what[1],
                    date: params.date, 
                    name: myDecode(params.name), 
                    manufacturer: myDecode(params.manuf), 
                    lot: myDecode(params.lot),
                    route: myDecode(params.route),
                    site: myDecode(params.site),
                    dose: myDecode(params.dose),
                    vaccinee: myDecode(params.vaccinee), 
                    vaccinator: myDecode(params.vaccinator),
                    vaccinator_pub_key: params.vaccinator_pub_key,
                    signature: signedCert, 
                    scanDate: new Date().toJSON(),
                    verified: validSignature2 ? "Valid" : "Not Valid" };

          AsyncStorage.setItem('CARDS'+signedCert, JSON.stringify(vaccine));

          navigation.goBack(); 
        } else {
          showErrorMessage("Invalid Certificate");
        }
      } catch (error) {
        console.error(error);
        showErrorMessage("Could not load: " + error);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
      showErrorMessage("QR Code Server Unavailable");
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.background }, 
      headerTintColor: colors.text, 
      headerTitleStyle: {
          fontFamily: 'Cochin',
          fontWeight: 'normal',
          fontSize: 20,
      },
    });
  });

  return (
    <QRCodeScanner
        onRead={onVaccineRead}
        reactivate={true}
        reactivateTimeout={5000}
        containerStyle={{backgroundColor: colors.background}}
        cameraStyle={{ height: screenHeight }}
        topViewStyle={{height: 0, flex: 0}}
        bottomViewStyle={{height: 0, flex: 0}}
      />
  )
}

export default QRReader;