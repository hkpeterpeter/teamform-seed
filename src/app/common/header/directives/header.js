export default class Header {
    constructor($state) {
        this.template = require('../views/header.html');
        this.restrict = 'E';
        this.scope = {};
    }

    link(scope, element, attributes, controller) {

    }

    static instance(...args) {
        return new Header(...args);
    }
}
Header.instance.$inject = []
