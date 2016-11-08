export default class UserDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.userService = userService;
        this.user = null;
        this.error = null;
        this.getUser();
    }
    getUser() {
        this.userService.getUser(this.$stateParams.userId).then((user) => {
            this.$timeout(() => {
                if (user.$value === null) {
                    return this.$timeout(() => {
                        this.error = new Error('User not exist');
                    });
                }
                this.$timeout(() => {
                    this.user = user;
                });
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
}

UserDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'UserService'];
