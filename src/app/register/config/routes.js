import RegisterView from '../views/register.html';

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('register', {
            resolve: {
                auth: ['AuthService', (authService) => {
                    return authService.checkRules({
                        signOut: true
                    });
                }]
            },
            url: '/register',
            template: RegisterView,
            controller: 'RegisterCtrl',
            controllerAs: 'register',
            params: {
                toState: 'home',
                toParams: {}
            },
            ncyBreadcrumb: {
                label: 'Register'
            }
        });
}];
