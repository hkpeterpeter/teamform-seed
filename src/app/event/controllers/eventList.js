export default class EventListCtrl {
    constructor($location, $state, $timeout, EventService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.EventService = EventService;
        this.events = [];
        this.error = null;
        this.getEvents();
    }
    getEvents() {
        this.EventService.getEvents().then((events) => {
            this.$timeout(() => {
                this.events = events;
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
}

EventListCtrl.$inject = ['$location', '$state', '$timeout', 'EventService'];
