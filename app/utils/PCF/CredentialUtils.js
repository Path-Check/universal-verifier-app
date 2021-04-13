import RNSimpleCrypto from "react-native-simple-crypto";

import base32 from "hi-base32";
import ANS1 from "react-native-asn1.js";
import {ec as EC} from 'elliptic'

const algos = {'1.2.840.10045.2.1':'Elliptic curve public key cryptography'};
const curves = {'1.3.132.0.10': 'secp256k1'};

const myDecode = (uriComponent) => {
  return uriComponent ? decodeURIComponent(uriComponent).replace(/\+/g, ' ') : undefined;
}

const pad = (base32Str) => {
  switch (base32Str.length % 8) {
    case 2: return base32Str + "======"; 
    case 4: return base32Str + "===="; 
    case 5: return base32Str + "==="; 
    case 7: return base32Str + "="; 
  }
  return base32Str;
}

const rmPad = (base32Str) => {
  return base32Str.replace(/=/g, "");
}

const parseQR = (qr) => {
  let [schema, qrtype, version, signatureBase32NoPad, pubKeyLink, payload] = qr.split(':'); 
  return [schema, qrtype, version, signatureBase32NoPad, pubKeyLink, payload]; 
}

const downloadPEM = async (pubKeyLink) => {
  let pub_key_dns_response = await fetch("https://dns.google/resolve?name="+pubKeyLink+ '&type=TXT');
  let pub_key_dns_pem = await pub_key_dns_response.json();
  if (pub_key_dns_pem.Answer) {
      const pubKeyTxtLookup = pub_key_dns_pem.Answer[0].data
      let key = pubKeyTxtLookup.substring(1, pubKeyTxtLookup.length - 1).replace(/\\n/g,"\n");
      if (!key.includes("-----BEGIN PUBLIC KEY-----")) 
        key = "-----BEGIN PUBLIC KEY-----" + "\n" + key + "\n" + "-----END PUBLIC KEY-----\n"
      return key;
  }
  let pub_key_file_response = await fetch("https://"+pubKeyLink);
  return await pub_key_file_response.text();
}

const decodePayload = async (payload) => {
  let fieldsInOrder = payload.split('/');
  return fieldsInOrder.map(function(value) {
      return decodeURIComponent(value);
  });
}

const encodePayload = async (payload) => {
  

  let hashPayload = await RNSimpleCrypto.SHA.sha256(payload);
  let hashPayloadBase32 = await rmPad(await base32.encode(hashPayload));
  return hashPayloadBase32.toUpperCase();
}

const verify = async (signatureBase32NoPad, pubKeyPEM, payload) => {
  const ECPublicKey = ANS1.define("PublicKey", function() {
      this.seq().obj(
          this.key("algorithm").seq().obj(
              this.key("id").objid(),
              this.key("curve").objid()
          ),
          this.key("pub").bitstr()
      );
  });

  // Decoding the public key to get curve algorithm + key itself
  const pubk = ECPublicKey.decode(pubKeyPEM, 'pem', {label: 'PUBLIC KEY'});

  // Get Encryption Algorithm: EC
  const algoCode = pubk.algorithm.id.join('.');
  // Get Curve Algorithm: secp256k1
  const curveCode = pubk.algorithm.curve.join('.');
  
  // Prepare EC with assigned curve
  const ec = new EC(curves[curveCode]);
  
  // Load public key from PEM as DER
  const key = ec.keyFromPublic(pubk.pub.data, 'der');

  // Converts to UTF-8 -> WorldArray -> SHA256 Hash 
  const payloadSHA256 = await RNSimpleCrypto.SHA.sha256(payload);

  // Gets the Base32 enconded, add padding and convert to DER.
  const signatureDER = base32.decode.asBytes(pad(signatureBase32NoPad));

  // Verifies Signature. 
  return key.verify(payloadSHA256, signatureDER);
}

export { verify, downloadPEM, parseQR, decodePayload, encodePayload }