'use strict';
angular.module("adboard", ["firebase"])

// for creating post
.controller("adboardCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray)
{	
	        var config = {
            apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
            authDomain: "comp3111-5fbe5.firebaseapp.com",
            databaseURL: "https://comp3111-5fbe5.firebaseio.com",
            storageBucket: "comp3111-5fbe5.appspot.com",
            messagingSenderId: "946291658553"
        };
        firebase.initializeApp(config);

        	var ref = firebase.database().ref().child('articles');
	$scope.articles = $firebaseArray(ref);


	$scope.createPost = function(){
		var name = $scope.article.nametxt;
		var post = $scope.article.posttxt;
		$scope.articles.$add({
			name: name,
			post: post
		});
	};




} ]);