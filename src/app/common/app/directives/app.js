export default class App {
    constructor() {
        this.template = require('../views/app.html');
        this.restrict = 'E';
        this.scope = {};
    }

    link(scope, element, attributes) {

    }

    static instance(...args) {
        return new App(...args);
    }
}
App.instance.$inject = [];
