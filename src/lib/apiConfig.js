const ACCESS_TOKEN = "EAAR6flJrG9wBAOUYlIqDAGRs4yZBU6fTUQJZC8dxOkqvnjZADkLExaD7RhGtPRbncEtwPdMclrSPUayvq3p3HzYomVrvvmjGRqC2hg794zZAjevjMudFsscoFbmV1FcSq8O1ZALVDPSTQkgKBgUsKpvpIsA7491sZD";

// Test Video # 1 ID
const TEST1 = "10154546043703533";
// Test Video #2 ID
const TEST2 = "10154564632168533";
// Facebook Page Id
const PAGE = "8947243532";
const params = {
    fields: "video_insights{title,values},title,picture,source",
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
            // console.log("Test video #1 response: ", response);

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




