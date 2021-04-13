//const jsigs = require('jsonld-signatures');
//const {RSAKeyPair} = require('crypto-ld');
//const {documentLoaders} = require('jsonld');
//const {node: documentLoader} = documentLoaders;
//const {contexts} = require('security-context');

import {credentialsv1} from './Credentials';
import {vaccinationContext} from './VaccinationContext';


const customLoader = url => {
    const c = {
        "did:india": config.certificatePublicKey,
        //"https://w3id.org/security/v1": contexts.get("https://w3id.org/security/v1"),
        'https://www.w3.org/2018/credentials#': credentialsv1,
        "https://www.w3.org/2018/credentials/v1": credentialsv1,
        "https://www.who.int/2020/credentials/vaccination/v1": vaccinationContext
    };
    let context = c[url];
    //if (context === undefined) {
    //    context = contexts[url];
    //}
    if (context !== undefined) {
        return {
            contextUrl: null,
            documentUrl: url,
            document: context
        };
    }
    if (url.startsWith("{")) {
        return JSON.parse(url);
    }
    return documentLoader()(url);
};

const importDivoc = async (certificateData) => {
    return {status: "OK"}
    try {
        const signedJSON = JSON.parse(certificateData);
        const publicKey = {
            '@context': jsigs.SECURITY_CONTEXT_URL,
            id: 'did:india',
            type: 'RsaVerificationKey2018',
            controller: 'https://example.com/i/india',
            publicKeyPem: config.certificatePublicKey
        };
        const controller = {
            '@context': jsigs.SECURITY_CONTEXT_URL,
            id: 'https://example.com/i/india',
            publicKey: [publicKey],
            // this authorizes this key to be used for making assertions
            assertionMethod: [publicKey.id]
        };
        const key = new RSAKeyPair({...publicKey});
        const {AssertionProofPurpose} = jsigs.purposes;
        const {RsaSignature2018} = jsigs.suites;
        const result = await jsigs.verify(signedJSON, {
            suite: new RsaSignature2018({key}),
            purpose: new AssertionProofPurpose({controller})
        });
        if (result.verified) {
            console.log('Signature verified.');
            // save
        } else {
            return "Invalid Certificate";
        }
    } catch (e) {
        console.log('Invalid data', e);
        return "Could not verify: " + e;
    }

}

export { importDivoc }