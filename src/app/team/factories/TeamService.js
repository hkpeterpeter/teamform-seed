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
    async joinTeam(id, role) {
        let user = await this.authService.checkAuth();
        let teamJoin = await this.getTeam(id);
        await this.eventService.joinEvent(teamJoin.eventId, true);
        let teams = await this.getTeams();
        teams = teams.filter((team) => {
            return teamJoin.eventId == team.eventId;
        });
        for (let team of teams) {
            for (let [key, teamUser] of Object.entries(team.users)) {
                if (teamUser.id == user.uid) {
                    if (team.$id == id) {
                        return Promise.reject(new Error('You Already joined this team'));
                    } else if(!teamUser.pending) {
                        return Promise.reject(new Error('You Already joined other team'));
                    }
                }
            }
        }
        let users = await this.$firebaseArray(this.$database.ref('teams/' + id + '/users')).$loaded();
        for (let teamUser of users) {
            if (teamUser.id == null) {
                let newTeamUser = {
                    id: user.uid,
                    role: role || teamUser.role
                };
                if (teamJoin.invite) {
                    newTeamUser.pending = true;
                    newTeamUser.confirmed = false;
                    return users.$add(newTeamUser);
                } else {
                    teamUser.id = newTeamUser.id;
                    teamUser.role = newTeamUser.role;
                    return users.$save(teamUser);
                }
            }
        }
        return Promise.reject(new Error('The team is full'));
    }
    async getTeams(options = {}) {
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
    async createTeam(team) {
        let user = await this.authService.checkAuth();
        team.createdBy = user.uid;
        team.createdAt = Date.now();
        let newTeamUsers = team.users;
        team.users = null;
        await this.eventService.joinEvent(team.eventId, true);
        let teamRef = await this.$firebaseArray(this.$database.ref('teams')).$add(team);
        let teamUsers = await this.$firebaseArray(teamRef.child('users')).$loaded();
        for(let newTeamUser of newTeamUsers) {
            newTeamUser.pending = true;
            newTeamUser.accepted = false;
            await teamUsers.$add(newTeamUser);
        }
        return teamRef;
    }
    static instance(...args) {
        return new TeamService(...args);
    }
}

TeamService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService', 'EventService'];
