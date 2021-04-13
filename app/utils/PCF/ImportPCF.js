import AsyncStorage from '@react-native-community/async-storage';

import {verify, downloadPEM, parseQR} from './CredentialUtils';
import {parse} from './Payloads';

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

const importPCF = async (uri) => {
  if (!uri.toUpperCase().startsWith("CRED:")) {
    return {status: "Not a Health Passport", log: uri};
  }

  let [schema, qrtype, version, signatureBase32NoPad, pubKeyLink, payloadStr] = await parseQR(uri);  

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
        
        return {status: "OK", ...baseCard, ...payload};
      } else {
        return {status: "Invalid Certificate"};
      }
    } catch (error) {
      console.error(error);
      return {status: "Could not verify", log: error};
    }
  } catch (error) {
    console.error(error);
    return {status: "Public Key Server Unavailable", log: error};
  }
}

export { importPCF }