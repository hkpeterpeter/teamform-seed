    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBQs7H6uLgwYFjxp5CMFOapbKqYM2QaZpc",
        authDomain: "testfblogin-27fb7.firebaseapp.com",
        databaseURL: "https://testfblogin-27fb7.firebaseio.com",
        storageBucket: "testfblogin-27fb7.appspot.com",
        messagingSenderId: "644077378898"
    };
    firebase.initializeApp(config);

    var storageRef = firebase.storage().ref();

    var app = angular.module("login", []);
    app.controller("LoginController",
        function($scope) {

            $scope.emailText = "";
            $scope.pwText = "";

            $scope.checkPwTyped = function() {
                if ($.trim(($scope.password)) <= 0) {
                    $scope.pwText = "Invalid Input";
                    $("#pwText").css("color", "red");
                } else {
                    $scope.pwText = "Okay";
                    $("#pwText").css("color", "green");
                }
            };

            $scope.checkEmailTyped = function() {
                if ($.trim(($scope.email)) <= 0 || $scope.email.indexOf("@") < 0 || $scope.email.indexOf(".") < 0) {
                    $scope.emailText = "Invalid Input";
                    $("#emailText").css("color", "red");
                } else {
                    $scope.emailText = "Okay";
                    $("#emailText").css("color", "green");
                }
            };

            $scope.submit = function() {
                if ($.trim($scope.email).length < 0 || $.trim($scope.password).length <= 0) {
                    alert("Something missing!");
                    return;
                }

                var email = $scope.email;
                var password = $scope.password;

                firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
                    $("#dialog").dialog('close');
                    $("#loginByMailAndPwDialog").dialog('close');
                    $("#regDialog").dialog('close');

                    $("#email").val("");
                    $("#password").val("");
                    alert("Nice to see you again");

                    $("#log").text("Logout");
                    $("#log").css('color', '#990000');

                    isLoggedIn = true;


                    console.log('logged in:', user);
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    // dubug msgs
                    console.log(errorCode);
                    console.log(errorMessage);

                    if (errorCode == "auth/invalid-email") {
                        alert("Email format not correct!");
                    } else {
                        alert("Email or password is wrong!");
                    }
                });

            }
        });

    // var appp = angular.module("reg", []);
    app.controller("RegController",
        function($scope) {
            $scope.emailTextReg = "";

            $scope.checkEmailTypedd = function() {
                if ($.trim(($scope.emailReg)) <= 0 || $scope.emailReg.indexOf("@") < 0 || $scope.emailReg.indexOf(".") < 0) {
                    $scope.emailTextReg = "Invalid Input";
                    $("#emailTextReg").css("color", "red");
                } else {
                    firebase.auth().fetchProvidersForEmail($scope.emailReg).then(function(user) {
                        $scope.emailTextReg = "Okay";
                        $("#emailTextReg").css("color", "green");
                    }).catch(function(error) {
                        $scope.emailTextReg = "Invalid Input";
                        $("#emailTextReg").css("color", "red");
                    });
                }
            };

            $scope.submit = function() {
                if ($.trim($scope.emailReg).length < 0 || $.trim($scope.namee).length <= 0 ||
                    $.trim($scope.passwordReg).length <= 0 || $.trim($scope.passwordAgainReg).length <= 0 ||
                    $.trim($scope.date).length <= 0) {
                    alert("Something missing!");
                    return;
                } else if ($.trim($scope.passwordReg) != $.trim($scope.passwordAgainReg)) {
                    alert("Password is not consistant!");
                    return;
                } else if ($.trim($scope.passwordReg).length < ($scope.passwordReg).length || $.trim($scope.passwordAgainReg).length < ($scope.passwordAgainReg).length) {
                    alert("Password should not contain any space!");
                    return;
                }

                var email = $scope.emailReg;
                var password = $scope.passwordReg;
                var bDate = $scope.date;
                var name = $scope.namee;

                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                    $("#dialog").dialog('close');
                    $("#loginByMailAndPwDialog").dialog('close');
                    $("#regDialog").dialog('close');

                    $scope.emailReg = "";
                    $scope.passwordReg = "";
                    $scope.date = "";
                    $scope.namee = "";
                    $("#email").val("");
                    $("#password").val("");
                    $("#date").val("");
                    $("#name").val("");

                    alert("Welcome!");

                    $("#log").text("Logout");
                    $("#log").css('color', '#990000');

                    isLoggedIn = true;

                    if ($("#pImg").val().length > 0) {
                        var file = $('#pImg')[0].files[0];
                        // console.log(file);

                        var imagesRef = storageRef.child(email);

                        imagesRef.put(file).then(function(snapshot) {
                            console.log(snapshot);
                            var URL = snapshot.downloadURL;

                            user.updateProfile({
                                displayName: name,
                                photoURL: URL,
                                birthday: bDate
                            }).then(function() {
                                // Update successful.
                            }, function(error) {
                                // An error happened.
                            });
                        });
                    }

                    user.updateProfile({
                        displayName: name,
                        birthday: bDate
                    }).then(function() {
                        // Update successful.
                    }, function(error) {
                        // An error happened.
                    });

                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode == "auth/email-already-in-use") {
                        alert("Email is already registered");
                    } else if (errorCode == "auth/invalid-email") {
                        alert("Email format not correct!");
                    } else {
                        alert("Password is too weak, don't be afraid of hackers?");
                    }
                });

            }
        });

    $(document).ready(function() {

        window.fbAsyncInit = function() {
            FB.init({
                appId: '1695218640719140',
                xfbml: true,
                version: 'v2.0'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // init dialogs
        $("#dialog").dialog();
        $("#loginByMailAndPwDialog").dialog();
        $("#regDialog").dialog();
        $("#dialog").dialog('close');
        $("#loginByMailAndPwDialog").dialog('close');
        $("#regDialog").dialog('close');

        var asked = false;
        var isLoggedIn = false;
        var user;
        var token;

        function checkCurUser() {
            var user = firebase.auth().currentUser;
            if (user) {
                console.log(user);
            }
            return user;
        }


        function popupLogin() {
            var provider = new firebase.auth.FacebookAuthProvider();
            // popup
            firebase.auth().signInWithPopup(provider).then(function(result) {
                token = result.credential.accessToken;
                user = result.user;

                // debug messages
                console.log(result);

                $("#log").text("Logout");
                $("#log").css('color', '#990000');

                isLoggedIn = true;

                FB.login(function(response) {
                    // handle the response
                    console.log(response);
                }, {
                    scope: 'public_profile,user_birthday',
                    return_scopes: true
                });

                FB.api(
                    '/' + user.providerData[0].uid, {
                        fields: "id,about,age_range,picture,bio,birthday,context,email,first_name,gender,hometown,link,location,middle_name,name,timezone,website,work"
                    },
                    function(response) {
                        console.log(response);
                    } // , 
                    // {access_token: token}
                );

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
                if (errorCode == "auth/popup-closed-by-user") {}

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

                isLoggedIn = false;
            }
        });

        $("#loginByMailAndPwFormOld").submit(function(event) {
            if ($.trim($("#email").val()).length < 0 || $.trim($("#password").val()).length <= 0) {
                alert("Something missing!");
                return;
            }

            var email = $("#email").val();
            var password = $("#password").val();

            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
                $("#dialog").dialog('close');
                $("#loginByMailAndPwDialog").dialog('close');
                $("#regDialog").dialog('close');

                $("#email").val("");
                $("#password").val("");
                alert("Nice to see you again");

                $("#log").text("Logout");
                $("#log").css('color', '#990000');

                isLoggedIn = true;


                console.log('logged in:', user);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                // dubug msgs
                console.log(errorCode);
                console.log(errorMessage);

                if (errorCode == "auth/invalid-email") {
                    alert("Email format not correct!");
                } else {
                    alert("Email or password is wrong!");
                }
            });
        });

        $("#RegByMailAndPwFormOld").submit(function(event) {
            if ($.trim($("#emailReg").val()).length < 0 || $.trim($("#name").val()).length <= 0 ||
                $.trim($("#passwordReg").val()).length <= 0 || $.trim($("#passwordAgainReg").val()).length <= 0 ||
                $.trim($("#date").val()).length <= 0) {
                alert("Something missing!");
                return;
            } else if ($.trim($("#passwordReg").val()) != $.trim($("#passwordAgainReg").val())) {
                alert("Password is not consistant!");
                return;
            } else if ($.trim($("#passwordReg").val()).length < ($("#passwordReg").val()).length) {
                alert("Password should not contain any space!");
                return;
            }

            var email = $("#emailReg").val();
            var password = $("#passwordReg").val();
            var bDate = $("#date").val();
            var name = $("#name").val();

            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                $("#dialog").dialog('close');
                $("#loginByMailAndPwDialog").dialog('close');
                $("#regDialog").dialog('close');

                $("#email").val("");
                $("#password").val("");
                $("#date").val("");
                $("#name").val("");

                alert("Welcome!");

                $("#log").text("Logout");
                $("#log").css('color', '#990000');

                isLoggedIn = true;

                if ($("#pImg").val().length > 0) {
                    var file = $('#pImg')[0].files[0];
                    // console.log(file);

                    var imagesRef = storageRef.child(email);

                    imagesRef.put(file).then(function(snapshot) {
                        console.log(snapshot);
                        var URL = snapshot.downloadURL;

                        user.updateProfile({
                            displayName: name,
                            photoURL: URL,
                            birthday: bDate
                        }).then(function() {
                            // Update successful.
                        }, function(error) {
                            // An error happened.
                        });
                    });
                }

                user.updateProfile({
                    displayName: name,
                    birthday: bDate
                }).then(function() {
                    // Update successful.
                }, function(error) {
                    // An error happened.
                });

            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode == "auth/email-already-in-use") {
                    alert("Email is already registered");
                } else if (errorCode == "auth/invalid-email") {
                    alert("Email format not correct!");
                } else {
                    alert("Password is too weak! Will you afraid of hackers?");
                }
            });
        });

        function previewMethod(input) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('#preview').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            } else {
                $('#preview').attr('src', "#");
            }
        }

        $("#pImg").change(function() {
            previewMethod(this);
        });


        $("#log").click(function() {

            if ($("#log").text() == "Login") {
                $("#loginByMailAndPwDialog").dialog('close');
                $("#regDialog").dialog('close');
                $("#dialog").dialog();
                console.log("want to login");
            } else {
                // logout
                firebase.auth().signOut().then(function() {
                    console.log("Logged out!");
                    $("#log").text("Logout");
                    $("#log").css('color', '#990000');
                    isLoggedIn = false;
                    alert("Logout! See you again :)");
                }, function(error) {});
            }
        });

        $("#loginByFb").click(function() {
            if (isLoggedIn == false) {
                popupLogin();
                $("#dialog").dialog('close');
                $("#loginByMailAndPwDialog").dialog('close');
                $("#regDialog").dialog('close');
            } else {
                alert("You have logged in!");
            }
        });

        $("#loginByMailAndPw").click(function() {
            if (isLoggedIn == false) {
                $("#dialog").dialog('close');
                $("#regDialog").dialog('close');
                $("#loginByMailAndPwDialog").dialog();
            } else {
                alert("You have logged in!");
            }
        });

        $("#reg").click(function() {
            if (isLoggedIn == false) {
                $("#dialog").dialog('close');
                $("#loginByMailAndPwDialog").dialog('close');
                $("#regDialog").dialog();
            } else {
                alert("You have logged in!");
            }
        });

        $("#btn_admin").click(function() {
            if (isLoggedIn == false) {
                alert("Please Login First :)");
            } else {
                var val = $('#input_text').val();
                if (val !== '') {
                    var url = "admin.html?q=" + val;
                    window.location.href = url;
                    return false;
                }
            }
        });

        $("#btn_leader").click(function() {
            if (isLoggedIn == false) {
                alert("Please Login First :)");
            } else {
                var val = $('#input_text').val();
                if (val !== '') {
                    var url = "team.html?q=" + val;
                    window.location.href = url;
                    return false;
                }
            }
        });

        $("#btn_member").click(function() {
            if (isLoggedIn == false) {
                alert("Please Login First :)");
            } else {
                var val = $('#input_text').val();
                if (val !== '') {
                    var url = "member.html?q=" + val;
                    window.location.href = url;
                    return false;
                }

            }
        });
    });