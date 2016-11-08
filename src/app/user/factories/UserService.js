export default class UserService {
    constructor($q, $firebaseArray, $firebaseObject, $database, authService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
    }
    getUser(id) {
        return this.$firebaseObject(this.$database.ref('users/' + id)).$loaded();
    }
    getUsers(options = {}) {
        return this.$firebaseArray(this.$database.ref('users')).$loaded()
            .then(users => {
                return users;
            });
    }
    editUser(user) {
        user.pending = null;
        return user.$save();
    }
    createEvent(event) {
        return this.authService.checkAuth()
            .then(user => {
                event.createdBy = user.uid;
                event.createdAt = Date.now();
                return this.$firebaseArray(this.$database.ref('events')).$add(event);
            });
    }
    static instance(...args) {
        return new UserService(...args);
    }
}

UserService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'AuthService'];
