import store from '../store/setup';
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import GLOBALS from '../constants';
const { STRINGS } = GLOBALS;

const isInternet = () => window.navigator.onLine;
let accessToken = () => store.getState().authReducer.loginToken;

const checkIfWeekCanAccess = (week = 1, planInfo = {}) => {
  if (planInfo.price === 0 && week < 2) return true;
  else if (planInfo.price > 0) return true;
  else return false;
};
const getSelectedWeekDayCards = (curr_week, curr_day, data) => { };

const canProceedNextDay = (curr_week, curr_day, total_week, total_day) => {
  console.log(
    curr_week,
    curr_day,
    total_week,
    total_day,
    'curr_week, curr_day, total_week, total_day',
  );
  if (curr_week < total_week) {
    return true;
  } else if (curr_week == total_week) {
    if (curr_day <= total_day) {
      return true;
    } else {
      return false;
    }
  }
};

const checkNextDayUnlocked = (curr_week, curr_day, total_week, total_day) => {
  if (curr_week < total_week) {
    if (curr_day < 6) {
      return {
        new_day: curr_day + 1,
        new_week: curr_week,
      };
    }
    if (curr_day == 7) {
      return {
        new_day: 1,
        new_week: curr_week + 1,
      };
    }
  } else if (curr_week == total_week && curr_day == total_day) {
    return null;
  } else if (curr_week == total_week) {
    if (curr_day < total_day) {
      return {
        new_day: curr_day + 1,
        new_week: curr_week,
      };
    }
    if (curr_day == 7) {
      return {
        new_day: 1,
        new_week: curr_week + 1,
      };
    }
  }
};
const encryptRequest = (data) => {
  return data;
  // return {
  //   data: CryptoJS.AES.encrypt(
  //     JSON.stringify(data),
  //     STRINGS.HIPPA_KEY,
  //   ).toString(),
  // };
};

const decryptRequest = (data) => {
  return data;
  // let bytes = CryptoJS.AES.decrypt(data, STRINGS.HIPPA_KEY);
  // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // return decryptedData;
};
const detectBrowser = () => {
  let userAgent = navigator?.userAgent;
  let browserName;
  if (userAgent.match(/edg/i)) {
    browserName = 'Microsoft Edge (Chromium)';
  } else if (userAgent.match(/edge/i)) {
    browserName = 'Microsoft Edge (Legacy)';
  } else if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'Google Chrome or Chromium';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'Apple Safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else {
    browserName = 'No browser detection';
  }
  return browserName;
};

export {
  isInternet,
  accessToken,
  checkIfWeekCanAccess,
  getSelectedWeekDayCards,
  canProceedNextDay,
  detectBrowser,
  encryptRequest,
  decryptRequest,
};
