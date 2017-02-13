import angular from 'angular';
export default class Event {
    constructor(snap, $injector) {
        this.$firebaseArray = $injector.get('$firebaseArray');
        this.$firebaseObject = $injector.get('$firebaseObject');
        this.$database = $injector.get('database');
        this.userService = $injector.get('UserService');
        this.teamService = $injector.get('TeamService');
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        this._createdByUser = await this.userService.getUser(this.data.createdBy);
        this._teams = (await this.teamService.getTeams()).getInEvent(this.$id);
        this._eventUsers = await this.$firebaseArray(snap.ref.child('users')).$loaded();
        for (let eventUser of this._eventUsers) {
            eventUser.user = await this.userService.getUser(eventUser.id);
            eventUser.hasTeam = false;
            for (let team of this._teams) {
                if(!team.data.users) {
                    continue;
                }
                for (let [teamUserKey, teamUser]of Object.entries(team.data.users)) {
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
        if(this.watch) {
            this.watch();
        }
        return !angular.equals(this.data, oldData);
    }
    $watch(func) {
        this.watch = func;
    }
    getTotalEventUsers() {
        return (this.getEventUsers() || []).length ;
    }
    getTotalTeams() {
        return (this.getTeams() || []).length;
    }
    getCreatedByUser() {
        return this._createdByUser;
    }
    getTeams() {
        return this._teams;
    }
    getEventUsers() {
        return (this._eventUsers || []);
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
