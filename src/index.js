import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import { ScrollTop } from './components';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// theme
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import store from './redux/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <ScrollTop/>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals(console.log);
