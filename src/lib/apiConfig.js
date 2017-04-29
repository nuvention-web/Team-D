const ACCESS_TOKEN = "EAAaZArlfeNZAsBAFNNNecBvuarnxxuGBP9G2hDGxnUpPB9QGCIFve6i5ZAmaIH8g9ZCSNMSRldfWo9nVAXnCcQhR4sTUcq8SZCGgMwFoORi5JFCql8nnaPJkAaDU2vZBs3tERg1JKbizJhuk80fT084rjm6HjPrLAZD";

// Test Video # 1 ID
//const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "1446916112038085";
// Facebook Page Id
const PAGE = "141553642574345";
const params = {
    fields: "id",
    access_token: ACCESS_TOKEN
}

export var facebookAPI = () => {
  return new Promise((resolve, reject) => {
    // Test Video # 1
    FB.api(
        '/' + TEST2,
        params,
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("Test video #1 response: ", response);
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

// const facebookAPI = new Promise((resolve, reject) => {

//   // Test Video # 1
//   FB.api(
//       '/' + TEST2,
//       params,
//       function (response) {
//         if (response && !response.error) {
//           /* handle the result */
//           console.log("Test video #1 response: ", response);
//           if (response.title) {
//             document.getElementById("title1").innerHTML = response.title;
//           } else {
//             document.getElementById("title1").innerHTML = "Facebook";
//           }

//           document.getElementById("image1").src = response.source;

//           var container1 = document.getElementById("content1");
//           var video_insights = response.video_insights.data;
//           for (var i = 0; i < video_insights.length; i++) {
//             let li = document.createElement('li');
//             let data = video_insights[i];
//             let title = data.title;
//             let value = data.values[0].value;

//             value = title + ": " + value;
//             li.innerHTML = value;
//             container1.appendChild(li);
//           }

//         resolve(response);

//         } else {
//           console.error("error loading facebook video");
//           reject(response);
//         }
//       }
//   );

//   // Test Video #2
//   // FB.api(
//   //     '/' + TEST2,
//   //     params,
//   //     function (response) {
//   //       if (response && !response.error) {
//   //         /* handle the result */
//   //         console.log("Test video #2 response: ", response);
//   //         if (response.title) {
//   //           document.getElementById("title2").innerHTML = response.title;
//   //         } else {
//   //           document.getElementById("title2").innerHTML = "Instagram";
//   //         }
//   //         document.getElementById("image2").src = response.source +"&autoplay=0";

//   //         var container2 = document.getElementById("content2");
//   //         var video_insights = response.video_insights.data;
//   //         // for (var i = 0; i < video_insights.length; i++) {
//   //         //   let li = document.createElement('li');
//   //         //   let data = video_insights[i];
//   //         //   let title = data.title;
//   //         //   let value = data.values[0].value;

//   //         //   value = title + ": " + value;
//   //         //   li.innerHTML = value;
//   //         //   container2.appendChild(li);
//   //         // }
//   //       } else {
//   //         console.error("error loading facebook video");
//   //       }
//   //     }
//   // )
// })





