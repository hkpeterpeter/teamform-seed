export default class Body {
    constructor() {
        this.template = require('../views/body.html');
        this.restrict = 'E';
        this.scope = {};
    }

    link(scope, element, attributes) {

    }

    static instance(...args) {
        return new Body(...args);
    }
}
Body.instance.$inject = [];
