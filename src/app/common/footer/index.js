import angular from 'angular';

import Footer from './directives/footer';

export default angular.module('common.footer', [])
    .directive('uiFooter', () => new Footer())
    .name;
