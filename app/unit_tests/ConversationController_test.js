
describe('TestConversation', function() {
   
   var $scope, $rootScope, $controller;

   beforeEach(module('mainApp'));

   beforeEach(inject(function(_$rootScope_, _$controller_){
   		$rootScope = _$rootScope_;
   		$controller=_$controller_;
   }));

  	it('test_IsVisiblePeter', function(){
        $scope=$rootScope.$new();
   		$controller("ConversationController",
           {$scope: $scope ,
            $routeParams: {p: 'Peter'}  
             });
      expect($scope.IsVisiblePeter).toEqual(true);
    });
	it('test_IsVisibleJason', function(){
        $scope=$rootScope.$new();
   		$controller("ConversationController",
           {$scope: $scope ,
            $routeParams: {p: 'Jason'}  
             });
      expect($scope.IsVisibleJason).toEqual(true);
    });
	it('test_IsVisibleKevin', function(){
        $scope=$rootScope.$new();
   		$controller("ConversationController",
           {$scope: $scope ,
            $routeParams: {p: 'Kevin'}  
             });
      expect($scope.IsVisibleKevin).toEqual(true);
    });


}); 