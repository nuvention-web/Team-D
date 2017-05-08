const ACCESS_TOKEN = "EAACEdEose0cBACUXgG8nbIs8DIXZB1HvZASMnZCYIn1mfjk8KIDaS1f3KMoR7EsAcS9O9PlUOUYuEsqGmRTtBI8CScssT2mqJKgDHIocJz3dOg4IFqM2skgp6vQfGqUVXyjjFl28nDjsiRT1hXORuJd2hVdYRMrWEheisqWP5O21BHMTlZA6tzVnsbkryDQZD";

// Test Video # 1 ID
//const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "1446916112038085";
// Facebook Page Id
const PAGE = "141553642574345";
const params1 = {
  since: "2017-01-01",
  until:"2017-01-05",
   access_token: ACCESS_TOKEN
}
const params = {
    fields: "videos{published,video_insights{values,period,title},likes,reactions,comments,title}",
    access_token: ACCESS_TOKEN
}

export var facebookAPI = () => {


const pageInsights_promise = (res) =>{
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

             resolve(response);

          } else {
            console.error("error loading facebook video");
            reject(response);
          }
        }
      );
    }
 ) }
    const videointeractions_promise = (res) =>{
    return new Promise((resolve, reject) =>{
    FB.api(
        PAGE + "/insights/page_video_views_click_to_play", 
        params1,
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("Test video #1 response: ", response);
       

         

            resolve(response);

          } else {
            console.error("error loading facebook video");
            reject(response);
          }
        }
      );
    }
  )
  }
    return new Promise((resolve, reject) => {
      pageInsights_promise()
        .then(videointeractions_promise)
        .then((res) => {
          console.log("fb load complete");
          resolve(res);
        });

  }

 )}





