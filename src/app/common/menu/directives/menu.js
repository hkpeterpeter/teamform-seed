export default class Menu {
    constructor($state, authService) {
        this.template = require('../views/menu.html');
        this.restrict = 'E';
        this.scope = {};
        this.$state = $state;
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
        try {
            let user = await this.authService.checkAuth();
            scope.user = user;
            scope.isAuth = true;
        } catch (error) {
            scope.user = {};
            scope.isAuth = false;
        }
    }

    static instance(...args) {
        return new Menu(...args);
    }
}
Menu.instance.$inject = ['$state', 'AuthService'];
