import Message from './Message.js';
export default class MessageService {
    constructor($rootScope, $firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$rootScope = $rootScope;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.messages = null;
    }
    async getMessages() {
        if (!this.messages) {
            let messageFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new Message(snap, this.$firebaseArray, this.$firebaseObject, this.$database, this.userService);
                },
                $$updated: function(snap) {
                    return this.$getRecord(snap.key).update(snap);
                },
                getSent: function(id) {
                    return this.$list.filter((message) => {
                        return message.data.sender == id;
                    });
                },
                getRecv: function(id) {
                    return this.$list.filter((message) => {
                        return message.data.receiver == id;
                    });
                },
            });
            let messages = await messageFirebaseArray(this.$database.ref('messages')).$loaded();
            messages.$watch(() => {
                this.$rootScope.$broadcast('messageChanged');
            });
            this.messages = messages;
        }
        return this.messages;
    }
    async sendMessage(sender, receiver, content) {
        let messages = await this.getMessages();
        return messages.$add({sender: sender, receiver: receiver, content: content, createAt: Date.now()});
    }
    static instance(...args) {
        if (!MessageService.Instance) {
            MessageService.Instance = new MessageService(...args);
        }
        return MessageService.Instance;
    }
}
MessageService.Instance = null;
MessageService.instance.$inject = ['$rootScope', '$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
