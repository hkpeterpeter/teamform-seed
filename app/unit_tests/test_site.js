describe('Test site.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
 	it('Test value within 1 to 5', function() {
        var value = getRandomIntInclusive(1, 5);
        expect( value>=1 && value <= 5 ).toEqual(true);
    });

  it('make sure firebase is working', function() {
    initalizeFirebase();
    expect(firebase).toBeDefined();
  });

});





/*describe('Test site.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

   });


});*/