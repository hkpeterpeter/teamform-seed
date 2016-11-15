var firebase = {
    database: function () {
        return new window.MockFirebase("");
    }
};

describe('Test team.js', function () {
    var firebaseParam = {
        $loaded: function () {
            return {
                then: function (func) {
                    return {
                        catch: function (func) {
                            return [];
                        }
                    }
                }
            };
        }
    };

    var $firebaseObject = function () {
        return firebaseParam;
    };

    var $firebaseArray = function () {
        return [];
    };

    var $rootScope, $state, $controller;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        createController = function () {
            return $controller('TeamCtrl', {
                '$scope': $rootScope,
                '$firebaseObject': $firebaseObject,
                '$firebaseArray': $firebaseArray,
                '$stateParams': {},
                '$state': $state
            });
        };
    }));

    /*it('sets initial values', function () {
        createController($firebaseObject, $firebaseArray);
        expect($rootScope.param).toBe({"teamName":'',"currentTeamSize":0,"teamMembers":[]});
    });*/

    it('changes team size within boundries', function () {
      var controller = createController();
      $rootScope.range.minTeamSize =1;
      $rootScope.range.maxTeamSize =3;
      $rootScope.param.currentTeanSize =1;
      expect($rootScope.changeCurrentTeamSize(-1)).toBe(1);
      expect($rootScope.changeCurrentTeamSize(1)).toBe(2);
      expect($rootScope.changeCurrentTeamSize(3)).toBe(3);
    });

    it('saveFunc works', function () {
      var controller = createController();
      $rootScope.saveFunc();
      expect($rootScope.param.$save).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
    });

    it('deleteFunc works if confirmed', function () {
      var teamID = $.trim( $scope.param.teamName );		
		var refPath = eventName + "/team/" + teamID ;
		ref = firebase.database().ref(refPath);
		ref.remove();
      var controller = createController('$stateParams'= {"teamName":'example',"currentTeamSize":0,"teamMembers":[]});
      spyOn(window, 'confirm').and.returnValue(true);
      $rootScope.deleteFunc();
      expect($rootscope.param.teamName).toHaveBeenCalled();
    });

    it('deleteFunc does not deleteTeam if denied', function () {
      var controller = createController();
      spyOn(window, 'confirm').and.returnValue(false);
      $rootScope.deleteFunc();
    });

});
