describe('Test login.js', function () {

   describe('LoginCtrl', function () {

    beforeEach(module('teamform'));

    var $rootScope, $state, $injector, $controller;

    beforeEach(inject(function(_$rootScope_, _$state_, _$injector_, _$controller_){
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
	    $controller = _$controller_;
	    spyOn($state, 'go');
        }));
    
    describe('$scope.goToAdmin', function() {
    	it('goes to admin page', function () {      
		var $scope = {};
		var controller= $controller('LoginCtrl',{$scope: $scope});
		$scope.goToAdmin();
        	expect($state.go).toHaveBeenCalledWith("admin", {event: $scope.event});
    	});
    
    });

    describe('$scope.goToTeam', function() {
    	it('goes to team page', function () {      
		var $scope = {};
		var controller= $controller('LoginCtrl',{$scope: $scope});
		$scope.goToTeam();
        	expect($state.go).toHaveBeenCalledWith("team", {event: $scope.event});
    	});
    
    });	

    describe('$scope.goToMember', function() {
    	it('goes to member page', function () {      
		var $scope = {};
		var controller= $controller('LoginCtrl',{$scope: $scope});
		$scope.goToMember();
        	expect($state.go).toHaveBeenCalledWith("member", {event: $scope.event});
    	});
    
    });	

    }); 
});
