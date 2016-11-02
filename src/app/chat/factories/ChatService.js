export default class ChatService {
    // TODO:: Chatroom UI
    constructor($q, $firebaseArray, $firebaseObject, $database) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
    }
    static instance(...args) {
        return new ChatService(...args);
    }
}

ChatService.instance.$inject = ['$q', '$firebaseArray', '$firebaseObject', 'database'];
