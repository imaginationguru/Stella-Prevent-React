/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import WebRouter from './config/webRouter';
import style from './assets/scss/global.scss';
import { Provider } from 'react-redux';
//import store from './store/setup';
import * as AppActions from '../src/actions';
import setup from './store/setup.web';
import packageJson from "../package.json"

const store = setup();


const caching = () => {
  let version = localStorage.getItem('version') ? localStorage.getItem('version') : '';
  let package_version = packageJson.version;
  if (!version.includes(package_version)) {
    console.log("no match....")
    if ('caches' in window) {
      caches.keys().then((names) => {
        // xDelete all the cache files
        names.forEach(name => {
          caches.delete(name);
        })
      });
      localStorage.clear()
      window.location.reload(true);
      localStorage.setItem('version', packageJson.version);
    }
  } else {
    console.log("match..")
  }
};

const App = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
    caching()
  }, []);
  store.dispatch(AppActions.getQuoteData((res) => { }));
  return (
    <Provider store={store}>
      <WebRouter />
    </Provider>
  );
};



export default App;
