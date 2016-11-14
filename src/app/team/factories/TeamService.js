export default class TeamService {
    constructor($firebaseArray, $firebaseObject, $database, authService, userService, eventService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.eventService = eventService;
    }
    async getTeam(id) {
        let team = await this.$firebaseObject(this.$database.ref('teams/' + id)).$loaded();
        if (team.$value === null) {
            return Promise.reject(new Error('Team not exist'));
        }
        let init = async() => {
            team.createdByUser = await this.userService.getUser(team.createdBy);
            team.users = await this.getTeamUsers(id);
            team.event = await this.eventService.getEvent(team.eventId);
            return Promise.resolve();
        };
        await init();
        team.$$updated = await init;
        return team;
    }
    async getTeamUsers(id) {
        let teamUsers = await this.$firebaseArray(this.$database.ref('teams/' + id).child('users')).$loaded();
        for (let teamUser of teamUsers) {
            if (teamUser.id) {
                teamUser.user = await this.userService.getUser(teamUser.id);
            }
        }
        return teamUsers;
    }
    async joinTeam(id, positionId) {
        let user = this.authService.getUser();
        let teamJoin = await this.getTeam(id);
        await this.eventService.joinEvent(teamJoin.eventId, true);
        let teams = await this.$firebaseArray(this.$database.ref('teams').orderByChild('eventId').equalTo(teamJoin.eventId)).$loaded();
        for (let team of teams) {
            for (let [key, teamUser] of Object.entries(team.users)) {
                if (teamUser.id == user.uid) {
                    if (team.$id == id) {
                        return Promise.reject(new Error('You Already joined this team'));
                    } else if (!teamUser.pending) {
                        return Promise.reject(new Error('You Already joined other team'));
                    }
                }
            }
        }
        let users = await this.$firebaseArray(this.$database.ref('teams/' + id + '/users')).$loaded();
        for (let teamUser of users) {
            if (teamUser.id == null && teamUser.$id == positionId) {
                let newTeamUser = {
                    id: user.uid,
                    role: teamUser.role,
                    refId: positionId
                };
                if (teamJoin.invite) {
                    newTeamUser.pending = true;
                    newTeamUser.confirmed = false;
                    return users.$add(newTeamUser);
                } else {
                    teamUser.id = newTeamUser.id;
                    return users.$save(teamUser);
                }
            }
        }
        return Promise.reject(new Error('The team is full'));
    }
    async getTeams() {
        let teams = await this.$firebaseArray(this.$database.ref('teams')).$loaded();
        let init = async() => {
            teams = await Promise.all(teams.map(async(team) => {
                return await this.getTeam(team.$id);
            }));
            return Promise.resolve();
        };
        await init();
        teams.$$updated = await init;
        return teams;
    }
    async editTeam(team) {
        return team.$save();
    }
    async createTeam(team) {
        let user = this.authService.user;
        team.createdBy = user.uid;
        team.createdAt = Date.now();
        let newTeamUsers = team.users;
        team.users = null;
        await this.eventService.joinEvent(team.eventId, true);
        let teamRef = await this.$firebaseArray(this.$database.ref('teams')).$add(team);
        let teamUsers = await this.$firebaseArray(teamRef.child('users')).$loaded();
        for (let newTeamUser of newTeamUsers) {
            await teamUsers.$add(newTeamUser);
        }
        return teamRef;
    }
    async getTeamPositionUser(id, positionId) {
        let teamUser = await this.$firebaseObject(this.$database.ref('teams/'+id+'/users/'+positionId)).$loaded();
        if(teamUser.$value === null) {
            return Promise.reject(new Error('Position not exist'));
        }
        return teamUser;
    }
    async confirmTeamPosition(id, positionId) {
        let teamUser = await this.getTeamPositionUser(id, positionId);
        teamUser.pending = null;
        teamUser.confirmed = null;
        let oldTeamUser = await this.getTeamPositionUser(id, teamUser.refId);
        await oldTeamUser.$remove();
        return teamUser.$save();
    }
    async acceptTeamPosition(id, positionId) {
        let teamUser = await this.getTeamPositionUser(id, positionId);
        teamUser.pending = null;
        teamUser.accepted = null;
        return teamUser.$save();
    }
    static instance(...args) {
        return new TeamService(...args);
    }
}

TeamService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService', 'EventService'];
