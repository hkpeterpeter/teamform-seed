import styles from '../../../assets/stylesheets/main.scss';
import fileUploadStyle from '../../../assets/stylesheets/fileUpload.scss';

export default class UserEditCtrl {
    constructor($location, $state, $stateParams, $timeout, Upload, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.userService = userService;
        this.Upload = Upload;
        this.user = null;
        this.error = null;
        this.styles = styles;
        this.fileUploadStyle = fileUploadStyle;
        this.skills = require('json!../../../assets/data/skills.json');
        this.getUser();
    }
    async getUser() {
        try {
            let user = await this.userService.getUser(this.$stateParams.userId);
            user.skills = Object.values(user.skills);
            this.$timeout(() => {
                this.user = user;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
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
    async upload(file) {
        let imageUrl = await this.Upload.base64DataUrl(file);
        this.$timeout(() => {
            this.user.imageUrl = imageUrl;
        });
    }
}

UserEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'Upload', 'UserService'];
