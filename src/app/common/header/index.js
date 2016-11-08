import angular from 'angular';

import menu from '../menu';
import Header from './directives/header';

export default angular.module('common.header', [menu])
    .directive('uiHeader', Header.instance)
    .name;
