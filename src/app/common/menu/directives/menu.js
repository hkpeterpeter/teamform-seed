export default class Menu {
    constructor($state, userService) {
        this.template = require('../views/menu.html');
        this.restrict = 'E';
        this.scope = {};
        this.$state = $state;
        this.userService = userService;
    }

    link(scope, element, attributes, controller) {
        scope.$state = this.$state;
        this.userService.checkAuth().then(() => {
            scope.isAuth = true;
        }).catch(() => {
            scope.isAuth = false;
        });
    }

    static instance(...args) {
        return new Menu(...args);
    }
}
Menu.instance.$inject = ['$state', 'UserService']
