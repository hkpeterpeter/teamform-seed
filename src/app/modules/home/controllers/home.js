export default class HomeCtrl {
    constructor($location) {
        this.$location = $location;
        this.title = 'WebPack Angular ES6';
        this.description = 'This blog example is a quick exercise to illustrate how the Angular work with Webpack in ES6.';
    }
}

HomeCtrl.$inject = ['$location'];
