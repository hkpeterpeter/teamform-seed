export default class Header {
    constructor($state, $timeout, authService, messageService, userService) {
        this.template = require('../views/header.html');
        this.restrict = 'E';
        this.scope = {};
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
        this.messageService = messageService;
        this.userService = userService;
    }

    toggleSidebar() {
        $('#page-wrapper').toggleClass('nav-small');
    }

    link(scope, element, attributes, controller) {
        scope.toggleSidebar = this.toggleSidebar;
        scope.messages = [];
        scope.$on('authChanged', () => {
            this.updateAuth(scope);
        });
        scope.$on('messageChanged', () => {
            this.updateMessages(scope);
        });
    }

    async updateAuth(scope) {
        let user = await this.authService.getUser();
        let detail;
        if(user) {
            detail = await this.userService.getUser(user.uid);
        }
        this.$timeout(() => {
            scope.user = user;
            if(user) {
                scope.user.user = detail;
            }
            this.updateMessages(scope);
            scope.isAuth = scope.user != null;
        });
    }

    async updateMessages(scope) {
        if(scope.user) {
            let messages = await this.messageService.getMessages();
            let myMessages = await messages.getRecv(scope.user.uid).reduce(async (messages, message) => {
                messages = await messages;
                let user = await message.getSender();
                messages.push({user: user, content: message.data.content, createdAt: message.data.createAt});
                return messages;
            }, []);
            this.$timeout(() => {
                scope.messages = myMessages;
            });
        }
    }

    static instance(...args) {
        return new Header(...args);
    }
}
Header.instance.$inject = ['$state', '$timeout', 'AuthService', 'MessageService', 'UserService'];
