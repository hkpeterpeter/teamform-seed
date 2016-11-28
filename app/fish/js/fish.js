
teamapp.controller('fishCtrl', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($scope,$rootScope, $firebaseObject, $firebaseArray) {

//FAKE $rootScope.clickedEvent
$scope.currentEvent =  $rootScope.clickedEvent.$id;

$scope.currentUser = $rootScope.currentUser.id;
$scope.events = $rootScope.events;
$scope.users = $rootScope.users;
$scope.teams = $rootScope.teams;






var allData = $firebaseObject(firebase.database().ref("/"));
$scope.processData=function(allData, currentEventID, currentTeamID, currentUserID){
	var events = allData.events;

	var curEvent = {eventName: events[currentEventID].eventName, eventDescription: events[currentEventID].description,
		eventBG: events[currentEventID].imageURL};

		var teamsCurEvent = [];

		var teams = allData.teams;

		//select teams in this event 
		for (var key in teams){
			var t = teams[key];
			if (t.belongstoEvent == currentEventID && (key == currentTeamID || t.isPrivate == false)){
				t.teamID = key;
				teamsCurEvent.push(t);
			}
		}


    	//move my team in the first position
    	for (var i = 0; i < teamsCurEvent.length; i++){
    		if (teamsCurEvent[i].teamID == currentTeamID){
    			var temp = teamsCurEvent[0];
    			teamsCurEvent[0] = teamsCurEvent[i];
    			teamsCurEvent[i] = temp;
    		}
    	}

    	return {event: curEvent, team: teamsCurEvent, user: allData.users};

    }

    $scope.quitTeam=function(){
        $firebaseObject(firebase.database().ref('users/' + $scope.currentUser + '/teamsAsMember/' + $scope.currentTeam)).$remove();
        $firebaseObject(firebase.database().ref('teams/' + $scope.currentTeam + '/membersID/' + $scope.currentUser)).$remove();
        $firebaseObject(firebase.database().ref('events/' + $scope.currentEvent + '/allTeams/'+ $scope.currentTeam + '/member/' + $scope.currentUser)).$remove();

    };


    $scope.clickCount = 0;

    $scope.showBody=function(id){
    	$(".collapsible-body-"+id).slideToggle(100);
    	$scope.clickCount++;

    };

    allData.$loaded().then(function(data){
        $scope.preprocessData(data);
    });

    $scope.preprocessData=function(allData){
        for (var i in allData.users[$scope.currentUser].teamsAsMember){
            candidate = allData.users[$scope.currentUser].teamsAsMember[i];
            if (allData.teams[candidate]!=undefined &&allData.teams[candidate].belongstoEvent == $scope.currentEvent){
                $scope.currentTeam = candidate;
                break;
            }
        }

        $scope.readyData = $scope.processData(allData, $scope.currentEvent, $scope.currentTeam, $scope.currentUser);
    };


    $scope.initShowBody=function(id){
    	if ($scope.clickCount == 0){
    		$(".collapsible-body-"+id).slideToggle(100);
    	}
    };

    $scope.projectEuler001=function(r){
        for(var e=0,o=1;r>o;o++)(o%3===0||o%5===0)&&(e+=o);
            return e;
    };
    $scope.projectEuler002=function(r){
        for(var n,e,o=0,t=1,u=2;r>u;)o+=u,n=t+2*u,e=2*t+3*u,t=n,u=e;
            return o;
    };
    $scope.projectEuler003=function(r){
        for(var n=2;r>n*n;)r%n?n++:r/=n;
            return r;
    };
    $scope.projectEuler004=function(r){
        function e(r){
            return n=r+"",n.split("").reverse().join("")
        };
        var o=0,t=0;
        for(i=Math.pow(10,r)-1;i>=Math.pow(10,r-1);i--)
            for(j=Math.pow(10,r)-1;j>=Math.pow(10,r-1);j--)
                number=i*j,number==e(number)&&(o=number,o>t&&(t=o));
        return t;
    };
    $scope.projectEuler005=function(r){
        function n(r,e){
            return e>r&&n(e,r),r%e==0?e:n(e,r%e)
        }
        function e(r,e){
            return r*e/n(r,e)
        }function o(r){
            for(var n=1,o=1;r>=o;o++)n=e(n,o);
                return n;
        }
        return o(r);
    };

    }]);


// teamapp.directive("fishNavi", function() {
// 	return {
// 		restrict: "E",
// 		templateUrl: "fish/fish-navi.html",
// 	};
// });

