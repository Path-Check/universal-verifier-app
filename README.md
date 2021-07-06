# QR Check: PathCheck's Universal Verifier

<img align="right" src="./docs/screenshots/HomePage.png" data-canonical-src="./docs/screenshots/HomePage.png" width="350px"/>

Universal Verifiable Credentials Verifier app for android and iOS using PathCheck's SDKs. The app scans a QR code for a passport/credential/pass, cryptographically verifies it and displays the results on the phone. 

The app helps business and organizations save time and labor whe verifying the veracity of digial or paper covid passport/credentials/pass. Typical use cases include: (i) confirming that a student or employees has been vaccinated for their HR files and (ii) verificaton of a clean health for individuals physically entering a school, stadium, office building, etc.

There is no widely accepted technicals standard for Verifiable QR codes and variations are growing. The goal of this app is to verify them all, including the ones from IBM, CLEAR, Divoc, WHO, EU, VCI, PathCheck, Linux CCI and others.

## Download the latest release

- [iOS](https://apps.apple.com/us/app/pathcheck-qr-check/id1567077398)
- [Android](https://play.google.com/store/apps/details?id=org.pathcheck.universalverifier)
- [APK](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases)

## Currently Supported Formats: 

- [x] [CRED](https://github.com/Path-Check/cred-sdk.js): PathCheck's [PaperCreds](https://github.com/Path-Check/paper-cred)
- [x] [DIVOC](https://github.com/Path-Check/divoc-sdk.js): [COWIN's](https://www.cowin.gov.in/) Credentials in India
- [x] [SHC](https://github.com/Path-Check/shc-sdk.js): [SmartHealth Cards](https://smarthealth.cards/)
- [ ] [HC1](https://github.com/Path-Check/dcc-sdk.js): EU's [Digital Covid Certificates](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en) by the eHealth Network
- [ ] [JXT](https://github.com/Path-Check/bbs-jxt-sdk.js): A BBS+ W3C Verifiable Credentials minimized with [JSON-XT](https://jsonxt.io/)
- [ ] [CBLD](https://github.com/Path-Check/bbs-cbld-sdk.js): A CBOR-LD version of W3C Verifiable Credentials. 
- [ ] [VDS](https://github.com/Path-Check/vds-sdk.js): ICAO's [Visible Digital Seals](https://www.icao.int/Security/FAL/TRIP/Documents/TR%20-%20Visible%20Digital%20Seals%20for%20Non-Electronic%20Documents%20V1.31.pdf)
- [ ] Excelsior: [NYC's](https://covid19vaccine.health.ny.gov/excelsior-pass) COVID pass
- [ ] Good Health Pass

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
