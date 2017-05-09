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

  // console.log(month_before, today);

  let youtube_month = {
    "ids": 'channel==UCGME_LjZasuldi_EOz7GdBg', // Dance
    "start-date": month_before,
    "end-date": today,
    "metrics": "views,likes,shares,comments",
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

  let youtube_popular_helper = {}
  Object.assign(youtube_popular_helper, youtube_month, {
    "metrics": "views,likes,shares,comments",
    "dimensions": "video",
    "max-results": 10,
    "sort": "-views"
  })

  /************************************************************/

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


  let popular_helper_req = gapi.client.request({
    'method': 'GET',
    'path': '/youtube/analytics/v1/reports',
    'params': youtube_popular_helper
  });


  /************************************************************/

  const fetchId = (obj) => {
    const rows = obj.rows;
    let output = [];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      output.push(row[0]);
    }
    return output.join(",");
  }

  const youtube_promise = (month_req, week_req, day_req) => {
    const month_promise = () => {
      return new Promise((resolve, reject) => {
        month_req.execute(function(response) {
          // console.log("youtube month!");
          // console.log("month: ", response);
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
          month.current.interactions = current[2] + current[3] + current[4];
          resolve({monthly: month});
        });
      });
    }
    const week_promise = (res) => {
      return new Promise((resolve, reject) => {
        week_req.execute(function(response) {
          // console.log("youtube week!");
          // console.log("week: ", response);
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
          resolve(Object.assign(res, {weekly: week}));
        });
      });
    }
    const day_promise = (res) => {
      return new Promise((resolve, reject) => {
        day_req.execute(function(response) {
          // console.log("youtube day!");
          // console.log("day: ", response);
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
          const rows = response.rows;
          const last = rows[0];
          const current = rows[rows.length - 1];
          day.last.views = last[1];
          day.last.interactions = last[2] + last[3] + last[4];
          day.current.views = current[1];
          day.current.interactions = current[2] + current[3] + current[4];
          resolve(Object.assign(res, {daily: day}));
        });
      });
    }

    const device_promise = (res) => {
      return new Promise((resolve, reject) => {
        device_req.execute((response) => {
          let devices = {
            desktop: 0,
            mobile: 0
          };
          const rows = response.rows;
          for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let type = row[0];
            if (type === 'DESKTOP') {
              devices.desktop += row[1];
            } else if (type === 'TABLET' || type === 'MOBILE') {
              devices.mobile += row[1];
            }
          }
          resolve(Object.assign(res, {device: devices}));
        });
      });
    }

    const popular_promise = (res) => {
          return new Promise((resolve, reject) => {
            popular_helper_req.execute((response) => {
              // console.log("before: ", response);
              let data = {};
              const rows = response.rows;
              for (let i = 0; i < rows.length; i++) {
                let id = rows[i][0];
                let views = rows[i][1];
                let interactions = rows[i][2] + rows[i][3] + rows[i][4];
                data[id] = {};
                data[id].views= views;
                data[id].interactions = interactions;
              }
              const list = fetchId(response); // return String
              let popular_req = gapi.client.request({
                'method': 'GET',
                'path': '/youtube/v3/videos',
                'params': {
                  "part": "snippet",
                  "id": list,
                  "fields": "items(id,snippet)"
                }
              });
              popular_req.execute(response => {
                const items = response.items;
                for (let i = 0; i < items.length; i++) {
                  const item = items[i];
                  const id = item.id;
                  const snippet = item.snippet;
                  data[id].video = snippet.title;
                  data[id].publish_date = snippet.publishedAt.slice(0, 9);
                  data[id].platform = "Youtube";
                }
                resolve(Object.assign(res, {popular: data}));
              })
            })
          })
        }

    return new Promise((resolve, reject) => {
      month_promise()
        .then(week_promise)
        .then(day_promise)
        .then(device_promise)
        .then(popular_promise)
        .then((res) => {
          console.log("youtube load complete");
          resolve(res);
        });
      // resolve({data: "some data"});
    });
  }

  return youtube_promise(month_req, week_req, day_req);
}


