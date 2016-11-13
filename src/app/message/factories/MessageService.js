export default class MessageService {
    constructor($firebaseArray, $firebaseObject, $database, authService, userService) {
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
    }
    async getConversations(id) {
        let messagesSent = await this.$firebaseArray(this.$database.ref('messages').orderByChild('receiver').equalTo(id)).$loaded();
        let messagesRecv = await this.$firebaseArray(this.$database.ref('messages').orderByChild('sender').equalTo(id)).$loaded();
        let messages = [...messagesSent, ...messagesRecv];
        let conversations = [];
        let init = async() => {
            messages = await Promise.all(messages.map(async(message) => {
                return await this.getMessage(message.$id);
            }));
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
        message.sender = await this.userService.getUser(message.sender);
        message.receiver = await this.userService.getUser(message.receiver);
        return Promise.resolve(message);
    }
    async getMessages(id) {
        let messages = await this.$firebaseArray(this.$database.ref('messages').orderByChild('receiver').equalTo(id)).$loaded();
        let init = async() => {
            messages = await Promise.all(messages.map(async(message) => {
                return await this.getMessage(message.$id);
            }));
            messages = messages.reduce((newMessages, message) => {
                for (let newMessage of newMessages) {
                    if (newMessage.sender.$id == message.sender.$id) {
                        newMessage.contents.push(newMessage.content);
                        return newMessages;
                    }
                }
                message.contents = [message.content];
                message.content = null;
                newMessages.push(message);
                return newMessages;
            }, []);
            return Promise.resolve();
        };
        await init();
        messages.$$updated = await init;
        return Promise.resolve(messages);
    }
    static instance(...args) {
        return new MessageService(...args);
    }
}

MessageService.instance.$inject = ['$firebaseArray', '$firebaseObject', 'database', 'AuthService', 'UserService'];
