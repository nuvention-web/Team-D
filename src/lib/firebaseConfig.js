// Set the configuration for your app
// TODO: Replace with your project's config object

var config = {
  apiKey: "AIzaSyDGVgWOA1eNcozKUjk7YWHqDqy5gbvnvsY",
  authDomain: "gender-bias-detector.firebaseapp.com",
  databaseURL: "https://gender-bias-detector.firebaseio.com",
  projectId: "gender-bias-detector",
  storageBucket: "gender-bias-detector.appspot.com",
  messagingSenderId: "444524432821"
};
firebase.initializeApp(config);
console.log("Firebase Initialized");

const database = firebase.database();

// Store dummy data to firebase
database.ref('test/').set(
  {
    name: "Lenny"
  }
);

// Print fetched data from firebase
database.ref('test/').on("value", function(snapshot) {
  console.log("Fetch data from Firebase");
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// Get a reference to the database service
// export const database = firebase.database();