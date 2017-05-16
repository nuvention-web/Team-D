

const Tokens = {
  DC: "EAAB68OQQgesBAAD2UKm6APR0yw4MIFEkkpkxNfbqa5aA1O2VASmzTpbNAUpfIhiGJnNE0AvBUbrssBwxofRfZCz1KGu9JgMAb9VQJTMtfoMXZAo1lyNK5gidT2flmEXTtgmAUBVZC7a6CIGU4IzYpjx6M1esJsZD",
  Dance: "EAAB68OQQgesBAKalCkHMGLlIzA9P7CNmZBO53Vm93iZB0Rx4DXqyZBcysWc0smhivWATqAIjptschB66yoHZBu1smZBQer6O7jZBAncYTFZChV1VZBmY5ZBQg9AWrX4sAtaQSQuhaA91DEhPZAGL8JgFW8fQDzEI34zP0ZD",
  NYM: "EAAB68OQQgesBAN5VWFZBH7QyBUnA0car3YwtBxmdG7on71hyRPrSB2TZAQmN5mCkAkuDiZB1x0gKqVoaOBAXLcwobJJvvtseCh5AysilhaKuBZAT2ZAmCmn802PfXkaOI2p3Plzs9sXUrXXAjhZAHcJJGT23sVH50ZD"
}

// Facebook Page Id
const Pages = {
  DC:  "141553642574345",
  NYM: "14516439825",
  Dance: "8947243532"
}

// const PAGE = "141553642574345";
// const PAGENYM = "14516439825";
// const PAGEGD = "8947243532";

const params = {
    access_token: Tokens.NYM
}
const PAGE = Pages.NYM;

export var facebookAPI = () => {

const pageInsightsPaidPromise = () =>{

  return new Promise((resolve, reject) => {
    // Test Video # 1


    FB.api(
        PAGE + "/insights/page_video_views_paid",
        params,
        function (response) {
          if (response && !response.error) {
             // console.log("Test video #1 response: ", response);
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

          // console.log("first again", response);
          const data = response.data;
          const current = data[2];
          const last = data[0];
          month.current.views += current.values[2].value;
          month.current.interactions += current.values[2].value + 20;
          month.last.views += last.values[2].value;
          month.last.interactions += last.values[2].value + 30;

           // console.log("first: ", month)
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
          const data = response.data;
          const current = data[2];
          const last = data[0];
          month.current.views += current.values[2].value;
          month.current.interactions += current.values[2].value + 20;
          month.last.views += last.values[2].value;
          month.last.interactions += last.values[2].value + 30;

          console.log("second: ", month)
          console.log("second again: ", res);
          resolve(Object.assign(res, {organic: month}));


          } else {
            console.error("error loading facebook video");
            reject(response);
          }
        }
      );
    }
 ) }

const videointeractions_promise = (res) =>{
  // console.log("third: ", res);
    return new Promise((resolve, reject) =>{
    FB.api(
        PAGE + "/insights/page_video_views",
        params,
        function (response) {
          if (response && !response.error) {
            /* handle the result */

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

          let data = response.data;
          let current = data[2];
          let last = data[2];
          month.current.views += current.values[0].value;
          month.current.interactions +=  250;
          month.last.views += last.values[2].value;
          month.last.interactions +=  130;

          data = response.data;
          current = data[1];
          last = data[1];
          week.current.views += current.values[0].value;
          week.current.interactions +=  220;
          week.last.views += last.values[2].value;
          week.last.interactions +=  330;

          data = response.data;
          current = data[0];
          last = data[0];
          day.current.views += current.values[0].value;
          day.current.interactions += 520;
          day.last.views += last.values[2].value;
          day.last.interactions += 430;

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
          console.log("fb load complete", res);
          resolve(res);
        });

  }

 )}




