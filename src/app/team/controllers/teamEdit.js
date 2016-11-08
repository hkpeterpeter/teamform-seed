import TeamDetailCtrl from './teamDetail';

export default class TeamEditCtrl extends TeamDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, teamService) {
        super($location, $state, $stateParams, $timeout, teamService);
    }
    async edit() {
        this.loading = true;
        let result = await this.teamService.editTeam(this.team);
        try {
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('team.detail', {
                    teamId: result.key
                });
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
