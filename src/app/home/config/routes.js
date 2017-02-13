import HomeView from '../views/home.html';

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('home', {
            url: '/',
            template: HomeView,
            controller: 'HomeCtrl',
            controllerAs: 'home',
            ncyBreadcrumb: {
                label: 'Home'
            }
        });
}];
