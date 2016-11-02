import ChatView from '../views/chat.html';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('chat', {
            url: '/chat',
            template: ChatView,
            controller: 'ChatCtrl',
            controllerAs: 'chat',
            ncyBreadcrumb: {
                label: 'Chat'
            }
        });
}];
