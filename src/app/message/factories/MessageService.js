export default class MessageService {
    constructor($firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
    }
    async getConversations(id) {
        let conversations = [];
        let init = async() => {
            let messagesSent = await this.$firebaseArray(this.$database.ref('messages').orderByChild('sender').equalTo(id)).$loaded();
            let messagesRecv = await this.$firebaseArray(this.$database.ref('messages').orderByChild('receiver').equalTo(id)).$loaded();
            messagesSent.map((message) => {
                message.sent = true;
                return message;
            });
            messagesRecv.map((message) => {
                message.recv = true;
                return message;
            });
            let messages = [...messagesSent, ...messagesRecv];
            messages = await Promise.all(messages.map(async(message) => {
                let sent = message.sent;
                let recv = message.recv;
                message = await this.getMessage(message.$id);
                if(sent) {
                    message.sent = true;
                }
                if(recv) {
                    message.recv = true;
                    message.createAt++;
                }
                return message;
            }));
            messages = messages.sort((a, b) => {
                return a.createAt - b.createAt;
            });
            conversations = messages.reduce((newConversations, message) => {
                let conversationUser = message.sender;
                if(conversationUser.$id == id) {
                    conversationUser = message.receiver;
                }
                for (let newConversation of newConversations) {
                    if (newConversation.user.$id == conversationUser.$id) {
                        newConversation.messages.push(message);
                        return newConversations;
                    }
                }
                newConversations.push({user: conversationUser, messages: [message]});
                return newConversations;
            }, []);
            return Promise.resolve();
        };
        await init();
        return conversations;
    }
    async getMessage(id) {
        let message = await this.$firebaseObject(this.$database.ref('messages/' + id)).$loaded();
        if (message.$value === null) {
            return Promise.reject(new Error('Message not exist'));
        }
        let init = async () => {
            message.sender = await this.userService.getUser(message.sender);
            message.receiver = await this.userService.getUser(message.receiver);
        };
        await init();
        message.$$updated = await init;
        return Promise.resolve(message);
    }
    async sendMessage(sender, receiver, content) {
        let messages = await this.$firebaseArray(this.$database.ref('messages')).$loaded();
        return messages.$add({sender: sender, receiver: receiver, content: content, createAt: Date.now()});
    }
    static instance(...args) {
        return new MessageService(...args);
    }
}

MessageService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
