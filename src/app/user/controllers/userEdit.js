import UserDetailCtrl from './userDetail';
export default class UserEditCtrl extends UserDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, userService) {
        super($location, $state, $stateParams, $timeout, userService);
    }
    edit() {
        this.loading = true;
        this.userService.editUser(this.user)
            .then((result) => {
                this.$timeout(() => {
                    this.loading = false;
                    this.$state.go('user.detail', {eventId: result.key});
                });
            }).catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
    getSkills($query = null) {
        let skills = require('json!../data/skills.json');
        if(!$query) {
            return skills;
        }
        return skills.filter((skill) => {
            return skill.text.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
    }
}

UserEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'UserService'];
