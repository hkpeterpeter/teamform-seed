import angular from 'angular';
import angularfire from 'angularfire';
import uirouter from 'angular-ui-router';

import firebase from '../firebase';
import user from '../user';
import Menu from './directives/menu';

export default angular.module('common.menu', [angularfire, uirouter, firebase, user])
    .directive('uiMenu', Menu.instance)
    .name;
