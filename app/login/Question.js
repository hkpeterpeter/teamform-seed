app.controller("Question", ["$scope", "$firebaseArray","$firebaseObject",
    function($scope, $firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref('Question/Q1');

    $scope.q = {
            question: "",
            a: "",
            b: "",
            c: "",
            d: "",
            ans: ""
    }

     var obj = $firebaseObject(ref);

     // to take an action after the data loads, use the $loaded() promise
     obj.$loaded().then(function() {
        $scope.q.question = obj.q1;
        $scope.q.a = obj.a;
        $scope.q.b = obj.b;
        $scope.q.c = obj.c;
        $scope.q.d = obj.d;
        $scope.q.ans = obj.correct;
    });


    $scope.sumitans = function() {
        if($scope.Qinput == $scope.q.ans){
          console.log("correct");
        }
        else{
          console.log("XXX");
        }
        
    }

  }
]);