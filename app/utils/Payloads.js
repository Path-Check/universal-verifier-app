import {decodePayload, encodePayload} from '../utils/CredentialUtils';
import RNSimpleCrypto from "react-native-simple-crypto";

const buildHashPayload = async (elemArray) => {
  const RS = String.fromCharCode(30);
  let fields = elemArray.map(function(elemId) {
      return elemId.toUpperCase();
  })
  return fields.join(RS);
}

const parseCoupon = async (payload) => {
  let [id, coupons, city, phase, indicator] = await decodePayload(payload);
  return { id: id, 
            coupons: coupons, 
            phase: phase, 
            city: city,
            conditions: indicator };
}

const parseStatus = async (payload) => {
  let [vaccinated, vaccineeHash, initials] = await decodePayload(payload);

  return {vaccinated: vaccinated, 
          vaccineeHash: vaccineeHash, 
          initials: initials };
}

const parsePassKey = async (payload) => {
  let [name, dob, salt, phone] = await decodePayload(payload);

  let hashPassKeyPayload = await buildHashPayload([name, dob, salt, phone]);
  let encodedHash = await encodePayload(hashPassKeyPayload);

  return {name: name, 
          dob: dob, 
          salt: salt, 
          phone: phone, 
          hash: encodedHash};
}

const parseBadge = async (payload) => {
  let [date, manuf, product, lot, boosts, vaccineeHash, route, site, dose, name, dob] = await decodePayload(payload);
  
  return {date: date, 
          manuf: manuf,
          product: product,  
          lot: lot,
          boosts: boosts,
          vaccineeHash: vaccineeHash,
          route: route,
          site: site,
          dose: dose,
          name: name,
          dob: dob};
}

var availablePayloads = {};
availablePayloads["COUPON"] = parseCoupon;
availablePayloads["STATUS"] = parseStatus;
availablePayloads["PASSKEY"] = parsePassKey;
availablePayloads["BADGE"] = parseBadge;

const parse = async (qrtype, payload) => {
  return await availablePayloads[qrtype](payload);
}

export { parse }