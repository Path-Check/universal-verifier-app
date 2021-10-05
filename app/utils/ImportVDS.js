import * as VDS from '@pathcheck/vds-sdk';

import { saveCard } from './../utils/StorageManager';

const importVDS = async (certificateData) => {
  let payload = await VDS.unpackAndVerify(certificateData);
  
  if (payload) {
    let baseCard = {
        format: "VDS",
        type: payload.data.hdr.t, 
        pub_key: payload.sig.cer,
        signature: payload.sig.sigvl, 
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

export { importVDS }