import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import menu from '../common/menu';
import footer from '../common/footer';
import alert from '../common/alert';
import firebase from '../common/firebase';
import user from '../common/user';
import LoginCtrl from './controllers/login';

export default angular.module('login', [uirouter, angularfire, firebase, menu, footer, alert, user])
    .config(routes)
    .controller('LoginCtrl', LoginCtrl)
    .name;
