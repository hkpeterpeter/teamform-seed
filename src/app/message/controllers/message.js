import style from '../../../assets/stylesheets/message.scss';
export default class MessageCtrl {
    constructor($location, $scope, $state, $stateParams, $timeout, authService, messageService, userService) {
        this.$location = $location;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.authService = authService;
        this.messageService = messageService;
        this.userService = userService;
        this.messages = [];
        this.conversation = null;
        this.conversations = [];
        this.style = style;
        this.error = null;
        this.messageContent = '';
        this.users = [];
        this.selectedUser = '';
        this.user = null;
        this.updateMessages();
        this.$scope.$on('messageChanged', () => {
            this.updateMessages();
        });
        this.getUser();
        this.getUsers();
    }
    onSelectUser($item, $model) {
        this.getConversation($item.$id);
        this.$timeout(() => {
            this.selectedUser = '';
        });
    }
    async getUser() {
        try {
            let user = await this.authService.getUser();
            let detail = await this.userService.getUser(user.uid);
            this.$timeout(() => {
                this.user = detail;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async getUsers() {
        try {
            let users = await this.userService.getUsers();
            this.$timeout(() => {
                this.users = users;
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
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
                let conversationUser;
                if(message.sent === true) {
                    conversationUser = await message.getReceiver();
                } else {
                    conversationUser = await message.getSender();
                }
                for (let newConversation of newConversations) {
                    if (newConversation.user.$id == conversationUser.$id) {
                        if(message.sent && message.recv && newConversation.messages[newConversation.messages.length-1].$id == message.$id) {
                            return newConversations;
                        }
                        newConversation.messages.push(message);
                        return newConversations;
                    }
                }
                newConversations.push({user: conversationUser, messages: [message]});
                return newConversations;
            }, []);
            this.$timeout(() => {
                this.conversations = conversations;
                if (this.conversation) {
                    this.getConversation(this.conversation.user.$id);
                } else if(this.$stateParams.conversationId) {
                    this.getConversation(this.$stateParams.conversationId);
                }
            });
        } catch (error) {
            this.$timeout(() => {
                this.error = error;
            });
        }
    }
    async getConversation(id) {
        for (let conversation of this.conversations) {
            if (conversation.user.$id == id) {
                this.$timeout(() => {
                    this.conversation = conversation;
                });
                return;
            }
        }
        let user = await this.userService.getUser(id);
        this.$timeout(() => {
            this.conversation = {user: user, messages: []};
        });
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
    '$stateParams',
    '$timeout',
    'AuthService',
    'MessageService',
    'UserService'
];
