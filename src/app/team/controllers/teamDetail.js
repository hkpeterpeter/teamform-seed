export default class TeamDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, teamService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.teamService = teamService;
        this.team = null;
        this.error = null;
        this.getTeam();
    }
    getTeam() {
        this.teamService.getTeam(this.$stateParams.teamId).then((team) => {
            this.$timeout(() => {
                if (team.$value === null) {
                    return this.$timeout(() => {
                        this.error = new Error('Team not exist');
                    });
                }
                this.team = team;
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
    joinTeam() {
        this.teamService.joinTeam(this.$stateParams.teamId).then((teamUsers) => {
            this.$timeout(() => {
                console.log('success');
                this.getTeam();
            });
        }).catch((error) => {
            this.$timeout(() => {
                this.error = error;
            });
        });
    }
}

TeamDetailCtrl.$inject = ['$location', '$state', '$stateParams', '$timeout', 'TeamService'];
