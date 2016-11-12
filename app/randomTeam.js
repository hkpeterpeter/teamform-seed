app.controller("random_Team",["$scope","$firebaseArray", "Auth","$rootScope",
               
	function($scope, $firebaseArray,Auth,$rootscope){	
		var ref=firebase.database().ref("events");
		$scope.event = $firebaseArray(ref); 
		
		
		//eventID.$bindTo($scope, "selectedName");
		$scope.setEvent =function(ID){
			var eventID=ID;
			var path= "events" + "/" + ID + "/" + "Team" ;
			var eventRef= firebase.database().ref(path);
			$scope.teamOfChosenEvent= $firebaseArray(eventRef);			
		}
		$scope.random = function(){
			return 0.5 - Math.random();
		};
		//shuffle(teamOfChosenEvent);
		
		//var eventId=$("#selectedName").val();
		//var path= "events" + "/" + eventID + "/" + "Team" ;
		//var eventRef= firebase.database().ref(path);
		//$scope.teamOfChosenEvent= $firebaseArray(eventRef);
		//teamOfChosenEvent.shuffle(Random random);
		
	}	
]);
