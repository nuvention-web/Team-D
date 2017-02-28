import React from 'react';
import './fbConfig.js';

export default class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {};

  }

  componentDidMount() {
      // const ACCESS_TOKEN = "EAAPeMoM2kIcBAP8EQokB9xWKJyXoXWyZBZAwgHRXS8EpgmjYFqXJpLQIvpctU5GkK2ACpUUrn0JAn1roSF5oExPd7KvTHzESrGx8jdEf1EpQffZAzzP2xuNzpDZCCZAFT3GeKJ6ZCspU38sxSlz6gGtggioFSZBTeYZD";
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

      // Test Video # 1
      FB.api(
          '/' + TEST1,
          params,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Test video #1 response: ", response);
              document.getElementById("title1").innerHTML = response.title;
              document.getElementById("image1").src = response.source;

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
          '/' + TEST2,
          params,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Test video #2 response: ", response);
              document.getElementById("title2").innerHTML = response.title;
              document.getElementById("image2").src = response.source +"&autoplay=0";

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
              <iframe id="image1"></iframe>
            </div>

            <ul id="content1"></ul>
          </article>
        </div>
        <div id="right-half">
          <article>
            <h1 id="title2"></h1>
            <div id="img">
              <iframe id="image2"></iframe>
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
