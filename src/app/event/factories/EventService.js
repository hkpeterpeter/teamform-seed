export default class EventService {
    constructor($firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
    }
    async getEvent(id) {
        let event = await this.$firebaseObject(this.$database.ref('events/' + id)).$loaded();
        if (event.$value === null) {
            return Promise.reject(new Error('Event not exist'));
        }
        event.createdByUser = await this.userService.getUser(event.createdBy);
        event.teams = [];
        let teams = await this.$firebaseArray(this.$database.ref('teams')).$loaded();
        for(let team of teams) {
            if(team.eventId == event.$id) {
                event.teams.push(team);
            }
        }
        let eventUsers = await this.$firebaseArray(event.$ref().child('users')).$loaded();
        for(let eventUser of eventUsers) {
            Object.assign(eventUser, await this.userService.getUser(eventUser.id));
        }
        event.users = eventUsers;
        return event;
    }
    async joinEvent(id, force) {
        let user = await this.authService.checkAuth();
        let eventUsers = await this.$firebaseArray(this.$database.ref('events/' + id + '/users')).$loaded();
        let joined = false;
        for (let eventUser of eventUsers) {
            if (eventUser.id == user.uid) {
                joined = true;
                break;
            }
        }
        if (!joined) {
            return eventUsers.$add({id: user.uid});
        } else {
            if(!force) {
                return Promise.reject(new Error('You Already joined this event'));
            } else {
                return Promise.resolve(true);
            }
        }
    }
    async getEvents(options = {}) {
        let events = await this.$firebaseArray(this.$database.ref('events')).$loaded();
        for(let event of events) {
            event.createdByUser = await this.userService.getUser(event.createdBy);
        }
        return events;
    }
    async createEvent(event) {
        let user = await this.authService.checkAuth();
        event.createdBy = user.uid;
        event.createdAt = Date.now();
        return this.$firebaseArray(this.$database.ref('events')).$add(event);
    }
    editEvent(event) {
        return event.$save();
    }
    static instance(...args) {
        return new EventService(...args);
    }
}

EventService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
