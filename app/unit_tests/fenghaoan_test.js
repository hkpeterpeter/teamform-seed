//initFirebase();

describe('homeController', function() {

	beforeEach(module('teamapp','firebase'));

	var $scope, $rootScope, $firebaseArray, $firebaseObject, createController, $q, defered;
	//initFirebase();

	beforeEach(inject(function(_$controller_, _$rootScope_, _$firebaseArray_, _$firebaseObject_, _$q_){
		$firebaseArray = _$firebaseArray_;
		$firebaseObject = _$firebaseObject_;

		$controller = _$controller_;
		$q = _$q_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		deferred = _$q_.defer();

		createController = function() {
			return $controller('homeController', {
				'$rootScope': $rootScope,
				'$scope': $scope
			});

		}
		$rootScope.currentUser = {id:0};

	}));

	// Forget this stupid test case

	// it('loginhelper', function() {
	// 	var controller = createController();

	// 	var result = {
			
	// 		'credential': {
	// 			'accessToken':"ya29.CjWYA5hfM2b_U2JfpRNOoiFNxdj9nqpk0Jqyzy2GqmOacf_TD6aJf3Y8sRpa1fOY4Avwt1P0bw",
	// 			'idToken':"eyJhbGciOiJSUzI1NiIsImtpZCI6ImRhOWUzZDdjZGQxYjQxNzgwMTBmODlhZjExY2ZkMzc0MDAwNjFhZmMifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDc5MjcyNjE3LCJleHAiOjE0NzkyNzYyMTcsImF0X2hhc2giOiJTZzVGcnlSRkYtZDB2aW95YXZhWVFBIiwiYXVkIjoiMTA1Nzg0MzYxMzU1Mi0xNXJhN2YzYjd0azQ2Mm1kOXRsbGg3c2xrMTdxN2I2bC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExODIwNTY3NTYxNzc2MzEwNDQwMyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIxMDU3ODQzNjEzNTUyLTE1cmE3ZjNiN3RrNDYybWQ5dGxsaDdzbGsxN3E3YjZsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJ1bmRlZmluZWQuaGt1c3RAZ21haWwuY29tIn0.khbT_p5GSkYg3zW9B2mMHmh0bgkzRtnUKiZNGt7ykFJprmGiNs0FApzKwJeZISZPWAqcKlPJBy9H4mTvTUmka8tpxrMZZ829MGFJRBLRLtNsupFenynAh-0rQE32fOTPCUZ5aezUdUdG_h3Vjhosdrum9YZlaRhAroVTpQDnpxz0MjWMGVt-zPN8o8frA6f7x40buy9oOx0PyrogUvO1DnYcCNU8AhdNH5s401m9xDTFJ-DZDLaC7m3Hd958PzTmwOTSaIbVfu3k42BPBg24b7sOR0z12-VFpmuLd8UHwqfCh4SOfJGFmgOcQrCFLb5TaX1wPkSP3U9Mzcw0eNETJg",
	// 			'provider':"google.com"
	// 		},
	// 		user: {
	// 			'providerData': [
	// 			{
	// 				'displayName':"徐依喵",
	// 				'email':"undefined.hkust@gmail.com",
	// 				'photoURL':"https://lh5.googleusercontent.com/-EovenS-54O8/AAAAAAAAAAI/AAAAAAAAAB0/sKbKRlXHA0I/photo.jpg",
	// 				'providerId':"google.com",
	// 				'uid':"118205675617763104403"
	// 			}
	// 			],
	// 		}
	// 	};
	// 	$scope.loginhelper(result);
	// 	expect($scope.loginStatus).toEqual(true);

	// });

	it('login', function() {
		var controller = createController();
		$scope.login();
		$scope.login('google');
		$scope.login('facebook');

		expect($scope.loginStatus).toEqual(false);
	});

	it('login_selected', function() {
		var controller = createController();
		$scope.login_selected();

	});

	it('signup_selected', function() {
		var controller = createController();
		$scope.signup_selected();
	});

	it('switcher', function() {
		var controller = createController();
		// $(".cd-switcher").trigger('ng-click');
		$scope.switcher($.Event('ng-click'));
	});

});


describe('Unit testing feature card', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('teamapp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $templateCache.put('Fenghaoan/js/featureCard.html', '<div class="row"><div class="col s10 l8 offset-l1"  ng-show="{{feature.flip}}"><div class="card horizontal"><div class="card-image"><div style="display:table;height:100%"><div style=" display: table-cell;vertical-align: middle;"> <img ng-src="{{feature.image_path}}" style="height:263px;width: 263px"/></div></div></div><div class="card-stacked"><div class="card-content" style="height: 200px;overflow: hidden "><div>{{ feature.content }}</div></div></div></div></div><div class="col s10 l8 offset-l3  offset-s2"  ng-show="!{{feature.flip}}"><div class="card horizontal"><div class="card-stacked"><div class="card-content" style="height: 200px;overflow: hidden "><div>{{ feature.content }}</div> </div></div><div class="card-image"><div style="display:table;height:100%"><div style=" display: table-cell;vertical-align: middle;"><img ng-src="{{feature.image_path}}" style="height:263px;width: 263px"/></div></div></div></div></div></div>');
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<div ng-controller=\"homeController\"><feature-card ng-repeat=\"feature in features\"></feature-card></div>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("card");
    // expect(element.html()).toContain("input");
  });

});


describe('Unit testing feature card', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('teamapp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $templateCache.put('Fenghaoan/js/developerCard.html', '<div class="row"><div class="col s10 l8 offset-l1"  ng-show="{{developer.flip}}">   <div class="card horizontal"><div class="card-image"><div style="display:table;height:100%"><div style=" display: table-cell;vertical-align: middle;"><img ng-src="{{developer.image}}" style="height:263px;width: 263px"/></div></div></div><div class="card-stacked"><div class="card-content" style="height: 200px;overflow: hidden "><p>{{ developer.content }}</p></div></div<<div class="card-action"<<a href="{{ developer.personal_website }}">{{ developer.name }}</a<</div<<div class="card-reveal"<<span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span<<p>Here is some more information about this product that is only revealed once clicked on.</p<</div<</div<</div<<div class="col s10 l8 offset-l3 offset-s2"  ng-show="!{{developer.flip}}"<<div class="card horizontal"<<div class="card-action"<<a href="{{ developer.personal_website }}">{{ developer.name }}</a<</div<<div class="card-stacked"<<div class="card-content" style="height: 200px;overflow: hidden "<<p<{{ developer.content }}</p></div</div><div class="card-image"><div style="display:table;height:100%"><div style=" display: table-cell;vertical-align: middle;"><img ng-src="{{developer.image}}" style="height:263px;width: 263px"/></div></div></div></div></div></div>');
}));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<div ng-controller=\"homeController\"><developer-card ng-repeat=\"developer in developers\"></developer-card></div>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("card");
    // expect(element.html()).toContain("input");
  });

});
