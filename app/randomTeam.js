app.controller("random_Team",["$scope","$firebaseArray", "Auth","$rootScope",
               
	function($scope, $firebaseArray,Auth,$rootscope){	
		var ref=firebase.database().ref("events");
		$scope.event = $firebaseArray(ref); 

		$scope.setEvent =function(ID){
			var eventID=ID;
			var path= "events" + "/" + ID + "/" + "Team" ;
			var eventRef= firebase.database().ref(path);
			return $scope.teamOfChosenEvent= $firebaseArray(eventRef);
		}
		
		$scope.random = function(){
			return 0.5 - Math.random();
		};
		
		

		
	}	
]);
