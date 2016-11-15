describe('Test login.js', function () {

    var firebase = {
        database: function () {
            return {
                ref: function (item1) {
                    return {
                        once: function (item2) {
                            return {
                                then: function (func) {
                                    func();
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    var $rootScope, $state, $injector;
    beforeEach(function () {

        module('teamform');

        inject(function (_$rootScope_, _$state_, _$injector_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
        })
    });


    it('goes to admin', function ($state) {
        //browser.get('http://localhost:8080/index.html#/login');
        //element(by.model('LoginCtrl')).goToAdmin
        $scope.goToAdmin();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('admin',$stateParams);
    });
    
    it('goes to team', function ($state) {
        $scope.goToTeam();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('team',$stateParams);
    });
    
    it('goes to member', function ($state) {
        $scope.goToMember();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('member',$stateParams);
    });
    
    
});
