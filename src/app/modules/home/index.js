import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';

import routes from './config/routes';
import Menu from '../../shared/directives/menu';
import Footer from '../../shared/directives/footer';
import HomeCtrl from './controllers/home';
import HomeView from './views/home.html';

export default angular.module('home', [uirouter, angularfire])
    .config(routes)
    .controller('HomeCtrl', HomeCtrl)
    .directive('uiMenu', () => new Menu())
    .directive('uiFooter', () => new Footer())
    .name;
