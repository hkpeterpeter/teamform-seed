import angular from 'angular';
export default class ChatMessage {
    constructor(snap, $injector) {
        this.$firebaseArray = $injector.get('$firebaseArray');
        this.$firebaseObject = $injector.get('$firebaseObject');
        this.$database = $injector.get('database');
        this.userService = $injector.get('UserService');
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        this._createdByUser = await this.userService.getUser(this.data.createdBy);
        return !angular.equals(this.data, oldData);
    }
    getCreatedByUser() {
        return this._createdByUser;
    }
    toJSON() {
        return this.data;
    }
}
