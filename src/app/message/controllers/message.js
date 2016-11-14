import style from '../../../assets/stylesheets/message.scss';
export default class MessageCtrl {
    constructor($location, $state, $timeout, authService, messageService) {
        this.$location = $location;
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
        this.getConversations();
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
    async getConversations() {
        let user = this.authService.getUser();
        if (user) {
            try {
                let conversations = await this.messageService.getConversations(user.uid);
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
    }
    async sendMessage() {
        let user = this.authService.getUser();
        if (user) {
            try {
                let result = await this.messageService.sendMessage(user.uid, this.conversation.user.$id, this.messageContent);
                this.$timeout(() => {
                    this.messageContent = '';
                });
                await this.getConversations();
            } catch (error) {
                this.$timeout(() => {
                    this.error = error;
                });
            }
        }
    }
}

MessageCtrl.$inject = ['$location', '$state', '$timeout', 'AuthService', 'MessageService'];
