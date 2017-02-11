app.controller("random_Event",["$scope","$firebaseArray", "Auth","$rootScope",
               
	function($scope, $firebaseArray,Auth,$rootscope){	
		var ref=firebase.database().ref("events");
		$scope.event = $firebaseArray(ref); 
		

		$scope.random = function(){
			return 0.5 - Math.random();
		};

	}	
]);
