// inject firebase service
var app = angular.module("level", ["firebase"]); 

app.controller("levelCtrl",  

	// Implementation the todoCtrl 
	function($scope, $firebaseArray,$window,$timeout) {
        $scope.current = 0;
        $scope.total = 100;
        value = '0%';
		var ref=firebase.database().ref("pi");
    	ref.orderByChild("Name").equalTo("Kit").once("child_added", function(dataRef) {
            $scope.$apply(function() {
            $scope.level = dataRef.child("level").val();
            $scope.current = dataRef.child("current").val();
            $scope.total = dataRef.child("total").val();
            $scope.value = $scope.current/$scope.total*100 + "%";
            knobfunction($scope.value);
           });
        });
        
        $scope.add = function (){
			$scope.current+=10;
            $scope.value = ($scope.current)/$scope.total*100 +"%";
            knobfunction($scope.value);

        };
        
        //
        //$scope.$watch('total', function() {
        ////    $scope.percent = $scope.current/$scope.total*100 + "%";
        //    var el = document.getElementById("circle");
        //  //  el.setAttribute("value", $scope.percent);
        //    compile(el);
        //});

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