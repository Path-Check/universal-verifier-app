import * as SHC from '@pathcheck/shc-sdk';
import { sha256 } from 'react-native-sha256';

import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCard = async (card) => {
  // Saving
  await AsyncStorage.setItem('CARDS'+card.signature, JSON.stringify(card));
}

const importSHC = async (certificateData) => {
  let payload = await SHC.unpackAndVerify(certificateData);

  if (payload) {
    let baseCard = {
        format: "SHC",
        type: "FHIRBundle", 
        pub_key: payload.iss,
        signature: await sha256(JSON.stringify(payload)), 
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

export { importSHC }