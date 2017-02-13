export default class UserListCtrl {
    constructor($location, $state, $timeout, NgTableParams, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.userService = userService;
        this.users = [];
        this.error = null;
        this.userListTableParams = new NgTableParams({
            page: 1,
            count: 5
        }, {
            counts: [],
            dataset: []
        });
        this.getUsers();
    }
    async getUsers() {
        try {
            let users = await this.userService.getUsers();
            this.$timeout(() => {
                this.users = users;
                this.userListTableParams.settings({
                    dataset: this.users
                });
                users.$watch(() => {
                    this.userListTableParams.reload();
                });
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

UserListCtrl.$inject = ['$location', '$state', '$timeout', 'NgTableParams', 'UserService'];
