import React from 'react';
import './fbConfig.js';

export default class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {};

  }

  componentDidMount() {
      // const ACCESS_TOKEN = "EAAPeMoM2kIcBAP8EQokB9xWKJyXoXWyZBZAwgHRXS8EpgmjYFqXJpLQIvpctU5GkK2ACpUUrn0JAn1roSF5oExPd7KvTHzESrGx8jdEf1EpQffZAzzP2xuNzpDZCCZAFT3GeKJ6ZCspU38sxSlz6gGtggioFSZBTeYZD";
      const ACCESS_TOKEN = "EAAPeMoM2kIcBAP2uvz06xJDZB8ZBIaX2I2A2bzAwOzpKKEBimwMGZAeZBfbcrv7WgZBsoNcZBt3ZAWCIroNi7C84OV0J2CRE7PWRFjrklmdu1XO4949xIqst4oJsSDXkkKK05M0i6vhJY9ATTcsSUVfh15qxX9icL371EeiiZA42CAZDZD";

      // Test Video # 1 ID
      const RECORDING = "434261453572678";
      // Test Video #2 ID
      const CODING = "434798750185615";
      // Facebook Page Id
      const PAGE = "434259273572896";
      const params = {
          fields: "video_insights,title,picture",
          access_token: ACCESS_TOKEN
      }

      // Test Video # 1
      FB.api(
          '/' + RECORDING,
          params,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Recording video response: ", response);
              document.getElementById("title1").innerHTML = response.title;
              document.getElementById("content1").innerHTML = JSON.stringify(response.video_insights);

            } else {
              console.error("error loading facebook video");
            }
          }
      );

      // Test Video #2
      FB.api(
          '/' + CODING,
          params,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Coding video response: ", response);
              document.getElementById("title2").innerHTML = response.title;
            } else {
              console.error("error loading facebook video");
            }
          }
      );
    }



  render() {
    return (
    <div>
      <div id="test1">
        <h1 id="title1"></h1>
        <div id="content1"></div>
      </div>
      <div id="test2">
        <h1 id="title2"></h1>
        <div id="content2"></div>
      </div>
    </div>

    )
  }
}
