describe("setcolor",function(){
	it("change color function",function(){
		var obj = {style:{color:'yellow'}};
		setColor(obj,'green');
		expect(obj.style.color).toEqual('green');
	});
});

describe("service testing",function(){

	var sampledivToggle;
  
	beforeEach(function(){
		/*
		module(function($provide){
		$provide.service("divToggle",function(){
			this.dataobj
			});
		});
		*/
	module("testapp");
	});

	beforeEach(inject(function(divToggle){
		sampledivToggle = divToggle;
	}));
});

describe("searchPage",function(){
  
	beforeEach(module("testapp"));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe("Tag",function(){
   
		it("check null",function(){
			var $scope = {};
			var $cookies;
			var $window;
			var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
			expect($scope.currentTag).toEqual([]);
		});
	});

	it("setSearchT",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.setSearchT();
		expect($scope.searchType).toEqual("Search Team");
	});

	it("setSearchP",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.setSearchP();
		expect($scope.searchType).toEqual("Search Person");
	});

	it("setSearchE",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.setSearchE();
		expect($scope.searchType).toEqual("Search Event");
	});

	it("start()",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.start();
		expect($scope.startSearch).toEqual(false);
		expect($scope.sidebar).toEqual(true);
	});

	it("reset(index)",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.currentTag.push("sampleTag1");
		$scope.currentTag.push("sampleTag2");
		var inilengthc = $scope.currentTag.length;
		var inilengthr = $scope.resultTag.length;
		$scope.reset(1);
		expect($scope.currentTag.length).toEqual(inilengthc-1);
		expect($scope.resultTag.length).toEqual(inilengthr + 1);
	});


	
	it("clear()",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.currentTag.push("sampleTag1");
		$scope.resultTag.push("sampleTag2");
		$scope.new = "hello";
		$scope.clear();
		expect($scope.currentTag.length).toEqual(0);
		expect($scope.resultTag.length).toEqual(0);
		expect($scope.new.length).toEqual(0);
	});

	it("delete(index)",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.currentTag.push("sampleTag1");
		$scope.resultTag.push("sampleTag2");
		$scope.resultTag.push("sampleTag3");
		var inilengthc = $scope.currentTag.length;
		var inilengthr = $scope.resultTag.length;
		$scope.delete(0);
		expect($scope.currentTag.length).toEqual(inilengthc+1);
		expect($scope.resultTag.length).toEqual(inilengthr-1);

	});

	it("autocomplete(newx)",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.autocomplete("");
		expect($scope.currentTag.length).toEqual(0);
		$scope.newx = "@@$";
		$scope.autocomplete($scope.newx);
		expect($scope.newx.length).toEqual(0);
		$scope.newx = "ss";
		$scope.autocomplete($scope.newx);
		expect($scope.newx.length).not.toEqual(0);
	});

	it("test()",function(){
		var $scope = {};
		var $cookies;
		var $window;
		var controller = $controller("searchPage",{$scope:$scope,$cookies:$cookies,$window:$window});
		$scope.currentTag = [];
		$scope.test();
		expect($scope.currentTag[0]).toEqual("java");
	});
});

