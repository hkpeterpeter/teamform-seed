app.controller("ConversationController",function($scope,$routeParams){
        //   $scope.param = $routeParams.p;
            $scope.IsVisiblePeter = false;
            $scope.IsVisibleJason = false;
            $scope.IsVisibleKevin = false;
  //          $scope.show=function(a){
        //       $scope.IsVisibleCOMP3111 = angular.equals($scope.param, a);
      //      }
         $scope.IsVisiblePeter = angular.equals($routeParams.p, 'Peter');
          $scope.IsVisibleJason = angular.equals($routeParams.p, 'Jason');
          $scope.IsVisibleKevin = angular.equals($routeParams.p, 'Kevin');


});
