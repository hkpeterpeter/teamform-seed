import EventDetailView from '../views/eventDetail.html';
import EventListView from '../views/eventList.html';
import EventCreateView from '../views/eventCreate.html';
import EventEditView from '../views/eventEdit.html';

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
            resolve: {
                auth: ['AuthService', (authService) => {
                    return authService.checkRules({
                        signIn: true
                    });
                }]
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
            views: {
                '@': {
                    template: EventDetailView,
                    controller: 'EventDetailCtrl',
                    controllerAs: 'eventDetail',
                }
            },
            ncyBreadcrumb: {
                label: '{{ eventDetail.event.data.name || eventEdit.event.data.name }}',
                parent: 'event.list'
            }
        })
        .state('event.detail.edit', {
            resolve: {
                auth: ['AuthService', (authService) => {
                    return authService.checkRules({
                        signIn: true
                    });
                }]
            },
            url: '/edit',
            views: {
                '@': {
                    template: EventEditView,
                    controller: 'EventEditCtrl',
                    controllerAs: 'eventEdit',
                }
            },
            ncyBreadcrumb: {
                label: 'Edit'
            }
        });
}];
