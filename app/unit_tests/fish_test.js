describe('fishCtrl',function(){
	beforeEach(module('teamapp','firebase'));
	var $scope, $firebaseArray, $firebaseObject, createController, $q, defered;
	initFirebase();

	beforeEach(inject(function($rootScope, $controller, _$rootScope_, _$firebaseArray_, _$firebaseObject_, _$q_){
		$firebaseArray = _$firebaseArray_;
		$firebaseObject = _$firebaseObject_;

		$q = _$q_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		deferred = _$q_.defer();

	//spyOn($scope.allData.$loaded(), 'teamapp').and.returnValue(deferred.promise);

		createController = function() {
			return $controller('fishCtrl', {
				'$rootScope': $rootScope,
				'$scope': $scope
			});

		};
		$rootScope.currentUser = {id:0};
		

	}));

	it('const test', function(){
		var controller = createController();
		expect($scope.currentEvent).toBe(0);
	});
	it('show body', function(){
		var controller = createController();
		$scope.clickCount=0;
		$scope.showBody("a");
		expect($scope.clickCount).toBe(1);
	});
	it('init show body', function(){
		var controller = createController();
		$scope.clickCount=0;
		$scope.initShowBody("a");
		expect($scope.clickCount).toBe(0);
		$scope.clickCount=1;
		$scope.initShowBody("a");
		expect($scope.clickCount).toBe(1);
	});
	it('allData promise', function(){
		
		var controller = createController();


	});



});