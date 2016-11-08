import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import ChatCtrl from './controllers/chat';
import ChatService from './factories/ChatService';

export default angular.module('chat', [uirouter, angularfire, firebase, alert])
    .config(routes)
    .controller('ChatCtrl', ChatCtrl)
    .factory('ChatService', ChatService.instance)
    .name;
