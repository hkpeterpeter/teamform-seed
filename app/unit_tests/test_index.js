describe('Test index.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
    btn_fb();
   it('test btn_fb', function(){
      expect(logined).toBe(true);

   });
   it('test btn_logout', function () {
       btn_logout();
       expect(logined).toBe(true);

   });


   it('test btn_admin', function () {
       eventID="eventID";
      btn_admin();
      expect(window.location.href).toBe("admin.html?q=eventID");
   });


});