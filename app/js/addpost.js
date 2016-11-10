'use strict';

angular.module("adboard", ["firebase"]);

.controller("adboardCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray)
{

	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);

	$scope.createPost = function(){
		var name = $scope.article.nametxt;
		var post = $scope.article.posttxt;
		$scope.articles.$add({
			name: name,
			post: post
		}) .then(function(ref){
			console.log(ref);
		}, function(error){
			console.log(error);
		});
	};




} ]);