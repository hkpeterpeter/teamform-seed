
describe('TestEvent', function() {
   
   var $scope, $rootScope, $controller;

   beforeEach(module('mainApp'));

   beforeEach(inject(function(_$rootScope_, _$controller_){
   		$rootScope = _$rootScope_;
   		$controller=_$controller_;
   }));

  	it('test_IsVisibleCOMP3111', function(){
        $scope=$rootScope.$new();
   		$controller("EventController",
           {$scope: $scope ,
            $routeParams: {p: 'COMP3111'}  
             });
      expect($scope.IsVisibleCOMP3111).toEqual(true);
    });
	it('test_IsVisibleCOMP3511', function(){
        $scope=$rootScope.$new();
   		$controller("EventController",
           {$scope: $scope ,
            $routeParams: {p: 'COMP3511'}  
             });
      expect($scope.IsVisibleCOMP3511).toEqual(true);
    });
	it('test_IsVisibleCOMP2012', function(){
        $scope=$rootScope.$new();
   		$controller("EventController",
           {$scope: $scope ,
            $routeParams: {p: 'COMP2012'}  
             });
      expect($scope.IsVisibleCOMP2012).toEqual(true);
    });


}); 