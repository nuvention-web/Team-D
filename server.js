const path = require('path')
const express = require('express')
const Server = require('./server.js')
const bodyParser = require('body-parser');
const  brightcove = require('brightcove');

const port = (process.env.PORT || 8080)
const app = express()
const indexPath = path.join(__dirname, './src/template.html')

/* Middle Ware */
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

  const oauthApi = new brightcove.OAuthApi(a, b + "-" + c + "-" + d);
  oauthApi.getAccessToken((first, second) => {
    const access_token = second["access_token"];
    console.log("access token: ", access_token);
    res.send(access_token);
  });
});










app.listen(port)
console.log(`Listening at http://localhost:${port}`)