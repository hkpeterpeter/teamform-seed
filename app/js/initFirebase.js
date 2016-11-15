function initFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
        authDomain: "comp3111-5fbe5.firebaseapp.com",
        databaseURL: "https://comp3111-5fbe5.firebaseio.com",
        storageBucket: "comp3111-5fbe5.appspot.com",
        messagingSenderId: "946291658553"
    };
    firebase.initializeApp(config);
}