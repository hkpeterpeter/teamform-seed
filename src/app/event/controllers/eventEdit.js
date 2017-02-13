import fileUploadStyle from '../../../assets/stylesheets/fileUpload.scss';

export default class EventEditCtrl {
    constructor($location, $state, $stateParams, $timeout, Upload, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.Upload = Upload;
        this.eventService = eventService;
        this.event = null;
        this.input = {};
        this.error = null;
        this.deleteConfirm = null;
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
    async delete() {
        if(this.deleteConfirm !== 'YES') {
            this.$timeout(() => {
                this.error = new Error('Please type in \'YES\' to confirm.');
            });
            return;
        }
        this.loading = true;
        try {
            let result = await this.eventService.deleteEvent(this.event);
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('home');
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
            this.event.data.imageUrl = imageUrl;
        });
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

EventEditCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'Upload', 'EventService'];
