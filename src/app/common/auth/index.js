import angular from 'angular';

import AuthService from './factories/AuthService';

export default angular.module('common.auth', [])
    .factory('AuthService', AuthService.instance)
    .name;
