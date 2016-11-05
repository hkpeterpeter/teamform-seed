export default class AuthService {
    constructor($rootScope, $q, $firebaseArray, $firebaseObject, $auth, $database) {
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$auth = $auth;
        this.$database = $database;
    }
    _boardcastAuthChanged(result) {
        this.$rootScope.$broadcast('authChanged');
        return this.$q.resolve(result);
    }
    auth(credential = {}) {
        if (credential.hasOwnProperty('email')) {
            return this.$auth.signInWithEmailAndPassword(credential.email, credential.password).then((result) => {
                this.$rootScope.$broadcast('authChanged');
                return result;
            });
        }
        if (credential.hasOwnProperty('token')) {
            return this.$auth.signInWithCustomToken(credential.token).then((result) => {
                this.$rootScope.$broadcast('authChanged');
                return result;
            });
        }
    }
    register(credential) {
        return this.$auth.createUserWithEmailAndPassword(credential.email, credential.password).then((result) => {
            this.$rootScope.$broadcast('authChanged');
            return result;
        });
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
                if (rules.auth && !user) {
                    return reject(user);
                }
                if (rules.guest && user) {
                    return reject(user);
                }
                return resolve(user);
            });
        });
    }
    sendPasswordResetEmail(email) {
        return this.$auth.sendPasswordResetEmail(email);
    }
    signOut() {
        return this.$auth.signOut().then((result) => {
            this.$rootScope.$broadcast('authChanged');
            return result;
        });
    }
    static instance(...args) {
        return new AuthService(...args);
    }
}

AuthService.instance.$inject = ['$rootScope', '$q', '$firebaseArray', '$firebaseObject', 'auth', 'database'];
