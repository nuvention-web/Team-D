const ACCESS_TOKEN = "EAAaZArlfeNZAsBAKZApAdXiEWciZApCMChZBlooDkfuZBGIZBEET8lXwfuYFV2ruTmvBI6ABCa9340x1A91ZBsj3lkMEMJMMD79spZCZCL0KZAvE9y1YzD148s8wlyWnSLFTaDShjuJVSxRaPLK8qI2pjawnfmMbGZAcDGkZD";

// Test Video # 1 ID
//const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "1446916112038085";
// Facebook Page Id
const PAGE = "141553642574345";
/*  var today = "";
  var month = d.getMonth() ;
  var date = d.getDate();
   var yesterday = d.getDate() - 1;
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

          console.log("first again", response)
               /*for (var i = response.data.length - 1 ; i >= 0; i--) {
                console.log(response.data[i]);
              for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
                    if (response.data[i].values[j].end_time == today){
                           month.current.views = response.data[i].values[j].value  
                            month.current.interactions = response.data[i].values[j].value + 23 

                    }
                    if(response.data[i].values[j].end_time == yesterday){
                        month.last.views = response.data[i].values[j].value 
                         month.current.interactions = response.data[i].values[j].value + 20
                    }
                     
              }
             }*/
             console.log("first: ", month)
             resolve({paid: month});

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
            /* for (var i = response.data.length - 1; i >= 0; i--) {
              for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
                    if (response.data[i].values[j].end_time.slice(0,9) == today){
                           month.current.views = response.data[i].values[j].value   
                           month.current.interactions = response.data[i].values[j].value + 31

                    }
                    if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
                        month.last.views = response.data[i].values[j].value 
                        month.current.interactions = response.data[i].values[j].value + 43 
                    }
                     
              }
             }*/
             console.log("second: ", month)
             resolve(Object.assign(res, organic: month));

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
           let day = {
            current: {
              views: 0,
              interactions: 0
            },
            last: {
              views: 0,
              interactions: 0
            }
          }

         /* for (var i = response.data.length - 1; i >= 0; i--) {
              for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
                    if (response.data[i].values[j].end_time.slice(0,9) == today){
                           month.current.views = response.data[i].values[j].value 
                           month.current.interactions = response.data[i].values[j].value  + 6 

                    }
                    if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
                        month.last.views = response.data[i].values[j].value 
                        month.current.interactions = response.data[i].values[j].value + 43 
                    }
                     
              }
             }

               for (var i = response.data.length - 1; i >= 0; i--) {
              for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
                    if (response.data[i].values[j].end_time.slice(0,9) == today){
                           week.current.views = response.data[i].values[j].value
                           week.current.interactions = response.data[i].values[j].value  + 39 

                    }
                    if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
                        week.last.views = response.data[i].values[j].value 
                        week.last.interactions= response.data[i].values[j].value + 16
                    }
                     
              }
             }

               for (var i = response.data.length - 1; i >= 0; i--) {
              for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
                    if (response.data[i].values[j].end_time.slice(0,9) == today){
                           day.current.views = response.data[i].values[j].value   
                            day.current.interactions = response.data[i].values[j].value + 14

                    }
                    if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
                        day.last.views = response.data[i].values[j].value
                        day.current.interactions = response.data[i].values[j].value  + 12
                    }
                     
              }
             }
           */
         
         

            resolve(Object.assign(res, {
              monthly: month,
              weekly: week,
              daily: day
            }));

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




