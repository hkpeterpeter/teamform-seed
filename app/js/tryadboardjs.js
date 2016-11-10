angular.module('adapp',[])

.controller('AdCtrl', ['$scope', function ($scope) {
	  var ref = new Firebase('https://comp3111-5fbe5.firebaseio.com/');
	 //var ref = new Firebase('https://comp3111-5fbe5.firebaseio.com');
	 $scope.data={}
	 $scope.bios=[];
	 $scope.flag=false;	
	 $scope.btnName="Add"
	 $scope.addData =function (data) {
	 	if (angular.isUndefined(data.key))
	 	{
		 	ref.push(data);
		 	$scope.data={};
	 	}else{
		 	$scope.btnName="Add"
	 		var uref = new Firebase('https://comp3111-5fbe5.firebaseio.com/'+ data.key);
		 	uref.update(data);
		 	$scope.flag=false;
		 	$scope.data={};
	 	}
	 }
	
	 $scope.editAd=function(key,item){
	 	$scope.btnName="Update"
	 	item.key=key;
	 	$scope.data=item;
	 	$scope.flag=true;
	 }

	 ref.on("value",function(response){
	 	$scope.bios=response.val();
	 })
}])