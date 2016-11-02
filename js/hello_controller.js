
angular.module('HelloControllerApp', []).controller('HelloController', ['$scope',
function($scope) {

        $scope.username = "World";
        $scope.sayHello = function() {
                return 'Hello' + $scope.username + '!';
        };

        $scope.sayOddEven = function() {

            var n = $scope.username.length;
            if (n % 2 == 0)
                return "even";
            else
                return "odd";
        };
    }
]);
