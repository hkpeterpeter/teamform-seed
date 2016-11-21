import MessageView from '../views/message.html';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('message', {
            resolve: {
                auth: ['UserService', '$stateParams', (userService, $stateParams) => {
                    return userService.checkRules({
                        signIn: true
                    });
                }]
            },
            url: '/message/:conversationId?',
            template: MessageView,
            controller: 'MessageCtrl',
            controllerAs: 'message',
            ncyBreadcrumb: {
                label: 'Message'
            }
        });
}];
