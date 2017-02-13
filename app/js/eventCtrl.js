//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject,Helper,ngDialog) {
		Auth.$onAuthStateChanged(function(authData){
            if (authData){
                $scope.authData = authData;
                //console.log(authData.uid);
                var ref = firebase.database().ref('users/' + authData.uid + '/writable');
                $scope.myEvents = $firebaseObject(ref);

                ref = firebase.database().ref('events');
                $scope.events = $firebaseArray(ref);

                // $scope.AllEvents = $firebaseObject(ref);


                //ref.orderByChild("eventInfo.name").equalTo($scope.input.searchName).on("child_added", function(snapshot) {
                //    console.log(snapshot);
                //});





            }
            else console.log("signed out");
		});




        $scope.input={
            name:"",
            ddl: "",
            min:"",
            max:"",
            desc:"",
            searchName:""
        }




        var dialog;
        $scope.createEventDialog = function(){
            dialog = ngDialog.open({
                template: 'templates/createEvent.html',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        };


        var event = {};
        $scope.submit = function(){

             event = {
                eventInfo:
                {name:"",
                ddl:"",
                min:"",
                max:"",
                desc:""}

            };


            event.eventInfo.name = $scope.input.name;
            event.eventInfo.min = $scope.input.min;
            event.eventInfo.max = $scope.input.max;
            event.eventInfo.desc = $scope.input.desc;



            event.eventInfo.ddl = $scope.input.ddl.toString();

            event.eventInfo.isClosed = false;
            //console.log(event);


            event.eventInfo.admin = $scope.authData.uid;
            Helper.createEvent($scope.authData.uid,event);

            dialog.close();



        }




		console.log("event");
	}
);