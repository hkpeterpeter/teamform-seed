describe('Test site.js', function() {
	
		beforeEach(module('teamapp'));
		var $controller
		var $rootScope;
		var $compile;
		var $templateCache;
		var $scope;
		
		beforeEach(inject(function(_$controller_,_$rootScope_,_$compile_,_$templateCache_){
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			$compile=_$compile_;
			$templateCache=_$templateCache_;
			$scope=_$rootScope_.$new();
			$controller('search_controll',{$scope:$scope});

			$templateCache.put("zhuxinyu/js/components/imageBoard/imageBoard.html",'<div>{{content}}</div>');
			
			$templateCache.put("zhuxinyu/js/components/basicCard/basicCard.html",'<div ng-transclude></div>');

			$templateCache.put("zhuxinyu/js/components/boardList/boardList.html",'<div>{{size}}</div>');

			$templateCache.put("zhuxinyu/js/components/eventCard/eventCard.html",'<div>{{eadmin}}</div>');

			$templateCache.put("zhuxinyu/js/components/eventSearchPanel/eventSearchPanel.html",'<div>Find Your Event</div>');

			$templateCache.put("zhuxinyu/js/components/footerPanel/footerPanel.html",'<div>{{ftitle}}</div>');

			$templateCache.put("zhuxinyu/js/components/invitationBar/invitationBar.html",'<div>{{event}}</div>');

			$templateCache.put("zhuxinyu/js/components/notifyBar/notifyBar.html",'<div>{{cpic}}</div>');

			$templateCache.put("zhuxinyu/js/components/searchEventFooter/eventfooter.html",'COMP 3111H Project');

			$templateCache.put("zhuxinyu/js/components/submitCancelPanel/subcan.html",'Submit');

			$templateCache.put("zhuxinyu/js/components/fish-navi.html",'notifications_none');
			
			
		}));

	  

	describe('Test Directives', function() {
		 it('image-board',function(){
			

			var element=$compile("<image-board content='ABCD Hello'></image-board>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("ABCD Hello");
		 });

		  it('basicCard',function(){
			

			var element=$compile("<basic-card>I am BASIC</basic-card>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("I am BASIC");
		 });

		   it('boardList',function(){
			var element=$compile("<board-list size=5>I am BASIC</board-list>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("5");
		 });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		    it('eventCard',function(){
			var element=$compile("<event-card eadmin='I am title'></event-card>")($rootScope);
		  	$rootScope.$digest();$scope.$digest();
		 	expect(element.html()).toContain("I am title");


		 	$rootScope.addEventCard({});
		 	$rootScope.goEvent();

		 	var data={};
            data.allTeams=[{leader:0,member:[2,3]},{leader:1,member:[2,3]}];


            $rootScope.currentUser={};
		 	$rootScope.currentUser.id=10;
		 	data.adminID=10;
		 	$rootScope.checkUser(data);

		 	expect(window.location.href).toContain("#admin");

		 	$rootScope.currentUser.id=10
		 	data.adminID=20;
		 	$rootScope.checkUser(data);
		 	expect(window.location.href).toContain("#eventx");
		 	$rootScope.currentUser.id=0;
		 	$rootScope.checkUser(data);
		 	expect(window.location.href).toContain("#teamleader");

		 	$rootScope.currentUser.id=2;
		 	$rootScope.checkUser(data);
		 	expect(window.location.href).toContain("#team");
		 });


		     it('eventSearchPanel',function(){
			var element=$compile("<event-search-panel></event-search-panel>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("Find Your Event");
		 });


		      it('footerPanel',function(){
			var element=$compile("<footer-panel ftitle='Footer'</footer-panel>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("Footer");
		 });


		        it('invitationBar',function(){
			var element=$compile("<invitation-bar event='Helloworld'></invitation-bar>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("Helloworld");
		 });


		     it('notifyBar',function(){
			var element=$compile("<notify-bar cpic='Picture'></notify-bar>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("Picture");
		 });


		      it('eventfooter',function(){
			var element=$compile("<event-footer></event-footer>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("COMP 3111H Project");
		 });

		     it('subcan',function(){
			var element=$compile("<subcan></subcan>")($rootScope);
		  	$rootScope.$digest();
		 	expect(element.html()).toContain("Submit");
		 	$scope.createEvent();
		 		 expect($rootScope.processRef({key:"1234"})).toEqual($rootScope.processRef({key:"1234"}));
		 });


		      it('fish-navi',function(){
			var element=$compile("<zhu-navi>I am BASIC</zhu-navi>")($rootScope);
		
		  	$rootScope.$digest();
		  	$scope.shownotify();
		 	expect(element.html()).toContain("notifications_none");		 
		 	

		 	  
		 	
		 });



	});

	describe('Test Variable', function() {

		it('Event Variable',function(){
			expect($scope.event.name).toEqual('');
			expect($scope.event.adm).toEqual('');
			expect($scope.event.detail).toEqual('Event Detail');
		});


	});


	describe('Test Functions', function() {

		it('Flip function',function(){
			$scope.createflip();
			expect($scope.event.name).toEqual('');
			$scope.event.name="a";
			expect($scope.createflip()).toEqual('NONE');
			expect($scope.cancelEvent()).toEqual('ERR');
			
		});

		describe('Update UI',function(){
			it('Update card list',function(){
				var a={};
				var b={};
				var list=[a,b];
				
				 expect($scope.updateEventList(list)).toEqual("SUCCESS");
				  expect($scope.updateEventList([])).toEqual("Fail");
			
			});

			it('Update card list',function(){
				var testList=[{name:"abc"},{name:"bcd"}];
				$scope.deleteChild(testList);
				
				 expect("1").toEqual("1");
				
			
			});
		});

		describe('Event Function',function(){
			it('Search',function(){

				$rootScope.events=[{eventName:"3111Project"},{eventName:"Java"}];
				$scope.event.name='3111';

				
				 expect($scope.searchEvent()).toEqual("SUCCESS");

				 $scope.event.name='';
				  expect($scope.searchEvent()).toEqual("FAIL");
			
			});

		
		})
	
	});

});