import angular from 'angular';
export default class Message {
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
        this._sender = this.userService.getUser(this.data.sender);
        this._receiver = this.userService.getUser(this.data.receiver);
        return !angular.equals(this.data, oldData);
    }
    async getSender() {
        return this._sender;
    }
    async getReceiver() {
        return this._receiver;
    }
    toJSON() {
        return this.data;
    }
}
