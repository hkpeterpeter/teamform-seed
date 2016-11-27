app.controller("navCtrl",function($scope, $cookies, $window, $firebaseObject){
			$scope.logout = function() {
					$cookies.remove("username",{path:"/"});
					gotoURL("/jzhangbs/index.html",[],$window);
				};
      currentUser = $cookies.get("username",{path:"/"});
      var ref = firebase.database().ref("userList");
      accounts = $firebaseObject(ref)

      var storageRef = firebase.storage().ref();
      accounts.$loaded().then(function(){
        $scope.name = accounts[currentUser].name;
        avaFilename = accounts[currentUser].img;
        avaRef = storageRef.child('user/'+avaFilename);
        avaRef.getMetadata().then(function(metadata){
          $scope.avaUrl = metadata.downloadURLs[0];
					// console.log($scope.avaUrl);
					$scope.$apply();
        });
      });
});
