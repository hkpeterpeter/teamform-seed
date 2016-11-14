import MessageView from '../views/message.html';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('message', {
            resolve: {
                auth: ['AuthService', '$stateParams', (authService, $stateParams) => {
                    return authService.checkRules({
                        signIn: true
                    });
                }]
            },
            url: '/message',
            template: MessageView,
            controller: 'MessageCtrl',
            controllerAs: 'message',
            ncyBreadcrumb: {
                label: 'Message'
            }
        });
}];
