// from http://blog.stackhive.com/post/114386894969/login-sign-up-and-a-real-time-app-using-firebase
var firebaseref = new Firebase("https://project-5db83.firebaseio.com")

$("#login-btn").on('click', function()
{
    var email = $("#login-email").val();
    var password = $("#login-password").val();
    firebaseref.authWithPassword({
        email: email,
        password: password
    },
    function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    });
  });

$("#signup-btn").on('click', function()
{
  var email = $("#email").val();
  var password = $("#password").val();
  firebaseref.createUser({
    email: email,
    password: password
  },function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    }
    else {
      console.log("Successfully created user account with uid:", userData.uid);
      //additionally, you can log the user in right after the signup is successful and add more data about the user like name etc.
    }
  });
});
//Callback for Auth Changes
var authDataCallback = function(authData)
{
      //authData is the object sent by Firebase in the callback.
      if (authData) {
          console.log("User " + authData.uid + " is logged in");
      }
      else {
          console.log("User is logged out");
      }
}

//register a callback for the change in Authentication Status
firebaseref.onAuth(authDataCallback);
