import EventDetailCtrl from './eventDetail';

export default class EventEditCtrl extends EventDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, eventService) {
        super($location, $state, $stateParams, $timeout, eventService);
        this.eventDatepickerOptions = {minDate: Date.now(), showWeeks: false};
        this.eventDatePopupOpened = false;
    }
    edit() {
        this.loading = true;
        if(this.event.eventDate instanceof Date) {
            this.event.eventDate = this.event.eventDate.getTime();
        }
        this.eventService.editEvent(this.event)
            .then((result) => {
                this.$timeout(() => {
                    this.loading = false;
                    this.$state.go('event.detail', {
                        eventId: result.key
                    });
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
}

EventEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'EventService'];
