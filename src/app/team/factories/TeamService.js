export default class TeamService {
    constructor($q, $firebaseArray, $firebaseObject, $database, authService, userService, eventService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.eventService = eventService;
    }
    getTeam(id) {
        return this.$firebaseObject(this.$database.ref('teams/' + id)).$loaded().then(team => {
            return Promise.all([Promise.resolve(team), this.userService.getUser(team.createdBy)]);
        }).then(([team, user]) => {
            team.createdByUser = user;
            return Promise.all([Promise.resolve(team), ...Object.keys(team.users).map((userKey) => {
                return this.userService.getUser(team.users[userKey].id).then((user) => {
                    return Object.assign({}, team.users[userKey], user);
                });
            })]);
        }).then(([team, ...users]) => {
            team.users = users;
            return Promise.all([Promise.resolve(team), this.eventService.getEvent(team.eventId)]);
        }).then(([team, event]) => {
            team.event = event;
            return team;
        });
    }
    joinTeam(id, role) {
        // TODO: check same event
        return this.authService.checkAuth()
            .then(user => {
                return Promise.all([Promise.resolve(user), this.$firebaseArray(this.$database.ref('teams/' + id + '/users')).$loaded()]);
            }).then(([user, teamUsers]) => {
                let joined = false;
                for (let teamUser of teamUsers) {
                    if (teamUser.id == user.uid) {
                        joined = true;
                        break;
                    }
                }
                if (!joined) {
                    return teamUsers.$add({id: user.uid, role: role});
                } else {
                    return Promise.reject(new Error('You Already joined this team'));
                }
            });
    }
    getTeams(options = {}) {
        return this.$firebaseArray(this.$database.ref('teams')).$loaded().then(teams => {
            return Promise.all(teams.map(team => {
                return this.userService.getUser(team.createdBy).then(user => {
                    team.createdByUser = user;
                    return team;
                }).then(team => {
                    return this.eventService.getEvent(team.eventId).then(event => {
                        team.event = event;
                        return team;
                    });
                });
            }));
        });
    }
    editTeam(team) {
        return team.$save();
    }
    createTeam(team) {
        // TODO: join event
        return this.authService.checkAuth()
            .then(user => {
                team.createdBy = user.uid;
                team.createdAt = Date.now();
                return Promise.all([Promise.resolve(user), this.$firebaseArray(this.$database.ref('teams')).$add(team), this.eventService.joinEvent(team.eventId, true)]);
            }).then(([user, team]) => {
                return Promise.all([Promise.resolve(team), this.$firebaseArray(this.$database.ref('teams/' + team.key + '/users')).$add({
                    id: user.uid,
                    role: 'leader'
                })]);
            }).then(([team, teamUsers]) => {
                return team;
            });
    }
    static instance(...args) {
        return new TeamService(...args);
    }
}

TeamService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService', 'EventService'];
