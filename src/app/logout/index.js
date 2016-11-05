import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import auth from '../common/auth';
import LogoutCtrl from './controllers/logout';

export default angular.module('logout', [uirouter, angularfire, firebase, alert, auth])
    .config(routes)
    .controller('LogoutCtrl', LogoutCtrl)
    .name;
