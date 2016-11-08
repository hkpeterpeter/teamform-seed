import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';
import pagination from 'angular-utils-pagination';
import uiselect from 'ui-select';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import auth from '../common/auth';
import user from '../user';
import event from '../event';

import TeamDetailCtrl from './controllers/teamDetail';
import TeamListCtrl from './controllers/teamList';
import TeamCreateCtrl from './controllers/teamCreate';
import TeamEditCtrl from './controllers/teamEdit';
import TeamService from './factories/TeamService';

export default angular.module('team', [uirouter, angularfire, firebase, pagination, uiselect, user, event, alert, auth])
    .config(routes)
    .controller('TeamDetailCtrl', TeamDetailCtrl)
    .controller('TeamListCtrl', TeamListCtrl)
    .controller('TeamCreateCtrl', TeamCreateCtrl)
    .controller('TeamEditCtrl', TeamEditCtrl)
    .factory('TeamService', TeamService.instance)
    .name;
