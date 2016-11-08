export default class EventService {
    constructor($q, $firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
    }
    getEvent(id) {
        return this.$firebaseObject(this.$database.ref('events/' + id)).$loaded().then(event => {
            return Promise.all([Promise.resolve(event), this.userService.getUser(event.createdBy), this.$firebaseArray(this.$database.ref('teams')).$loaded()]);
        }).then(([event, user, teams]) => {
            event.createdByUser = user;
            event.teams = [];
            event.users = event.users || {};
            for(let team of teams) {
                if(team.eventId == event.$id) {
                    event.teams.push(team);
                }
            }
            return Promise.all([Promise.resolve(event), ...Object.keys(event.users).map((userKey) => {
                return this.userService.getUser(event.users[userKey].id).then((user) => {
                    return Object.assign({}, event.users[userKey], user);
                });
            })]);
        }).then(([event, ...users]) => {
            event.users = users;
            return event;
        });
    }
    joinEvent(id, force) {
        return this.authService.checkAuth()
            .then(user => {
                return Promise.all([Promise.resolve(user), this.$firebaseArray(this.$database.ref('events/' + id + '/users')).$loaded()]);
            }).then(([user, eventUsers]) => {
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
            });
    }
    getEvents(options = {}) {
        return this.$firebaseArray(this.$database.ref('events')).$loaded().then(events => {
            return Promise.all(events.map(event => {
                return this.userService.getUser(event.createdBy).then(user => {
                    event.createdByUser = user;
                    return event;
                });
            }));
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

EventService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
