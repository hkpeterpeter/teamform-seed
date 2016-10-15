export default class EventDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, EventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.EventService = EventService;
        this.event = null;
        this.error = null;
        this.getEvent();
    }
    getEvent() {
        this.EventService.getEvent(this.$stateParams.eventId).then((event) => {
            this.$timeout(() => {
                if (event.$value === null) {
                    return this.$timeout(() => {
                        this.error = new Error('Event not exist');
                    });
                }
                this.$timeout(() => {
                    this.event = event;
                });
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
}

EventDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'EventService'];
