import angular from 'angular';
import breadcrumb from 'angular-breadcrumb';

import menu from '../menu'
import Header from './directives/header';

export default angular.module('common.header', ['ncy-angular-breadcrumb', menu])
    .directive('uiHeader', Header.instance)
    .name;
