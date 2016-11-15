export default class ChatService {
    // TODO:: Chatroom UI
    constructor($firebaseArray, $firebaseObject, $database, userService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.userService = userService;
    }
    async getMessages() {
        let messages = await this.$firebaseArray(this.$database.ref('chat')).$loaded();
        return messages;
    }
    async sendMessage(message) {
        let messages = await this.$firebaseArray(this.$database.ref('chat'));
        return messages.$add(message);
    }
    static instance(...args) {
        return new ChatService(...args);
    }

    async getChatrooms(){
      let chatrooms = await this.$firebaseArray(this.$database.ref('chatroom')).$loaded();
      return chatrooms;
    }
    async createChatroom(chatroom){
      let chatrooms = await this.$firebaseArray(this.$database.ref('chatroom'));
      return chatrooms.$add(chatroom);
    }
}

ChatService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'UserService'];
