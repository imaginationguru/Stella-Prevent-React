'use strict';

import {create} from 'apisauce';
import GLOBALS from '../constants';
import {accessToken, isInternet} from '../helpers/common';
import {getItem} from '../utils/AsyncUtils';
const {BASE_URL} = GLOBALS;
import store, {storeObj} from '../store/setup.web';
//let Token = getItem('token');

const api = create({
  baseURL: BASE_URL, //TEST_API_URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
   },
 });
const setToken = () => {
  let Token = storeObj.store.getState().authReducer.loginToken;
  console.log(Token, 'accessToken.......');
   if (Token) {
    console.log(Token, 'Token......');
    api.setHeader('Authorization', Token);
  }
};
class RestClient {
  static getCall(url, params = {}) {
    console.log('url get URL>>>>>>>>>>>>>>>>', BASE_URL + url, params);
     setToken();
    return new Promise(function (fulfill, reject) {
      if (isInternet()) {
        api.get(BASE_URL + url, params).then((response) => {
          console.log('response GET API Rest Client>>>>>>>', response);
          if (response.status === 200) {
            fulfill(response.data);
          }
          reject(response);
        });
      } else {
        fulfill({
          message:
            'The server is not reachable right now, sorry for inconvenience.',
        });
      }
    });
  }

  static postCall(url, params) {
    console.log(
      'url post URL>>>>>>>>>>rest client>>>>>>',
      BASE_URL + url,
      params,
    );
    setToken();
     return new Promise(function (fulfill, reject) {
      if (isInternet()) {
        api.post(BASE_URL + url, params).then((response) => {
          console.log('response Post API Rest Client>>>>>>>', url, response);
          if (response.status === 200) {
            fulfill(response.data);
          }
          reject(response);
        });
      } else {
        fulfill({
          message:
            'The server is not reachable right now, sorry for inconvenience.',
        });
      }
    });
  }

  static deleteCall(url, params) {
    console.log(
      'url delete URL>>>>>>>>>>rest client>>>>>>',
      BASE_URL + url,
      params,
    );
    setToken();
     return new Promise(function (fulfill, reject) {
      if (isInternet()) {
        api.delete(BASE_URL + url, params).then((response) => {
          console.log('response Post API Rest Client>>>>>>>', response);
          if (response.status === 200) {
            fulfill(response.data);
          }
          reject(response);
        });
      } else {
        fulfill({
          message:
            'The server is not reachable right now, sorry for inconvenience.',
        });
      }
    });
  }

  
  
}

export default RestClient;
