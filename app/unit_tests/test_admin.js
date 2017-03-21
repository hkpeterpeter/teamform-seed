describe('AdminCtrl', function() {
    beforeEach(module('teamform-admin-app', 'firebase'));

    var $controller;

    beforeEach(inject(function($rootScope, _$controller_, $firebaseArray, $sce) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $controller = $controller('AdminCtrl', { $scope: $scope, $firebaseArray: $firebaseArray, $sce: $sce });
    }));

    it("test", function() { 
        adminReadyInit();
        $scope.loadInit();
        $scope.loadInitCatch();
        $scope.changeMinTeamSize(3);
        $scope.changeMaxTeamSize(3);
        $scope.saveFunc();
    });
});