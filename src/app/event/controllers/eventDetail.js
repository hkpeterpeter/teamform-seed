export default class EventDetailCtrl {
    constructor($location, $state, $stateParams, $timeout, eventService) {
        this.$location = $location;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.eventService = eventService;
        this.event = null;
        this.error = null;
        this.getEvent();
    }
    async getEvent() {
        try {
            let event = await this.eventService.getEvent(this.$stateParams.eventId);
            this.$timeout(() => {
                this.event = event;
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
        let users = _.shuffle(this.event.users);
        while (users.length > 0) {
            let rand = _.random(this.event.teamMin, this.event.teamMax);
            if (rand > users.length) {
                rand = users.length;
            }
            teams.push(_.pullAt(users, _.range(rand)));
        }
        let lastTeam = teams[teams.length - 1];
        if (lastTeam.length < this.event.teamMin) {
            for(let i=0; i<teams.length && lastTeam.length > 0; i++) {
                let team = teams[i];
                for(let j=team.length; j<this.event.teamMax; j++) {
                    team.push(_.pullAt(lastTeam, [0]));
                }
            }
            _.pull(teams, lastTeam);
        }
        console.log(teams);
    }
}

EventDetailCtrl.$inject = [
    '$location',
    '$state',
    '$stateParams',
    '$timeout',
    'EventService'
];
