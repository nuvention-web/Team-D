import {database} from './firebaseConfig.js';

const Tokens = {
  DC: "EAAB68OQQgesBAF855CmL6KBZCqTWyO1ZBUfPIH5MCfmTNozFrXmcd0iDZAnGNxlfj9hhJPuVT2IrZB38krKOSBARc0F2EIjZA0hmERgFV9haNvbBrGryGx34QAZBY3gyyVi0WBe67ig5TlO0dPBkACogEsbwSynoUZD",
  Dance: "EAAB68OQQgesBAKalCkHMGLlIzA9P7CNmZBO53Vm93iZB0Rx4DXqyZBcysWc0smhivWATqAIjptschB66yoHZBu1smZBQer6O7jZBAncYTFZChV1VZBmY5ZBQg9AWrX4sAtaQSQuhaA91DEhPZAGL8JgFW8fQDzEI34zP0ZD",
  NYM: "EAAB68OQQgesBAN5VWFZBH7QyBUnA0car3YwtBxmdG7on71hyRPrSB2TZAQmN5mCkAkuDiZB1x0gKqVoaOBAXLcwobJJvvtseCh5AysilhaKuBZAT2ZAmCmn802PfXkaOI2p3Plzs9sXUrXXAjhZAHcJJGT23sVH50ZD",
  POLITICO: "EAAB68OQQgesBAEGRLELpuNzC3tL7U3UDSI4rPKZBpFhaR4uv1Qo2L0LmtmMTAU1dZAqGIHuZC10Tb1EYEGD2wNdXBfGfS4dp1H5XvB3KHwUZBxZB4xLWxfVtlFPB2OSZBWa1oZAcrYm5bM1Jo90tRWaP4vrNZCzU2lgMZCEBSkg3DXQZDZD"
}

// Facebook Page Id
const Pages = {
  DC:  "141553642574345",
  NYM: "14516439825",
  Dance: "8947243532",
  POLITICO: "62317591679"
}

const params = {
  // fields:"videos{likes.limit(0).summary(true),reactions.limit(0).summary(true),comments.limit(0).summary(true),sharedposts.limit(0).summary(true)}",
  access_token: Tokens.POLITICO
}

const PAGE = Pages.DC;
var today = new Date((new Date()).valueOf()).valueOf();
today = Math.floor(today / 1000);
var yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).valueOf();
yesterday = Math.floor(yesterday / 1000);
var last_week = new Date((new Date()).valueOf()).valueOf();
last_week = Math.floor(today / 1000);
var week_before_last = new Date((new Date()).valueOf()).valueOf();
week_before_last = Math.floor(today / 1000);

export var facebookAPI = () => {
  var data = {
    daily: {},
    weekly: {}
  }

  const daily_views_interactions_promise = res => {
    return new Promise((resolve, reject) => {
      FB.api(
        '/' + PAGE + '/insights?metric=page_video_views_unique,page_positive_feedback_by_type_unique,page_views_by_site_logged_in_unique'
        + '&since=' + yesterday + '&until=' + today,
        params,
        res => {
          if (res && !res.error) {
            Object.assign(data.daily, {
              last: res
            });
            let next = res.paging.next;
            console.log("next: ", next);
            $.get(next, res => {
              Object.assign(data.daily, {
                current: res
              })
            })
            resolve(data);
          } else {
            console.error("error loading facebook views & interactions");
            reject(res);
          }
        }
      );
    })
  }

  const weekly_views_interactions_promise = res => {
    return new Promise((resolve, reject) => {
      FB.api(
        '/' + PAGE + '/insights?metric=page_video_views_unique,page_positive_feedback_by_type_unique,page_views_by_site_logged_in_unique'
        + '&since=' + week_before_last + '&until=' + last_week,
        params,
        res => {
          if (res && !res.error) {
            resolve(res);
          } else {
            console.error("error loading facebook views & interactions");
            reject(res);
          }
        }
      );
    })
  }

  return new Promise((resolve, reject) => {
     daily_views_interactions_promise()
     /*
        Add more promises here
     */
    .then((res) => {
      resolve(res);
    });
  });

}


// const videoInteractionsPromise = (res) =>{
//   return new Promise((resolve, reject) => {
//     FB.api(
//       "/"  + PAGE,
//       paramsVideoMetrics,
//       function (response) {
//         if (response && !response.error) {
//           console.log("video like shares and comments and reactions ", response);
//            resolve(response);
//         } else {
//           console.error("error loading facebook video");
//           reject(response);
//         }
//       }
//     );
//   }
//  )}

// const pageInsightsPaidPromise = () =>{

//   return new Promise((resolve, reject) => {
//     // Test Video # 1


//     FB.api(
//         PAGE + "/insights/page_video_views_paid",
//         params,
//         function (response) {
//           if (response && !response.error) {
//              // console.log("Test video #1 response: ", response);
//              let month = {
//               current: {
//                 views: 0,
//                 interactions: 0
//               },
//               last: {
//                 views: 0,
//                 interactions: 0
//               }
//             }

//           // console.log("first again", response);
//           const data = response.data;
//           const current = data[2];
//           const last = data[0];
//           month.current.views += current.values[2].value;
//           month.current.interactions += current.values[2].value + 20;
//           month.last.views += last.values[2].value;
//           month.last.interactions += last.values[2].value + 30;

//            // console.log("first: ", month)
//            resolve({paid: month});

//           } else {
//             console.error("error loading facebook video");
//             reject(response);
//           }
//         }
//       );
//     }
// )}

// const pageInsightsOrganicPromise = (res) =>{
// return new Promise((resolve, reject) => {
//     // Test Video # 1


//     FB.api(
//         PAGE + "/insights/page_video_views_organic",
//         params,
//         function (response) {
//           if (response && !response.error) {
//              console.log("Test video #2 response: ", response);

//                let month = {
//             current: {
//               views: 0,
//               interactions: 0
//             },
//             last: {
//               views: 0,
//               interactions: 0
//             }
//           }
//           const data = response.data;
//           const current = data[2];
//           const last = data[0];
//           month.current.views += current.values[2].value;
//           month.current.interactions += current.values[2].value + 20;
//           month.last.views += last.values[2].value;
//           month.last.interactions += last.values[2].value + 30;

//           console.log("second: ", month)
//           console.log("second again: ", res);
//           resolve(Object.assign(res, {organic: month}));


//           } else {
//             console.error("error loading facebook video");
//             reject(response);
//           }
//         }
//       );
//     }
//  ) }

// const videointeractions_promise = (res) =>{
//   // console.log("third: ", res);
//     return new Promise((resolve, reject) =>{
//     FB.api(
//         PAGE + "/insights/page_video_views",
//         params,
//         function (response) {
//           if (response && !response.error) {
//             /* handle the result */

//              let month = {
//             current: {
//               views: 0,
//               interactions: 0
//             },
//             last: {
//               views: 0,
//               interactions: 0
//             }
//           }
//            let week = {
//             current: {
//               views: 0,
//               interactions: 0
//             },
//             last: {
//               views: 0,
//               interactions: 0
//             }
//           }
//            let day = {
//             current: {
//               views: 0,
//               interactions: 0
//             },
//             last: {
//               views: 0,
//               interactions: 0
//             }
//           }

//           let data = response.data;
//           let current = data[2];
//           let last = data[2];
//           month.current.views += current.values[0].value;
//           month.current.interactions +=  250;
//           month.last.views += last.values[2].value;
//           month.last.interactions +=  130;

//           data = response.data;
//           current = data[1];
//           last = data[1];
//           week.current.views += current.values[0].value;
//           week.current.interactions +=  220;
//           week.last.views += last.values[2].value;
//           week.last.interactions +=  330;

//           data = response.data;
//           current = data[0];
//           last = data[0];
//           day.current.views += current.values[0].value;
//           day.current.interactions += 520;
//           day.last.views += last.values[2].value;
//           day.last.interactions += 430;

//          /* for (var i = response.data.length - 1; i >= 0; i--) {
//               for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
//                     if (response.data[i].values[j].end_time.slice(0,9) == today){
//                            month.current.views = response.data[i].values[j].value
//                            month.current.interactions = response.data[i].values[j].value  + 6

//                     }
//                     if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
//                         month.last.views = response.data[i].values[j].value
//                         month.current.interactions = response.data[i].values[j].value + 43
//                     }

//               }
//              }

//                for (var i = response.data.length - 1; i >= 0; i--) {
//               for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
//                     if (response.data[i].values[j].end_time.slice(0,9) == today){
//                            week.current.views = response.data[i].values[j].value
//                            week.current.interactions = response.data[i].values[j].value  + 39

//                     }
//                     if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
//                         week.last.views = response.data[i].values[j].value
//                         week.last.interactions= response.data[i].values[j].value + 16
//                     }

//               }
//              }

//                for (var i = response.data.length - 1; i >= 0; i--) {
//               for (var j =response.data[i].values[j].length - 1; j >= 0; j--) {
//                     if (response.data[i].values[j].end_time.slice(0,9) == today){
//                            day.current.views = response.data[i].values[j].value
//                             day.current.interactions = response.data[i].values[j].value + 14

//                     }
//                     if(response.data[i].values[j].end_time.slice(0,9) == yesterday){
//                         day.last.views = response.data[i].values[j].value
//                         day.current.interactions = response.data[i].values[j].value  + 12
//                     }

//               }
//              }
//            */



//             resolve(Object.assign(res, {
//               monthly: month,
//               weekly: week,
//               daily: day
//             }));

//           } else {
//             console.error("error loading facebook video");
//             reject(response);
//           }
//         }
//       );
//     }
//   )
//   }
//     return new Promise((resolve, reject) => {
//          pageInsightsPaidPromise()
//         .then(pageInsightsOrganicPromise)
//         .then(videointeractions_promise)
//         .then((res) => {
//           console.log("fb load complete", res);
//           resolve(res);
//         });

//   }




