export default class LogoutCtrl {
    constructor($state, $timeout, authService) {
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
        this.error = null;
        this.logout();
    }
    logout() {
        this.authService.signOut()
            .then((result) => {
                this.$state.go(this.$state.params.fromState, this.$state.params.fromParams);
            })
            .catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                });
            });
    }
}

LogoutCtrl.$inject = ['$state', '$timeout', 'AuthService'];
