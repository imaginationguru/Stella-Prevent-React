import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import {loadingAction, clearSessionExpiredAction} from '../../actions/common';
import {getItem, removeItem} from '../../utils/AsyncUtils';
import {navigatorPop, navigatortoStart} from '../../config/navigationOptions';
import moment from 'moment';
import {customAlert} from '../../helpers/commonAlerts.web';
import {addTimeTracker} from '../moduleOne';

const {ACTION_TYPE, URL, STRINGS} = GLOBALS;
const {TRY_AGAIN, CHECK_NETWORK} = STRINGS;

export const sessionExpire = (message) => {
  return async (dispatch) => {
    customAlert(message, 'success', {}, null, (onPress) => {
      let currentData = getItem(STRINGS.CARD_DATA);
      console.log('SessionExpired_cardData', currentData)
      let startTime = getItem(STRINGS.SCREEN_START_TIME);
      console.log('SessionExpired_startTime', startTime)
      if(currentData !== null){
        let cardTimeTrackingData = {
          userId: currentData.user_id,
          group: STRINGS.DAILY_LEARNING,
          screen: STRINGS.CARDS,
          startTime: startTime,
          endTime: moment().format(),
          date: moment().format(),
          week: currentData.week,
          day: currentData.day,
          card_number: currentData.card_number,
        };
        dispatch(addTimeTracker(cardTimeTrackingData));
      }
      dispatch(clearSessionExpiredAction());
      removeItem(STRINGS.CARD_DATA)
      removeItem(STRINGS.SCREEN_START_TIME)
      // localStorage.clear();
      // history.push('/');
      setTimeout(() => {
        navigatortoStart();
      }, localStorage.clear());
      dispatch({
        type: ACTION_TYPE.LOGOUT_USER_SUCCESS,
        payload: {},
      });
      dispatch({
        type: ACTION_TYPE.CLEAR_MODULE_ONE,
        payload: {},
      });
    });
  };
};
/********************GET MOOD DATA************** */
export function getMoodData(date) {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_MOOD_REQUEST});
    let currentData = getItem(STRINGS.CARD_DATA);
    console.log('SessionExpired_cardData', currentData)
    let startTime = getItem(STRINGS.SCREEN_START_TIME);
    console.log('SessionExpired_startTime', startTime)
    try {
      dispatch(loadingAction(true));
      let params = {
        user_id: userId,
        date: date,
        timeZone: moment.tz.guess(),
        patientDate: date,
      };
      let json = await RestClient.postCall(URL.GET_MOOD_API, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_MOOD_SUCCESS,
          payload: json.data,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_MOOD_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_MOOD_FAIL,
        payload: error,
      });
    }
  };
}

/********************SAVE MOOD DATA ************** */
export function saveUserMood(params, timePostData) {
  return async (dispatch) => {
    let userId = getItem('userId');
    let postData = {
      ...params,
      user_id: userId,
    };
    dispatch({type: ACTION_TYPE.SAVE_MOOD_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_MOOD_API, postData);
      if (json.code === 200) {
        customAlert(json.message, 'success', {}, null, (onPress) => {
          dispatch(addTimeTracker(timePostData));
          navigatorPop();
        });
        dispatch({
          type: ACTION_TYPE.SAVE_MOOD_SUCCESS,
          payload: json.message,
        });

        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_MOOD_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_MOOD_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET ACTIVITY DATA************** */
export function getActivityTracker(params) {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_ACTIVITY_TRACKER_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(
        URL.GET_ALL_ACTIVITY_TRACKER_API,
        params,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_ACTIVITY_TRACKER_SUCCESS,
          payload: json.data,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_ACTIVITY_TRACKER_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_ACTIVITY_TRACKER_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET SELECTED ACTIVITY DATA************** */
export function getSelectedActivityTracker(params) {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(
        URL.GET_SELECTED_ACTIVITY_TRACKER_API,
        params,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_SUCCESS,
          payload: json.data,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_FAIL,
        payload: error,
      });
    }
  };
}

/********************SAVE ACTIVITY DATA************** */
export function saveActivityTracker(params, timePostData) {
  let postData = {
    hospital_id: params.hospital_id,
    patient_id: params.patient_id,
    timeZone: moment.tz.guess(),
    patientDate: moment().format(STRINGS.DATE_FORMATE),
  };
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.SAVE_OTHER_ACTIVITY_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_ACTIVITY_API, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.SAVE_OTHER_ACTIVITY_SUCCESS,
          payload: json.data,
        });
        customAlert(json.message, 'success', {}, null, (onPress) => {
          dispatch(addTimeTracker(timePostData));
          navigatorPop();
        });

        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_OTHER_ACTIVITY_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_OTHER_ACTIVITY_FAIL,
        payload: error,
      });
    }
  };
}

/********************SAVE Sleep Tracker ************** */
export function saveSleepTracker(params, postDataGetAPI, timePostData) {
  return async (dispatch) => {
    let userId = getItem('userId');
    let postData = {
      ...params,
      user_id: userId,
    };
    dispatch({type: ACTION_TYPE.SAVE_SLEEP_TRACKER_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_SLEEP_API, postData);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.SAVE_SLEEP_TRACKER_SUCCESS,
          payload: json.message,
        });

        dispatch(getSleepData(postDataGetAPI));
        dispatch(loadingAction(false));
        customAlert(json.message, 'success', {}, null, (onPress) => {
          dispatch(addTimeTracker(timePostData));
          navigatorPop();
        });
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_SLEEP_TRACKER_FAIL,
          });
        }
        dispatch(loadingAction(false));
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_SLEEP_TRACKER_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET Sleep DATA************** */
export function getSleepData(params) {
  let userId = getItem('userId');
  let postData = {
    ...params,
    user_id: userId,
  };
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_SLEEP_TRACKER_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.GET_SLEEP_TRACKER_API, postData);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_SLEEP_TRACKER_SUCCESS,
          payload: json.data,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch(loadingAction(false));
          dispatch({
            type: ACTION_TYPE.GET_SLEEP_TRACKER_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_SLEEP_TRACKER_FAIL,
        payload: error,
      });
    }
  };
}

//getWeeklySummaryReport

export function getWeeklySummaryReport(params) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.GET_WEEKLY_SUMMARY_API, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_SUCCESS,
          payload: json.data,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_FAIL,
        payload: error,
      });
    }
  };
}

/********************USER LAST SEEN UPDATE ************** */
export function updateUserLastSeen() {
  return async (dispatch) => {
    let userId = getItem('userId');
    let postData = {
      user_id: userId,
    };
    dispatch({ type: ACTION_TYPE.UPDATE_LAST_SEEN_REQUEST });
    try {
      // dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_LAST_SEEN_API, postData);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.UPDATE_LAST_SEEN_SUCCESS,
          payload: json.message,
        });
        // dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.UPDATE_LAST_SEEN_FAIL,
          });
        }
        dispatch(loadingAction(false));
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.UPDATE_LAST_SEEN_FAIL,
        payload: error,
      });
    }
  };
}