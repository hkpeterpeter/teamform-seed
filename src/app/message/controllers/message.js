import style from '../../../assets/stylesheets/message.scss';
export default class MessageCtrl {
    constructor($location, $state, $timeout, authService, messageService) {
        this.$location = $location;
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
        this.messageService = messageService;
        this.messages = [];
        this.conversation = [];
        this.conversations = [];
        this.style = style;
        this.error = null;
        this.getConversations();
    }
    getConversation(id) {
        for (let conversation of this.conversations) {
            if(conversation.user.$id == id) {
                this.conversation = conversation;
                return;
            }
        }
    }
    async getConversations() {
        let user = this.authService.getUser();
        if (user) {
            try {
                let conversations = await this.messageService.getConversations(user.uid);
                console.log(conversations);
                this.$timeout(() => {
                    this.conversations = conversations;
                });
            } catch (error) {
                this.$timeout(() => {
                    this.error = error;
                });
            }
        }
    }
}

MessageCtrl.$inject = ['$location', '$state', '$timeout', 'AuthService', 'MessageService'];
