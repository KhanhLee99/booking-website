import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  // <React.StrictMode>

  // </React.StrictMode>

  <Provider store={store}>
    <App />
  </Provider>

  , document.getElementById("root"));
// serviceWorker.registerServiceWorker();
reportWebVitals();
