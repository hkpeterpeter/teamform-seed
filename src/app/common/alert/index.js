import angular from 'angular';

import Alert from './directives/alert';

export default angular.module('common.alert', [])
    .directive('uiAlert', Alert.instance)
    .name;
