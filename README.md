# QR Check: PathCheck's Universal Verifier

<img align="right" src="./docs/screenshots/HomePage.png" data-canonical-src="./docs/screenshots/HomePage.png" width="350px"/>

Universial Verifiable Credentials Verifier app for android and iOS using PathCheck's SDKs. It scans a QR code for a covid passport/credential/pass, returns a "Pass" or "Fail" and stores it locally in the phone. 

The app helps business and organizations save time and labor whe verifying the veracity of digial or paper covid passport/credentials/pass. Typical use cases include: (i) confirming that a student or employees has been vaccinated for their HR files and (ii) verificaton of a clean health for individuals physically entering a school, stadium, office building, etc.

There is no widely accepted technicals standard for Verifiable QR codes and variations are growing. The goal of this app is to verify them all, including the ones from IBM, CLEAR, Divoc, WHO, EU, VCI, PathCheck, Linux CCI and others.

## Download the latest release

You will find the latest APK on our release files [here](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases)

## Features / TO-DO List

- [x] QR Certificate Scanner (v0.0.1)
- [x] PathCheck Format Signature Verification (v0.0.2)
- [x] Local Storage (v0.0.5)
- [x] Card Layout UI (v0.0.6)
- [x] Search on header (v0.0.8)
- [x] Sort by Scan Date (v0.0.9)
- [x] Delete Cards (v0.0.9)
- [x] Dark and Light Modes (v0.0.13)
- [x] Downloading public key from vaccinator URL (v0.0.14)
- [ ] Scanning and Verifying DIVOC's Credentials  (v0.0.23)
- [ ] Privacy enhancements using Biometrics to unlock the app (v0.0.29)
- [ ] Scanning and Verifying Smart Health Card Credentials (v0.0.29)

# Development Overview

This is a React Native app version >61.5. 

## New to React Native? 

Folow the [ReactNative CLI QuickStart steps](https://reactnative.dev/docs/environment-setup) for both Android and iOS.

## Running

Install modules:
`yarn install`

To run, do:

**For iOS**

```
npm install
cd pod/
pod install
cd ..
npx react-native run-ios 
```

**For Android**

```
npm install
npx react-native run-android
```

## Generating new Version

GitHub Actions generates a new [Release](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases) when npm version is run and pushed to the repo.

```
npm version <version number: x.x.x>
```

## Contributing

[Issues](https://github.com/Path-Check/healthpassport-provider-reader-app/issues) and [pull requests](https://github.com/Path-Check/healthpassport-provider-reader-app/pulls) are very welcome! :)
