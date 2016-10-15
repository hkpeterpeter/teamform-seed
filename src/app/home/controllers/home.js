export default class HomeCtrl {
    constructor($location, $scope, $firebaseArray, $firebaseObject, database) {
        this.$location = $location;
        this.a = $firebaseObject(database.ref('a'));
        this.a.$value = 'b';
        this.a.$save();
        this.users = $firebaseObject(database.ref('users'));
        this.users.$value = [{username: 'admin', password: '123'}];
        this.users.$save();
    }
}

HomeCtrl.$inject = ['$location', '$scope', '$firebaseArray', '$firebaseObject', 'database'];
