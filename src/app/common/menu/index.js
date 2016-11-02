import angular from 'angular';
import angularfire from 'angularfire';

import firebase from '../firebase';
import user from '../user';
import Menu from './directives/menu';

export default angular.module('common.menu', ['ncy-angular-breadcrumb', angularfire, firebase, user])
    .directive('uiMenu', Menu.instance)
    .name;
