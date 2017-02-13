import RegisterView from '../views/register.html';

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('register', {
            resolve: {
                auth: ['UserService', (userService) => {
                    return userService.checkRules({
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
