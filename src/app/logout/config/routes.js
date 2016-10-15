import LogoutView from '../views/logout.html'

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('logout', {
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
