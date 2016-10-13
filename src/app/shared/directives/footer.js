export default class Footer {
    constructor() {
        this.template = require('../views/footer.html');
        this.restrict = 'E';
        this.scope = {};
    }

    compile(tElement) {
        return this.link.bind(this);
    }

    link(scope, element, attributes) {

    }
}
