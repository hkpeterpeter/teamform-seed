export default ['$urlRouterProvider', '$locationProvider', '$stateProvider', ($urlRouterProvider, $locationProvider, $stateProvider) => {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('member', {
        abstract: true,
        template: '<ui-view />',
        resolve: {
            user: ['$state', ($state) => {
                console.log($state);
                // z$state.go('login');
            }]
        }
    })
}];
