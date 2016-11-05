//profileCtrl
app.controller("profileCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject,$window) {
		Auth.$onAuthStateChanged(function(authData){
			//initialize
			$scope.authData = authData;
			ref = firebase.database().ref("users/"+$scope.authData.uid+"/readOnly/info");
			profile_info = $firebaseObject(ref);
			profile_info.$loaded().then(function(){
				console.log(profile_info);
				$scope.profile_name  = profile_info.name;
				$scope.profile_age  = profile_info.age ;
				$scope.profile_company = profile_info.company;
			});
			$scope.profile_readOnly = true;
			console.log($window.location.href);
			var start_pos = $window.location.href.lastIndexOf("profile/");
			var end_pos = $window.location.href.length;
			var id = $window.location.href.slice(start_pos+8,end_pos);
			if (id != $scope.authData.uid)  $scope.button_visible = true;
			else $scope.button_visible = false;
			if (authData) console.log(authData);
			else {
				console.log("signed out");
				$window.location.href = '/';
			}
		});
		$scope.button_name = "EDIT";
		$scope.edit = function(){			
			if($scope.profile_readOnly) {
				$scope.profile_readOnly=false;
				$scope.button_name = "SAVE";
			}
			else{
				ref = firebase.database().ref("users/"+$scope.authData.uid+"/readOnly/info");
				profile_info = $firebaseObject(ref);
				profile_info.$loaded();
				profile_info.name = $scope.profile_name;
				profile_info.age = $scope.profile_age;
				profile_info.company = $scope.profile_company;
				profile_info.$save().then(function(){
					console.log(profile_info);
				});
				$scope.profile_readOnly=true;
				$scope.button_name = "EDIT";
			}
		};
	}
);
