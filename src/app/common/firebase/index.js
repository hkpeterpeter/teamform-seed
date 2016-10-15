import angular from 'angular';

import FirebaseManager from './FirebaseManager.js';

let firebaseManager = new FirebaseManager({
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DATABASE,
    storageBucket: ENV.FIREBASE_STORAGE,
    messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER
});

export default angular.module('common.firebase', [])
    .factory('auth', () => firebaseManager.auth())
    .factory('database', () => firebaseManager.database())
    .factory('storage', () => firebaseManager.storage())
    .name;
