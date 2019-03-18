import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Navigation from './Navigation';
import * as serviceWorker from './serviceWorker';
import './App.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, undefined, composeEnhancer(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Navigation />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.register();
