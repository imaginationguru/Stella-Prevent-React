import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/rootReducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import promise from '@store/promise';
import array from '@store/array';
import whitelist from '@store/whitelist';
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
  persistStore(store, null, () => {
    console.log('PERSIST STORE', store.getState());
  });

  storeObj.store = store;
  return store;
}
