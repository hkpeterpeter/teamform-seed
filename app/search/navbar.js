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
        $scope.avaUrl = accounts[currentUser].img;
      });
});
