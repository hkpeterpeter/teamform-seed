export default class Alert {
    constructor() {
        this.template = require('../views/alert.html');
        this.restrict = 'E';
        this.scope = {message: '@'};
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, element, attributes) {

    }
}
