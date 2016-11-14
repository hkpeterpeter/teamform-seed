import EventDetailCtrl from './eventDetail';

export default class EventEditCtrl extends EventDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, eventService) {
        super($location, $state, $stateParams, $timeout, eventService);
        this.eventDatepickerOptions = {
            minDate: Date.now(),
            showWeeks: false
        };
        this.eventDatePopupOpened = false;
    }
    async edit() {
        this.loading = true;
        if (this.event.data.eventDate instanceof Date) {
            this.event.data.eventDate = this.event.data.eventDate.getTime();
        }
        try {
            let result = await this.eventService.editEvent(this.event);
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('event.detail', {
                    eventId: result.key
                });
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
    setTeamMin(value) {
        if (value > 0 && value <= this.event.data.teamMax) {
            this.event.data.teamMin = value;
        }
    }
    setTeamMax(value) {
        if (value > 0 && value >= this.event.data.teamMin) {
            this.event.data.teamMax = value;
        }
    }
    toggleEventDatePopup() {
        this.eventDatePopupOpened = !this.eventDatePopupOpened;
    }
}

EventEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'EventService'];
