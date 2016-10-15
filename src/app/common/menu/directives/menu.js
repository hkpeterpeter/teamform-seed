export default class Menu {
    constructor() {
        this.template = require('../views/menu.html');
        this.restrict = 'E';
        this.scope = {};
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, element, attributes, controller) {

    }
}
