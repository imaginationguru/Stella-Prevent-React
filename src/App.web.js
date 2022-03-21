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


const caching= ()=> {
let version = localStorage.getItem('version');
console.log("app version-->",version,packageJson.version);
    if(version!=packageJson.version)
    {
        if('caches' in window){
         caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach(name => {
            caches.delete(name);
        })
    });
    window.location.reload(true);
}

      localStorage.clear();
      localStorage.setItem('version',packageJson.version);
    }
};

const App = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
    caching()
  }, []);
  console.log(store, 'my store');
  store.dispatch(AppActions.getQuoteData((res) => { }));
  return (
    <Provider store={store}>
      <WebRouter />
    </Provider>
  );
};



export default App;
