//var config = {
//    apiKey: "AIzaSyAVbRf9lY-uCjVhhrq9Rl9AuWaZnZROFlA",
//    authDomain: "pk01-33b28.firebaseapp.com",
//    databaseURL: "https://pk01-33b28.firebaseio.com",
//    storageBucket: "pk01-33b28.appspot.com",
//    messagingSenderId: "397595280376"
//};
//firebase.initializeApp(config);



var app = angular.module("testApp", ["firebase"]);
app.controller("eventSubmit",
               
    function($scope, $firebaseArray){
            

        $scope.input = {
            name:"",
            intro:"",
            holder:"",
            state:false,
            member:""
            };

        var ref=firebase.database().ref("events");
        $scope.event = $firebaseArray(ref);
                
        $scope.submit = function() {
                    //$scope.input.state=true;
                    //$scope.input.holder=1;
                    ////$scope.input.holder=
                    //$scope.event.$add($scope.input);
                    //window.alert("Event create success!");
                    //$scope.input.intro= "";
                    //$scope.input.name= "";
                    //$scope.nameTouched = false;
                var event=firebase.database().ref("events"); 
                return (event.push().set($scope.input));
                };

        }
                         
);
               