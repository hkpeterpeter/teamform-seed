describe('Test login.js', function() {

   //
   // Example: A test case of getRandomIntInclusive
   //
	 var $controller,$firebaseAuth;
	 beforeEach(function(){
      module('teamform-app');

			module(function($provide) {
				var user = {uid : "1234"};
				// Fake StoreService Implementation returning a promise
				$provide.value('$firebaseAuth',function(){
							return {	$createUserWithEmailAndPassword: function(username, password) {return {then: function(callback) {return callback(user);}};},
												signInWithEmailAndPassword: function(username,password) {return {catch: function(callback) { return callback({message:null}); }};},
												$signOut: function() { return user;},
												$onAuthStateChanged:function(funct) {funct(user);return user;},
												$signInWithPopup:function(way){return {catch: function(callback) { return callback({message:null}); }};}
											};
						}
				);
				return null;
			});


      inject(
        function(_$controller_,_$firebaseAuth_){
          $controller=_$controller_;
					$firebaseAuth=_$firebaseAuth_;
        }
      );
    });

   describe('Controller Test', function() {
		 var user = {uid : "1234"};
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
		it('emailAccCreate test', function(done) {
			spyOn($scope.auth, "$createUserWithEmailAndPassword").and.callFake(function(username,password) {
				return {
					then: function(callback) { return callback(user); },
					catch: function(callback) { return callback({message:null}); }
				};
			});
			$scope.username="abc@dfe.com";
			$scope.password="abcd1234";
			$scope.emailAccCreate();
			expect($scope.error).toBeNull();
		});
	// });
	// describe('Controller Test', function() {
	// 	var $scope ={};
		it('emailLogin test', function() {
			$scope.error=null;
			$scope.firebaseUser=null;
			spyOn($scope.auth, "signInWithEmailAndPassword").and.callThrough();
			$scope.emailLogin();
			expect($scope.error).toBeNull();
		});
	// });
	// describe('Controller Test', function() {
		// var $scope ={};
		it('fbLogin test', function() {
			// var controller = $controller('LoginCtrl', { $scope: $scope });
			$scope.error=null;
			spyOn($scope.auth, "$signInWithPopup").and.callThrough();
			$scope.fbLogin();
			expect($scope.error).toBeNull();

		});
		it('fbLogin fail test', function() {
			$scope.error=null;
			spyOn($scope.auth, "$signInWithPopup").and.callFake(function() {
				return {
					catch: function(callback) { return callback("error"); }
				};
			});
			$scope.fbLogin();
			expect($scope.error).not.toBeNull();
		});
	// });
	// describe('Controller Test', function() {
		// var $scope ={};
		it('signOut test', function() {
			spyOn($scope.auth, "$signOut").and.callThrough();
			$scope.signOut();
		});

	// });
	// describe('Controller Test', function() {
	// 	var $scope ={};
		// it('getProfile test', function() {
		// 	// var controller = $controller('LoginCtrl', { $scope: $scope });
		// 	var profile = controller.getProfile('AuwFEgdGENUHSsf1vbAMSoRe0W33');
		// 	// expect(profile).not.toBeNull();
		// });

	});
});
