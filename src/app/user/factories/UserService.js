export default class UserService {
    constructor($q, $firebaseArray, $firebaseObject, $database, authService) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
    }
    getUser(id) {
        return this.$firebaseObject(this.$database.ref('users/' + id)).$loaded().then((user) => {
            if (user.$value === null) {
                return Promise.reject('User not exist');
            }
            return Promise.resolve(user);
        });
    }
    getUsers(options = {}) {
        return this.$firebaseArray(this.$database.ref('users')).$loaded()
            .then(users => {
                return users;
            });
    }
    async editUser(user) {
        user.pending = null;
        let newUserSkills = user.skills;
        user.skills = null;
        let userRef = await user.$save();
        let userSkills = this.$firebaseArray(userRef.child('skills'));
        for (let newUserSkill of newUserSkills) {
            await userSkills.$add(newUserSkill);
        }
        return userRef;
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
