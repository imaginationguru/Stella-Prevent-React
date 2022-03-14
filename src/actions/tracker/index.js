import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import {loadingAction} from '../common';
import {getItem} from '../../utils/AsyncUtils';
import {navigatorPush, navigatorPop} from '../../config/navigationOptions';
import moment from 'moment';
import {customAlert} from '../../helpers/commonAlerts.web';
const {ACTION_TYPE, URL, STRINGS} = GLOBALS;
const {TRY_AGAIN, CHECK_NETWORK} = STRINGS;

/********************GET MOOD DATA************** */
export function getMoodData(date) {
  console.log('getMoodData inside actions');
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_MOOD_REQUEST});
    try {
      dispatch(loadingAction(true));
      let params = {
        user_id: userId,
        date: date,
        timeZone: moment.tz.guess(),
        patientDate: date,
      };
      console.log('get mood data paramsss', params);
      let json = await RestClient.postCall(URL.GET_MOOD_API, params);
      console.log('json MOOD in actions', json);
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
          console.log('Session expierd>>>>>>>get assessment data');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_MOOD_FAIL,
          });
        }
      }
    } catch (error) {
      console.log(
        'erroe>>get template cards data>>>>>>>>>>get assessment data>>>>',
        error,
      );
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
export function saveUserMood(params) {
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
        console.log('JSON data SAVE USER ASSESSMENT >>>>>>>>>', json);
        customAlert(json.message, 'success', {}, null, (onPress) => {
          dispatch(navigatorPop());
        });
        dispatch({
          type: ACTION_TYPE.SAVE_MOOD_SUCCESS,
          payload: json.message,
        });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          console.log(
            'erroe>> csave USER ASSESSMENT>>>>>400>>>>>>>>>',
            json.message,
          );
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd>>>>>>>save user assessment');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_MOOD_FAIL,
          });
        }
      }
    } catch (error) {
      console.log('erroe>> csave USER ASSESSMENT>>>>>>>>>>>>>>', error);
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
  console.log('get activity tracker params', params);
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_ACTIVITY_TRACKER_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(
        URL.GET_ALL_ACTIVITY_TRACKER_API,
        params,
      );
      if (json.code === 200) {
        console.log('get activity tracker data', json.data);
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
          console.log('Session expierd>>>>>>>get assessment data');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_ACTIVITY_TRACKER_FAIL,
          });
        }
      }
    } catch (error) {
      console.log(
        'erroe>>get template cards data>>>>>>>>>>get assessment data>>>>',
        error,
      );
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
  console.log('get selected activity tracker params', params);
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
        console.log('get selected activity tracker data', json.data);
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
          console.log('Session expierd>>>>>>>get assessment data');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_FAIL,
          });
        }
      }
    } catch (error) {
      console.log(
        'erroe>>get template cards data>>>>>>>>>>get assessment data>>>>',
        error,
      );
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
export function saveActivityTracker(params) {
  console.log('params>>>>>>', params);
  let postData = {
    hospital_id: params.hospital_id,
    patient_id: params.patient_id,
    timeZone: moment.tz.guess(),
    patientDate: moment().format(STRINGS.DATE_FORMATE),
  };
  console.log(' save post data get selected activity tracker', postData);
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
          dispatch(navigatorPop());
        });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // });
        // dispatch(getActivityTracker(postData));
        // dispatch(getSelectedActivityTracker(postData));
        // navigatorPush({screenName: 'ActivityTracker'});
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
export function saveSleepTracker(params, postDataGetAPI) {
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
        console.log('JSON data SAVE SLEEP >>>>>>>>>', json);
        dispatch({
          type: ACTION_TYPE.SAVE_SLEEP_TRACKER_SUCCESS,
          payload: json.message,
        });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // });
        // customAlert(json.message, 'success');

        dispatch(getSleepData(postDataGetAPI));
        dispatch(loadingAction(false));
        customAlert(json.message, 'success', {}, null, (onPress) => {
          dispatch(navigatorPop());
        });
      } else {
        if (json.code === 400) {
          console.log(
            'erroe>> csave USER ASSESSMENT>>>>>400>>>>>>>>>',
            json.message,
          );
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd>>>>>>>save user assessment');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_SLEEP_TRACKER_FAIL,
          });
        }
        dispatch(loadingAction(false));
      }
    } catch (error) {
      console.log('erroe>> csave USER ASSESSMENT>>>>>>>>>>>>>>', error);
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
      console.log('json sleep in actions', json);
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
          console.log('Session expierd>>>>>>>get assessment data');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_SLEEP_TRACKER_FAIL,
          });
        }
      }
    } catch (error) {
      console.log(
        'erroe>>get template cards data>>>>>>>>>>get assessment data>>>>',
        error,
      );
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
  // let userId = getItem('userId');
  // let postData = {
  //   ...params,
  //   user_id: userId,
  // };
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.GET_WEEKLY_SUMMARY_API, params);
      console.log('json sleep in actions', json);
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
          console.log('Session expierd>>>>>>>get assessment data');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_FAIL,
          });
        }
      }
    } catch (error) {
      console.log(
        'erroe>>get template cards data>>>>>>>>>>get assessment data>>>>',
        error,
      );
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
