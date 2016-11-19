import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';
import relativeDate from 'angular-relative-date';
import routes from './config/routes';
import firebase from '../common/firebase';

import event from '../event';

import HomeCtrl from './controllers/home';

export default angular.module('home', [uirouter, angularfire, firebase, event, relativeDate.name])
    .config(routes)
    .controller('HomeCtrl', HomeCtrl)
    .name;
