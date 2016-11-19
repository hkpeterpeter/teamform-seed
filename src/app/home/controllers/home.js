export default class HomeCtrl {
    constructor($timeout, eventService) {
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.events = [];
        this.developTeam = {members: []};
        this.getEvents();
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

HomeCtrl.$inject = ['$timeout', 'EventService'];
