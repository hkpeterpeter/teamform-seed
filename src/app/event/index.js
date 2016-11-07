import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularfire from 'angularfire';
import pagination from 'angular-utils-pagination';

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

export default angular.module('event', [uirouter, angularfire, firebase, pagination, user, alert, auth])
    .config(routes)
    .controller('EventDetailCtrl', EventDetailCtrl)
    .controller('EventListCtrl', EventListCtrl)
    .controller('EventCreateCtrl', EventCreateCtrl)
    .controller('EventEditCtrl', EventEditCtrl)
    .factory('EventService', EventService.instance)
    .name;
