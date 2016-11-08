import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';
import pagination from 'angular-utils-pagination';
import 'ng-tags-input';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import auth from '../common/auth';
import UserDetailCtrl from './controllers/userDetail';
import UserListCtrl from './controllers/userList';
import UserEditCtrl from './controllers/userEdit';
import UserService from './factories/UserService';

export default angular.module('user', [uirouter, angularfire, firebase, pagination, alert, auth, 'ngTagsInput'])
    .config(routes)
    .controller('UserDetailCtrl', UserDetailCtrl)
    .controller('UserListCtrl', UserListCtrl)
    .controller('UserEditCtrl', UserEditCtrl)
    .factory('UserService', UserService.instance)
    .name;
