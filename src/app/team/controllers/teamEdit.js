import fileUploadStyle from '../../../assets/stylesheets/fileUpload.scss';

export default class TeamEditCtrl {
    constructor($location, $state, $stateParams, $timeout, Upload, teamService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.Upload = Upload;
        this.teamService = teamService;
        this.team = null;
        this.error = null;
        this.deleteConfirm = null;
        this.fileUploadStyle = fileUploadStyle;
        this.getTeam();
    }
    async getTeam() {
        try {
            let team = await this.teamService.getTeam(this.$stateParams.teamId);
            this.$timeout(() => {
                this.team = team;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async upload(file) {
        let imageUrl = await this.Upload.base64DataUrl(file);
        this.$timeout(() => {
            this.team.data.imageUrl = imageUrl;
        });
    }
    async edit() {
        this.loading = true;
        try {
            let result = await this.teamService.editTeam(this.team);
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('team.detail', {teamId: result.key});
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
    async delete() {
        if(this.deleteConfirm !== 'YES') {
            this.$timeout(() => {
                this.error = new Error('Please type in \'YES\' to confirm.');
            });
            return;
        }
        this.loading = true;
        try {
            let result = await this.teamService.deleteTeam(this.team);
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('home');
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
}

TeamEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'Upload', 'TeamService'];
