export const YTpromised = (gapi) => {

  // using Lenny's Youtube Channel
  var d = new Date();
  var today = "";
  var month = d.getMonth() + 1;
  var date = d.getDate();
  today = ""
  var year = d.getFullYear()
  month = month < 10 ? "0" + String(month) : month;
  date = date < 10 ? "0" + String(date) : date;
  today += year + "-" + month + "-" + date;

  const month_before = (month - 1 < 10) ? year + "-" + "0" + (month - 1) + "-" + date : year + "-" + (month - 1) + "-" + date;
  const week_before = "2017-04-23" // should be done dynamically
  const yesterday = "2017-04-25"

  console.log(month_before, today);

  let youtube_month = {
    "ids": 'channel==UCJrPkSKF_XsgV7rVaz6iXIA',
    "start-date": month_before,
    "end-date": today,
    "metrics": "views,likes,dislikes,shares,comments",
    "dimensions": "30DayTotals"
    // "filters": "video==2V68FkClADc"
  }

  let youtube_week = {}
  Object.assign(youtube_week, youtube_month, {
    "start-date": week_before,
    "dimensions": "7DayTotals"
  });

  let youtube_day = {}
  Object.assign(youtube_day, youtube_month, {
    "start-date": yesterday,
    "dimensions": "day"
  })

  let youtube_device = {}
  Object.assign(youtube_device, youtube_month, {
    "start-date": month_before,
    "dimensions": "deviceType",
    "metrics": "views"
  })

  let month_req = gapi.client.request({
    'method': 'GET',
    'path': '/youtube/analytics/v1/reports',
    'params': youtube_month
  });

  let week_req = gapi.client.request({
    'method': 'GET',
    'path': '/youtube/analytics/v1/reports',
    'params': youtube_week
  });

  let day_req = gapi.client.request({
    'method': 'GET',
    'path': '/youtube/analytics/v1/reports',
    'params': youtube_day
  });

  let device_req = gapi.client.request({
    'method': 'GET',
    'path': '/youtube/analytics/v1/reports',
    'params': youtube_device
  });

  const youtube_promise = (month_req, week_req, day_req) => {
    const month_promise = () => {
      return new Promise((resolve, reject) => {
        month_req.execute(function(response) {
          console.log("youtube month!");
          // console.log("month: ", response);
          resolve({monthly: response});
        });
      });
    }
    const week_promise = (res) => {
      return new Promise((resolve, reject) => {
        week_req.execute(function(response) {
          console.log("youtube week!");
          // console.log("week: ", response);
          resolve(Object.assign(res, {weekly: response}));
        });
      });
    }
    const day_promise = (res) => {
      return new Promise((resolve, reject) => {
        day_req.execute(function(response) {
          console.log("youtube day!");
          // console.log("day: ", response);
          resolve(Object.assign(res, {daily: response}));
        });
      });
    }

    const device_promise = (res) => {
      return new Promise((resolve, reject) => {
        device_req.execute(function(response) {
          console.log("youtube device!");
          resolve(Object.assign(res, {device: response}));
        });
      });
    }

    return new Promise((resolve, reject) => {
      month_promise()
        .then(week_promise)
        .then(day_promise)
        .then(device_promise)
        .then((res) => {
          console.log("youtube load complete");
          resolve(res);
        });
      // resolve({data: "some data"});
    });
  }

  return youtube_promise(month_req, week_req, day_req);
}


