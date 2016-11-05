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
            user.getToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('user-info').style.display = 'block';
              document.getElementById('name').textContent = user.displayName;
              document.getElementById('email').textContent = user.email;
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
        document.getElementById('sign-out').addEventListener('click', function() {
           firebase.auth().signOut();
  });
      };

      window.addEventListener('load', function() {
        initApp()
      });