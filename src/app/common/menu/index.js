import angular from 'angular';

import auth from '../auth';
import Menu from './directives/menu';

export default angular.module('common.menu', [auth])
    .directive('uiMenu', Menu.instance)
    .name;
