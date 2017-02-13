import angular from 'angular';

import header from '../header';
import menu from '../menu';
import body from '../body';
import footer from '../footer';

import App from './directives/app';

export default angular.module('common.app', [header, menu, body, footer])
    .directive('app', App.instance)
    .name;
