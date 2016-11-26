import Team from './Team.js';
export default class TeamService {
    constructor($injector, $firebaseArray, $firebaseObject, $database, authService, userService, eventService, messageService) {
        this.$injector = $injector;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.eventService = eventService;
        this.messageService = messageService;
        this.teams = null;
    }
    async getTeam(id) {
        let teams = await this.getTeams();
        let team = teams.$getRecord(id);
        if(!team) {
            return Promise.reject(new Error('Team not exist'));
        }
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
    async joinTeam(id, positionId, message) {
        let user = await this.authService.getUser();
        let teamJoin = await this.getTeam(id);
        await this.eventService.joinEvent(teamJoin.data.eventId, true);
        let teams = await this.$firebaseArray(this.$database.ref('teams').orderByChild('eventId').equalTo(teamJoin.data.eventId)).$loaded();
        for (let team of teams) {
            for (let [key, teamUser]of Object.entries(team.users)) {
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
                    refId: positionId,
                    message: message
                };
                if (!teamJoin.data.directJoin) {
                    newTeamUser.pending = true;
                    newTeamUser.confirmed = false;
                    this.messageService.sendMessage(user.uid, teamJoin.data.createdBy, user.name + ' Request to Join ' + teamJoin.data.name);
                    return users.$add(newTeamUser);
                } else {
                    teamUser.id = newTeamUser.id;
                    this.messageService.sendMessage(user.uid, teamJoin.data.createdBy, user.name + ' Joined Your Team: ' + teamJoin.data.name);
                    return users.$save(teamUser);
                }
            }
        }
        return Promise.reject(new Error('The team is full'));
    }
    async getTeams() {
        if (!this.teams) {
            let teamFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new Team(snap, this.$injector);
                },
                $$updated: function(snap) {
                    return this.$getRecord(snap.key).update(snap);
                }
            });
            let teams = await teamFirebaseArray(this.$database.ref('teams')).$loaded();
            this.teams = teams;
        }
        return this.teams;
    }
    deleteTeam(team) {
        return this.teams.$remove(team);
    }
    editTeam(team) {
        return this.teams.$save(team);
    }
    async createTeam(team) {
        let user = this.authService.user;
        team.createdBy = user.uid;
        team.createdAt = Date.now();
        let newTeamUsers = team.users;
        team.users = null;
        await this.eventService.joinEvent(team.eventId, true);
        let teams = await this.getTeams();
        let teamRef = await teams.$add(team);
        let teamUsers = await this.$firebaseArray(teamRef.child('users')).$loaded();
        for (let newTeamUser of newTeamUsers) {
            await teamUsers.$add(newTeamUser);
        }
        return teamRef;
    }
    async getTeamPositionUser(id, positionId) {
        let teamUser = await this.$firebaseObject(this.$database.ref('teams/' + id + '/users/' + positionId)).$loaded();
        if (teamUser.$value === null) {
            return Promise.reject(new Error('Position not exist'));
        }
        return teamUser;
    }
    async confirmTeamPosition(id, positionId) {
        // TODO:: send message
        let teamUser = await this.getTeamPositionUser(id, positionId);
        teamUser.pending = null;
        teamUser.confirmed = null;
        teamUser.message = null;
        let oldTeamUser = await this.getTeamPositionUser(id, teamUser.refId);
        await oldTeamUser.$remove();
        return teamUser.$save();
    }
    async rejectConfirmTeamPosition(id, positionId) {
        // TODO:: send message
        let teamUser = await this.getTeamPositionUser(id, positionId);
        await teamUser.$remove();
        return teamUser.$save();
    }
    async acceptTeamPosition(id, positionId) {
        // TODO:: send message
        let teamUser = await this.getTeamPositionUser(id, positionId);
        teamUser.pending = null;
        teamUser.accepted = null;
        teamUser.message = null;
        return teamUser.$save();
    }
    async rejectAcceptTeamPosition(id, positionId) {
        // TODO:: send message
        let teamUser = await this.getTeamPositionUser(id, positionId);
        teamUser.id = null;
        teamUser.pending = null;
        teamUser.accepted = null;
        teamUser.message = null;
        return teamUser.$save();
    }
    async cancelRequestTeamPosition(id, positionId) {
        // TODO:: send message
        let teamUser = await this.getTeamPositionUser(id, positionId);
        await teamUser.$remove();
        return teamUser.$save();
    }
    static instance(...args) {
        return new TeamService(...args);
    }
}

TeamService.instance.$inject = [
    '$injector',
    '$firebaseArray',
    '$firebaseObject',
    'database',
    'AuthService',
    'UserService',
    'EventService',
    'MessageService'
];
