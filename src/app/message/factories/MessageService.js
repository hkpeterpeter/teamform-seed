import Message from './Message.js';
export default class MessageService {
    constructor($rootScope, $injector, $firebaseArray, $firebaseObject, $state, $database, authService, userService, notificationService) {
        this.$rootScope = $rootScope;
        this.$injector = $injector;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.$state = $state;
        this.$database = $database;
        this.authService = authService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.messages = null;
        this.getMessages();
    }
    async getMessages() {
        if (!this.messages) {
            let messageFirebaseArray = this.$firebaseArray.$extend({
                $$added: async(snap) => {
                    return new Message(snap, this.$injector);
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
            messages.$watch(async (event) => {
                this.$rootScope.$broadcast('messageChanged');
                if(event.event == 'child_added') {
                    let user = await this.authService.getUser();
                    let message = messages.$getRecord(event.key);
                    if(user && user.uid == message.data.receiver && !message.notified) {
                        let sender = await message.getSender();
                        message.notified = true;
                        let onClick = (notification) => {
                            this.$state.go('message', {conversationId: sender.$id});
                            notification.close();
                        };
                        this.notificationService.create('New Message From ' + sender.data.name, message.data.content, onClick);
                    }
                }
            });
            this.messages = messages;
        }
        return this.messages;
    }
    async sendMessage(sender, receiver, content) {
        let messages = await this.getMessages();
        return messages.$add({sender: sender, receiver: receiver, content: content, createdAt: Date.now()});
    }
    static instance(...args) {
        if (!MessageService.Instance) {
            MessageService.Instance = new MessageService(...args);
        }
        return MessageService.Instance;
    }
}
MessageService.Instance = null;
MessageService.instance.$inject = ['$rootScope', '$injector', '$firebaseArray', '$firebaseObject', '$state', 'database', 'AuthService', 'UserService', 'NotificationService'];
