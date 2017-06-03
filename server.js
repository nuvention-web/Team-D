const path = require('path')
const express = require('express')
const Server = require('./server.js')
const bodyParser = require('body-parser');
const brightcove = require('brightcove');
const axios = require('axios');

const port = (process.env.PORT || 8080)
const app = express()
const indexPath = path.join(__dirname, './src/template.html')

/* Middle Ware */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routing */
app.get('/', function (_, res) { res.sendFile(indexPath) });
app.get('/api/brightcove', (req, origianl_response) => {
  let a = "f5103281-757e-422e-8969-3744606da550";
  let b = "D7W6AsYioOBZqiML9qjA";
  let c = "1uVCSm0WysLQSey2409qiwZpsdtlEv4gzCvTgkNa";
  let d = "Pm2pVKxeak92KD1wI9infdJA";

  const client_id = a;
  const client_secret = b + "-" + c + "-" + d; // I do this because client_secret as it is creates an error somehow
  const config = {
      headers: {
        'Authorization': 'Basic ' + new Buffer(client_id + ":" + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

  axios.post("https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials", {}, config)
       .then(res => {
          const access_token = res.data.access_token;
          const account_id = "1155968404";
          const dimensions = ["video","device_type"];
          const fields =["video_view","video_name","video_impression"];
          let time_from = {
            daily: {
              current: (new Date).getTime(),
              last: "-2d"
            },
            weekly: {
              current: "-7d",
              last: "-14d"
            },
            monthly: {
              current: "-28d",
              last: "-56d"
            }
          };
          let time_to = {
            daily: {
              current: (new Date).getTime(),
              last: "-1d"
            },
            weekly: {
              current: (new Date).getTime(),
              last: "-7d"
            },
            monthly: {
              current: (new Date).getTime(),
              last: "-28d"
            }
          };

          data = {
            daily: null,
            weekly: {}
          };

          axios.get("https://analytics.api.brightcove.com/v1/data?accounts="
                        + account_id
                        + "&access_token=" + access_token
                        + "&dimensions="
                        + dimensions.join(",")
                        + "&from=" + time_from.daily.last
                        + "&to=" + time_to.daily.last
                        + "&fields=" + fields.join(","))
                .then(res => {
                  Object.assign(data, {
                    daily: {
                      last: res.data
                    }
                  });
                  return data;
                })
                .then(response => {
                  console.log("--------------moving onto daily current");
                  // console.dir(response, {depth: null}); // to expand [object Object] in terminal
                  axios.get("https://analytics.api.brightcove.com/v1/data?accounts="
                                + account_id
                                + "&access_token=" + access_token
                                + "&dimensions="
                                + dimensions.join(",")
                                + "&from=" + time_from.daily.current
                                + "&to=" + time_to.daily.current
                                + "&fields=" + fields.join(","))
                  .then(res => {
                    Object.assign(response.daily, {
                      current: res.data
                    });
                    return response;
                  })
                  .then(response => {
                    // working on weekly
                    console.log("--------------moving onto weekly last");
                    axios.get("https://analytics.api.brightcove.com/v1/data?accounts="
                                  + account_id
                                  + "&access_token=" + access_token
                                  + "&dimensions="
                                  + dimensions.join(",")
                                  + "&from=" + time_from.weekly.last
                                  + "&to=" + time_to.weekly.last
                                  + "&fields=" + fields.join(","))
                    .then(res => {
                      Object.assign(data.weekly, {
                        last: res.data
                      });
                      console.log("data: ", data);
                      return data;

                    })
                    .then(response => {
                      console.log("--------------moving onto weekly current");
                      axios.get("https://analytics.api.brightcove.com/v1/data?accounts="
                                    + account_id
                                    + "&access_token=" + access_token
                                    + "&dimensions="
                                    + dimensions.join(",")
                                    + "&from=" + time_from.weekly.current
                                    + "&to=" + time_to.weekly.current
                                    + "&fields=" + fields.join(","))
                      .then(res => {
                        Object.assign(response.weekly, {
                          current: res.data
                        });
                        console.log("Brightcove final: \n", response);
                        origianl_response.send(response)
                      })
                      .catch(err => {
                        console.error("brightcove error:", err);
                      })
                    })
                  })
                  .catch(err => {
                    console.error("brightcove error:", err);
                  })
                })
                .catch(err => {
                  console.log("brightcove error:", err);
                });
       })
       .catch(err => {
        console.log("Brightcove OAuth error:", err);
       });
});










app.listen(port);
console.log(`Listening at http://localhost:${port}`);