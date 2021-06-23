import * as DIVOC from '@pathcheck/divoc-sdk';

import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCard = async (card) => {
  // Saving
  await AsyncStorage.setItem('CARDS'+card.signature, JSON.stringify(card));
}

const importDivoc = async (certificateData) => {
  let payload = await DIVOC.unpackAndVerify(certificateData);
  
  if (payload) {
    let baseCard = {
        format: "DIVOC",
        type: "COWIN", 
        pub_key: payload.proof.verificationMethod,
        signature: payload.proof.jws, 
        scanDate: new Date().toJSON(),
        verified: "Valid", 
        rawQR: certificateData
      }; 

    baseCard.cert = payload;

    await saveCard(baseCard);

    return {status: "OK", payload: baseCard};
  } else {
    return {status: "Could not verify"};
  }
}

export { importDivoc }