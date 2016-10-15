import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngprogress from 'ngprogress-lite';

import routing from './config';
import home from './home';
import login from './login';
import event from './event';

import user from './common/user';

angular.module('app', [uirouter, home, login, event, user, ngprogress])
    .config(routing)
    .run(['$rootScope', '$state', 'ngProgressLite', 'UserService', ($root, $state, ngProgressLite, UserService) => {
        $root.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams, options) => {
            ngProgressLite.inc();
            if (angular.isFunction(toState.auth)) {
                if (!toState.auth(UserService)) {
                    e.preventDefault();
                    $state.go('login', {
                        toState: toState.name,
                        toParams: toParams
                    });
                }
            }
        });
        $root.$on('$stateChangeSuccess', () => {
            ngProgressLite.done();
        });
        $root.$on('$stateChangeError', (error) => {
            ngProgressLite.done();
        });
    }]);
