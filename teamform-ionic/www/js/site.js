//dummy unit test function, do not remove
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//initialize firebase, contains private data
function initFirebase(){
	var config = {
		apiKey: "AIzaSyCx3wDpNbZeGOAGC8M0o5iga25u-rwZQz4",
		authDomain: "teamform-private.firebaseapp.com",
		databaseURL: "https://teamform-private.firebaseio.com",
		storageBucket: "teamform-private.appspot.com",
		messagingSenderId: "1057843613552"
	};
	firebase.initializeApp(config);
}