app.controller("profileCtrl",  
	function($scope, Auth, $firebaseArray, $firebaseObject,$window, $stateParams,Helper,ngDialog) {	
		Auth.$onAuthStateChanged(function(authData){
			//initialize
			if (authData) {
				$scope.authData = authData;

				ref = firebase.database().ref("users/"+$stateParams.uid+"/readOnly/info");

				$scope.profile_info = $firebaseObject(ref);
				$scope.profile_readOnly = true;
				// $scope.profile_info.tags = Helper.tags;
				//$scope.profile_info.tag.c++=false;
				var id = $stateParams.uid;
				if (id != $scope.authData.uid)  $scope.button_visible = false;
				else $scope.button_visible = true;
				console.log(authData);
			}
			else {
				console.log("signed out");
			}
		});
		$scope.button_name = "Edit";
		$scope.edit = function(){			
			if($scope.profile_readOnly) {
				$scope.profile_readOnly=false;
				$scope.button_name = "Save";
			}
			else{
				$scope.profile_info.$save().then(function(){
					console.log($scope.profile_info);
				});
				$scope.profile_readOnly=true;
				$scope.button_name = "Edit";
			}
		};
		var profile_dialog
		$scope.profile_edit = function(){
			profile_dialogue = ngDialog.open({
						template: 'templates/manageProfileTag.html',
						className: 'ngdialog-theme-plain',
						scope: $scope
				});
		};
	}
);
