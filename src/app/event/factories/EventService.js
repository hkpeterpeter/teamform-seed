export default class EventService {
    constructor($q, $firebaseArray, $firebaseObject, $database, authService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
    }
    getEvent(id) {
        return this.$firebaseObject(this.$database.ref('events/' + id)).$loaded().then(event => {
            return this.$firebaseObject(this.$database.ref('users/' + event.createdBy)).$loaded()
                .then(user => {
                    event.createdByUser = user;
                    return event;
                });
        });
    }
    getEvents(options = {}) {
        let ref = this.$database.ref('events');
        return this.$firebaseArray(ref).$loaded()
            .then(events => {
                return events.map(event => {
                    this.$firebaseObject(this.$database.ref('users/' + event.createdBy)).$loaded()
                        .then(user => {
                            event.createdByUser = user;
                        });
                    return event;
                });
            });
    }
    createEvent(event) {
        return this.authService.checkAuth()
            .then(user => {
                event.createdBy = user.uid;
                event.createdAt = Date.now();
                return this.$firebaseArray(this.$database.ref('events')).$add(event);
            });
    }
    editEvent(event) {
        return event.$save();
    }
    static instance(...args) {
        return new EventService(...args);
    }
}

EventService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'AuthService'];
