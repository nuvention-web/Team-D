import React from 'react';
import './fbConfig.js';

export default class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {};

  }

  componentDidMount() {
      console.log('I was triggered during componentDidMount');
      const ACCESS_TOKEN = "EAAPeMoM2kIcBAP8EQokB9xWKJyXoXWyZBZAwgHRXS8EpgmjYFqXJpLQIvpctU5GkK2ACpUUrn0JAn1roSF5oExPd7KvTHzESrGx8jdEf1EpQffZAzzP2xuNzpDZCCZAFT3GeKJ6ZCspU38sxSlz6gGtggioFSZBTeYZD";
      const ACCESS_TOKEN2 = "EAACEdEose0cBAMAyMV8QPHrqxZCeMtOhDarbBXAPLrxTvvLWrH21wtPsD71Jk4kO0oePuH8coVYMOAcuFaLDyZCeqBioCdJ5FzDyOhBMkkKb8l9ZBJigzDV4ObRMXf2hkRgth3zCG33loZCaHPEbxWDeDkv6AvcCZAUSwrZCvJuS31Gk5kabRXrwNCnPcWgdsZD";

      // Test Video # 1 ID
      const RECORDING = "434261453572678";
      // Test Video #2 ID
      const CODING = "434798750185615";
      // Facebook Page Id 
      const PAGE = "434259273572896";

      // Test Video # 1
      FB.api(
          '/' + RECORDING + "/video_insights",
          {
            fields: "",
            access_token: ACCESS_TOKEN2
          },
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Recording video response: ", response);
            } else {
              console.error("error loading facebook video");
              console.log(response);
            }
          }
      );

      // Test Video #2
      FB.api(
          '/' + CODING,
          {
            fields: "",
            access_token: ACCESS_TOKEN
          },
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("Coding video response: ", response);
            } else {
              console.error("error loading facebook video");
              console.log(response);
            }
          }
      );
    }



  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>Open the console to see the fetched data from firebase :)</p>
        <p>Let's work on this!</p>
      </div>
    )
  }
}
