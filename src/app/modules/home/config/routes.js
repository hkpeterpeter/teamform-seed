import HomeView from '../views/home.html'

/*@ngInject*/
export default ($stateProvider) => {
    $stateProvider
        .state('home', {
            url: '/',
            template: HomeView,
            controller: 'HomeCtrl',
            controllerAs: 'home'
        });
}
