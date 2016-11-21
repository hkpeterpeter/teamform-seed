import Event from './Event.js';
export default class EventService {
    constructor($injector, $firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$injector = $injector;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.events = null;
    }
    async getEvent(id) {
        let events = await this.getEvents();
        let event = events.$getRecord(id);
        if(!event) {
            return Promise.reject(new Error('Event not exist'));
        }
        return event;
    }
    async joinEvent(id, force) {
        let user = await this.authService.getUser();
        let eventUsers = await this.$firebaseArray(this.$database.ref('events/' + id + '/users').orderByChild('id').equalTo(user.uid)).$loaded();
        let joined = eventUsers.length > 0;
        if (!joined) {
            return eventUsers.$add({id: user.uid});
        } else {
            if (!force) {
                return Promise.reject(new Error('You Already joined this event'));
            } else {
                return Promise.resolve(true);
            }
        }
    }
    async getEvents() {
        if (!this.event) {
            let eventFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new Event(snap, this.$injector);
                },
                $$updated: function(snap) {
                    return this.$getRecord(snap.key).update(snap);
                }
            });
            let events = await eventFirebaseArray(this.$database.ref('events')).$loaded();
            this.events = events;
        }
        return this.events;
    }
    async createEvent(event) {
        let user = await this.authService.getUser();
        event.createdBy = user.uid;
        event.createdAt = Date.now();
        return this.$firebaseArray(this.$database.ref('events')).$add(event);
    }
    editEvent(event) {
        return this.events.$save(event);
    }
    static instance(...args) {
        if (!EventService.Instance) {
            EventService.Instance = new EventService(...args);
        }
        return EventService.Instance;
    }
}
EventService.Instance = null;
EventService.instance.$inject = ['$injector', '$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
