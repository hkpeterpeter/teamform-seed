import UserDetailCtrl from './userDetail';
export default class UserEditCtrl extends UserDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, userService) {
        super($location, $state, $stateParams, $timeout, userService);
        this.skills = require('json!../data/skills.json');
    }
    edit() {
        this.loading = true;
        this.userService.editUser(this.user)
            .then((result) => {
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
            }).catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
}

UserEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'UserService'];
