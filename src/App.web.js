/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import WebRouter from './config/webRouter';
import style from './assets/scss/global.scss';
import {Provider} from 'react-redux';
//import store from './store/setup';
import * as AppActions from '../src/actions';
import setup from "./store/setup.web";

const store = setup();

const App = () => {
  console.log(store,"my store");
  store.dispatch(AppActions.getQuoteData(res => {}));
  return (
    <Provider store={store}>
      <WebRouter />
    </Provider>
  );
};

export default App;
