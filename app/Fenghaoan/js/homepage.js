teamapp.controller('homeController', ['$scope',"$rootScope" , function($rootScope,$scope) {



  // For stupid test case, comment out the only useful function here

  $scope.loginhelper = function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  // var user = result.user;
  localStorage.setItem('loginStatus', true);

  successFlag = true;

  if (successFlag) {
      // $('.loginB').toggle();
      $('.cd-user-modal').removeClass('is-visible');
      $('.loginB').css('display', 'none');
    }

    var data = result.user.providerData[0];
    $rootScope.loginWithEmail(data['email']);

    if ($rootScope.currentUser['id'] == 0) {
      var newUser = {
        eventsManaging:[],
        email:data['email'],
        name:data['displayName'],
        notifis:[],
        profilePic:data['photoURL'],
        skills:[],
        teamsApplying:[],
        teamsAsLeader:[],
        teamsAsMember:[]
      };

      $rootScope.addUser(newUser);

      console.log("user added");

      //$rootScope.loginWithEmail(data['email']);
    }
    if ($rootScope.currentUser.yanzhi == undefined || $rootScope.currentUser.yanzhi == "None") {
  　　 $rootScope.yanzhi($rootScope.currentUser.profilePic, function(res) {

          if (res != "failed") {
            console.log(res);
            $rootScope.user_ref.child($rootScope.currentUser.$id).child("yanzhi").set(res);
          } else {
            console.log("get yanzhi failed");
          }

      });
    }
    console.log($rootScope.currentUser['name']);
    // $rootScope.test();
     $rootScope.initilizaNofi();
  };

  $scope.loginErrorHandler = function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(error);
  if (errorCode == 'auth/account-exists-with-different-credential') {
    // $('.loginB').toggle();
    $rootScope.loginWithEmail(email);
    localStorage.setItem('loginStatus', true);
    console.log($rootScope.currentUser['name']);
    location.assign('#');
  }
};

  // Login helper functions
  $scope.login = function(providerName) {
    var successFlag = false;
    switch (providerName) {
      case 'google':
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      break;
    // case 'twitter':
    // var provider = new firebase.auth.TwitterAuthProvider();
    // break;
    case 'facebook':
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_friends');
    break;
    // case 'github':
    // var provider = new firebase.auth.GithubAuthProvider();
    // break;
    default:
      // statements_def
      console.log('error login');
      return;
    }

    firebase.auth().signInWithPopup(provider).then($scope.loginhelper).catch($scope.loginErrorHandler);

};

$scope.i = 0;

$scope.login_selected = function() {
      // mainNav.children('ul').removeClass('is-visible');
      // $('.cd-user-modal').addClass('is-visible');
      // $scope.cdUserModal = ;
      // $scope.cdUserModal.addClass('is-visible');

      $('.cd-user-modal').addClass('is-visible');
      // $('#cd-login').css('display', 'none');

      // if ($('#cd-login').css('display')==='none')
      // {
        // $('#cd-login').toggle();
      // }
      // console.log( $('.loginB').css('display') != 'none' && $('#cd-login').css('display') == 'none' );

      // if ( ($('.loginB').css('display') != 'none' && $('#cd-login').css('display') == 'none') ) {
      //   $('#cd-login').toggle();
      // }

      if ($scope.i++ == 0) {
        $('#cd-login').toggle();
      }
      // formLogin.addClass('is-selected');
      // formSignup.removeClass('is-selected');
      // formForgotPassword.removeClass('is-selected');
      $('.cd-switcher').children('li').eq(0).children('a').addClass('selected');
      // tabSignup.removeClass('selected');
    };

    $scope.signup_selected = function(){
      // mainNav.children('ul').removeClass('is-visible');
      $('.cd-user-modal').addClass('is-visible');
      // formLogin.removeClass('is-selected');
      // formSignup.addClass('is-selected');
      // formForgotPassword.removeClass('is-selected');
      $('.cd-user-modal').removeClass('selected');
      // tabSignup.addClass('selected');
    };

    // $scope.switcher = function(event) {
    //   event.preventDefault();
    //   $(event.target).is( $('.cd-switcher').children('li').eq(0).children('a') ) ? $scope.login_selected() : $scope.signup_selected();
    //   // $scope.login_selected();
    // }

$scope.features = [
{
  image_path: "Fenghaoan/images/invite_people.png",
  title: "Invite People",
  content: "From this powerful platform, you can invite your friends to join more and more insteresting events. Invite them now!",
  flip: "true"
},
{
  image_path: "Fenghaoan/images/skill_visualization.png",
  title: "Skill Vision",
  content: "Impressive skills of your potential teammates and yourself are shown in a radar chart. Inviting skillful friends and being invited has been unprecedentedly easy. Have fun!",
  flip: "false"
},
{
  image_path: "Fenghaoan/images/smart.png",
  title: "Smart Pick Team Member",
  content: "Power up your team with appropriate people. Get to know the right person your team need. Helping team leaders to target suitable candidate with desired characteristics.",
  flip: "true"
},
{
  image_path: "Fenghaoan/images/merge.png",
  title: "Merge Team",
  content: "Sometimes your team may need more members to join an event. This platform reduces the pressure to negotiate with other teams. Based on the skills and other factors, we merge the suitable team just before dead line for you.",
  flip: "false"
},
{
  image_path: "Fenghaoan/images/private.jpg",
  title: "Private Team",
  content: "Now you can create your own team with close friends and strangers cannot see your team. You can still invite them as long as you want. Enjoy it.",
  flip: "true"
},

];

$scope.developers = [
{
  name: "ZHU XINYU",
  image: "Fenghaoan/images/zhu.jpg",
  content: "I am a mainland now studying in the Hong Kong University of Science and Technology (HKUST). I love programming and computer and I take computer science as my major. My UROP project is about localization. ",
  personal_website: "http://ec2-54-244-172-98.us-west-2.compute.amazonaws.com/personalPage2/index1.html",
  flip: "true"
},
{
  name: "ZHAO LUCEN",
  image: "Fenghaoan/images/cen.jpg",
  content: "ヽ(・×・´)ゞε٩(๑> ₃ <)۶зヾ(*´3 ˋ*)ﾉ(๑• . •๑)(´,,•ω•,,)<br/>COMP year-3 student, being in charge of the development of admin page <br/>Features developed: merging/deleting teams, adding team members by event admin, searching teams/users by event admin<br/>ヽ(・×・´)ゞε٩(๑> ₃ <)۶зヾ(*´3 ˋ*)ﾉ(๑• . •๑)(´,,•ω•,,)",
  personal_website: "http://ihome.ust.hk/~lzhaoaj/index.html",
  flip: "false"
},
{
  name: "FENG HAOAN",
  image: "Fenghaoan/images/feng.gif",
  content: "Year three CSE and ECE student from Xi'an. Generally speaking, major strength in generating bugs and warning. Have special interest in embedded system programming and computer network related work. Love programming, while she does not like me lol.",
  personal_website: "http://ec2-52-53-158-46.us-west-1.compute.amazonaws.com/mywebsite/",
  flip: "true"
},
{
  name: "WU JENNY",
  image: "Fenghaoan/images/wu.jpg",
  content: "I am a Taiwanese girl now studying in the Hong Kong University of Science and Technology (HKUST). I love programming and computer so I take computer science as my major. Information security is the area which I am especially interested now. My final year thesis is also about this area and focuses on that on Internet of Things (IoT). ",
  personal_website: "http://ec2-54-210-139-28.compute-1.amazonaws.com",
  flip: "false"
},
{
  name: "ZHAO ZIXUAN",
  image: "Fenghaoan/images/zhao.png",
  content: "I am a third year student studying mathematics and computer science at HKUST. I am not interesting, you don't want to know more about me.",
  personal_website: "http://ihome.ust.hk/~zzhaoah/comp3111h-homepage/index.html",
  flip: "true"
},
{
  name: "HE ZHOU",
  image: "Fenghaoan/images/he.jpg",
  content: "I am Samuel, from the Dual Degree Program in Computer Science and Business Management. Being inherently enthusiastic about cutting-edge technologies, I am looking forward to more opportunities to explore the disruptive innovations in computer science.",
  personal_website: "http://ihome.ust.hk/~zhead",
  flip: "false"
},
{
  name: "BAI CHUNYAN",
  image: "Fenghaoan/images/bai.jpg",
  content: "I am a penultimate year student majoring in Mathematics and Computer Science. I am interested in everything about programming and good at some of them.",
  personal_website: "http://ec2-52-221-227-107.ap-southeast-1.compute.amazonaws.com/",
  flip: "true"
},
{
  name: "JIA HE",
  image: "Fenghaoan/images/jia.jpg",
  content: "I am a third-year undergraduate student at Hong Kong University of Science and Technology (HKUST). I love programming and mathematics so I take computer science as my first major and pure math as my second major. Machine learning is the area which I am especially interested now.",
  personal_website: "http://ec2-52-11-218-218.us-west-2.compute.amazonaws.com",
  flip: "false"
},
];
}]);

teamapp.directive('featureCard', function() {
  return {
    restrict: 'E',
    templateUrl: "Fenghaoan/js/featureCard.html",
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
});

teamapp.directive('developerCard', function() {
  return {
    restrict: 'E',
    templateUrl: "Fenghaoan/js/developerCard.html",
    replace: true,
    link: function($scope, iElm, iAttrs, controller) {

    }
  };
});
