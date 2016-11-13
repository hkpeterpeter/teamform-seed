export default class TeamCreateCtrl {
    constructor($location, $state, $stateParams, $timeout, teamService, eventService, authService, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.eventService = eventService;
        this.authService = authService;
        this.userService = userService;
        this.loading = false;
        this.events = [];
        this.team = {
            eventId: '',
            users: [],
            private: false,
            invite: false
        };
        this.error = null;
        this.selectedEvent = null;
        this.availablieUsers = [];
        this.setLeader();
        this.getEvents();
    }
    async setLeader() {
        this.$timeout(() => {
            this.team.users.unshift({
                id: this.authService.getUser().uid,
                role: 'Leader'
            });
            this.updateTeamUsers();
        });
    }
    async getEvents() {
        try {
            let events = await this.eventService.getEvents();
            this.$timeout(() => {
                this.events = events;
                for (let event of events) {
                    if (event.$id == this.$stateParams.eventId) {
                        this.team.eventId = this.$stateParams.eventId;
                        this.onEventChange(event);
                        break;
                    }
                }
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async createTeam() {
        this.loading = true;
        try {
            this.team.users.map((user) => {
                if (user.id && user.id != this.authService.getUser().uid) {
                    user.pending = true;
                    user.accepted = false;
                }
                return user;
            });
            let result = await this.teamService.createTeam(this.team);
            this.$timeout(() => {
                this.loading = false;
                this.$state.go('team.detail', {
                    teamId: result.key
                });
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
                this.loading = false;
            });
        }
    }
    async onEventChange(event) {
        this.selectedEvent = await this.eventService.getEvent(event.$id);
        this.updateTeamUsers();
        this.updateAvailableUsers();
    }
    onTeamUserChange() {
        this.updateAvailableUsers();
    }
    updateTeamUsers() {
        if (this.selectedEvent) {
            this.$timeout(() => {
                for (let i = 0; i < this.selectedEvent.teamMax; i++) {
                    this.team.users.push({
                        id: null,
                        role: 'Any'
                    });
                }
                this.team.users = this.team.users.slice(0, this.selectedEvent.teamMax);
            });
        }
    }
    updateAvailableUsers() {
        if (this.selectedEvent) {
            this.$timeout(() => {
                this.availablieUsers = Object.values(this.selectedEvent.users).filter((user) => {
                    for (let tUser of this.team.users) {
                        if (tUser.id == user.id) {
                            return false;
                        }
                    }
                    return true;
                });
            });
        }
    }
}

TeamCreateCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'TeamService', 'EventService', 'AuthService', 'UserService'];
