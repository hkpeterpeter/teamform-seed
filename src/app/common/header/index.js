import angular from 'angular';

import menu from '../menu';
import message from '../../message';
import Header from './directives/header';

export default angular.module('common.header', [menu, message])
    .directive('uiHeader', Header.instance)
    .name;
