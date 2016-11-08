import firebase from 'firebase';

export default class FirebaseManager {
    constructor(config) {
        this.firebase = firebase.initializeApp(config);
    }
    auth() {
        return this.firebase.auth();
    }
    database() {
        return this.firebase.database();
    }
    storage() {
        return this.firebase.storage();
    }
}
