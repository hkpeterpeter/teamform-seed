import angular from 'angular';
export default class Event {
    constructor(snap, $injector) {
        this.$firebaseArray = $injector.get('$firebaseArray');
        this.$firebaseObject = $injector.get('$firebaseObject');
        this.$database = $injector.get('database');
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        this._createdByUser = await this.$firebaseObject(this.$database.ref('users/'+this.data.createdBy)).$loaded();
        this._teams = await this.$firebaseArray(this.$database.ref('teams').orderByChild('eventId').equalTo(this.$id)).$loaded();
        this._eventUsers = await this.$firebaseArray(snap.ref.child('users')).$loaded();
        for (let eventUser of this._eventUsers) {
            eventUser.user = await this.$firebaseObject(this.$database.ref('users/'+eventUser.id));
            eventUser.hasTeam = false;
            for (let team of this._teams) {
                if(!team.users) {
                    continue;
                }
                for (let [teamUserKey, teamUser]of Object.entries(team.users)) {
                    if (eventUser.id == teamUser.id) {
                        eventUser.hasTeam = true;
                        break;
                    }
                }
                if (eventUser.hasTeam) {
                    break;
                }
            }
        }
        return !angular.equals(this.data, oldData);
    }
    getTotalEventUsers() {
        return (this.getEventUsers() || []).length ;
    }
    getTotalTeams() {
        return (this.getTeams() || []).length;
    }
    getCreatedByUser() {
        // if(!this._createdByUser) {
        //     this._createdByUser = await this.$firebaseObject(this.$database.ref('users/'+this.data.createdBy));
        // }
        return this._createdByUser;

    }
    getTeams() {
        return this._teams;
    }
    getEventUsers() {
        return this._eventUsers;
    }
    toJSON() {
        return this.data;
    }
}
