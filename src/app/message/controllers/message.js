import style from '../../../assets/stylesheets/message.scss';
export default class MessageCtrl {
    constructor($location, $scope, $state, $timeout, authService, messageService) {
        this.$location = $location;
        this.$scope = $scope;
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
        this.messageService = messageService;
        this.messages = [];
        this.conversation = null;
        this.conversations = [];
        this.style = style;
        this.error = null;
        this.messageContent = '';
        this.updateMessages();
        this.$scope.$on('messageChanged', () => {
            this.updateMessages();
        });
    }
    async updateMessages() {
        try {
            let messages = await this.messageService.getMessages();
            let user = await this.authService.getUser();
            let messagesSent = messages.getSent(user.uid);
            let messagesRecv = messages.getRecv(user.uid);
            messagesSent.map((message) => {
                message.sent = true;
                return message;
            });
            messagesRecv.map((message) => {
                message.recv = true;
                return message;
            });
            let allMessage = [
                ...messagesSent,
                ...messagesRecv
            ];
            allMessage = allMessage.sort((a, b) => {
                return (a.data.createAt - b.data.createAt);
                // return (a.data.createAt + (a.recv || 0)) - (b.data.createAt + (b.recv || 0));
            });
            let conversations = await allMessage.reduce(async(newConversations, message) => {
                newConversations = await newConversations;
                let conversationUser = await message.getSender();
                if (conversationUser.$id == user.uid) {
                    conversationUser = await message.getReceiver();
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
            this.$timeout(() => {
                this.conversations = conversations;
                if(this.conversation) {
                    this.getConversation(this.conversation.user.$id);
                }
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    getConversation(id) {
        for (let conversation of this.conversations) {
            if (conversation.user.$id == id) {
                this.$timeout(() => {
                    this.conversation = conversation;
                });
                return;
            }
        }
    }
    async sendMessage() {
        let user = await this.authService.getUser();
        if (user) {
            try {
                let result = await this.messageService.sendMessage(user.uid, this.conversation.user.$id, this.messageContent);
                this.$timeout(() => {
                    this.messageContent = '';
                });
            } catch (error) {
                this.$timeout(() => {
                    this.error = error;
                });
            }
        }
    }
}

MessageCtrl.$inject = [
    '$location',
    '$scope',
    '$state',
    '$timeout',
    'AuthService',
    'MessageService'
];
