export default class EventCreateCtrl {
    constructor($location, $state, $stateParams, $timeout, EventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.EventService = EventService;
        this.loading = false;
        this.event = {};
        this.error = null;
    }
    createEvent() {
        this.loading = true;
        this.EventService.createEvent(this.event)
            .then((result) => {
                this.$timeout(() => {
                    this.loading = false;
                    this.$state.go('event.detail', {eventId: result.key});
                });
            }).catch((error) => {
                this.$timeout(() => {
                    this.error = error;
                    this.loading = false;
                });
            });
    }
}

EventCreateCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'EventService'];
