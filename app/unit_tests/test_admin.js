describe('Test admin.js', function() {

    var $scope, $controller, $window;

    beforeEach(function(){
        module('teamform-admin-app','firebase');
        // inject(function(_$rootScope_, $controller, _$firebaseObject_, _$firebaseArray_){
        inject(function(_$rootScope_, _$controller_){
            $scope = _$rootScope_.$new();
        //     // $firebaseObject=_$firebaseObject_;
        //     // $firebaseArray=_$firebaseArray_;
        //     $window=_$window_;

            //$controller('AdminCtrl',{$scope: $scope});
            $controller=_$controller_;

        })
    });
   
   describe('editable Coverage Test', function() {

    beforeEach(function(){
        // inject(function(_$rootScope_, $controller, _$firebaseObject_, _$firebaseArray_){
        inject(function(_$rootScope_, _$controller_){
            //$scope = _$rootScope_.$new();
        //     // $firebaseObject=_$firebaseObject_;
        //     // $firebaseArray=_$firebaseArray_;
        //     $window=_$window_;

            $controller('AdminCtrl',{$scope: $scope});
            
        })
    });

      it('editable',function(){
          $scope.new_announcement_click();
          expect($scope.writingAnnouncement).toBe(true);
      })

   });


});