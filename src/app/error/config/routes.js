import ErrorView from '../views/error.html';

export default ['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('error', {
            resolve: {
                error: ['$stateParams', ($stateParams) => {
                    return $stateParams.error;
                }]
            },
            url: '/error',
            template: ErrorView,
            controller: 'ErrorCtrl',
            controllerAs: 'error',
            params: {
                error: 'An error has occurred'
            },
            ncyBreadcrumb: {
                label: 'Error'
            }
        });
}];
