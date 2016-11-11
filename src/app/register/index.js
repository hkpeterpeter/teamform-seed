import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import auth from '../common/auth';

import user from '../user';

import RegisterCtrl from './controllers/register';

export default angular.module('register', [uirouter, angularfire, firebase, alert, user, auth])
    .config(routes)
    .controller('RegisterCtrl', RegisterCtrl)
    .name;
