# Signed Health Passport Reader

<img align="right" src="./docs/HomePage.png" data-canonical-src="./docs/HomePage.png" width="350px"/>

App to read and import Vaccine/Test Certificates using the Signed-by-Provider QR Code format. 

Together with the server, this app allows anyone to track the health status of people participating in activities or entering in certain spaces. 

## Behavior

1. Vaccine provider emits a Certificate of Vaccination that is Singned by the Provider (impossible to forge)
2. The app reads the QR Code, validates the signature and imports multiple certificates for the user and other vacinees.
3. All certificates are showed as cards on the main home page.  

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

