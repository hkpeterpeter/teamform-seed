export default class HomeCtrl {
    constructor($timeout, eventService, teamService) {
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.teamService = teamService;
        this.events = [];
        this.teams = [];
        this.developTeam = {members: []};
        this.getEvents();
        this.getTeams();
    }
    async getEvents() {
        try {
            let events = await this.eventService.getEvents();
            this.$timeout(() => {
                this.events = events;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
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

HomeCtrl.$inject = ['$timeout', 'EventService', 'TeamService'];
