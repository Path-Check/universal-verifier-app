import * as CRED from '@pathcheck/cred-sdk';

import { saveCard, getVaccinee, saveVaccinee, listCards } from './../utils/StorageManager';

// TODO: Should be in StorageManager?
const saveNewCard = async (card) => {
  // Linking PassKeys to other cards. 
  if (card.cert.passkey) {
    card.vaccinee = await getVaccinee(card);
  }
  
  await saveCard(card);

  // Linking new user to other cards
  if (card.type == "PASSKEY") {
    await saveVaccinee(card);
    let cards = await listCards();
    cards.forEach((item) => {
        if (item.cert && item.cert.passkey && item.cert.passkey === card.hash) {
          item.vaccinee = card;
          saveCard(item);
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
        format: "CRED",
        type: qrtype, 
        version: version, 
        pub_key: pubKeyLink,
        signature: signatureBase32NoPad, 
        scanDate: new Date().toJSON(),
        verified: "Valid", 
        rawQR: uri
      }; 

      if (qrtype == "PASSKEY") {
        baseCard.hash = await CRED.hashPayload(payload);
      }
      
      baseCard.cert = await CRED.mapHeaders(payload, qrtype, version);

      await saveNewCard(baseCard);

      return {status: "OK", payload: baseCard};
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