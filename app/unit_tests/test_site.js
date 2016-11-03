describe('Test site.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

   });
   


describe('teamform-admin-app', function() {

	var $controller, $scope;

	beforeEach(function(){
		module('teamform-admin-app', 'firebase');
			inject(function(_$rootScope_, _$controller_, _$firebaseObject_,_$firebaseArray_){
			myscope = _$rootScope_.$new();
			$firebaseObject = _$firebaseObject_;
			$firebaseArray = _$firebaseArray_;
			$controller = _$controller_;
		});
	});
	


	  it('change min size to 3', function() {
	  	var myscope = {};		
		var controller = $controller('AdminCtrl',{$scope:myscope});
		myscope.param = {};

		var refPath, ref, eventName;
		eventName = getURLParameter("test");
		refPath = eventName + "/admin/param";	
		ref = firebase.database().ref(refPath);
		myscope.param = $firebaseObject(http://comp3111-dcd88.firebaseio.com/test/admin/param);
		
		myscope.changeMinTeamSize(5);
	  	expect(myscope.param.minTeamSize).toBe(5);
	  });
	  
	  it('change max size to 10', function() {
	  	myscope = {};
		controller = $controller('AdminCtrl',{$scope:myscope});
		
		myscope.param = {};
		var refPath, ref, eventName;
		eventName = "test";
		refPath = eventName + "/admin/param";	
		ref = firebase.database().ref(refPath);
		
		myscope.param.$loaded().then
	  	myscope.changeMaxTeamSize(9);
	  	expect(myscope.param.maxTeamSize).toBe(9);
	  });
	  
	  
});   
   
});
