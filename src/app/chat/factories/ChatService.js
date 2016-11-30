import ChatMessage from './ChatMessage.js';
export default class ChatService {
    constructor($injector, $firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$injector = $injector;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.messages = null;
    }
    async getMessages() {
        if (!this.messages) {
            let chatFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new ChatMessage(snap, this.$injector);
                },
                $$updated: function(snap) {
                    return this.$getRecord(snap.key).update(snap);
                }
            });
            let messages = await chatFirebaseArray(this.$database.ref('chat')).$loaded();
            this.messages = messages;
        }
        return this.messages;
    }
    async sendMessage(message) {
        let user = await this.authService.getUser();
        message.createdBy = user.uid;
        message.createdAt = Date.now();
        let messages = await this.getMessages();
        return messages.$add(message);
    }
    async getChatrooms() {
        let chatrooms = await this.$firebaseArray(this.$database.ref('chatroom')).$loaded();
        return chatrooms;
    }
    async createChatroom(chatroom) {
        let chatrooms = await this.$firebaseArray(this.$database.ref('chatroom'));
        return chatrooms.$add(chatroom);
    }
    static instance(...args) {
        if (!ChatService.Instance) {
            ChatService.Instance = new ChatService(...args);
        }
        return ChatService.Instance;
    }
}
ChatService.Instance = null;
ChatService.instance.$inject = ['$injector', '$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
