export default class AuthService {
    constructor($rootScope, $firebaseArray, $firebaseObject, $firebaseAuth, $timeout, auth, $database) {
        this.$rootScope = $rootScope;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$firebaseAuth = $firebaseAuth(auth);
        this.$auth = auth;
        this.$database = $database;
        this.$timeout = $timeout;
        this.user = null;
        this.userReady = false;
        this._bindAuth();
    }
    async _boardcastAuthChanged(result) {
        this.$rootScope.$broadcast('authChanged');
        return Promise.resolve(result);
    }
    _bindAuth() {
        this.$firebaseAuth.$onAuthStateChanged((user) => {
            this.userReady = true;
            this.user = user;
            this._boardcastAuthChanged();
        });
    }
    getUserSync() {
        return this.$firebaseAuth.$getAuth();
    }
    async getUser() {
        return new Promise((resolve, reject) => {
            let t = () => {
                if (this.userReady) {
                    if (this.user) {
                        return resolve(Object.assign({}, this.user));
                    } else {
                        return resolve(null);
                    }
                }
                this.$timeout(t, 100);
            };
            t();
        });
    }
    async auth(credential = {}) {
        if (credential.hasOwnProperty('email')) {
            let result = await this.$firebaseAuth.$signInWithEmailAndPassword(credential.email, credential.password);
            return result;
        }
        if (credential.hasOwnProperty('token')) {
            let result = await this.$firebaseAuth.$signInWithCustomToken(credential.token);
            return result;
        }
    }
    async register(credential) {
        let result = await this.$firebaseAuth.$createUserWithEmailAndPassword(credential.email, credential.password);
        let user = this.$firebaseObject(this.$database.ref('users/' + result.uid));
        user.email = credential.email;
        user.name = credential.email.split('@')[0];
        user.role = 'member';
        user.createdAt = Date.now();
        await user.$save();
        return result;
    }
    async checkAuth() {
        let user = await this.getUser();
        if (user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject(new Error('Unauthorized, Please Login'));
        }
    }
    async sendPasswordResetEmail(email) {
        return await this.$firebaseAuth.$sendPasswordResetEmail(email);
    }
    async signOut() {
        let result = await this.$firebaseAuth.$signOut();
        return result;
    }
    static instance(...args) {
        if (!AuthService.Instance) {
            AuthService.Instance = new AuthService(...args);
        }
        return AuthService.Instance;
    }
}
AuthService.Instance = null;
AuthService.instance.$inject = [
    '$rootScope',
    '$firebaseArray',
    '$firebaseObject',
    '$firebaseAuth',
    '$timeout',
    'auth',
    'database'
];
