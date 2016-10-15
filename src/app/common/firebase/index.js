import angular from 'angular';

import FirebaseManager from './FirebaseManager.js';
import firebaseConfig from '../../firebase.js';

let firebaseManager = new FirebaseManager(firebaseConfig);

export default angular.module('common.firebase', [])
    .factory('auth', () => firebaseManager.auth())
    .factory('database', () => firebaseManager.database())
    .factory('storage', () => firebaseManager.storage())
    .name;
