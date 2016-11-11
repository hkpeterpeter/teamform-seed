import LoginView from '../views/login.html';

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('login', {
            auth: async(authService) => {
                return authService.checkRules({
                    guest: true
                });
            },
            url: '/login',
            template: LoginView,
            controller: 'LoginCtrl',
            controllerAs: 'login',
            params: {
                toState: 'home',
                toParams: {}
            },
            ncyBreadcrumb: {
                label: 'Login'
            }
        });
}];
