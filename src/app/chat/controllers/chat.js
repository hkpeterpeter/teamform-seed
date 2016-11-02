export default class ChatCtrl {
    constructor($location, $state, $timeout, ChatService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.events = [];
        this.error = null;
    }
}

ChatCtrl.$inject = ['$location', '$state', '$timeout', 'ChatService'];
