# React Native App Template

## Features:

#### Development platforms

![](https://img.shields.io/badge/Mac-yes-brightgreen.svg)
![](https://img.shields.io/badge/Windows-POC-orange.svg)
![](https://img.shields.io/badge/Ubuntu-yes-brightgreen.svg)

#### Requirements
-   [Node](https://nodejs.org) `10.13.0` or newer
-   [NPM](https://npmjs.com/) `6.4.1` or newer
-   [Android Studio](https://developer.android.com/studio) (if you want to develop for Android)
-   [Xcode](https://developer.apple.com/xcode/) (if you want to develop for iOS/tvOS)
---
## Firebase Setup

1. Create Firebase project: https://firebase.google.com/docs/storage/web/start

2. Get your Firebase config file or object: https://support.google.com/firebase/answer/7015592

## Configuration

Create Firebase config file at this location: `<your-project>/projectConfig/firebase.js`

Open the file and edit Firebase configuration with:

```
const config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  projectId: '<your-cloud-firestore-project>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-sender-id>',
  appId: '<your-app-id>',
};
```

---
