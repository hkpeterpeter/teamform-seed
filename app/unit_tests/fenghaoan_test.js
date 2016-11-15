describe('homeController', function() {

	beforeEach(module('teamapp'));

	var $controller, $rootScope;

	beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
	}));

	describe('$scope.receiveNewSikll', function() {
		it('receive not existing skill', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('homeController', { $scope: $scope });
			expect(controller).toBeDefined();
		});
	});

	describe('$scope.login', function() {
		it('login through OAthen', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('homeController', { $scope: $scope });
			
			var firebaseConfig = {
				apiKey: "some-api-key",
				authDomain: "some-app.firebaseapp.com",
				databaseURL: "https://some-app.firebaseio.com",
				storageBucket: "some-app.appspot.com",
			};


			$scope.loginStatus = false;
			// $scope.login('google');
			$scope.login('');
			expect($scope.loginStatus).toEqual(false);
			
			$scope.login('google');
		});
	});
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