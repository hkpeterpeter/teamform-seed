import User from './User.js';
export default class UserService {
    constructor($firebaseArray, $firebaseObject, $database, authService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.users = null;
    }
    async getUser(id) {
        let users = await this.getUsers();
        let user = users.$getRecord(id);
        if(!user) {
            return Promise.reject(new Error('User not exist'));
        }
        return user;
    }
    async getUsers() {
        if (!this.users) {
            let userFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new User(snap, this.$firebaseArray, this.$firebaseObject, this.$database);
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
        let newUserSkills = user.data.skills || [];
        user.data.skills = null;
        let userSkills = await this.$firebaseArray(this.$database.ref('users/'+user.$id+'/skills')).$loaded();
        let result = await this.users.$save(user);
        for (let newUserSkill of newUserSkills) {
            await userSkills.$add(newUserSkill);
        }
        return result;
    }
    static instance(...args) {
        if (!UserService.Instance) {
            UserService.Instance = new UserService(...args);
        }
        return UserService.Instance;
    }
}
UserService.Instance = null;
UserService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'AuthService'];
