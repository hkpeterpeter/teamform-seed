angular.module('teamform-team-app', ['firebase'])
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window',
    function($scope, $firebaseObject, $firebaseArray, $window) {
		
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();

	var refPath = "";
	var eventName = getURLParameter("q");	
	var teamName = getURLParameter("tn");

	refPath = "/event/" + eventName + "/team/" + teamName; 
	ref = firebase.database().ref(refPath);
	$scope.teaminfo = $firebaseObject(ref);


	var userid,username,userPath,userref,userObj;





	$scope.jointeam = function()
	{
		/*
		 firebase.auth().onAuthStateChanged(function(user) {
		 	console.log(user);
    	if (user) {
    		console.log(user);
        	userPath = "/user/" + user.uid;
        	userref = firebase.database().ref(userPath);

        	var eventPath ="/event/" + eventName +"/members/"+ userid;
        	var eventref = firebase.database().ref(eventPath);

        	eventref.set({ joined : true })	 
    	} else {
   
    // No user is signed in.
    }
    });
*/
	    var user = firebase.auth().currentUser;
	    console.log(user);

		if (user != null) {
	        var userPath ="/user/" + user.uid;
	        var userref = firebase.database().ref(userPath);
	        var name;
	        var position;
	        var isPositionEmpty = true;

	        userref.once("value", function(data) {
	        	console.log(data.val());
	        	name = data.val().name;
	        	position = data.val().position;

	        	if(position=="Forward")
	        	{
	        		if($scope.teaminfo.Forward=="")
	        		{
	        			//Forward position is emtpy
	        		}
	        		else
	        		{
	        			isPositionEmpty = false;
	        		}
	        	}
	        	if(position=="Midfield")
	        	{
	        		if($scope.teaminfo.Midfield=="")
	        		{
	        			//Forward position is emtpy
	        		}
	        		else
	        		{
	        			isPositionEmpty = false;
	        		}
	        	}
	        	if(position=="LeftBack")
	        	{
	        		if($scope.teaminfo.LeftBack=="")
	        		{
	        			//Forward position is emtpy
	        		}
	        		else
	        		{
	        			isPositionEmpty = false;
	        		}
	        	}
	        	if(position=="RightBack")
	        	{
	        		if($scope.teaminfo.RightBack=="")
	        		{
	        			//Forward position is emtpy
	        		}
	        		else
	        		{
	        			isPositionEmpty = false;
	        		}
	        	}        	
	        	if(position=="GoalKeeper")
	        	{
	        		if($scope.teaminfo.GoalKeeper=="")
	        		{
	        			//Forward position is emtpy
	        		}
	        		else
	        		{
	        			isPositionEmpty = false;
	        		}
	        	}

	        	if(isPositionEmpty==true)
	        	{
		        	var eventPath ="/event/" + eventName + "/team/"+teamName+"/members/"+ user.uid;
		        	var eventref = firebase.database().ref(eventPath);

		        	eventref.update({	
		        		'joined' : true, 
		        		'username' : name,
		        		'position' : position
		        	})

		        	if(position!=null)
		        	{
		        		position = position.toString();
		        	}
		        	var positionPath = "/event/"+eventName+"/team/"+teamName;
		        	var positionRef = firebase.database().ref(positionPath);
		        	if(position=="Forward")
		        	{
		        		positionRef.update({	
		        			'Forward' : name
		        		})
		        	}
		        	if(position=="Midfield")
		        	{
		        		positionRef.update({	
		        			'Midfield' : name
		        		})
		        	}
		        	if(position=="LeftBack")
		        	{
		        		positionRef.update({	
		        			'LeftBack' : name
		        		})
		        	}
		        	if(position=="RightBack")
		        	{
		        		positionRef.update({	
		        			'RightBack' : name
		        		})
		        	}        	
		        	if(position=="GoalKeeper")
		        	{
		        		positionRef.update({	
		        			'GoalKeeper' : name
		        		})
		        	}
				}
				else
				{
					//Failure of joining team
					$window.alert("Your position is occupied by other player!!!");
          		    console.log('Your position is occupied by other player!!!');
				}

			});
		} else 
		{
	  			// No user is signed in.
		}

	}

	refPath = "/event/" + eventName + "/team/"+teamName+"/members";
	$scope.members = [];
	$scope.members = $firebaseArray(firebase.database().ref(refPath));








	refPath =  eventName + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) {	

		if ( data.child("param").val() != null ) {
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			$scope.$apply(); // force to refresh
			$('#team_page_controller').show(); // show UI
			
		} 
	});

	$scope.input = {
			title: "",
			comment: "",
			date: "",
			likes: 0
		}

	// sync with firebaseArray
		var commentref = firebase.database().ref("/event/"+eventName+"/team/"+teamName+"/comment");
		$scope.comment = $firebaseArray(commentref);

		$scope.addComment = function() {
			
			// update the date
			if ( /*$scope.input.title != "" && */$scope.input.comment != "" ) {
				$scope.input.date = new Date().toString();
				$scope.input.likes = 0;
				// add a comment
				$scope.comment.$add($scope.input);
			}
		}
	
	
	
	
	
		
}]);
function functionName()
{
    $("#output").val("");
};
