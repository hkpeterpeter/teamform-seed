export default class Menu {
    constructor($state, $timeout, authService) {
        this.template = require('../views/menu.html');
        this.restrict = 'E';
        this.scope = {};
        this.$state = $state;
        this.$timeout = $timeout;
        this.authService = authService;
    }

    link(scope, element, attributes, controller) {
        scope.$state = this.$state;
        this.updateAuth(scope);
        scope.$on('authChanged', () => {
            this.updateAuth(scope);
        });
    }

    async updateAuth(scope) {
        let user = await this.authService.getUser();
        this.$timeout(() => {
            scope.user = user;
            scope.isAuth = scope.user != null;
        });
    }

    static instance(...args) {
        return new Menu(...args);
    }
}
Menu.instance.$inject = ['$state', '$timeout', 'AuthService'];
