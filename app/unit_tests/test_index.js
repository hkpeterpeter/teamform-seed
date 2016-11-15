describe('Test index.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   var $scope;
   it('test btn_fb', function(){
      $scope.btn_fb();
      expect($scope.logined).toBe(true);

   });

   it('test btn_admin', function(){
      $scope.btn_admin();
      expect(window.location.href).toBe("admin.html?q=");
   });


});