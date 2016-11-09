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

    async register() {
        try {
            let result = await this.authService.register(this.credential);
            this.$state.go('user.detail.edit', {
                userId: result.uid,
                toState: this.$state.params.toState,
                toParams: this.$state.params.toParams
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
}

RegisterCtrl.$inject = ['$state', '$timeout', 'AuthService'];
