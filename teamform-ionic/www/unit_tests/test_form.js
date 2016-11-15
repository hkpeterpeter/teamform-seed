describe('formController', function() {

  beforeEach(module('teamapp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.receiveNewSikll', function() {
    it('receive not existing skill', function() {
      var $scope = {};
      var controller = $controller('formController', { $scope: $scope });
      $scope.skillsList = ["Saab", "Volvo", "BMW"];
      $scope.newSkill = "angularjs";
      $scope.receiveNewSikll();
      var result = ["Saab", "Volvo", "BMW", "angularjs"];
      expect($scope.skillsList).toEqual(result);
    });

    it('receive existing skill', function() {
      var $scope = {};
      var controller = $controller('formController', { $scope: $scope });
      $scope.skillsList = ["Saab", "Volvo", "BMW"];
      $scope.newSkill = "BMW";
      $scope.receiveNewSikll();
      var result = ["Saab", "Volvo", "BMW"];
      expect($scope.skillsList).toEqual(result);
    });
  });

  describe('$scope.removeSkill', function() {
    it('remove existing skill', function() {
      var $scope = {};
      var controller = $controller('formController', { $scope: $scope });
      $scope.skillsList = ["Saab", "Volvo", "BMW"];
      $scope.removeSkill("BMW");
      var result = ["Saab", "Volvo"];
      expect($scope.skillsList).toEqual(result);
    });

    it('remove not existing skill', function() {
      var $scope = {};
      var controller = $controller('formController', { $scope: $scope });
      $scope.skillsList = ["Saab", "Volvo", "BMW"];
      $scope.removeSkill("aaa");
      var result = ["Saab", "Volvo", "BMW"];
      expect($scope.skillsList).toEqual(result);
    });
  });
});

describe('Unit testing simpleField', function() {
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
    $templateCache.put('WU_YUNCHEN/component/simple_field.html', '<div class="input-field">\
                                                                        <input id={{idOfField}} type="text" class="validate" ng-model="fieldModel">\
                                                                        <label for={{idOfField}}>{{label}}</label>\
                                                                      </div>\
                                                                      <br>');
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<simple-field id-of-field=\"team_name\" label=\"Team name\" field-model=\"teamName\"></simple-field>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("Team name");
    expect(element.html()).toContain("input");
  });

});

describe('Unit testing textareaField', function() {
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
    $templateCache.put('WU_YUNCHEN/component/textarea_field.html', '<<div class="input-field">\
      <textarea id={{idOfField}} class="materialize-textarea" ng-model="fieldModel"></textarea>\
      <label for={{idOfField}}>{{label}}</label>\
    </div>\
    <br>');
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<textarea-field id-of-field="event_description" label="Event description" field-model="eventDescription"></textarea-field>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("Event description");
    expect(element.html()).toContain("textarea");
  });

});

describe('Unit testing imageUpload', function() {
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
    $templateCache.put('WU_YUNCHEN/component/image_upload.html', '<div class="file-field input-field">\
        <div class="btn">\
            <span>{{label}}</span>\
            <input type="file">\
        </div>\
        <div class="file-path-wrapper">\
            <input class="file-path validate" type="text">\
        </div>\
    </div>\
    <br>');
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<image-upload label="Choose team image"></image-upload>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("Choose team image");
    expect(element.html()).toContain("input");
  });

});

describe('Unit testing eventForm', function() {
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
    $templateCache.put('WU_YUNCHEN/component/event_form.html', '<div>HI</div>');
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<event-form></event-form>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("HI");
  });

});

describe('Unit testing teamForm', function() {
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
    $templateCache.put('WU_YUNCHEN/component/team_form.html', '<div>HI</div>');
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<team-form></team-form>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("HI");
  });

});

describe('Unit testing rangeSpinner', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('teamapp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    $scope = $rootScope.$new();
    // Compile a piece of HTML containing the directive
    var element = $compile('<div range-spinner range-min="1" range-step="1" range-max="50" range-default-value="1" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></div>')($scope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("input");
    expect(element.html()).toContain("button");

    controller = element.controller;

    expect($scope.teamMin).toEqual(1);
  });

  it('Replaces the element with the missing content', function() {
    $scope = $rootScope.$new();
    // Compile a piece of HTML containing the directive
    var element = $compile('<div range-spinner range-default-value="-1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></div>')($scope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("input");
    expect(element.html()).toContain("button");

    controller = element.controller;

    expect($scope.teamMin).toEqual(0);
  });

  it('Replaces the element with the missing default', function() {
    $scope = $rootScope.$new();
    // Compile a piece of HTML containing the directive
    var element = $compile('<div range-spinner range-min="1" range-step="1" range-max="50" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></div>')($scope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("input");
    expect(element.html()).toContain("button");

    controller = element.controller;

    expect($scope.teamMin).toBe(undefined);
  });

  it('Replaces the element with wrong default value', function() {
    $scope = $rootScope.$new();
    // Compile a piece of HTML containing the directive
    var element = $compile('<div range-spinner range-min="1" range-step="1" range-max="50" range-default-value="60" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></div>')($scope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("input");
    expect(element.html()).toContain("button");

    expect($scope.teamMin).toEqual(1);
  });

});

describe('Unit testing rangeSpinner controller', function() {

  var $scope;
  var $controller;
  var $element;

  // Load the myApp module, which contains the directive
  beforeEach(module('teamapp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function($compile, $rootScope){
    $scope = $rootScope.$new();
    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="15" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');
  }));

  it('rangePlusFunc', inject(function() {

    expect($scope.teamMin).toEqual(15);

    // console.log($element.find('button')[1]);

    $element.find('button')[1].click();

    expect($scope.teamMin).toEqual(16);

  }));

  it('rangeMinusFunc', inject(function() {

    expect($scope.teamMin).toEqual(15);

    // console.log($element.find('button')[0]);

    $element.find('button')[0].click();

    expect($scope.teamMin).toEqual(14);

  }));

});

describe('Unit testing rangeSpinner controller undefined default', function() {

  var $scope;
  var $controller;
  var $element;

  // Load the myApp module, which contains the directive
  beforeEach(module('teamapp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function($compile, $rootScope){
    $scope = $rootScope.$new();
    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');
  }));

  it('rangePlusFunc', inject(function() {

    expect($scope.teamMin).toBe(undefined);

    // console.log($element.find('button')[1]);

    $element.find('button')[1].click();

    expect($scope.teamMin).toEqual(1);

  }));

  it('rangeMinusFunc', inject(function() {

    expect($scope.teamMin).toBe(undefined);

    // console.log($element.find('button')[0]);

    $element.find('button')[0].click();

    expect($scope.teamMin).toEqual(1);

  }));

});

describe('Unit testing rangeSpinner controller special cases', function() {

  var $scope;
  var $controller;
  var $element;

  // Load the myApp module, which contains the directive
  beforeEach(module('teamapp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, $rootScope){
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  it('rangePlusFunc over max', inject(function() {

    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="50" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');

    expect($scope.teamMin).toEqual(50);
    $element.find('button')[1].click();

    expect($scope.teamMin).toEqual(50);

  }));

  it('rangeMinusFunc over min', inject(function() {

    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="1" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');

    expect($scope.teamMin).toEqual(1);

    // console.log($element.find('button')[0]);

    $element.find('button')[0].click();

    expect($scope.teamMin).toEqual(1);

  }));

  it('rangePlusFunc acceptDecimal true', inject(function() {

    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="15" range-decimal-precision="1" range-model="teamMin" accept-decimal=true name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');

    expect($scope.teamMin).toBeCloseTo(15.0);
    $element.find('button')[1].click();

    expect($scope.teamMin).toBeCloseTo(16.0);

  }));

  it('rangeMinusFunc acceptDecimal true', inject(function() {

    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="15" range-decimal-precision="1" range-model="teamMin" accept-decimal=true name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');

    expect($scope.teamMin).toBeCloseTo(15.0);

    // console.log($element.find('button')[0]);

    $element.find('button')[0].click();

    expect($scope.teamMin).toBeCloseTo(14.0);

  }));

  it('scope.watch', inject(function() {

    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="15" range-decimal-precision="1" range-model="teamMin" accept-decimal=false name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');

    expect($scope.teamMin).toEqual(15);
    
    $scope.teamMin = "Hello";
    $scope.$digest();

    expect($scope.teamMin).toEqual(15);

    $scope.teamMin = 100;
    $scope.$digest();

    expect($scope.teamMin).toEqual(50);

    $scope.teamMin = 0;
    $scope.$digest();

    expect($scope.teamMin).toEqual(1);

  }));

  it('scope.watch', inject(function() {

    $element = $compile('<range-spinner range-min="1" range-step="1" range-max="50" range-default-value="15" range-decimal-precision="1" range-model="teamMin" accept-decimal=true name-of-field="rangeFieldName" id-of-field="rangeFieldId"></range-spinner>')($scope);
    $scope.$digest();
    $controller = $element.controller('rangeSpinner');

    expect($scope.teamMin).toBeCloseTo(15);

    $scope.teamMin = 2.11111;
    $scope.$digest();

    expect($scope.teamMin).toBeCloseTo(2.1);

  }));


});