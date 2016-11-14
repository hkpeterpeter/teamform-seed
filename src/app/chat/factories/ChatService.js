export default class ChatService {
    // TODO:: Chatroom UI
    constructor($firebaseArray, $firebaseObject, $database) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
    }
    static instance(...args) {
        return new ChatService(...args);
    }
}

ChatService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database'];
