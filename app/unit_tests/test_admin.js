describe('Test admin.js', function() {

    var $scope, $controller, $window;

    beforeEach(function(){
        module('teamform-admin-app');
        // inject(function(_$rootScope_, $controller, _$firebaseObject_, _$firebaseArray_, _$window_){
        inject(function(_$rootScope_, $controller, _$window_){
            $scope = _$rootScope_.$new();
        //     // $firebaseObject=_$firebaseObject_;
        //     // $firebaseArray=_$firebaseArray_;
        //     $window=_$window_;

            $controller('AdminCtrl',{$scope: $scope});

        })
    });
   
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

      it('editable',function(){
          $scope.new_announcement_click();
          expect($scope.writingAnnouncement.toBe(true));
      })

   });


});