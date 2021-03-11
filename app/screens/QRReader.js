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
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '../themes/ThemeProvider';
import {verify, downloadPEM, parseQR} from '../utils/CredentialUtils';
import {parse} from '../utils/Payloads';

const screenHeight = Math.round(Dimensions.get('window').height);

function QRReader({ navigation }) {
  const {colors, isDark} = useTheme();

  const showErrorMessage = (message) => {
    navigation.setOptions({ headerTitle: message, 
                            headerTitleStyle: {color: colors.error} });
    // Start counting when the page is loaded
    const timeoutHandle = setTimeout(()=>{
      navigation.setOptions({ headerTitle: 'Point Camera to the QR Code', 
                            headerTitleStyle: {color: colors.text} });
    }, 5000);
  }

  const getVaccinee = async (card) => {
    // Linking PassKeys to other cards. 
    if (card.vaccineeHash) {
      let vacineeStr = await AsyncStorage.getItem('HASH'+card.vaccineeHash);
      if (vacineeStr) 
        return JSON.parse(vacineeStr);
    }
    return null;
  }

  const saveCard = async (card) => {
    // Saving
    await AsyncStorage.setItem('CARDS'+card.signature, JSON.stringify(card));
  }

  const saveVaccinee = async (card) => {
    // Saving
    await AsyncStorage.setItem('HASH'+card.hash, JSON.stringify(card));
  }

  const saveNewCard = async (card) => {
    // Linking PassKeys to other cards. 
    if (card.vaccineeHash) {
      card.vaccinee = await getVaccinee(card);
    }
    
    await saveCard(card);

    // Linking new user to other cards
    if (card.type == "PASSKEY") {
      await saveVaccinee(card);

      let ks = await AsyncStorage.getAllKeys();
      let curated =  ks.filter((key) => key.startsWith('CARDS'));
      let cardsStr = await AsyncStorage.multiGet(curated);
      cardsStr.forEach((item) => {
          let existingCard = JSON.parse(item[1]);
          if (existingCard.vaccineeHash && existingCard.vaccineeHash === card.hash) {
            existingCard.vaccinee = card;
            saveCard(existingCard);
          }
        }
      );
    }  
  }

  const onVaccineRead = async (e) => {
    let [schema, qrtype, version, signatureBase32NoPad, pubKeyLink, payloadStr] = await parseQR(e.data);  

    if (!schema.startsWith("CRED")) {
      showErrorMessage("Not a Health Passport" + e.data);
      return;
    }

    try {
      let pubKeyPEM = await downloadPEM(pubKeyLink);
      try {
        let verified = await verify(signatureBase32NoPad, pubKeyPEM, payloadStr);
        
        let baseCard = {
          type: qrtype, 
          version: version, 
          pub_key: pubKeyLink,
          signature: signatureBase32NoPad, 
          scanDate: new Date().toJSON(),
          verified: "Valid"
        }

        if (verified) {
          let payload = await parse(qrtype, payloadStr);
          
          await saveNewCard({...baseCard, ...payload});
          
          navigation.goBack(); 
        } else {
          showErrorMessage("Invalid Certificate");
        }
      } catch (error) {
        console.error(error);
        showErrorMessage("Could not verify: " + error);
      }
    } catch (error) {
      console.error(error);
      showErrorMessage("Public Key Server Unavailable");
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