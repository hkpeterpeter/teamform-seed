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
//            if(firebase.user!=null){
            if(firebase.auth().currentUser){
                if($scope.input.name!==""&&$scope.input.intro!==""){
                    $scope.input.state=true;
                    $scope.input.holder=1;
                    //$scope.input.holder=
                    $scope.event.$add($scope.input);
                    window.alert("Event create success!");
                    $scope.input.intro= "";
                    $scope.input.name= "";
                    $scope.nameTouched = false;
                }
			}
            else{
                window.alert("Please sign in first!");
            }
            
        };
        //<span ng-show="eventForm.newEventName.$touched && eventForm.newEventName.$invalid">The event name is required.</span>
            $scope.nameTouched = false;
            $scope.introTouched = false;
            $scope.submitDisable = false;
            $scope.nameErrorMessage = function() {
                $scope.submitDisable = false;
                if($scope.eventForm.newEventName.$touched)$scope.nameTouched= true;
                if($scope.nameTouched&&$scope.eventForm.newEventName.$invalid){
                    return "The event name is required!";
                }
                ref.orderByChild("name").equalTo($scope.input.name).once("child_added",function(){
                    $scope.submitDisable = true;
                });
                if($scope.submitDisable){
                    return "The event name is existed!";
                }
            };
            $scope.introErrorMessage = function() {
                if($scope.eventForm.newEventIntro.$touched)$scope.introTouched= true;
                if($scope.introTouched&&$scope.eventForm.newEventIntro.$invalid){
                    return "The event name is required!";
                }
            };

            
                
    
               
               
    });
               