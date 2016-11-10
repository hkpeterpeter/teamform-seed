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

    async login(credential = this.credential) {
        try {
            let result = await this.authService.auth(credential);
            this.$state.go(this.$state.params.toState, this.$state.params.toParams);
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }

    async authenticate(provider) {
        try {
            let response = await this.$auth.authenticate(provider);
            this.login({
                token: response.data.token
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

LoginCtrl.$inject = ['$state', '$timeout', '$auth', 'AuthService'];
