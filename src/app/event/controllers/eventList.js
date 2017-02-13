export default class EventListCtrl {
    constructor($location, $state, $timeout, NgTableParams, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.events = [];
        this.error = null;
        this.eventListTableParams = new NgTableParams({
            page: 1,
            count: 5
        }, {
            counts: [],
            dataset: []
        });
        this.getEvents();
    }
    async getEvents() {
        try {
            let events = await this.eventService.getEvents();
            this.$timeout(() => {
                this.events = events;
                this.eventListTableParams.settings({
                    dataset: this.events
                });
                events.$watch(() => {
                    this.eventListTableParams.reload();
                });
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

EventListCtrl.$inject = ['$location', '$state', '$timeout', 'NgTableParams', 'EventService'];
