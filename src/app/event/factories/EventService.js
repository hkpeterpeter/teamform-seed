export default class EventService {
    constructor($q, $firebaseArray, $firebaseObject, $database) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
    }
    getEvent(id) {
        return this.$firebaseObject(this.$database.ref('events/' + id)).$loaded();
    }
    getEvents(options = {}) {
        var ref = this.$database.ref('events');
        return this.$firebaseArray(ref).$loaded();
    }
    createEvent(event) {
        return this.$firebaseArray(this.$database.ref('events')).$add(event);
    }
    static instance(...args) {
        return new EventService(...args);
    }
}

EventService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database'];
