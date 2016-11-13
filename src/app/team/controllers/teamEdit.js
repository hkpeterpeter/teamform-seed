import TeamDetailCtrl from './teamDetail';

export default class TeamEditCtrl {
    constructor($location, $state, $stateParams, $timeout, teamService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.team = null;
        this.error = null;
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
}

TeamEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'TeamService'];
