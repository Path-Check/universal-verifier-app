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
    if (!e.data.startsWith("healthpass:")) {
      showErrorMessage("Not a Health Passport");
      return;
    }

    const queryString = require('query-string');

    let [verification, message] = e.data.substring("healthpass:".length).split("?");
    let [signatureFormat, pub_key_url] = verification.split("@");
    let [hashType, signature] = signatureFormat.split("\\");
    const params = queryString.parse(message, {decode:false});
    
    try {
      let pub_key_response = await fetch("https://"+pub_key_url);
      let pub_key = await pub_key_response.text();

      try {
        const signedCert = decodeURIComponent(signature).replace(/\n/g, '');
        const validSignature2 = await RNSimpleCrypto.RSA.verify(
          signedCert,
          message,
          pub_key,
          hashType
        );

        if (validSignature2) {
          if (params.type === "coupon") {
            const coupon = { type: params.type,
                    id: myDecode(params.id), 
                    coupons: myDecode(params.coupons), 
                    phase: myDecode(params.phase), 
                    city: myDecode(params.city),
                    age: myDecode(params.age),
                    conditions: myDecode(params.conditions),
                    job: myDecode(params.job),
                    pub_key: pub_key_url,
                    signature: signedCert, 
                    scanDate: new Date().toJSON(),
                    verified: validSignature2 ? "Valid" : "Not Valid" };

            AsyncStorage.setItem('CARDS'+signedCert, JSON.stringify(coupon));
          }

          if (params.type === "status") {
            const status = { type: params.type,
                    vaccinated: myDecode(params.vaccinated), 
                    vaccinee: myDecode(params.vaccinee), 
                    pub_key: pub_key_url,
                    signature: signedCert, 
                    scanDate: new Date().toJSON(),
                    verified: validSignature2 ? "Valid" : "Not Valid" };

            AsyncStorage.setItem('CARDS'+signedCert, JSON.stringify(status));
          }

          if (params.type === "passkey") {
            const passkey = { type: params.type,
                    name: myDecode(params.name), 
                    phone: myDecode(params.phone), 
                    dob: myDecode(params.dob), 
                    salt: myDecode(params.salt), 
                    pub_key: pub_key_url,
                    signature: signedCert, 
                    scanDate: new Date().toJSON(),
                    verified: validSignature2 ? "Valid" : "Not Valid" };

            AsyncStorage.setItem('CARDS'+signedCert, JSON.stringify(passkey));
          }

          if (typeof params.type === 'undefined' || params.type === "badge") {
            const vaccine = { type: "vaccine",
                    date: params.date, 
                    name: myDecode(params.name), 
                    manufacturer: myDecode(params.manuf), 
                    lot: myDecode(params.lot),
                    route: myDecode(params.route),
                    site: myDecode(params.site),
                    dose: myDecode(params.dose),
                    vaccinee: myDecode(params.vaccinee), 
                    vaccinator: myDecode(params.vaccinator),
                    pub_key: pub_key_url,
                    signature: signedCert, 
                    scanDate: new Date().toJSON(),
                    verified: validSignature2 ? "Valid" : "Not Valid" };

            AsyncStorage.setItem('CARDS'+signedCert, JSON.stringify(vaccine));
          }

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