export default class UserService {
    constructor($q, $firebaseArray, $firebaseObject, $database, authService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
    }
    async getUser(id) {
        return this.$firebaseObject(this.$database.ref('users/' + id)).$loaded().then((user) => {
            if (user.$value === null) {
                return Promise.reject(new Error('User not exist'));
            }
            return Promise.resolve(user);
        });
    }
    getUsers() {
        return this.$firebaseArray(this.$database.ref('users')).$loaded();
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

UserService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database', 'AuthService'];
