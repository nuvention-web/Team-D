import React from 'react';
import './fbConfig.js';

export default class App extends React.Component {
  constructor(props) {

    super(props);

    this.state = {};

  }

  componentDidMount() {
      console.log('I was triggered during componentDidMount');
      const ACCESS_TOKEN = "1088733461254279|GdbN-PcmqQziufu3aVhYApPg9y0";
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
