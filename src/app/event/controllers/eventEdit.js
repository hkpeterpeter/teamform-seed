export default class EventEditCtrl {
    constructor($location, $state, $stateParams, $timeout, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.event = null;
        this.input = {};
        this.error = null;
        this.eventStartDatepickerOptions = {
            minDate: Date.now(),
            showWeeks: false
        };
        this.eventStartDatePopupOpened = false;
        this.eventEndDatepickerOptions = {
            minDate: Date.now(),
            showWeeks: false
        };
        this.eventEndDatePopupOpened = false;
        this.eventDeadlinepickerOptions = {
            minDate: Date.now(),
            showWeeks: false
        };
        this.eventDeadlinePopupOpened = false;
        this.getEvent();
    }
    async getEvent() {
        try {
            let event = await this.eventService.getEvent(this.$stateParams.eventId);
            this.$timeout(() => {
                this.event = event;
                this.input = {
                    eventStartDate: new Date(this.event.data.eventStartDate),
                    eventEndDate: new Date(this.event.data.eventEndDate),
                    eventDeadline: new Date(this.event.data.eventDeadline)
                };
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async edit() {
        this.loading = true;
        this.event.data.eventStartDate = this.input.eventStartDate.getTime();
        this.event.data.eventEndDate = this.input.eventEndDate.getTime();
        this.event.data.eventDeadline = this.input.eventDeadline.getTime();
        try {
            let result = await this.eventService.editEvent(this.event);
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('event.detail', {eventId: result.key});
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
    toggleEventStartDatePopup() {
        this.eventStartDatePopupOpened = !this.eventStartDatePopupOpened;
    }
    toggleEventEndDatePopup() {
        this.eventEndDatePopupOpened = !this.eventEndDatePopupOpened;
    }
    toggleEventDeadlinePopup() {
        this.eventDeadlinePopupOpened = !this.eventDeadlinePopupOpened;
    }
}

EventEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'EventService'];
