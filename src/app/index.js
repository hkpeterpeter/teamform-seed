import angular from 'angular';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';

import routing from './config';
import home from './modules/home';

angular.module('app', [uirouter, sanitize, home])
    .config(routing)
    .run(['$rootScope', ($root) => {
        $root.$on('$stateChangeStart', (e, newUrl, oldUrl) => {
            if (newUrl !== oldUrl) {
                $root.loadingView = true;
            }
        });
        $root.$on('$stateChangeSuccess', () => {
            $root.loadingView = false;
        });
        $root.$on('$stateChangeError', () => {
            $root.loadingView = false;
        });
    }]);
