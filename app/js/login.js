

$(document).ready(function(){

    initalizeFirebase();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("Provider-specific UID: "+profile.uid);
      console.log("Name: "+profile.displayName);
      console.log("Email: "+profile.email);
      console.log("Photo URL: "+profile.photoURL);
      $('#user_name').html(profile.displayName);
      $('#user_name2').text(profile.displayName);
      $('.user-image').attr('src',profile.photoURL);
      $('.img-circle').attr('src',profile.photoURL);
    });

    } else {
      // No user is signed in.
    }
    });




});

function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });



}
function isUserEqual(googleUser, firebaseUser)
{
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

function signOut()
{
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      location.reload();
    });
}
