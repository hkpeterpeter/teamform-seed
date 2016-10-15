export default class LoginCtrl {
    constructor($location, $state, $timeout, UserService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.UserService = UserService;
        this.credential = {
            email: '',
            password: ''
        };
        this.error = null;
    }
    login() {
        this.UserService.auth(this.credential)
            .then((result) => {
                this.$state.go(this.$state.params.toState, this.$state.params.toParams);
            })
            .catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                });
            });
    }
}

LoginCtrl.$inject = ['$location', '$state', '$timeout', 'UserService'];
