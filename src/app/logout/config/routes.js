import LogoutView from '../views/logout.html';

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('logout', {
            resolve: {
                auth: ['UserService', (userService) => {
                    return userService.checkRules({
                        signIn: true
                    });
                }]
            },
            url: '/logout',
            template: LogoutView,
            controller: 'LogoutCtrl',
            controllerAs: 'logout',
            params: {
                fromState: 'home',
                fromParams: {}
            },
            ncyBreadcrumb: {
                label: 'Logout'
            }
        });
}];
