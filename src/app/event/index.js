import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';
import pagination from 'angular-utils-pagination';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import timepicker from 'angular-ui-bootstrap/src/timepicker';
import 'bootstrap-ui-datetime-picker';
import { ngTable } from 'ng-table';
import fileUpload from 'ng-file-upload';
import nestable from 'nestable';

import routes from './config/routes';
import alert from '../common/alert';
import firebase from '../common/firebase';
import auth from '../common/auth';
import user from '../user';

import EventDetailCtrl from './controllers/eventDetail';
import EventListCtrl from './controllers/eventList';
import EventCreateCtrl from './controllers/eventCreate';
import EventEditCtrl from './controllers/eventEdit';
import EventService from './factories/EventService';

export default angular.module('event', [uirouter, angularfire, firebase, pagination, user, alert, datepicker, datepickerPopup, timepicker, 'ui.bootstrap.datetimepicker', ngTable.name, fileUpload, auth])
    .config(routes)
    .controller('EventDetailCtrl', EventDetailCtrl)
    .controller('EventListCtrl', EventListCtrl)
    .controller('EventCreateCtrl', EventCreateCtrl)
    .controller('EventEditCtrl', EventEditCtrl)
    .factory('EventService', EventService.instance)
    .name;
