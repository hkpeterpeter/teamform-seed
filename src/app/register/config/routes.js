import RegisterView from '../views/register.html'

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('register', {
            auth: (userService) => {
                return userService.checkRules({guest: true});
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
