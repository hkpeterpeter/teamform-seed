export default class RegisterCtrl {
    constructor($state, $timeout, authService) {
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
        this.loading = false;
        this.credential = {
            email: '',
            password: ''
        };
        this.error = null;
    }

    register() {
        this.authService.register(this.credential)
            .then((result) => {
                this.$state.go(this.$state.params.toState, this.$state.params.toParams);
            })
            .catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
}

RegisterCtrl.$inject = ['$state', '$timeout', 'AuthService'];
