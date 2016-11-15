describe('Test site.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

   });

   describe('getURLParameter test', function(){
      it('return url',function(){
        var value= getURLParameter(name);
        expect(value).toEqual(decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null);
      });
   });

  /* describe('initalizeFirebase', function(){
      it('test firebase',function(){
        var config = {
      apiKey: "AIzaSyB9w7_f06cUyClSj4079RXthS7ygPXBaUY",
      authDomain: "lab-firebase-d860e.firebaseapp.com",
      databaseURL: "https://lab-firebase-d860e.firebaseio.com",
      storageBucket: "lab-firebase-d860e.appspot.com",
    };
      $scope.initializeFirebase(config);
      expect($scope).toBe(firebase.initializeApp(config));
      });
   }); */
//not correct//

   

});