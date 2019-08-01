import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC_g8hoMiUfGzmdIh1M01xqcGcBFzA-laU",
    authDomain: "test-e9de6.firebaseapp.com",
    databaseURL: "https://test-e9de6.firebaseio.com",
    projectId: "test-e9de6",
    storageBucket: "",
    messagingSenderId: "482350029084",
    appId: "1:482350029084:web:dfdf686d27b33c83"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase