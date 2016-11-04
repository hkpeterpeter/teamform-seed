 function verifyLogin() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('user-info').style.display = 'block';
              document.getElementById('name').textContent = user.displayName;
              document.getElementById('email').textContent = user.email;
              if (user.photoURL){
                document.getElementById('photo').src = user.photoURL;
                document.getElementById('photo').style.display = 'block';
              } else {
                document.getElementById('photo').style.display = 'none';
              }
              document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }, null, '  ');
            });
          } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('account-details').textContent = '';
            document.getElementById('user-info').style.display = 'none';
          }
        }, function(error) {
          console.log(error);
        });
      }
function getUID(){
  var uid;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
      uid=user.uid;
      document.getElementById('uid').textContent = user.uid;
      return true;
    }
    else{
      //uid=false;
      document.getElementById('uid').textContent = '';
      return false;
    }
  });
  //return uid;
}
function checkLoginstate(){
  var user = firebase.auth().currentUser;

  if (user) {
    return true;
  } else {
    return false;
  }
}