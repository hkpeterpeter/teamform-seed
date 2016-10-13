import HomeController from '../../modules/home/controllers/home.js';

export default class Menu {
    constructor() {
        this.template = require('../views/menu.html');
        this.restrict = 'E';
        this.scope = {};
        this.controller = HomeController;
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, element, attributes, controller) {
        scope.isActive = function(viewLocation) {
            return viewLocation === controller.$location.path();
        };
    }
}
