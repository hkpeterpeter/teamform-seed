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
		
		
		/*var shuffleArray = function(array) {
			var m = array.length, t, i;
			// While there remain elements to shuffle
			while (m) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);
					// And swap it with the current element.
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}
			return array;
		}*/
		//shuffleArray($scope.teamOfChosenEvent);
		
	}	
]);
