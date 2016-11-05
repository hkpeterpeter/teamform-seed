$(document).ready(function(){

    var asked = false;
    var isLoggedIn = false;

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBQs7H6uLgwYFjxp5CMFOapbKqYM2QaZpc",
        authDomain: "testfblogin-27fb7.firebaseapp.com",
        databaseURL: "https://testfblogin-27fb7.firebaseio.com",
        storageBucket: "testfblogin-27fb7.appspot.com",
        messagingSenderId: "644077378898"
    };
    firebase.initializeApp(config);

    function popupLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();

            // popup
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;

                // debug messages
                console.log(user);

                $("#log").text("Logout");
                $("#log").css('color', '#990000');

                isLoggedIn = true;
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;

                // debug messages
                console.log(errorCode);
                console.log(errorMessage);

                isLoggedIn = false;

                $("#log").text("Login");
                $("#log").css('color', '#009900');

                // if the user close the login popup and igore the login process, give it a login button
                if(errorCode == "auth/popup-closed-by-user") {}

            });
        }


        $("#log").text("Login");
        $("#log").css('color', '#009900');

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // logged in, I should permit it to proceed and holding its info.
            console.log("logged in :)");

            asked = true;
            isLoggedIn = true;

            $("#log").text("Logout");
            $("#log").css('color', '#990000');
        } else {
            // not yet login, I should just pop up a Facebook login page
            console.log("not yet login :(");

                $("#log").text("Login");
                $("#log").css('color', '#009900');

                var provider = new firebase.auth.FacebookAuthProvider();

                if(asked == false) {
                    asked = true;
                    popupLogin();
                }

                isLoggedIn = false;
            }
        });

        $("#log").click(function(){
            if($("#log").text() == "Login") {
                popupLogin();
                console.log("want to login");
            } else {
                // logout
                firebase.auth().signOut().then(function() {
                    console.log("Logged out!");
                    $("#log").text("Logout");
                    $("#log").css('color', '#990000');
                    isLoggedIn = false;
                }, function(error) {
                });            
            }
        });

        $("#btn_admin").click(function(){
            if(isLoggedIn == false) {
                alert("Please Login First :)");
            } else {
               var val = $('#input_text').val();
               if ( val !== '' ) {
                  var url = "admin.html?q=" + val;
                  window.location.href= url ;
                  return false;
              }
          }
      });

        $("#btn_leader").click(function(){
            if(isLoggedIn == false) {
                alert("Please Login First :)");
            } else {
               var val = $('#input_text').val();
               if ( val !== '' ) {
                  var url = "team.html?q=" + val;
                  window.location.href= url ;
                  return false;
              }
          }
      });

        $("#btn_member").click(function(){
            if(isLoggedIn == false) {
                alert("Please Login First :)");
            } else {
               var val = $('#input_text').val();
               if ( val !== '' ) {
                  var url = "member.html?q=" + val;
                  window.location.href= url ;
                  return false;
              }

          }
      });


    });