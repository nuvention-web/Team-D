const ACCESS_TOKEN = "EAAKq7ZA42CkUBAJ6Ky0WWCCv1JMLawAmnLc7orlrdGIwYhaIOGlERK7L2lmgR44nOnYM2FaEN1eSj9cu0YphlTuTeYdaZA2ZCMzZCgoP7cZBnZBYiQEU2pQZAmK2Q5jILFg2lq6jE8ZBroUnbcVVBC4JW7MZCqjKop8ZBBBTB8kX6ECgZDZD";

// Test Video # 1 ID
//const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "1446916112038085";
// Facebook Page Id
const PAGE = "141553642574345";
const params = {
    fields: "videos{likes,comments,reactions}",
    access_token: ACCESS_TOKEN
}

export var facebookAPI = () => {
  return new Promise((resolve, reject) => {
    // Test Video # 1
    FB.api(
        "/"  + PAGE,
        params,
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("Test video #1 response: ", response);
           // if(videos.paging.cursors.after != videos.paging.cursors.before){
           // console.log("Next returns ", response.videos.paging.next);
          //}
           var request = $.ajax({
              type: "GET",
              url: response.videos.paging.next,
              dataType:"json"
            });
            request.done(function(msg){
              console.log("ajax response:" ,msg);
            });
            /*request.fail(function(jqXHR, textStatus) {
              console.log( "Request failed: " + textStatus );
              });*/

            if (response.id) {
              document.getElementById("title1").innerHTML = response.id;
            } else {
              document.getElementById("title1").innerHTML = "Facebook";
            }

            document.getElementById("image1").src = response.id;

            /*var container1 = document.getElementById("content1");
            var video_insights = response.video_insights.data;
            for (var i = 0; i < video_insights.length; i++) {
              let li = document.createElement('li');
              let data = video_insights[i];
              let title = data.title;
              let value = data.values[0].value;
              value = title + ": " + value;
              li.innerHTML = value;
              container1.appendChild(li);
            }
*/
          resolve(response);

          } else {
            console.error("error loading facebook video");
            reject(response);
          }
        }
      );
    }
  )
};




