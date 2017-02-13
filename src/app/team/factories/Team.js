import angular from 'angular';
export default class Team {
    constructor(snap, $injector) {
        this.$firebaseArray = $injector.get('$firebaseArray');
        this.$firebaseObject = $injector.get('$firebaseObject');
        this.$database = $injector.get('database');
        this.eventService = $injector.get('EventService');
        this.userService = $injector.get('UserService');
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        this._createdByUser = await this.userService.getUser(this.data.createdBy);
        this._teamUsers = await this.$firebaseArray(snap.ref.child('users')).$loaded();
        this._event = await this.eventService.getEvent(this.data.eventId);
        for (let teamUser of this._teamUsers) {
            if(teamUser.id) {
                teamUser.user = await this.userService.getUser(teamUser.id);
            } else {
                teamUser.user = null;
            }
        }
        return !angular.equals(this.data, oldData);
    }
    getVacancy() {
        if (!this.getEvent()) {
            return 0;
        }
        return this.getEvent().data.teamMax - this.getTotalTeamUsers();
    }
    getTotalTeamUsers() {
        return (this.getTeamUsers() || []).reduce((count, teamUser) => {
            if (teamUser.id) {
                count++;
            }
            return count;
        }, 0);
    }
    getCreatedByUser() {
        return this._createdByUser;
    }
    getTeamUsers() {
        return this._teamUsers;
    }
    getEvent() {
        return this._event;
    }
    getImageUrl() {
        if(this.data.imageUrl) {
            return this.data.imageUrl;
        }
        return 'https://placeholdit.imgix.net/~text?txtsize=33&txt='+encodeURIComponent(this.data.name)+'&w=200&h=200';
    }
    toJSON() {
        return this.data;
    }
}
