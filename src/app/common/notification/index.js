import angular from 'angular';
import uirouter from 'angular-ui-router';

import NotificationService from './factories/NotificationService';

export default angular.module('common.notification', [uirouter])
    .factory('NotificationService', NotificationService.instance)
    .name;
