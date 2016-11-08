export default class EventListCtrl {
    constructor($location, $state, $timeout, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.events = [];
        this.error = null;
        this.getEvents();
    }
    getEvents() {
        this.eventService.getEvents().then((events) => {
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
