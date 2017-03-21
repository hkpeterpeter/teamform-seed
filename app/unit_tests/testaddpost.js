describe('adboardCtrl', function(){
    beforeEach(module('adboard', 'firebase'));
	var ctrl, firebase, $scope;

	beforeEach(inject(function($controller, $firebase, $firebaseArray){
		$scope = {};
		ctrl = $controller('adboardCtrl', {
			$scope: $scope
			})
	}));


    it('addNewPost1', function(){

    	var t = "thisistitle";
    	var c ="thisiscontent";
    	var p ="thisisperson";
    	$scope.titletxt = t;
    	$scope.contenttxt = c;
    	$scope.persontxt = p;
        $scope.add();
        expect($scope.titletxt).toEqual("thisistitle");
        expect($scope.contenttxt).toEqual("thisiscontent");
        expect($scope.persontxt).toEqual("thisisperson");
	});



 //    it('addNewPost', function(){
 //      $scope.titletext = "Title",
 //      $scope.contenttxt = "Content",
 //       $scope.perosntxt = "Person";
 //        $scope.add();
 //        expect().toEqual("Title"),
 //        expect("content").toEqual("Content"),
 //        expect("person").toEqual("Person");
	// });


 //    it('addNewPost', function(){
 //        $scope.titletxt = "title";
 //        $scope.add();
 //        expect($scope.titletxt).toEqual("title");
	// });


 //    it('addNewPost', function(){
 //        $scope.contenttxt = "Content";
 //        $scope.add();
 //        expect($scope.contenttxt).toEqual("Content");
	// });


	// it('addNewPost', function(){
 //        $scope.persontxt = "Person";
 //        $scope.add();
 //        expect($scope.persontxt).toEqual("Person");
	// });




});