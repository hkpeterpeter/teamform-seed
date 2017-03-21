describe('Test index.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
    var $scope;
   describe('initializeFirebase', function(){
      it('test firebase',function(){
        var config = {
          apiKey: "AIzaSyB9w7_f06cUyClSj4079RXthS7ygPXBaUY",
          authDomain: "lab-firebase-d860e.firebaseapp.com",
          databaseURL: "https://lab-firebase-d860e.firebaseio.com",
          storageBucket: "lab-firebase-d860e.appspot.com",
        };
        expect(initializeFirebase()).toBe(true);
        expect(config.apiKey).toEqual("AIzaSyB9w7_f06cUyClSj4079RXthS7ygPXBaUY");
        expect(config.authDomain).toEqual("lab-firebase-d860e.firebaseapp.com");
        expect(config.databaseURL).toEqual("https://lab-firebase-d860e.firebaseio.com");
        expect(config.storageBucket).toEqual("lab-firebase-d860e.appspot.com");
        expect(firebase.initializeApp(config)).toBe(true);
      });
   }); 

   describe('fbtest',function(){
       it('test btn_fb', function(){
      btn_fb();
      expect($scope.logined).toBe(true);

   });
   });

   describe('logouttest',function(){
       it('test btn_logout', function () {
       btn_logout();
       expect($scope.logined).toBe(true);

   });
   });


   decribe('admintest',function(){
       it('test btn_admin', function () {
       var eventID="eventID";
      btn_admin();
      expect(window.location.href).toBe("admin.html?q=eventID");
   });
   });

   describe('refreshfirebase',function(){
       it('expecttrue',function(){
       expect(refreshEvnents()).toBe(true);
       });
   });


});