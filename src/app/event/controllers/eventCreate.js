export default class EventCreateCtrl {
    constructor($location, $state, $stateParams, $timeout, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.loading = false;
        this.event = {teamMin: 1, teamMax: 1, eventDate: new Date()};
        this.error = null;
        this.eventDatepickerOptions = {minDate: Date.now(), showWeeks: false};
        this.eventDatePopupOpened = false;
    }
    createEvent() {
        this.loading = true;
        if(this.event.eventDate instanceof Date) {
            this.event.eventDate = this.event.eventDate.getTime();
        }
        this.eventService.createEvent(this.event)
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
    setTeamMin(value) {
        if (value > 0 && value <= this.event.teamMax) {
            this.event.teamMin = value;
        }
    }
    setTeamMax(value) {
        if (value > 0 && value >= this.event.teamMin) {
            this.event.teamMax = value;
        }
    }
    toggleEventDatePopup() {
        this.eventDatePopupOpened = !this.eventDatePopupOpened;
    }
}

EventCreateCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'EventService'];
