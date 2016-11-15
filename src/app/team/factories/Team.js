import angular from 'angular';
export default class Team {
    constructor(snap, $firebaseArray, $firebaseObject, $database, eventService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.eventService = eventService;
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        this._createdByUser = await this.$firebaseObject(this.$database.ref('users/' + this.data.createdBy)).$loaded();
        this._teamUsers = await this.$firebaseArray(snap.ref.child('users')).$loaded();
        this._event = await this.eventService.getEvent(this.data.eventId);
        for (let teamUser of this._teamUsers) {
            teamUser.user = await this.$firebaseObject(this.$database.ref('users/' + teamUser.id));
        }
        return !angular.equals(this.data, oldData);
    }
    getCreatedByUser() {
        // if(!this._createdByUser) {
        //     this._createdByUser = await this.$firebaseObject(this.$database.ref('users/'+this.data.createdBy));
        // }
        return this._createdByUser;

    }
    getTeamUsers() {
        return this._teamUsers;
    }
    getEvent() {
        return this._event;
    }
    toJSON() {
        return this.data;
    }
}
