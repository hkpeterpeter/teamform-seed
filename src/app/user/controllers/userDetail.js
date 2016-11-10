import styles from '../../../assets/stylesheets/main.scss';
export default class UserDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.userService = userService;
        this.user = null;
        this.error = null;
        this.styles = styles;
        this.getUser();
    }
    async getUser() {
        try {
            let user = await this.userService.getUser(this.$stateParams.userId);
            this.$timeout(() => {
                if (user.$value === null) {
                    throw new Error('User not exist');
                }
                this.user = user;
            });
        } catch (err) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

UserDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'UserService'];
