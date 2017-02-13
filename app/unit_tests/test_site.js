describe('Test site.js', function() {

   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

		it('gotoURL', function(){
			var $window = {location:{}};
			$window.location.host = "localhost";
			$window.location.href = "";
			gotoURL("/index.html", [{key:"p",value:"p"},{key:"q",value:"q"}], $window);
			expect($window.location.href).toEqual("http://localhost/index.html?p=p&q=q");
		});

		it('gotoURL no params', function(){
			var $window = {location:{}};
			$window.location.host = "localhost";
			$window.location.href = "";
			gotoURL("/index.html", [], $window);
			expect($window.location.href).toEqual("http://localhost/index.html");
		});

   });


});
