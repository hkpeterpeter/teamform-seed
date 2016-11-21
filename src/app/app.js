import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngprogress from 'ngprogress-lite';

import routes from './routes';
import home from './home';
import register from './register';
import login from './login';
import logout from './logout';
import event from './event';
import chat from './chat';
import user from './user';
import team from './team';
import error from './error';
import message from './message';
import passwordreset from './password-reset';

import auth from './common/auth';
import app from './common/app';

angular.module('app', [uirouter, app, home, register, login, logout, passwordreset, event, user, team, chat, message, error, auth, ngprogress])
    .config(routes)
    .run(['$rootScope', '$state', '$window', 'ngProgressLite', 'AuthService', 'MessageService', ($rootScope, $state, $window, ngProgressLite, authService, messageService) => {
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
            ngProgressLite.inc();
            $window.scrollTo(0, 0);
        });
        $rootScope.$on('$stateChangeSuccess', () => {
            ngProgressLite.done();
        });
        $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
            ngProgressLite.done();
            if (error === 'AUTH_REQUIRED') {
                $state.go('login', {
                    toState: toState.name,
                    toParams: toParams
                });
                return;
            }
            if (error === 'GUEST_REQUIRED') {
                $state.go('error', {error: error});
                return;
            }
            $state.go('error', {error: error});
        });
    }]);
