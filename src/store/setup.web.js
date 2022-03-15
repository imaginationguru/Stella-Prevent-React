import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/rootReducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import promise from './promise';
import array from './array';
import whitelist from './whitelist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const storeObj = {};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: whitelist,
};

const logger = createLogger();

const middleware = [
  composeWithDevTools(applyMiddleware(...[thunk, promise, array], logger)),
];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, compose(...middleware));

export default function setup() {
  //console.log = () => {};
  persistStore(store, null, () => {
    console.log('PERSIST STORE', store.getState());
  });

  storeObj.store = store;
  return store;
}
