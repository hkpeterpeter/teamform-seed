export default class PasswordResetCtrl {
    constructor($timeout, authService) {
        this.$timeout = $timeout;
        this.authService = authService;
        this.loading = false;
        this.email = '';
        this.error = null;
    }

    async sendPasswordResetEmail() {
        try {
            let result = await this.authService.sendPasswordResetEmail(this.email);
            this.$timeout(() => {
                this.error = {
                    message: 'Reset Email Sent'
                };
                this.loading = false;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
}

PasswordResetCtrl.$inject = ['$timeout', 'AuthService'];
