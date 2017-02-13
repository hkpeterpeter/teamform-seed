import angular from 'angular';
import uirouter from 'angular-ui-router';

import WebNotificationService from './factories/WebNotificationService';

export default angular.module('common.web-notification', [uirouter])
    .factory('WebNotificationService', WebNotificationService.instance)
    .name;
