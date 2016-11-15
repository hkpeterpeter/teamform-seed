describe('Test login.js', function() {

   //
   // Example: A test case of getRandomIntInclusive
   //
	 var $controller;
	 beforeEach(function(){
      module('teamform-app');
      inject(
        function(_$controller_){
          $controller=_$controller_;
        }
      );
    });

   describe('Controller Test', function() {
		 var $scope ={};
		 var controller;
		 it('loginValidation test', function() {
			 // var $scope ={};
			 controller = $controller('LoginCtrl', { $scope: $scope });
			 $scope.username=null;
			 $scope.password=null;
			 expect($scope.loginValidation()).toEqual(false);

			 $scope.username="abc@dfe.com";
			 $scope.password="abcd1234";
			 expect($scope.loginValidation()).toEqual(true);
		 });
	//  });
	//  describe('Controller Test', function() {
	// 	var $scope ={};
	 //
		it('emailAccCreate test', function() {
			// var controller = $controller('LoginCtrl', { $scope: $scope });
			expect($scope.emailAccCreate()).toEqual(false);

			$scope.username="abc@dfe.com";
			$scope.password="abcd1234";
			$scope.firebaseUser=null;
			$scope.emailAccCreate();
			// expect($scope.firebaseUser).not.toBeNull();
		});
	// });
	// describe('Controller Test', function() {
	// 	var $scope ={};
		it('emailLogin test', function() {
	// var controller = $controller('LoginCtrl', { $scope: $scope });
			// expect($scope.emailLogin()).toEqual(false);

			// $scope.username="abc@dfe.com";
			// $scope.password="abcd1234";
			$scope.firebaseUser=null;
			$scope.emailLogin();
			// expect($scope.firebaseUser).not.toBeNull();
		});
	// });
	// describe('Controller Test', function() {
		// var $scope ={};
		it('emailLogin test', function() {
			// var controller = $controller('LoginCtrl', { $scope: $scope });
			$scope.fbLogin();
			// expect($scope.firebaseUser).not.toBeNull();
		});

	// });
	// describe('Controller Test', function() {
		// var $scope ={};
		it('signOut test', function() {
			// var controller = $controller('LoginCtrl', { $scope: $scope });
			$scope.signOut();
		});

	// });
	// describe('Controller Test', function() {
	// 	var $scope ={};
		it('getProfile test', function() {
			// var controller = $controller('LoginCtrl', { $scope: $scope });
			var profile = controller.getProfile('AuwFEgdGENUHSsf1vbAMSoRe0W33');
			expect(profile).not.toBeNull();
		});

	});
});
