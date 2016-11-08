export default class LoginCtrl {
    constructor($state, $timeout, $auth, authService) {
        this.$state = $state;
        this.$timeout = $timeout;
        this.$auth = $auth;
        this.authService = authService;
        this.loading = false;
        this.credential = {
            email: '',
            password: ''
        };
        this.error = null;
    }

    login(credential = this.credential) {
        this.authService.auth(credential)
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

    authenticate(provider) {
        this.$auth.authenticate(provider)
            .then((response) => {
                this.login({token: response.data.token});
            }).catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                });
            });
    }
}

LoginCtrl.$inject = ['$state', '$timeout', '$auth', 'AuthService'];
