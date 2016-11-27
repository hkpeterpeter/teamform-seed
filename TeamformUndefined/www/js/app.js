angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'starter.services'])

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "feb79a5c"
    }
  });
})

.run(function($ionicPlatform) {
 // ...
})