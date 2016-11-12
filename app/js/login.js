$(document).ready(function() {

	// initalizeFirebase();

	$(".alert.alert-danger").hide();

	$(".facebook").click(function() {
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
			console.log(user.displayName + " " + user.uid);
			var refPath = "user/" + user.uid;
			var ref = firebase.database().ref(refPath);
			ref.set({
				name: user.displayName
			}).then(function() {
				window.location.href= "index.html";
			});
		}).catch(function(error) {
			console.log(error.message);
		});
	});

	$("#login-submit").click(function(e) {
		e.preventDefault();
		var email = $("#login #email").val();
		var password = $("#login #password").val();
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code;
			console.log(errorCode);
			$(".alert.alert-danger").show();
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				$(".alert.alert-danger strong").text('Wrong password');
			} else if(errorCode === 'auth/invalid-email') {
				$(".alert.alert-danger strong").text('Wrong email format');
			} else {
				$(".alert.alert-danger strong").text('Incorrect email or password');
			}
			$(".alert.alert-danger").fadeTo(2000, 500).slideUp(500, function(){
            	$(".alert.alert-danger").slideUp(500);
            });
			console.log(error);
		}).then(function() {
			var user = firebase.auth().currentUser;
			if(user) {
				var refPath = "user/" + user.uid;
				console.log(refPath);
				var ref = firebase.database().ref(refPath);
				ref.set({
					name: user.displayName
				});
				window.location.href = "index.html";
			}
		});
	});

	$("#signup-submit").click(function() {
		var uname = $("#signup #displayname").val();
		var email = $("#signup #email").val();
		var pw = $("#signup #password").val();
		firebase.auth().createUserWithEmailAndPassword(email, pw).then(function() {
			var user = firebase.auth().currentUser;
			if(user) {
				var refPath = "user/" + user.uid;
				var ref = firebase.database().ref(refPath);
				user.updateProfile({
			  		displayName: uname
				}).then(function() {
					ref.set({
						name: uname
					}).then(function() {
						alert('User sign up complete');
					});
				});
				user.sendEmailVerification().then(function() {
					alert('Email Verification Sent! Check your email to verify your account');
					window.location.href = "index.html";
				});
			}			
		});
	});

	$("#forgot-pw-submit").click(function() {
		var email = $("#forgot-pw-email").val();
		console.log(email);
		firebase.auth().sendPasswordResetEmail(email).then(function() {
			alert("Password Reset Email Sent! Check your email to reset your password");
			window.location.href = "login.html";
		}, function(error) {
		  console.log(error.message);
		});
	});

    $('#login-form-link').click(function(e) {
    	$("#signup").fadeOut(100);
    	$("#forgot-pw").fadeOut(100);
		$("#login").delay(100).fadeIn(100);
		$('#signup-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#signup-form-link').click(function(e) {
		$("#login").fadeOut(100);
		$("#forgot-pw").fadeOut(100);
		$("#signup").delay(100).fadeIn(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('.forgot-password').click(function(e) {
		$("#login").fadeOut(100);
		$("#forgot-pw").delay(100).fadeIn(100);
		$('#login-form-link').removeClass('active');
	});
	$('#cancel-forgot-pw').click(function(e) {
		$("#forgot-pw").fadeOut(100);
		$("#login").delay(100).fadeIn(100);
		$('#login-form-link').addClass('active');
	});

	$("#hidePw").click(function() {
		if($("#hidePw").text() === "Show") {
			$("#signup #password").prop("type", "text");
			$("#hidePw").text("Hide");
		}
		else if($("#hidePw").text() === "Hide") {
			$("#signup #password").prop("type", "password");
			$("#hidePw").text("Show");
		}
	});

});

// function initalizeFirebase() {
//   var config = {
//     apiKey: "AIzaSyDpVqVvHIhoL6i02-hNzKFwq4UfLFAakAQ",
//     authDomain: "team-anonymous-team-forming.firebaseapp.com",
//     databaseURL: "https://team-anonymous-team-forming.firebaseio.com",
//     storageBucket: "team-anonymous-team-forming.appspot.com",
//     messagingSenderId: "903294276428"
//   };
//   firebase.initializeApp(config);
// }
