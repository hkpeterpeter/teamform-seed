export default class EventDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, ngNotify, NgTableParams, eventService, teamService, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.ngNotify = ngNotify;
        this.eventService = eventService;
        this.teamService = teamService;
        this.userService = userService;
        this.event = null;
        this.error = null;
        this.autoTeam = {};
        this.teamListTableParams = new NgTableParams({
            page: 1,
            count: 2
        }, {
            counts: [],
            dataset: []
        });
        this.userListTableParams = new NgTableParams({
            page: 1,
            count: 2
        }, {
            counts: [],
            dataset: []
        });
        this.canManage = false;
        this.init();
        this.getEvent();
    }
    async init() {
        let user = await this.userService.me();
        this.canManage = user.data.role == 'admin';
    }
    async getEvent() {
        try {
            let event = await this.eventService.getEvent(this.$stateParams.eventId);
            this.$timeout(() => {
                this.event = event;
                this.teamListTableParams.settings({dataset: event.getTeams()});
                this.userListTableParams.settings({dataset: event.getEventUsers()});
            });
            event.$watch(() => {
                this.$timeout(() => {
                    this.teamListTableParams.settings({dataset: event.getTeams()});
                    this.teamListTableParams.reload();
                    this.userListTableParams.settings({dataset: event.getEventUsers()});
                    this.userListTableParams.reload();
                    this.listInit(true);
                });
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async joinEvent() {
        try {
            let eventUsers = await this.eventService.joinEvent(this.$stateParams.eventId);
            this.$timeout(() => {
                this.ngNotify.set('Joined Event Successfully!', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    autoFormTeam() {
        let teams = [];
        let failed = null;
        let users = _.chain(this.event.getEventUsers()).filter({hasTeam: false}).shuffle().value();
        while (users.length > 0) {
            let rand = _.random(this.event.data.teamMin, this.event.data.teamMax);
            if (rand > users.length) {
                rand = users.length;
            }
            teams.push(_.pullAt(users, _.range(rand)));
        }
        if (teams.length == 0) {
            return;
        }
        let lastTeam = teams[teams.length - 1];
        if (lastTeam.length < this.event.data.teamMin) {
            for (let i = 0; i < teams.length && lastTeam.length > 0; i++) {
                let team = teams[i];
                for (let j = team.length; j < this.event.data.teamMax && lastTeam.length > 0; j++) {
                    team.push(_.pullAt(lastTeam, [0])[0]);
                }
            }
            _.pull(teams, lastTeam);
            if (lastTeam.length > 0) {
                failed = lastTeam;
            }
        }
        teams = teams.map((team) => {
            team = {
                users: team
            };
            team.name = 'Team #' + _.random(1000, 9999);
            team.directJoin = true;
            team.private = false;
            team.eventId = this.event.$id;
            for (let teamUser of team.users) {
                teamUser.role = 'Any';
            }
            team.users[0].role = 'Leader';
            for (let i = team.users.length; i < this.event.data.teamMax; i++) {
                team.users.push({id: null, role: 'Any', perferredSkills: []});
            }
            return team;
        });
        this.$timeout(() => {
            this.autoTeam = {
                teams: teams,
                failed: failed
            };
        });
        console.log(teams);
    }
    async createTeam() {
        try {
            let teams = await Promise.all(this.autoTeam.teams.map((team) => {
                return this.teamService.createTeam(team);
            }));
            await this.getEvent();
            this.$timeout(() => {
                this.autoTeam = {
                    teams: [],
                    failed: null
                };
                this.ngNotify.set('Team Created', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
    listInit(force = false) {
        if(!this.teamList || force) {
            this.teamList = this.event.getTeams().map((team) => {
                let teamUsers = team.getTeamUsers().map((teamUser) => {
                    let name = '';
                    if(teamUser.user) {
                        name = teamUser.user.data.name;
                    }
                    return {$id: teamUser.$id, name: name, id: teamUser.id, type: 'user', role: teamUser.role};
                });
                return {$id: team.$id, type: 'team', name: team.data.name, children: teamUsers};
            });
            let users = _.chain(this.event.getEventUsers()).filter({hasTeam: false}).value();
            users.map((user) => {
                user.id = user.user.$id;
                user.role = 'Any';
                user.name = user.user.data.name;
                user.type = 'user';
                return user;
            });
            this.teamList.push({type: 'noTeam', name: 'No Team Members', children: users});
        }
        $('.dd ol:first').html('');
        this.teamList.forEach((team) => {
            $('.dd ol:first').append(this.buildItem(team));
        });
        $('.dd').on('change', () => {
            let newTeamList = $('.dd').nestable('serialize');
            for(let i=0; i<newTeamList.length; i++) {
                let team = newTeamList[i];
                if(team.type == 'noTeam') {
                    continue;
                }
                if(team.type != 'team') {
                    this.listInit();
                    return;
                }
                let userCount = 0;
                let leaderCount = 0;
                for(let teamUser of team.children) {
                    if(teamUser.type != 'user' || teamUser.children) {
                        this.listInit();
                        return;
                    }
                    if(teamUser.id) {
                        userCount++;
                        if(teamUser.role == 'Leader') {
                            leaderCount++;
                            if(leaderCount > 1) {
                                teamUser.role = 'Any';
                            }
                        }
                    }
                }
                if(userCount == 0 && team.$id) {
                    team.remove = true;
                    this.teamList = newTeamList;
                    continue;
                }
                if(leaderCount == 0) {
                    team.children[0].role = 'Leader';
                }
                if(userCount > this.event.data.teamMax) {
                    this.listInit();
                    return;
                }
            }
            this.teamList = newTeamList;
            this.listInit();
        });
        $('.dd').nestable();
    }
    buildItem(item) {
        var html = '';
        if(item.type == 'user') {
            if(item.id) {
                html += '<li class="dd-item" data-$id="' + item.$id + '" data-id="'+item.id+'" data-type="'+item.type+'" data-name="'+item.name+'" data-role="'+item.role+'">';
            } else {
                html += '<li class="dd-item hide" data-$id="' + item.$id + '" data-type="'+item.type+'" data-name="'+item.name+'" data-role="'+item.role+'">';
            }
            html += '<div class="dd-handle">' + item.name + ' - ' + item.role + '</div>';
        } else {
            let className = '';
            if(item.remove) {
                html += '<li class="dd-item hide" data-$id="' + item.$id + '" data-id="'+item.id+'" data-type="'+item.type+'" data-name="'+item.name+'" data-remove="true">';
            } else {
                let userCount = 0;
                if(item.children) {
                    userCount = item.children.reduce((count, item) => {
                        return count + !!item.id;
                    }, 0);
                }
                if(item.type == 'team') {
                    if(userCount < this.event.data.teamMin) {
                        className += 'red-bg txt-white-hover';
                    } else if (userCount >= this.event.data.teamMin) {
                        className += 'green-bg txt-white-hover';
                    }
                }
                html += '<li class="dd-item" data-$id="' + item.$id + '" data-id="'+item.id+'" data-type="'+item.type+'" data-name="'+item.name+'">';
            }
            html += '<div class="dd-handle '+className+'">' + item.name + '</div>';
        }
        if (item.children) {
            html += '<ol class="dd-list">';
            item.children.forEach((item) => {
                html += this.buildItem(item);
            });
            html += '</ol>';
        }
        html += '</li>';
        return html;
    }
    async saveTeam() {
        try {
            for(let teamItem of this.teamList) {
                if(teamItem.type == 'noTeam') {
                    continue;
                }
                let team = await this.teamService.getTeam(teamItem.$id);
                if(teamItem.remove) {
                    await this.teamService.deleteTeam(team);
                    continue;
                }
                for(let teamUser of teamItem.children) {
                    if(!team.data.users[teamUser.$id]) {
                        team.data.users[teamUser.$id] = {};
                    }
                    team.data.users[teamUser.$id].id = teamUser.id || null;
                    team.data.users[teamUser.$id].role = teamUser.role;
                }
                for(let [key, teamUser] of Object.entries(team.data.users)) {
                    let found = false;
                    for(let teamItemUser of teamItem.children) {
                        if(teamItemUser.$id == key) {
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        delete team.data.users[key];
                    }
                }
                while(Object.keys(team.data.users).length > this.event.data.teamMax) {
                    let keys = Object.keys(team.data.users);
                    for(let i=0; i<keys.length; i++) {
                        if(!team.data.users[keys[i]].id) {
                            delete team.data.users[keys[i]];
                            break;
                        }
                    }
                }
                await this.teamService.editTeam(team);
            }
            await this.getEvent();
            this.$timeout(() => {
                this.ngNotify.set('Team Saved', {type: 'success'});
            });
        } catch (error) {
            this.$timeout(() => {
                this.ngNotify.set(error.message, {type: 'error'});
                this.error = error;
            });
        }
    }
}

EventDetailCtrl.$inject = [
    '$location',
    '$state',
    '$stateParams',
    '$timeout',
    'ngNotify',
    'NgTableParams',
    'EventService',
    'TeamService',
    'UserService'
];
