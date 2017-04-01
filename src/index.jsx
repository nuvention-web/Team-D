import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
import Landing from './Landing.jsx'

render( <AppContainer><Landing/></AppContainer>, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./App.jsx', () => {
    const App = require('./App.jsx').default;
    render(
      <AppContainer>
        <Landing/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
