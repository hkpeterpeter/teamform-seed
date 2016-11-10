teamapp.controller('homeController', ['$scope',"$rootScope", function($rootScope,$scope) {
  $scope.login = function(providerName) {
  var successFlag = false;
  switch (providerName) {
    case 'google':
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    break;
    case 'twitter':
    var provider = new firebase.auth.TwitterAuthProvider();
    break;
    case 'facebook':
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_friends');
    break;
    case 'github':
    var provider = new firebase.auth.GithubAuthProvider();
    break;
    default:
      // statements_def
      console.log('error login');
      break;
  }

  firebase.auth().signInWithPopup(provider).then(function(result) {

  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(result);

  successFlag = true;
  if (successFlag)
      $('.loginB').toggle();
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(error);
  if (errorCode == 'auth/account-exists-with-different-credential') {
    $('.loginB').toggle();
}
});

};

$scope.login_selected = function() {
      // mainNav.children('ul').removeClass('is-visible');
      $('.cd-user-modal').addClass('is-visible');
      if ($('#cd-login').css('display')==='none')
      {
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

$scope.switcher = function(event) {
  event.preventDefault();
  ( $(event.target).is( $('.cd-switcher').children('li').eq(0).children('a') ) ? $scope.login_selected() : $scope.signup_selected() )
}

$scope.changeVisible = function(event) {

  if( $(event.target).is($('.cd-user-modal')) || $(event.target).is('.cd-close-form') ) {
     $('.cd-user-modal').removeClass('is-visible');
  }
}

}]);