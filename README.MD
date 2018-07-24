# Presentation CMS
Very basic CMS system write to share **code snippets**, **useful links** which was showed during training.
This CMS contain user registration, user authentication. 

![Presentation CMS Authentication](img/sign-in.png?raw=true "Presentation CMS Authentication")

## Table of content
- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
- [Running](#running)
- [Technologies](#technologies)
- [License](#license)

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development purposes

### Prerequisites
You will need to add `firebase.js` file in the `src/` directory to run that project which should be like this below:
```javascript
export const config = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  databaseURL: "YOUR_FIREBASE_BASE_URL",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID"
};
```

In your firebase console, you will need to active authentication via `e-mail/password` and set up Realtime Database. 
Simple rules for your Realtime Database:

```json
{
  "rules": {
    "activePresentation": {
      ".read": true,
      ".write": "auth != null"
    },
    "presentations": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Installing
To install this project, type in the main project directory:
```
npm install
```
or 
```
yarn
```

## Running
To run this project on your local machine type:
```javascript
yarn serve
```
For build production version type: 
```javascript
yarn build
```

If you want check this project with lint:
```javascript
yarn lint
```

## Technologies
- Vue: 2.5.16,
- Vue Router: 3.0.1,
- Vuex: 3.0.1,
- Vue Highlightjs: 1.3.3,
- Vue Test Utils: 1.0.0-beta.16,
- JEST: 3.0.0-rc.2,
- Firebase: 5.0.4,

## License [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
See the [LICENSE](LICENSE.MD) file for license rights and limitations (MIT).
