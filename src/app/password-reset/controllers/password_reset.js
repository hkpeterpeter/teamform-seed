export default class PasswordResetCtrl {
    constructor($timeout, userService) {
        this.$timeout = $timeout;
        this.userService = userService;
        this.loading = false;
        this.email = '';
        this.error = null;
    }

    sendPasswordResetEmail() {
        this.userService.sendPasswordResetEmail(this.email)
            .then((result) => {
                this.$timeout(() => {
                    this.error = {message: 'Reset Email Sent'};
                    this.loading = false;
                });
            })
            .catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
}

PasswordResetCtrl.$inject = ['$timeout', 'UserService'];
