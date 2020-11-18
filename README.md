# Signed Health Passport Reader

<img align="right" src="./docs/screenshots/HomePage.png" data-canonical-src="./docs/screenshots/HomePage.png" width="350px"/>

App to read and import Vaccine/Test Certificates using the [Signed-by-Provider QR Code format](https://github.com/vitorpamplona/vaccine-certificate-qrcode-generator). 

Together with the server, this app allows anyone to track the health status of people participating in activities or entering in certain spaces. 

## Behavior

1. Vaccine provider emits a Certificate of Vaccination ([here](https://github.com/vitorpamplona/vaccine-certificate-qrcode-generator)) that is Singned by the Provider (impossible to forge)
2. The app reads the QR Code, validates the signature and imports multiple certificates for the user and other vacinees.
3. All certificates are showed as cards on the main home page.  

## Download the latest release

You will find the latest APK on our release files [here](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases)

## Features / TO-DO List

- [x] QR Certificate Scanner (v0.0.1)
- [x] Signature Validation (v0.0.2)
- [x] Local Storage (v0.0.5)
- [x] Card Layout UI (v0.0.6)
- [x] Search on header (v0.0.8)
- [x] Sort by Scan Date (v0.0.9)
- [x] Delete Cards (v0.0.9)
- [ ] Card Layout Grouped by Vacinee ID
- [ ] App Icon

# Development Overview

This is a React Native app version 61.5

## Requirements

- Git
- NVM
- Node (10.1 or newer)
- Yarn
- Watchman
- OpenJDK (for Android building and installing)
- Android Studio (SDK, AVD)
- CocoaPods (Required for installing iOS dependencies)
- XCode (for iOS Dev)
- ios-deploy (installing your app on a physical device with the CLI)

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