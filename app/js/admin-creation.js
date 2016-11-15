angular.module('teamform')
    .controller('AdminCreationCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state',
        function($scope, $firebaseObject, $firebaseArray, $stateParams, $state) {

            // Initialize $scope.param as an empty JSON object
            $scope.param = {};

            $scope.param.$loaded()
                .then( function(data) {

                    // Fill in some initial values when the DB entry doesn't exist
                    if(typeof $scope.param.maxTeamSize == "undefined"){
                        $scope.param.maxTeamSize = 10;
                    }
                    if(typeof $scope.param.minTeamSize == "undefined"){
                        $scope.param.minTeamSize = 1;
                    }

                    // Enable the UI when the data is successfully loaded and synchornized
                    $('#admin_creation_controller').show();
                })
                .catch(function(error) {
                    // Database connection error handling...
                    //console.error("Error:", error);
                });

            $scope.changeMinTeamSize = function(delta) {
                var newVal = $scope.param.minTeamSize + delta;
                if (newVal >=1 && newVal <= $scope.param.maxTeamSize ) {
                    $scope.param.minTeamSize = newVal;
                }
                $scope.param.$save();
            };

            $scope.changeMaxTeamSize = function(delta) {
                var newVal = $scope.param.maxTeamSize + delta;
                if (newVal >=1 && newVal >= $scope.param.minTeamSize ) {
                    $scope.param.maxTeamSize = newVal;
                }
                $scope.param.$save();
            };

        }]);