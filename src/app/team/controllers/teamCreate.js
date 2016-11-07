export default class TeamCreateCtrl {
    constructor($location, $state, $stateParams, $timeout, teamService, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.eventService = eventService;
        this.loading = false;
        this.events = [];
        this.team = {eventId: ''};
        this.error = null;
        this.getEvents();
    }
    getEvents() {
        this.eventService.getEvents().then((events) => {
            this.$timeout(() => {
                this.events = events;
                this.team.eventId = this.$stateParams.eventId || '';
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
    createTeam() {
        this.loading = true;
        this.teamService.createTeam(this.team)
            .then((result) => {
                this.$timeout(() => {
                    this.loading = false;
                    this.$state.go('team.detail', {teamId: result.key});
                });
            }).catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
}

TeamCreateCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'TeamService', 'EventService'];
