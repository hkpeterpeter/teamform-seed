import EventDetailView from '../views/eventDetail.html'
import EventListView from '../views/eventList.html';
import EventCreateView from '../views/eventCreate.html';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when(/^\/event\/?$/, '/event/list');
    $stateProvider
        .state('event', {
            url: '/event',
            template: '<ui-view />',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('event.list', {
            url: '/list',
            template: EventListView,
            controller: 'EventListCtrl',
            controllerAs: 'eventList',
            ncyBreadcrumb: {
                label: 'Events'
            }
        })
        .state('event.create', {
            auth: (userService) => {
                return userService.checkAuth();
            },
            url: '/create',
            template: EventCreateView,
            controller: 'EventCreateCtrl',
            controllerAs: 'eventCreate',
            ncyBreadcrumb: {
                label: 'Create',
                parent: 'event.list'
            }
        })
        .state('event.detail', {
            url: '/:eventId',
            template: EventDetailView,
            controller: 'EventDetailCtrl',
            controllerAs: 'eventDetail',
            ncyBreadcrumb: {
                label: '{{ eventDetail.event.name }}',
                parent: 'event.list'
            }
        });
}];
