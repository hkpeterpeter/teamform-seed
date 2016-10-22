app.controller("loginController", 

	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {


		$scope.input = {
			name: "",
			pwd: ""
		}

		Auth.$onAuthStateChanged(function(authData){
			//$scope.authData = authData;

			if (authData) {
				console.log(authData);
				$window.location.href = '/#/dashboard/home';
			}
			else console.log("signed out");
		});

		$scope.signedIn = function(){
			return $scope.authData != null;
		};

		$scope.login = function(){
			if ($scope.input.name != undefined && $scope.input.pwd != undefined){
				console.log('in');
				Auth.$signInWithEmailAndPassword(
					$scope.input.name,
					$scope.input.pwd
				).then(function(authData){
					console.log("Logged in as:", authData);
				}).catch(function(error){
					console.log("Authentication failed:", error);
					$window.alert(error);
				}, {remember: "sessionOnly"});			
			}	
			else{
				$window.alert("Missing required fields!");				
			}

		};

		$scope.logout = function(){
			Auth.$signOut().then(function(){
				console.log("Logged out");
			}).catch(function(error){
				console.log(error);
			});
		};

	}
);

app.controller("signupCtrl",

	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {


		$scope.input = {
			email: "",
			name: "",
			pwd: ""
		}

		Auth.$onAuthStateChanged(function(authData){
			//$scope.authData = authData;

			if (authData) {
				console.log(authData);
				$window.location.href = '/#/dashboard/home';
			}
			else console.log("signed out");
		});


		$scope.register = function(){
			if ($scope.input.email != undefined && $scope.input.pwd != undefined && $scope.input.name != ""){
				Auth.$createUserWithEmailAndPassword($scope.input.email, $scope.input.pwd)
				.then(function(userData){
					console.log(userData.uid);
					var ref = firebase.database().ref("users/" + userData.uid + "/readOnly");
					var readonlyObj = $firebaseObject(ref);
					readonlyObj.email = userData.email;
					readonlyObj.name = $scope.input.name;
					readonlyObj.$save();


					// ref = firebase.database().ref("users/" + userData.uid + "/writable");
					// var wirteObj = $firebaseObject(ref);
					// wirteObj


					ref = firebase.database().ref("users/uidList");
					var uidlistObj = $firebaseArray(ref);
					uidlistObj.$add(userData.uid);


					ref = firebase.database().ref("users/nameList");
					var namelistObj = $firebaseArray(ref);
					var dict = {};
					dict[$scope.input.name] = userData.uid;										
					namelistObj.$add(dict);

				}).catch(function(error){
					$window.alert(error);
				});
			}
			else{
				$window.alert("Missing required fields!");
			}
		};

	}
);