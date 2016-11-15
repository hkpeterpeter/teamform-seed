export default class TeamListCtrl {
    constructor($location, $state, $timeout, teamService, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.eventService = eventService;
        this.teams = [];
        this.events = [];
        this.search = {};
        this.error = null;
        this.getTeams();
        this.getEvents();
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
}

TeamListCtrl.$inject = ['$location', '$state', '$timeout', 'TeamService', 'EventService'];
