import angular from 'angular';

import UserService from './factories/UserService';

export default angular.module('common.user', [])
    .factory('UserService', UserService.instance)
    .name;
