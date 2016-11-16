initFirebase();

describe('homeController', function() {

	beforeEach(module('teamapp','firebase'));
	var btn;
	beforeEach( function() {
		btn = $(".cd-switcher").eq(0);
	});

	var $scope, $firebaseArray, $firebaseObject, createController, $q, defered;
	//initFirebase();

	beforeEach(inject(function($rootScope, $controller, _$rootScope_, _$firebaseArray_, _$firebaseObject_, _$q_){
		$firebaseArray = _$firebaseArray_;
		$firebaseObject = _$firebaseObject_;

		$q = _$q_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		deferred = _$q_.defer();

		createController = function() {
			return $controller('homeController', {
				'$rootScope': $rootScope,
				'$scope': $scope
			});

		};
		$rootScope.currentUser = {id:0};

	}));


	it('login()', function() {
		var controller = createController();
		$scope.login();
		$scope.login('google');
		$scope.login('facebook');
	});

	it('login_selected', function() {
		var controller = createController();
		$scope.login_selected();

	});

	it('signup_selected', function() {
		var controller = createController();
		$scope.signup_selected();
	});

	it('switcher', function() {
		var controller = createController();
		// $scope.switcher(null);
		btn.click();
	})
});

// describe('Unit testing simpleField', function() {
// 	var $compile,
// 	$rootScope;

//   // Load the myApp module, which contains the directive
//   beforeEach(module('teamapp'));

//   // Store references to $rootScope and $compile
//   // so they are available to all tests in this describe block
//   beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $compile = _$compile_;
//     $rootScope = _$rootScope_;
//     $templateCache.put('WU_YUNCHEN/component/simple_field.html', '<div class="input-field">\
//     	<input id={{idOfField}} type="text" class="validate" ng-model="fieldModel">\
//     	<label for={{idOfField}}>{{label}}</label>\
//     	</div>\
//     	<br>');
// }));

//   it('Replaces the element with the appropriate content', function() {
//     // Compile a piece of HTML containing the directive
//     var element = $compile("<simple-field id-of-field=\"team_name\" label=\"Team name\" field-model=\"teamName\"></simple-field>")($rootScope);
//     // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
//     $rootScope.$digest();
//     // Check that the compiled element contains the templated content
//     expect(element.html()).toContain("Team name");
// });

// });