import LoginView from '../views/login.html'

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('login', {
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
