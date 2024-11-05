import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// theme
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import store from './redux/configureStore';


// test for pull request
// commit test
// test
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
