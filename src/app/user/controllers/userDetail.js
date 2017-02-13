export default class UserDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, NgTableParams, eventService, teamService, userService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.teamService = teamService;
        this.userService = userService;
        this.user = null;
        this.error = null;
        this.eventListTableParams = new NgTableParams({
            page: 1,
            count: 2
        }, {
            counts: [],
            dataset: []
        });
        this.teamListTableParams = new NgTableParams({
            page: 1,
            count: 2
        }, {
            counts: [],
            dataset: []
        });
        this.getUser();
        this.getTeamsJoined();
        this.getEventsJoined();
    }
    async getUser() {
        try {
            let user = await this.userService.getUser(this.$stateParams.userId);
            this.$timeout(() => {
                this.user = user;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async getEventsJoined() {
        try {
            let events = await this.eventService.getEvents();
            let myEvents = events.filter((event) => {
                if(!event.data.users) {
                    return false;
                }
                for(let user of Object.values(event.data.users)) {
                    if(user.id == this.$stateParams.userId) {
                        return true;
                    }
                }
                return false;
            });

            this.$timeout(() => {
                this.events = myEvents;
                this.eventListTableParams.settings({
                    dataset: this.events
                });
                events.$watch(() => {
                    this.getEventsJoined();
                });
                this.eventListTableParams.reload();
            });
        } catch(error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async getTeamsJoined() {
        try {
            let teams = await this.teamService.getTeams();
            let myTeams = teams.filter((team) => {
                if(!team.data.users) {
                    return false;
                }
                for(let user of Object.values(team.data.users)) {
                    if(user.id == this.$stateParams.userId) {
                        return true;
                    }
                }
                return false;
            });

            this.$timeout(() => {
                this.teams = myTeams;
                this.teamListTableParams.settings({
                    dataset: this.teams
                });
                teams.$watch(() => {
                    this.getTeamsJoined();
                });
                this.teamListTableParams.reload();
            });
        } catch(error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
}

UserDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'NgTableParams', 'EventService', 'TeamService', 'UserService'];
