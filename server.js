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
app.get('/api/brightcove', (req, res) => {
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
          console.log("access token: ", access_token);
          const account_id = "1155968404";
          const dimensions = ["video","device_type","device_os"];
          const fields =["video_view"];
          let from = {
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
          let to = {
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

          axios.get("https://analytics.api.brightcove.com/v1/data?accounts="
                        + account_id
                        + "&access_token=" + access_token
                        + "&dimensions="
                        + dimensions.join(",")
                        + "&from=" + from.daily.last
                        + "&to=" + to.daily.last
                        + "&fields=" + fields.join(","))
                .then(res => {
                  console.log("brightcove res:", res);
                })
                .catch(err => {
                  console.log("brightcove error:", err);
                });
       })
       .catch(err => {
        console.log("Brightcove OAuth error:", err);
       });
});










app.listen(port)
console.log(`Listening at http://localhost:${port}`)