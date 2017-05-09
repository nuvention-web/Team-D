const ACCESS_TOKEN = "EAAaZArlfeNZAsBALbZBrpsLOpj8XkTiZAgKJcyQBF8ZBIYFJhE1crBRZCfdJuFkRrYnNt2W7DWFSYFxwUj79fGYzlORWAZAlXNLwBc6LmvKPrhZC9nejTeg53P6cIgnB7rub4wPS9OEzvK0kPw0eAf3baitTAChx7DuYqoUrE34LOwZDZD";

// Test Video # 1 ID
//const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "1446916112038085";
// Facebook Page Id
const PAGE = "141553642574345";
/*  var today = "";
  var month = d.getMonth() + 1;
  var date = d.getDate();
// const PAGE = "141553642574345";
var year = d.getFullYear()
today += year + "-" + month + "-" + date;*/

const params = {
    access_token: ACCESS_TOKEN
}

export var facebookAPI = () => {


const pageInsightsPaidPromise = (res) =>{

  return new Promise((resolve, reject) => {
    // Test Video # 1


    FB.api(
        PAGE + "/insights/page_video_views_paid",
        params,
        function (response) {
          if (response && !response.error) {
             console.log("Test video #1 response: ", response);
            /* handle the result */
            // console.log("Test video #1 response: ", response);
           // if(videos.paging.cursors.after != videos.paging.cursors.before){
           // console.log("Next returns ", response.videos.paging.next);
          //}
/*           var request = $.ajax({
              type: "GET",
              url: response.videos.paging.next,
              dataType:"json"
            });
            request.done(function(msg){
              console.log("ajax response:" ,msg);
            });*/
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
)}
const pageInsightsOrganicPromise = (res) =>{
return new Promise((resolve, reject) => {
    // Test Video # 1


    FB.api(
        PAGE + "/insights/page_video_views_organic",
        params,
        function (response) {
          if (response && !response.error) {
             console.log("Test video #2 response: ", response);
            /* handle the result */
            // console.log("Test video #1 response: ", response);
           // if(videos.paging.cursors.after != videos.paging.cursors.before){
           // console.log("Next returns ", response.videos.paging.next);
          //}
/*           var request = $.ajax({
              type: "GET",
              url: response.videos.paging.next,
              dataType:"json"
            });
            request.done(function(msg){
              console.log("ajax response:" ,msg);
            });*/
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
        PAGE + "/insights/page_video_views",
        params,
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("Test video #3 response: ", response);
      /*      let day = {
            current: {
              views: 0,
              interactions: 0
            },
            last: {
              views: 0,
              interactions: 0
            }
          }
          const rows = response.rows;
          const last = rows[0];
          const current = rows[rows.length - 1];
           day.last.views = last[1];
           day.last.interactions = last[2] + last[3] + last[4];
           day.current.views = current[1];
           day.current.interactions = current[2] + current[3] + current[4];
            let week = {
            current: {
              views: 0,
              interactions: 0
            },
            last: {
              views: 0,
              interactions: 0
            }
          }
          const rows = response.rows;
          const last = rows[0];
          const current = rows[rows.length - 1];
          week.last.views = last[1];
          week.last.interactions = last[2] + last[3] + last[4];
          week.current.views = current[1];
          week.current.interactions = current[2] + current[3] + current[4];
           let month = {
            current: {
              views: 0,
              interactions: 0
            },
            last: {
              views: 0,
              interactions: 0
            }
          }
          const rows = response.rows;
          const last = rows[0];
          const current = rows[rows.length - 1];
          month.last.views = last[1];
          month.last.interactions = last[2] + last[3] + last[4];
          month.current.views = current[1];
          month.current.interactions = current[2] + current[3] + current[4];*/


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
      pageInsightsPaidPromise()
        .then(pageInsightsOrganicPromise)
        .then(videointeractions_promise)
        .then((res) => {
          console.log("fb load complete");
          resolve(res);
        });

  }

 )}




