// console.log("brightcove");

$.ajax({
  url: "https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "ZjUxMDMyODEtNzU3ZS00MjJlLTg5NjktMzc0NDYwNmRhNTUwOkQ3VzZBc1lpb09CWnFpTUw5cWpBLTF1VkNTbTBXeXNMUVNleTI0MDlxaXdacHNkdGxFdjRnekN2VGdrTmEtUG0ycFZLeGVhazkyS0Qxd0k5aW5mZEpB"
  }
}).then(res => {
  console.log("res", res);
}) ;