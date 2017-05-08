const ACCESS_TOKEN = "EAACEdEose0cBACUXgG8nbIs8DIXZB1HvZASMnZCYIn1mfjk8KIDaS1f3KMoR7EsAcS9O9PlUOUYuEsqGmRTtBI8CScssT2mqJKgDHIocJz3dOg4IFqM2skgp6vQfGqUVXyjjFl28nDjsiRT1hXORuJd2hVdYRMrWEheisqWP5O21BHMTlZA6tzVnsbkryDQZD";

// Test Video # 1 ID
//const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "1446916112038085";
// Facebook Page Id
const PAGE = "141553642574345";
const params = {
  since: "2017-01-01",
  until:"2017-01-05",
   access_token: ACCESS_TOKEN
}

export var facebookAPI = () => {
  return new Promise((resolve, reject) => {
    // Test Video # 1
    FB.api(
        PAGE + "/insights/page_video_views_click_to_play", 
        params,
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("Test video #1 response: ", response);
           // if(videos.paging.cursors.after != videos.paging.cursors.before){
           // console.log("Next returns ", response.videos.paging.next);
          //}
         /*  var request = $.ajax({
              type: "GET",
              url: response.videos.paging.next,
              dataType:"json"
            });
            request.done(function(msg){
              console.log("ajax response:",msg);
            });*/
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




