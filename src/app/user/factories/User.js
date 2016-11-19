import angular from 'angular';
export default class User {
    constructor(snap, $firebaseArray, $firebaseObject, $database) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.$id = snap.key;
        this.update(snap);
    }
    async update(snap) {
        let oldData = angular.extend({}, this.data);
        this.data = snap.val();
        return !angular.equals(this.data, oldData);
    }
    toJSON() {
        return this.data;
    }
}
