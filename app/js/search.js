$(document).ready(function(){

});

  var app = angular.module('search',['firebase']);
	app.controller('searchCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {


    $scope.items = [];
  	var path = "events/";
  	firebase.database().ref(path).orderByChild("name").on("child_added", function(data) {

  	$scope.items.push({"name" : data.key, "link" : "events.html?e=" + data.key , "type": "event"});
  	path = "events/" + data.key + "/teams/";
    var event = data.key;
    firebase.database().ref(path).orderByChild("name").on("child_added", function(data) {
  	$scope.items.push({"name" : data.key, "link" : "event.html?e=" + event + "&t=" + data.key, "type" : "team"});
  	});
  	});

  	path = "users/";
  	firebase.database().ref(path).orderByChild("name").on("child_added", function(data) {
  	$scope.items.push({"name" : data.val().name, "link" : "profile.html?uid=" + data.key, "type" : "user"});

  	});


  }]);


  app.filter('searchFor', function(){

  	return function (items, searchString) {
  		var filtered = [];
  		if(searchString == null)
  		{
  				return null;
  		}
  			var letterMatch = new RegExp(searchString, 'i');
  			for (var i = 0; i < items.length; i++) {
  					var item = items[i];
  					if (letterMatch.test(item.name.substring(0, searchString.length))) {
  							filtered.push(item);
  					}
  			}
  			return filtered;
  	};

  });
