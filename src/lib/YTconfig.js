console.log("youtube file loaded");

var YOUR_CLIENT_ID = '266495940695-t8tqr84adihae57irvgpj1bd8fsgsafm.apps.googleusercontent.com';
var YOUR_REDIRECT_URI = 'http://localhost:8888';
var queryString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(queryString)) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  // Try to exchange the param values for an access token.
  exchangeOAuth2Token(params);
}

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
        'https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2016-06-30&metrics=views&' +
        'access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      console.log(xhr.response);
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': "266495940695-t8tqr84adihae57irvgpj1bd8fsgsafm.apps.googleusercontent.com",
                'redirect_uri': "http://localhost:8888",
                'scope': 'https://www.googleapis.com/auth/yt-analytics.readonly',
                'state': 'try_sample_request',
                'include_granted_scopes': 'true',
                'response_type': 'token'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

/* Verify the access token received on the query string. */
function exchangeOAuth2Token(params) {
  var oauth2Endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
  if (params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', oauth2Endpoint + '?access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      // When request is finished, verify that the 'aud' property in the
      // response matches YOUR_CLIENT_ID.
      if (xhr.readyState == 4 &&
          xhr.status == 200 &&
          response['aud'] &&
          response['aud'] == YOUR_CLIENT_ID) {
        // Store granted scopes in local storage to facilitate
        // incremental authorization.
        params['scope'] = response['scope'];
        localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
        if (params['state'] == 'try_sample_request') {
          trySampleRequest();
        }
      } else if (xhr.readyState == 4) {
        console.log('There was an error processing the token, another ' +
                    'response was returned, or the token was invalid.')
      }
    };
    xhr.send(null);
  }
}

var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/yt-analytics.readonly';

function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // Retrieve the discovery document for version 1 of YouTube Analytics API.
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtubeAnalytics/v1/rest';

  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      'apiKey': 'AIzaSyB1kX1auDnjyALbYm_UOQ3L0_6jC7vp-PQ',
      'discoveryDocs': [discoveryUrl],
      'clientId': '266495940695-t8tqr84adihae57irvgpj1bd8fsgsafm.apps.googleusercontent.com',
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#sign-in-or-out-button').click(function() {
      handleAuthClick();
    });
    $('#revoke-access-button').click(function() {
      revokeAccess();
    });

    // using Lenny's Youtube Channel
    var d = new Date();
    var today = "";
    var month = d.getMonth() + 1;
    var date = d.getDate();
    today = ""
    year = d.getFullYear()
    month = month < 10 ? "0" + String(month) : month;
    date = date < 10 ? "0" + String(date) : date;
    today += year + "-" + month + "-" + date;

    const month_before = (month - 1 < 10) ? year + "-" + "0" + (month - 1) + "-" + date : year + "-" + (month - 1) + "-" + date;
    const week_before = "2017-04-23" // should be done dynamically

    var lenny_params = {
      "ids": 'channel==UCJrPkSKF_XsgV7rVaz6iXIA',
      "start-date": month_before,
      "end-date": today,
      "metrics": "views,likes,dislikes,shares,comments",
      "dimensions": "30DayTotals"
      // "filters": "video==2V68FkClADc"
    }

    var request = gapi.client.request({
      'method': 'GET',
      'path': '/youtube/analytics/v1/reports',
      'params': lenny_params
    });
    // Execute the API request.
    request.execute(function(response) {
      console.log("youtube: ", response);
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked 'Sign out' button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    $('#sign-in-or-out-button').html('Sign out');
    $('#revoke-access-button').css('display', 'inline-block');
    $('#auth-status').html('You are currently signed in and have granted ' +
        'access to this app.');
  } else {
    $('#sign-in-or-out-button').html('Sign In/Authorize');
    $('#revoke-access-button').css('display', 'none');
    $('#auth-status').html('You have not authorized this app or you are ' +
        'signed out.');
  }
}

function updateSigninStatus(isSignedIn) {
  setSigninStatus();
}