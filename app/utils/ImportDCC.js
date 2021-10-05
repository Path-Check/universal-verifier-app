import * as DCC from '@pathcheck/dcc-sdk';

import { saveCard } from './../utils/StorageManager';

const CWT_ISSUER = 1;
const CWT_SUBJECT = 2;
const CWT_AUDIENCE = 3;
const CWT_EXPIRATION = 4;
const CWT_NOT_BEFORE = 5;
const CWT_ISSUED_AT = 6;

const importDCC = async (certificateData) => {
  // Enable to accept test certificates
  //DCC.addCachedCerts({"Rjene8QvRwA=":'MIIBYDCCAQYCEQCAG8uscdLb0ppaneNN5sB7MAoGCCqGSM49BAMCMDIxIzAhBgNVBAMMGk5hdGlvbmFsIENTQ0Egb2YgRnJpZXNsYW5kMQswCQYDVQQGEwJGUjAeFw0yMTA0MjcyMDQ3MDVaFw0yNjAzMTIyMDQ3MDVaMDYxJzAlBgNVBAMMHkRTQyBudW1iZXIgd29ya2VyIG9mIEZyaWVzbGFuZDELMAkGA1UEBhMCRlIwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARkJeqyO85dyR+UrQ5Ey8EdgLyf9NtsCrwORAj6T68/elL19aoISQDbzaNYJjdD77XdHtd+nFGTQVpB88wPTwgbMAoGCCqGSM49BAMCA0gAMEUCIQDvDacGFQO3tuATpoqf40CBv09nfglL3wh5wBwA1uA7lAIgZ4sOK2iaaTsFNqENAF7zi+d862ePRQ9Lwymr7XfwVm0='}) 
  let cwt = await DCC.unpackAndVerify(certificateData);
  
  if (cwt) {
    let debugInfo = await DCC.debug(certificateData);
    let payload = await DCC.parseCWT(cwt);
    
    let keyId = debugInfo.value[0].get ? debugInfo.value[0].get(4) : undefined;
    if (keyId === undefined) {
      keyId = debugInfo.value[1].get ? debugInfo.value[1].get(4) : undefined;
    }
    let signature = debugInfo.value[3];

    let cardType = payload.nam ? "DCC" : "UY"

    let baseCard = {
        format: "DCC",
        type: cardType, 
        pub_key: keyId,
        signature: signature, 
        scanDate: new Date().toJSON(),
        verified: "Valid", 
        rawQR: certificateData
      }; 

    let cvtCWT = {
      iss: cwt.get(CWT_ISSUER),
      sub: cwt.get(CWT_SUBJECT),
      aud: cwt.get(CWT_AUDIENCE),
      exp: cwt.get(CWT_EXPIRATION),
      nbf: cwt.get(CWT_NOT_BEFORE),
      iat: cwt.get(CWT_ISSUED_AT),
      data: payload
    }  

    baseCard.cert = cvtCWT;

    await saveCard(baseCard);

    return {status: "OK", payload: baseCard};
  } else {
    return {status: "Could not verify"};
  }
}

export { importDCC }