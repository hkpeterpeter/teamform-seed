var app = angular.module("personal_info", ["firebase"]);

app.factory("userInformation", ["$firebaseArray",
	function($firebaseArray){
        var ref = new Firebase("https://comp3111-bb108.firebaseio.com/")

        return $firebaseArray(ref);
    }
)

app.controller ("userInformationControl", ["$scope", "userInformation",  
    function($scope, userInformation){            

    $scope.information = userInformation;            
                
    $scope.addInformation = function() {
        $scope.information.$add({
                username:"",
                createdate:"",
                fullname:"",
                nickname:"",
                email:"",
                college:"",
                education:"",
                joinedteam:"",
                skills:"",
                contact:""
        })
                    
    };
                
                var ref=firebase.database().ref("userinfo");
                $scope.event = $firebaseArray(ref);
                
                $scope.submit = function() {
                    
                    if($scope.input.name!==""&&$scope.input.intro!==""){
                        $scope.input.state=true;
                        $scope.input.holder=1;
                        //$scope.input.holder=
                        $scope.event.$add($scope.input);
                        $scope.input.intro= "";
                        $scope.input.name= "";
                    }
                    
                    
                };
                
				 // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
               
               
]);
/*              
Username
Account Create date
Full name
Nickname
Email
College
Education
Joined Team
Skills
Personal Contact*/