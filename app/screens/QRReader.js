import React, {useEffect} from 'react';

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
import {useTheme} from '../themes/ThemeProvider';

const screenHeight = Math.round(Dimensions.get('window').height);

function QRReader({ navigation }) {
  const {colors, isDark} = useTheme();

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

    try {
      let pub_key_response = await fetch(params.vaccinator_pub_key);
      let pub_key = await pub_key_response.text();
      console.log(pub_key);

      const message = e.data.replace("&signed="+params.signed, "");              
      const signedCert = params.signed;
      const validSignature2 = await RNSimpleCrypto.RSA.verify(
        signedCert,
        message,
        pub_key,
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
                vaccinator_pub_key: params.vaccinator_pub_key,
                signature: params.signed, 
                scanDate: new Date().toJSON(),
                verified: validSignature2 ? "Valid" : "Not Valid" };

      AsyncStorage.setItem('CARDS'+params.signed, JSON.stringify(vaccine));
    } catch (error) {
      console.error(error);
    }

    navigation.goBack();
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
    console.log("useEffect Called");
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