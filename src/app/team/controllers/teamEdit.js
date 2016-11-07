import TeamDetailCtrl from './teamDetail';

export default class TeamEditCtrl extends TeamDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, teamService) {
        super($location, $state, $stateParams, $timeout, teamService);
    }
    edit() {
        this.loading = true;
        this.teamService.editTeam(this.team)
            .then((result) => {
                this.$timeout(() => {
                    this.loading = false;
                    this.$state.go('team.detail', {
                        teamId: result.key
                    });
                });
            }).catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
}

TeamEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'TeamService'];
