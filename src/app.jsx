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
          fields: "video_insights{title,values},title,picture",
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
              document.getElementById("image1").src = response.picture;

              var container1 = document.getElementById("content1");
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
              document.getElementById("image2").src = response.picture;

              var container2 = document.getElementById("content2");
              var video_insights = response.video_insights.data;
              for (var i = 0; i < video_insights.length; i++) {
                let li = document.createElement('li');
                let data = video_insights[i];
                let title = data.title;
                let value = data.values[0].value;

                value = title + ": " + value;
                li.innerHTML = value;
                container2.appendChild(li);
              }
            } else {
              console.error("error loading facebook video");
            }
          }
      );
    }



  render() {
    return (
      <section className="container">
        <div id="left-half">
          <article>
            <h1 id="title1"></h1>
            <div id="img">
              <img id="image1" />
            </div>

            <ul id="content1"></ul>
          </article>
        </div>
        <div id="right-half">
          <article>
            <h1 id="title2"></h1>
            <div id="img">
              <img id="image2" />
            </div>
            <ul id="content2"></ul>
          </article>
        </div>
      </section>

    // <div>
    //   <div id="left-half">
    //     <h1 id="title1"></h1>
    //     <img id="image1" />
    //     <ul id="content1"></ul>
    //   </div>
    //   <div id="right-half">
    //     <h1 id="title2"></h1>
    //     <img id="image2" />
    //     <ul id="content2"></ul>
    //   </div>
    // </div>

    )
  }
}
