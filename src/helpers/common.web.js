import store from '../store/setup';

import {useDispatch, useSelector} from 'react-redux';
const isInternet = () => window.navigator.onLine;
let accessToken = () => store.getState().authReducer.loginToken;

const checkIfWeekCanAccess = (week = 1, planInfo = {}) => {
  console.log(planInfo, 'llolll');
  if (planInfo.numericPrice === 0 && week < 2) return true;
  else if (planInfo.numericPrice > 0) return true;
  else return false;
};
const getSelectedWeekDayCards = (curr_week, curr_day, data) => {};

const canProceedNextDay = (curr_week, curr_day, total_week, total_day) => {
  console.log(curr_week, curr_day, total_week, total_day,"curr_week, curr_day, total_week, total_day")
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

export {isInternet, accessToken, checkIfWeekCanAccess, getSelectedWeekDayCards,canProceedNextDay};
