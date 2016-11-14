export default class Footer {
    constructor() {
        this.template = require('../views/footer.html');
        this.restrict = 'E';
        this.scope = {};
    }

    link(scope, element, attributes) {

    }

    static instance(...args) {
        return new Footer(...args);
    }
}
Footer.instance.$inject = [];
