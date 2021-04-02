# Verifiable Credentials Universal Verifier

<img align="right" src="./docs/screenshots/HomePage.png" data-canonical-src="./docs/screenshots/HomePage.png" width="350px"/>

Android and iOS app that scans for Verifiable Credentials and verifies the content of the payload. 

## Download the latest release

You will find the latest APK on our release files [here](https://github.com/vitorpamplona/vaccine-certificate-tracking-app/releases)

## Features / TO-DO List

- [x] QR Certificate Scanner (v0.0.1)
- [x] Signature Validation (v0.0.2)
- [x] Local Storage (v0.0.5)
- [x] Card Layout UI (v0.0.6)
- [x] Automated Release Management (v0.0.6)
- [x] Search on header (v0.0.8)
- [x] Sort by Scan Date (v0.0.9)
- [x] Delete Cards (v0.0.9)
- [x] Dark and Light Modes (v0.0.13)
- [x] Downloading public key from vaccinator URL (v0.0.14)
- [x] Percent-encoding and Base64 for signatures (v0.0.14)

# Development Overview

This is a React Native app version >61.5

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

## Contributing

[Issues](https://github.com/Path-Check/healthpassport-provider-reader-app/issues) and [pull requests](https://github.com/Path-Check/healthpassport-provider-reader-app/pulls) are very welcome! :)
