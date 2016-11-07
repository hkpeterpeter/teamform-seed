'use restrict';

describe('chatroomCtrl', function(){
	
	beforeEach(module('chatroomApp', 'firebase'));
	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	it("check input", function(){
		var $scope = {};
		var controller = $controller('chatroomCrtl', {$scope: $scope});
		var dummy = 1;
		expect(dummy).toEqual(1);

	});

});