describe('admin request filter', function() {
	beforeEach(module('teamapp', 'firebase'));
  var $filter;

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
    
  }));

  var items = {item1: {eventID: '0', $id: '1'}, 
  						item2: {eventID: '1', $id: '0'}, 
  						item3: {eventID: '0'}};

  it('returns empty list when given null', function() {
  	var requestFilter = $filter('adminRequest');
    expect(requestFilter(null)).toEqual([]);
  });
  it('returns list of items belonging to current event', function() {
  	var requestFilter = $filter('adminRequest');
  	expect(requestFilter(items)).toEqual([{eventID: '0', $id: '1'}, {eventID: '0'}]);
  });
});


describe('admin_ctrl', function() {
	beforeEach(module('teamapp', 'firebase'));
	var $controller, scope, $firebaseArray, $firebaseObject;
	var ctrl;

  beforeEach(inject(function(_$rootScope_, _$controller_, _$firebaseArray_){

    	//scope = _$rootScope_.$new();
    	$controller = _$controller_;
    	$firebaseArray = _$firebaseArray_;
    	scope = _$rootScope_.$new();
    	//$firebaseObject = _$firebaseObject_;
    	//compile = _$compile_;
		
		// $scope.model = {todoText: null};
		
		// form = $scope.form;
    	
  }));	
  
  beforeEach(function() {
  	ctrl = $controller('admin_ctrl', { scope: scope });
  });
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('admin basic control', function() {
  		it('should have defined event', function() {
  				expect(ctrl.event).toBeDefined();
			});
  		it('should have defined event2', function() {
  				expect(ctrl.size).toBeDefined();
			});


   });


});