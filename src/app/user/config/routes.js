import UserDetailView from '../views/userDetail.html';
import UserListView from '../views/userList.html';
import UserEditView from '../views/userEdit.html';

export default ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when(/^\/user\/?$/, '/user/list');
    $stateProvider
        .state('user', {
            url: '/user',
            template: '<ui-view />',
            ncyBreadcrumb: {
                skip: true
            }
        })
        .state('user.list', {
            url: '/list',
            template: UserListView,
            controller: 'UserListCtrl',
            controllerAs: 'userList',
            ncyBreadcrumb: {
                label: 'Users'
            }
        })
        .state('user.detail', {
            url: '/:userId',
            views: {
                '@': {
                    template: UserDetailView,
                    controller: 'UserDetailCtrl',
                    controllerAs: 'userDetail',
                }
            },
            ncyBreadcrumb: {
                label: '{{ userDetail.user.name || userEdit.user.name }}',
                parent: 'user.list'
            }
        })
        .state('user.detail.edit', {
            resolve: {
                auth: ['AuthService', '$stateParams', (authService, $stateParams) => {
                    return authService.checkRules({
                        signIn: true,
                        userId: $stateParams.userId
                    });
                }]
            },
            url: '/edit',
            views: {
                '@': {
                    template: UserEditView,
                    controller: 'UserEditCtrl',
                    controllerAs: 'userEdit',
                }
            },
            ncyBreadcrumb: {
                label: 'Edit'
            }
        });
}];
