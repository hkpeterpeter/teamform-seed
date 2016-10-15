export default class UserService {
    constructor($q, $firebaseArray, $firebaseObject, $auth, $database) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$auth = $auth;
        this.$database = $database;
    }
    auth(credential = {}) {
        if(credential.hasOwnProperty('email')) {
            return this.$auth.signInWithEmailAndPassword(credential.email, credential.password);
        }
    }
    isAuth() {
        return this.$auth.currentUser != null;
    }
    static instance(...args) {
        return new UserService(...args);
    }
}

UserService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'auth', 'database'];
