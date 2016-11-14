import angular from 'angular';
import 'angular-breadcrumb';

import Body from './directives/body';

export default angular.module('common.body', ['ncy-angular-breadcrumb'])
    .directive('uiBody', Body.instance)
    .name;
