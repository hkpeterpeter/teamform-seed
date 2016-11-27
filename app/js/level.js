// inject firebase service
var app = angular.module("level", ["firebase"]); 

app.controller("levelCtrl", 

	// Implementation the todoCtrl 
	function($rootScope, $scope, $firebaseArray) {

        $scope.percent = "66.6%";
        var el = document.getElementById("circle");
        el.setAttribute("value", $scope.percent);
        compile(el);    

		var ref=firebase.database().ref("pi");
    	ref.orderByChild("Name").equalTo("Kit").once("child_added", function(dataRef) {
            $scope.$apply(function() {
            $scope.level = dataRef.child("level").val();
            $scope.current = dataRef.child("current").val();
            $scope.total = dataRef.child("total").val();
        	});
        });
        
	}
);

function compile(element){
  var el = angular.element(element);    
  $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile){
       $compile(el)($scope)
    })     
}