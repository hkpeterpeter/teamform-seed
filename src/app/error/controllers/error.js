export default class ErrorCtrl {
    constructor($state, $stateParams) {
        this.$state = $state;
        this.error = new Error($stateParams.error);
    }
}

ErrorCtrl.$inject = ['$state', '$stateParams'];
