export default ['$urlRouterProvider', '$locationProvider', '$stateProvider', ($urlRouterProvider, $locationProvider, $stateProvider) => {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
}];
