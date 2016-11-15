import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';

import auth from '../common/auth';
import user from '../user';

import ChatCtrl from './controllers/chat';
import ChatService from './factories/ChatService';

export default angular.module('chat', [uirouter, angularfire, firebase, auth, user, alert])
    .config(routes)
    .controller('ChatCtrl', ChatCtrl)
    .factory('ChatService', ChatService.instance)
    .name;
