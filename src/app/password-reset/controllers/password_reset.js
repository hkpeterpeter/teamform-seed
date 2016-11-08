export default class PasswordResetCtrl {
    constructor($timeout, authService) {
        this.$timeout = $timeout;
        this.authService = authService;
        this.loading = false;
        this.email = '';
        this.error = null;
    }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.email)
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

PasswordResetCtrl.$inject = ['$timeout', 'AuthService'];
