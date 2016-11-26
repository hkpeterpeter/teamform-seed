export default class EventDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, NgTableParams, eventService, teamService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.teamService = teamService;
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
        this.getEvent();
    }
    async getEvent() {
        try {
            let event = await this.eventService.getEvent(this.$stateParams.eventId);
            this.$timeout(() => {
                this.event = event;
                this.teamListTableParams.settings({
                    dataset: event.getTeams()
                });
                this.userListTableParams.settings({
                    dataset: event.getEventUsers()
                });
                event.$watch(() => {
                    this.teamListTableParams.settings({
                        dataset: event.getTeams()
                    });
                    this.teamListTableParams.reload();
                    this.userListTableParams.settings({
                        dataset: event.getEventUsers()
                    });
                    this.userListTableParams.reload();
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
                console.log('success');
            });
        } catch (error) {
            this.$timeout(() => {
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
            this.$timeout(() => {
                this.autoTeam = {
                    teams: [],
                    failed: null
                };
            });
        } catch (error) {
            this.$timeout(() => {
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
    'NgTableParams',
    'EventService',
    'TeamService'
];
