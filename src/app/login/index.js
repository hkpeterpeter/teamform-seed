import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';
import satellizer from 'satellizer';

import routes from './config/routes';
import oauth from './config/oauth';
import alert from '../common/alert';
import firebase from '../common/firebase';
import auth from '../common/auth';
import LoginCtrl from './controllers/login';

export default angular.module('login', [uirouter, angularfire, satellizer, firebase, alert, auth])
    .config(routes)
    .config(oauth)
    .controller('LoginCtrl', LoginCtrl)
    .name;
