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

const PAGE = Pages.POLITICO;
var today = new Date((new Date()).valueOf()).valueOf();
today = Math.floor(today / 1000);
var yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).valueOf();
yesterday = Math.floor(yesterday / 1000);
var last_week = new Date((new Date()).valueOf() - 1000*60*60*24*7).valueOf();
last_week = Math.floor(last_week / 1000);
var week_before_last = new Date((new Date()).valueOf() - 1000*60*60*24*14).valueOf();
week_before_last = Math.floor(week_before_last / 1000);
var last_month = new Date((new Date()).valueOf() - 1000*60*60*24*30).valueOf();
last_month = Math.floor(last_month / 1000);
var month_before_last = new Date((new Date()).valueOf() - 1000*60*60*24*60).valueOf();
month_before_last = Math.floor(month_before_last / 1000);

const interactions_helper = object => {
  return object.comment + object.like;
}

const devices_helper = object => {
  return {
    web: object.WWW,
    mobile: object.MOBILE
  }
}

const fetch_data_helper = (res, string) => {
  let data = res.data; // Array of 9 elements
  let output;
  if (string === "daily") {
    output = {
      interactions: interactions_helper(data[0].values[0].value),
      views: data[3].values[0].value,
      devices: devices_helper(data[6].values[0].value)
    }
  } else if (string === "weekly") {
    output = {
      interactions: interactions_helper(data[1].values[0].value),
      views: data[4].values[0].value,
      devices: devices_helper(data[7].values[0].value)
    }
  } else {
    output = {
      interactions: interactions_helper(data[2].values[0].value),
      views: data[5].values[0].value,
      devices: devices_helper(data[8].values[0].value)
    }
  }

  return output;
}

export var facebookAPI = () => {
  var data = {
    daily: {},
    weekly: {},
    monthly: {}
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
              last: fetch_data_helper(res, "daily")
            });

            let next = res.paging.next;
            $.get(next, res => {
              Object.assign(data.daily, {
                current: fetch_data_helper(res, "daily")
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
            Object.assign(data.weekly, {
              last: fetch_data_helper(res, "weekly")
            });
            let next = res.paging.next;
            $.get(next, res => {
              Object.assign(data.weekly, {
                current: fetch_data_helper(res, "weekly")
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

  const monthly_views_interactions_promise = res => {
    return new Promise((resolve, reject) => {
      FB.api(
        '/' + PAGE + '/insights?metric=page_video_views_unique,page_positive_feedback_by_type_unique,page_views_by_site_logged_in_unique'
        + '&since=' + month_before_last + '&until=' + last_month,
        params,
        res => {
          if (res && !res.error) {
            Object.assign(data.monthly, {
              last: fetch_data_helper(res, "monthly")
            });

            let next = res.paging.next;
            $.get(next, res => {
              Object.assign(data.monthly, {
                current: fetch_data_helper(res, "monthly")
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

  return new Promise((resolve, reject) => {
     daily_views_interactions_promise()
    .then(weekly_views_interactions_promise)
    .then(monthly_views_interactions_promise)
    .then((res) => {
      resolve(res);
    });
  });

}