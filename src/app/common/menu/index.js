import angular from 'angular';
import breadcrumb from 'angular-breadcrumb';

import user from '../user';
import Menu from './directives/menu';

export default angular.module('common.menu', ['ncy-angular-breadcrumb', user])
    .directive('uiMenu', Menu.instance)
    .name;
