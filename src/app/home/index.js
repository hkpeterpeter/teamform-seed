import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import menu from '../common/menu';
import footer from '../common/footer';
import firebase from '../common/firebase';
import HomeCtrl from './controllers/home';

export default angular.module('home', [uirouter, angularfire, firebase, menu, footer])
    .config(routes)
    .controller('HomeCtrl', HomeCtrl)
    .name;
