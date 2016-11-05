import angular from 'angular';
import angularfire from 'angularfire';
import uirouter from 'angular-ui-router';

import firebase from '../firebase';
import auth from '../auth';
import Menu from './directives/menu';

export default angular.module('common.menu', [angularfire, uirouter, auth, firebase])
    .directive('uiMenu', Menu.instance)
    .name;
