import UserDetailCtrl from './userDetail';
export default class UserEditCtrl extends UserDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, userService) {
        super($location, $state, $stateParams, $timeout, userService);
        this.skills = require('json!../data/skills.json');
    }
    async edit() {
        this.loading = true;
        try {
            let result = await this.userService.editUser(this.user);
            this.$timeout(() => {
                this.loading = false;
                if (this.$state.params.toState) {
                    this.$state.go(this.$state.params.toState, this.$state.params.toParams);
                } else {
                    this.$state.go('user.detail', {
                        userId: result.key
                    });
                }
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
}

UserEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'UserService'];
