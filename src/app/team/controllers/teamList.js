export default class TeamListCtrl {
    constructor($location, $state, $timeout, teamService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.teams = [];
        this.error = null;
        this.getTeams();
    }
    async getTeams() {
        try {
            let teams = await this.teamService.getTeams();
            this.$timeout(() => {
                this.teams = teams;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

TeamListCtrl.$inject = ['$location', '$state', '$timeout', 'TeamService'];
