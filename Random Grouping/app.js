var app = angular.module('app', []);

app.filter('randomSample', function() {
           return function(array, length) {
           var copy = angular.copy(array);
           var sample = [];
           while(sample.length < length) {
           var randomIndex = Math.floor(Math.random() * (copy.length));
           sample.push(copy[randomIndex]);
           }
           return sample;
           };
           });

app.controller('Ctrl', function($scope, $interval) {
               $scope.array = [];
               for(var i = 0; i < 10; i++) {
               $scope.array.push(i);
               }
               
               $interval(function() {
                         
                         }, 1000);
               });