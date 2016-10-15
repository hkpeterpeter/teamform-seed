export default class UserService {
    constructor($q, $firebaseArray, $firebaseObject, $auth, $database) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$auth = $auth;
        this.$database = $database;
    }
    auth(credential = {}) {
        if (credential.hasOwnProperty('email')) {
            return this.$auth.signInWithEmailAndPassword(credential.email, credential.password);
        }
    }
    register(credential) {
        return this.$auth.createUserWithEmailAndPassword(credential.email, credential.password);
    }
    checkAuth() {
        return this.$q((resolve, reject) => {
            this.$auth.onAuthStateChanged((user) => {
                if (user) {
                    return resolve(user);
                } else {
                    return reject(user);
                }
            });
        });
    }
    checkRules(rules = {}) {
        return this.$q((resolve, reject) => {
            this.$auth.onAuthStateChanged((user) => {
                if(rules.auth && !user) {
                    return reject(user);
                }
                if(rules.guest && user) {
                    return reject(user);
                }
                return resolve(user);
            });
        });
    }
    signOut() {
        return this.$auth.signOut();
    }
    static instance(...args) {
        return new UserService(...args);
    }
}

UserService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'auth', 'database'];
