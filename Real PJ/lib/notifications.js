app.controller("notificationCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseObject, $firebaseArray) {

  		var ref = firebase.database().ref();
     	var obj = $firebaseObject(ref);
  		obj.$loaded().then(function() { 
  			$scope.id = obj.currentUid;	
			ref = firebase.database().ref('User/' + $scope.id);
        	$scope.user = $firebaseObject(ref);
        	//var newdata = {
            //	email : "sdf123"
        	//}        
        	//ref.update(newdata);
  		});
  }
]);