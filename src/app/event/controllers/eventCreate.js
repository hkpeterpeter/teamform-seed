import fileUploadStyle from '../../../assets/stylesheets/fileUpload.scss';

export default class EventCreateCtrl {
    constructor($location, $state, $stateParams, $timeout, Upload, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.Upload = Upload;
        this.eventService = eventService;
        this.loading = false;
        this.event = {
            teamMin: 1,
            teamMax: 1,
            eventStartDate: new Date(),
            eventEndDate: new Date(),
            eventDeadline: new Date(),
        };
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
        this.fileUploadStyle = fileUploadStyle;
    }
    async createEvent() {
        this.loading = true;
        this.event.eventStartDate = this.event.eventStartDate.getTime();
        this.event.eventEndDate = this.event.eventEndDate.getTime();
        this.event.eventDeadline = this.event.eventDeadline.getTime();
        try {
            let result = await this.eventService.createEvent(this.event);
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
    async upload(file) {
        let imageUrl = await this.Upload.base64DataUrl(file);
        this.$timeout(() => {
            this.event.imageUrl = imageUrl;
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

EventCreateCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'Upload', 'EventService'];
