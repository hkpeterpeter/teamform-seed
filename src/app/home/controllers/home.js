export default class HomeCtrl {
    constructor($scope, $firebaseArray, $firebaseObject, database) {
        this.a = $firebaseObject(database.ref('a'));
        this.a.$value = 'b';
        this.a.$save();
        this.users = $firebaseObject(database.ref('users'));
        this.users.$value = [{username: 'admin', password: '123'}];
        this.users.$save();
    }
}

HomeCtrl.$inject = ['$scope', '$firebaseArray', '$firebaseObject', 'database'];
