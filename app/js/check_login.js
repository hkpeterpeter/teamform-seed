initalizeFirebase();
      var initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            // Add refPath of user to users
            var refPath = "users/";
            var ref = firebase.database().ref(refPath);
            var key = ref.key;
            // Check if UID exists in firebase
            ref.once("value").then(function(snapshot){
              var hasUser = snapshot.hasChild(user.uid);
              if (!hasUser)
                var newUser = ref.child(user.uid).set(
                  {"name":user.displayName,
                   "skills":"(placeholder)",
                   "interests":"(placeholder)",
                   //"joined_events": "(placeholder)",
                   //"events_admin": "(placeholder)"

                });
            });

            user.getToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('user-info').style.display = 'block';
              document.getElementById('name').textContent = user.displayName;
              document.getElementById('email').textContent = user.email;
              document.getElementById('showInfo').style.display = 'block';

              if (user.photoURL){
                document.getElementById('photo').src = user.photoURL;
                document.getElementById('photo').style.display = 'block';
              } else {
				photoURL = 'placeholder.svg';
                document.getElementById('photo').src = photoURL;
				document.getElementById('photo').style.display = 'block';
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

              //refPath = "event"

            });
          } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('account-details').textContent = '';
            document.getElementById('user-info').style.display = 'none';
            document.getElementById('showInfo').style.display = 'none';
          }
        }, function(error) {
          console.log(error);
        });
        document.getElementById('sign-out').addEventListener('click', function() {
           firebase.auth().signOut();
  });
      };

      window.addEventListener('load', function() {
        initApp()
      });