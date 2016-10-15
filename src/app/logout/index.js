import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import menu from '../common/menu';
import footer from '../common/footer';
import alert from '../common/alert';
import firebase from '../common/firebase';
import user from '../common/user';
import LogoutCtrl from './controllers/logout';

export default angular.module('logout', [uirouter, angularfire, firebase, menu, footer, alert, user])
    .config(routes)
    .controller('LogoutCtrl', LogoutCtrl)
    .name;
