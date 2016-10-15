import angular from 'angular';
import breadcrumb from 'angular-breadcrumb';

import Menu from './directives/menu';

export default angular.module('common.menu', ['ncy-angular-breadcrumb'])
    .directive('uiMenu', () => new Menu())
    .name;
