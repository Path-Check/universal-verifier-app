import React, {Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNSimpleCrypto from "react-native-simple-crypto";
import AsyncStorage from '@react-native-community/async-storage';

const PUB_KEY = "-----BEGIN PUBLIC KEY-----\n"+
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n"+
"FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n"+
"xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n"+
"gwQco1KRMDSmXSMkDwIDAQAB\n"+
"-----END PUBLIC KEY-----\n";

const screenHeight = Math.round(Dimensions.get('window').height);

function QRReader({ navigation }) {
  const onVaccineRead = async (e) => {
    const msg = e.data.split("?");
    const what = msg[0].split(":");
    if (what[0] != "healthpass") {
      return;
    }

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = regex.exec(e.data)) {
      params[match[1]] = match[2];
    }
    console.log(params);

    const message = e.data.replace("&signed="+params.signed, "");              
    const signedCert = params.signed;
    const validSignature2 = await RNSimpleCrypto.RSA.verify(
      signedCert,
      message,
      PUB_KEY,
      "SHA256"
    );

    const vaccine = { type: what[1],
                name: params.name, 
                date: params.date, 
                manufacturer: params.manuf, 
                lot: params.lot,
                route: params.route,
                site: params.site,
                dose: params.dose,
                vaccinee: params.vaccinee, 
                vaccinator: params.vaccinator,
                signature: params.signed, 
                scanDate: new Date().toJSON(),
                verified: validSignature2 ? "Valid" : "Not Valid" };

    AsyncStorage.setItem('CARDS'+params.signed, JSON.stringify(vaccine));

    navigation.goBack();
  }

  return (
    <QRCodeScanner
        onRead={onVaccineRead}
        reactivate={true}
        reactivateTimeout={5000}
        cameraStyle={{ height: screenHeight }}
        topViewStyle={{height: 0, flex: 0}}
        bottomViewStyle={{height: 0, flex: 0}}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerText: {
    flex: 0,
    fontSize: 18,
    padding: 30,
    color: '#777',
  },
});

export default QRReader;