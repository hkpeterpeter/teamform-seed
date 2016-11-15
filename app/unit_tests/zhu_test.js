initFirebase();
describe('Test site.js', function() {
	
		beforeEach(module('teamapp'));
		var $controller
		var $rootScope;
		var $compile;
		var $httpBackend;
		beforeEach(inject(function(_$controller_,_$rootScope_,_$compile_,$injector){
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			$compile=_$compile_;


			 $httpBackend = $injector.get('$httpBackend');
  			$httpBackend.whenGET('zhuxinyu/js/components/imageBoard/imageBoard.html').respond(200, '{{content}}');
		}));

	  

	describe('Test Directives', function() {
		 it('image-board',function(){
			

			var element=$compile("<image-board content='ABCD Hello'></image-board>")($rootScope);
		  	$rootScope.$digest();
			
			

		 	expect(element.html()).toContain("ABCD Hello");
		 });


	});


});