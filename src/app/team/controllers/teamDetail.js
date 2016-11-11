export default class TeamDetailCtrl {
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
    async joinTeam() {
        try {
            let teamUsers = await this.teamService.joinTeam(this.$stateParams.teamId);
            this.$timeout(() => {
                console.log('success');
                this.getTeam();
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

TeamDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'TeamService'];
