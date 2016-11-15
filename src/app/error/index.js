import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import ErrorCtrl from './controllers/error';

export default angular.module('error', [uirouter, angularfire, firebase, alert])
    .config(routes)
    .controller('ErrorCtrl', ErrorCtrl)
    .name;
