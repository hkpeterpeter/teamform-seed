describe("HelloController", function() {

    var $scope;

    beforeEach(module('HelloControllerApp'));

    beforeEach(inject(function($rootScope, $controller){

        $scope = $rootScope.$new();
        $controller('HelloController', {$scope: $scope});

    }));

    it('username is World', function() {

        expect($scope.username).toEqual("World");

    });

    it('username is World', function() {

        expect($scope.sayHello()).toEqual("Hello" + $scope.username + "!");

    });

    it('username is Even', function() {

        $scope.username = "";

        var len = $scope.username.length;
        var isEven = false;

        if((len % 2) == 0)
            isEven = 'even';
            else
            isEven = 'odd';

        expect($scope.sayOddEven()).toEqual(isEven);

    });

    it('username is Odd', function() {

        $scope.username = "1";

        var len = $scope.username.length;
        var isEven = false;

        if((len % 2) == 0)
            isEven = 'even';
            else
            isEven = 'odd';

        expect($scope.sayOddEven()).toEqual(isEven);

    });

});
