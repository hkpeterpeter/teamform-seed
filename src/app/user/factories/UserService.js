export default class UserService {
    constructor($firebaseArray, $firebaseObject, $database, authService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
    }
    async getUser(id) {
        let user = this.$firebaseObject(this.$database.ref('users/' + id)).$loaded();
        if (user.$value === null) {
            return Promise.reject(new Error('User not exist'));
        }
        return Promise.resolve(user);
    }
    async getUsers() {
        let users = await this.$firebaseArray(this.$database.ref('users')).$loaded();
        let init = async() => {
            users = await Promise.all(users.map((user) => {
                return this.getUser(user.$id);
            }));
            return Promise.resolve();
        };
        await init();
        users.$$updated = await init;
        return Promise.resolve(users);
    }
    async editUser(user) {
        user.pending = null;
        let newUserSkills = user.skills || [];
        user.skills = null;
        let userRef = await user.$save();
        let userSkills = await this.$firebaseArray(userRef.child('skills')).$loaded();
        for (let newUserSkill of newUserSkills) {
            await userSkills.$add(newUserSkill);
        }
        return userRef;
    }
    static instance(...args) {
        return new UserService(...args);
    }
}

UserService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'AuthService'];
