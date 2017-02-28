import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';
import Landing from './landing.jsx'

render( <AppContainer><Landing/></AppContainer>, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(
      <AppContainer>
        <Landing/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
