import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();

if(process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  
  window.csrfFetch = csrfFetch;
  window.store = store;
}

const Root = () => {
  return(
    <App />
  )
}

ReactDOM.render(


  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Root />

      </BrowserRouter>

    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
