export default class Header {
    constructor() {
        this.template = require('../views/header.html');
        this.restrict = 'E';
        this.scope = {};
    }

    link(scope, element, attributes) {

    }

    static instance(...args) {
        return new Header(...args);
    }
}
Header.instance.$inject = [];
