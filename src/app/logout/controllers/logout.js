export default class LogoutCtrl {
    constructor($state, $timeout, userService) {
        this.$state = $state;
        this.$timeout = $timeout;
        this.userService = userService;
        this.error = null;
        this.logout();
    }
    logout() {
        this.userService.signOut()
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

LogoutCtrl.$inject = ['$state', '$timeout', 'UserService'];
