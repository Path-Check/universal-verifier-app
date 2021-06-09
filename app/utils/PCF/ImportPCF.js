import * as CRED from '@pathcheck/cred-sdk';

import AsyncStorage from '@react-native-async-storage/async-storage';

const getVaccinee = async (card) => {
  // Linking PassKeys to other cards. 
  if (card.passkey) {
    let vaccineeStr = await AsyncStorage.getItem('HASH'+card.passkey);
    if (vaccineeStr) 
      return JSON.parse(vaccineeStr);
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
  if (card.passkey) {
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
        if (existingCard.passkey && existingCard.passkey === card.hash) {
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

  let payload = await CRED.unpackAndVerify(uri);

  if (payload) { 
    let [schema, qrtype, version, signatureBase32NoPad, pubKeyLink, payloadStr] = await CRED.unpack(uri);  
    let baseCard = {
        type: qrtype, 
        version: version, 
        pub_key: pubKeyLink,
        signature: signatureBase32NoPad, 
        scanDate: new Date().toJSON(),
        verified: "Valid"
      }; 

      if (qrtype == "PASSKEY") {
        baseCard.hash = await CRED.hashPayload(payload);
      }

      let mappedPayload = await CRED.mapHeaders(payload, qrtype, version);

      await saveNewCard({...baseCard, ...mappedPayload});

      return {status: "OK", payload: {...baseCard, ...mappedPayload}};
  } else {
    return {status: "Could not verify", log: error};
  }

/*
  try {
    let pubKeyPEM = await CRED.downloadPEM(pubKeyLink);
    try {
      let verified = await CRED.verify(signatureBase32NoPad, pubKeyPEM, payloadStr);
      
      let baseCard = {
        type: qrtype, 
        version: version, 
        pub_key: pubKeyLink,
        signature: signatureBase32NoPad, 
        scanDate: new Date().toJSON(),
        verified: "Valid"
      }

      if (verified) {
        let payload = await CRED.mapHeaders(qrtype, payloadStr);
        
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
  */
}

export { importPCF }