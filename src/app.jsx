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

      // Recording Video
      FB.api(
          "/434261453572678?access_token=" + ACCESS_TOKEN,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("video response: ", response);
            } else {
              console.error("error loading facebook video");
              console.log(response);
            }
          }
      );

      // Coding Video
      FB.api(
          "/434798750185615?access_token=" + ACCESS_TOKEN,
          function (response) {
            if (response && !response.error) {
              /* handle the result */
              console.log("video response: ", response);
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
