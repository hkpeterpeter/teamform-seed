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
    getTeams() {
        this.teamService.getTeams().then((teams) => {
            this.$timeout(() => {
                this.teams = teams;
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
}

TeamListCtrl.$inject = ['$location', '$state', '$timeout', 'TeamService'];
