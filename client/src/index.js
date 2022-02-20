import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from "notistack";



ReactDOM.render(
  // <React.StrictMode>

  // </React.StrictMode>

  <Provider store={store}>
    <SnackbarProvider
      persist="true"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={2500}
      anchororigintopright={{ marginTop: '50px' }}
      maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>

  , document.getElementById("root"));
// serviceWorker.registerServiceWorker();
reportWebVitals();
