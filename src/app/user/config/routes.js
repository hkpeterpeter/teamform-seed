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
                label: '{{ userDetail.user.data.name || userEdit.user.data.name }}',
                parent: 'user.list'
            }
        })
        .state('user.detail.edit', {
            resolve: {
                auth: ['UserService', '$stateParams', (userService, $stateParams) => {
                    return userService.checkRules({
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
