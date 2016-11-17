import angular from 'angular';

import NotificationService from './factories/NotificationService';

export default angular.module('common.notification', [])
    .factory('NotificationService', NotificationService.instance)
    .name;
