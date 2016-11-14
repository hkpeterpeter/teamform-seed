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
        let init = (async () => {
            event.createdByUser = await this.userService.getUser(event.createdBy);
            event.teams = await this.$firebaseArray(this.$database.ref('teams').orderByChild('eventId').equalTo(id)).$loaded();
            let eventUsers = await this.$firebaseArray(event.$ref().child('users')).$loaded();
            for(let eventUser of eventUsers) {
                eventUser.user = await this.userService.getUser(eventUser.id);
                eventUser.hasTeam = false;
                for(let team of event.teams) {
                    for(let [teamUserKey, teamUser] of Object.entries(team.users)) {
                        if(eventUser.id == teamUser.id) {
                            eventUser.hasTeam = true;
                            break;
                        }
                    }
                    if(eventUser.hasTeam) {
                        break;
                    }
                }
            }
            event.users = eventUsers;
            return Promise.resolve();
        });
        await init();
        event.$$updated = await init;
        return event;
    }
    async joinEvent(id, force) {
        let user = await this.authService.getUser();
        let eventUsers = await this.$firebaseArray(this.$database.ref('events/' + id + '/users').orderByChild('id').equalTo(user.uid)).$loaded();
        let joined = eventUsers.length > 0;
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
        let user = await this.authService.getUser();
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
