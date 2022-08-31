import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ModalProvider from './context/Modal';

import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if(process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return(
    <App />
  )
}

ReactDOM.render(


  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>

          <Root />

        </BrowserRouter>
      </ModalProvider>

    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
