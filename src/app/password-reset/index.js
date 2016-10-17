import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import user from '../common/user';
import PasswordResetCtrl from './controllers/password_reset';

export default angular.module('password-reset', [uirouter, angularfire, firebase, alert, user])
    .config(routes)
    .controller('PasswordResetCtrl', PasswordResetCtrl)
    .name;
