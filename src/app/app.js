import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngprogress from 'ngprogress-lite';

import routes from './routes';
import home from './home';
import register from './register';
import login from './login';
import logout from './logout';
import event from './event';

import user from './common/user';

angular.module('app', [uirouter, home, register, login, logout, event, user, ngprogress])
    .config(routes)
    .run(['$rootScope', '$state', 'ngProgressLite', 'UserService', ($root, $state, ngProgressLite, userService) => {
        $root.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams, options) => {
            ngProgressLite.inc();
            if (angular.isFunction(toState.auth) && !options.auth) {
                e.preventDefault();
                toState.auth(userService)
                    .then(() => {
                        options.auth = true;
                        $state.go(toState.name, toParams, options);
                    })
                    .catch((user) => {
                        if (user) {
                            $state.go('home');
                        } else {
                            $state.go('login', {
                                toState: toState.name,
                                toParams: toParams
                            });
                        }
                    });
            }
        });
        $root.$on('$stateChangeSuccess', () => {
            ngProgressLite.done();
        });
        $root.$on('$stateChangeError', (error) => {
            ngProgressLite.done();
        });
    }]);
