import User from './User.js';
export default class UserService {
    constructor($injector, $firebaseArray, $firebaseObject, $database, authService) {
        this.$injector = $injector;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.users = null;
    }
    async me() {
        let user = await this.authService.getUser();
        if (user) {
            return this.getUser(user.uid);
        }
        return null;
    }
    async checkRules(rules = {}) {
        let user = await this.me();
        if (user && rules.signOut) {
            return Promise.reject('GUEST_REQUIRED');
        }
        if (!user && (rules.signIn || rules.admin || rules.userId)) {
            return Promise.reject('AUTH_REQUIRED');
        }
        if (rules.userId && (!user || (((typeof(rules.userId) === 'string' && user.$id != rules.userId) || (rules.userId instanceof Array && rules.userId.indexOf(user.$id) != -1)) && !user.isAdmin()))) {
            return Promise.reject('PERMISSION_DENIED');
        }
        if (rules.admin && (!user || !user.isAdmin())) {
            return Promise.reject('PERMISSION_DENIED');
        }
    }
    async getUser(id) {
        let users = await this.getUsers();
        let user = users.$getRecord(id);
        if (!user) {
            return Promise.reject(new Error('User not exist'));
        }
        return user;
    }
    async getUsers() {
        if (!this.users) {
            let userFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new User(snap, this.$injector, this.$firebaseArray, this.$firebaseObject, this.$database);
                },
                $$updated: function(snap) {
                    return this.$getRecord(snap.key).update(snap);
                }
            });
            let users = await userFirebaseArray(this.$database.ref('users')).$loaded();
            this.users = users;
        }
        return this.users;
    }
    async editUser(user) {
        user.data.pending = null;
        return this.users.$save(user);
    }
    static instance(...args) {
        if (!UserService.Instance) {
            UserService.Instance = new UserService(...args);
        }
        return UserService.Instance;
    }
}
UserService.Instance = null;
UserService.instance.$inject = ['$injector', '$firebaseArray', '$firebaseObject', 'database', 'AuthService'];
