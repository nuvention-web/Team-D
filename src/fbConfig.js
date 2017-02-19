// Set the configuration for your app
// TODO: Replace with your project's config object

var config = {
  apiKey: "AIzaSyBUD7AywWjXmiVpsrurJs2DgFwdQ1P5VeM",
  authDomain: "videoanalytics-bb52a.firebaseapp.com",
  databaseURL: "https://videoanalytics-bb52a.firebaseio.com",
  // storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
console.log("Firebase Initialized");

const database = firebase.database();

// Store dummy data to firebase
database.ref('test/').set(
  {
   "kind": "youtube#searchListResponse",
   "etag": "\"q5k97EMVGxODeKcDgp8gnMu79wM/pVtv8dVWGGCmO2H_Mdfu_CiMvFA\"",
   "nextPageToken": "CAEQAA",
   "regionCode": "CA",
   "pageInfo": {
    "totalResults": 349477,
    "resultsPerPage": 1
   },
   "items": [
    {
     "kind": "youtube#searchResult",
     "etag": "\"q5k97EMVGxODeKcDgp8gnMu79wM/UWEnOuLqTx2opToB7YgCPtRbTvw\"",
     "id": {
      "kind": "youtube#video",
      "videoId": "f4wW-lrf3-s"
     },
     "snippet": {
      "publishedAt": "2014-12-05T19:42:45.000Z",
      "channelId": "UC6aKglbMTPNDbcfixTdh9XQ",
      "title": "Homemade apple pie recipe",
      "description": "Here's Dawn's recipe for homemade apple pie, enjoy! Ingredients: -5-6 large granny smith apples -1 cup of sugar -nutmeg -cinnamon -2 tbsp of flour -1/4 cup of ...",
      "thumbnails": {
       "default": {
        "url": "https://i.ytimg.com/vi/f4wW-lrf3-s/default.jpg",
        "width": 120,
        "height": 90
       },
       "medium": {
        "url": "https://i.ytimg.com/vi/f4wW-lrf3-s/mqdefault.jpg",
        "width": 320,
        "height": 180
       },
       "high": {
        "url": "https://i.ytimg.com/vi/f4wW-lrf3-s/hqdefault.jpg",
        "width": 480,
        "height": 360
       }
      },
      "channelTitle": "",
      "liveBroadcastContent": "none"
     }
    }
   ]
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