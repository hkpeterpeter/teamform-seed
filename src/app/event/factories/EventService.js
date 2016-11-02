export default class EventService {
    constructor($q, $firebaseArray, $firebaseObject, $database, userService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.userService = userService;
    }
    getEvent(id) {
        return this.$firebaseObject(this.$database.ref('events/' + id)).$loaded();
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
        return this.userService.checkAuth()
            .then(user => {
                event.createdBy = user.uid;
                event.createdAt = Date.now();
                return this.$firebaseArray(this.$database.ref('events')).$add(event);
            });
    }
    static instance(...args) {
        return new EventService(...args);
    }
}

EventService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'UserService'];
