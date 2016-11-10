export default class AuthService {
    constructor($rootScope, $firebaseArray, $firebaseObject, $auth, $database) {
        this.$rootScope = $rootScope;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$auth = $auth;
        this.$database = $database;
    }
    _boardcastAuthChanged(result) {
        this.$rootScope.$broadcast('authChanged');
        return Promise.resolve(result);
    }
    async auth(credential = {}) {
        if (credential.hasOwnProperty('email')) {
            let result = await this.$auth.signInWithEmailAndPassword(credential.email, credential.password);
            this.$rootScope.$broadcast('authChanged');
            return result;
        }
        if (credential.hasOwnProperty('token')) {
            let result = await this.$auth.signInWithCustomToken(credential.token);
            this.$rootScope.$broadcast('authChanged');
            return result;
        }
    }
    async register(credential) {
        let result = await this.$auth.createUserWithEmailAndPassword(credential.email, credential.password);
        let user = this.$firebaseObject(this.$database.ref('users/' + result.uid));
        user.pending = true;
        await user.$save();
        this.$rootScope.$broadcast('authChanged');
        return result;
    }
    checkAuth() {
        return new Promise((resolve, reject) => {
            this.$auth.onAuthStateChanged((user) => {
                if (user) {
                    return resolve(user);
                } else {
                    return reject(new Error('Unauthorized, Please Login'));
                }
            });
        });
    }
    checkRules(rules = {}) {
        return new Promise((resolve, reject) => {
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
    async sendPasswordResetEmail(email) {
        return await this.$auth.sendPasswordResetEmail(email);
    }
    async signOut() {
        let result = await this.$auth.signOut();
        this.$rootScope.$broadcast('authChanged');
        return result;
    }
    static instance(...args) {
        return new AuthService(...args);
    }
}

AuthService.instance.$inject = ['$rootScope', '$firebaseArray', '$firebaseObject', 'auth', 'database'];
