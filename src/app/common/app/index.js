import angular from 'angular';

import header from '../header';
import body from '../body';
import footer from '../footer';

import App from './directives/app';

export default angular.module('common.app', ['ncy-angular-breadcrumb', header, body, footer])
    .directive('app', App.instance)
    .name;
