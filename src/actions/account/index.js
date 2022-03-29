import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import { navigatorPush } from '../../config/navigationOptions';
import { storeItem, getItem } from '../../utils/AsyncUtils';
import { loadingAction } from '../common';
const { ACTION_TYPE, URL, STRINGS } = GLOBALS;
const { TRY_AGAIN, CHECK_NETWORK } = STRINGS;
import { Linking, Platform } from 'react-native';
import { getWeek } from '../moduleOne';
import { customAlert } from '../../helpers/commonAlerts.web';
//******************************Login******************* */

export function changeLanguage(param) {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.CHANGE_LANGUAGE, param);
      if (json.code === 200) {

        customAlert(json.message, 'success');

      } else {
        if (json.code === 400) {

          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));

      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}

export function toggleNotification(param) {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_NOTIFICATION, param);
      if (json.code === 200) {

        customAlert(json.message, 'success');
      } else {
        if (json.code === 400) {

          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );

      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}

export function updatePassword(param) {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_PASSWORD, param);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_SUCCESS,
          payload: json.data,
        });

        customAlert(json.message, 'success');
      } else {
        if (json.code === 400) {

          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));

      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}

export function uploadProfile(param) {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_PROFILE, param);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_SUCCESS,
          payload: json.data,
        });
        customAlert(json.message, 'success');

        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {

          customAlert(json.message, 'error');
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      dispatch(loadingAction(false));

      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}

export function updateUserDetails(param) {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_USER_DATA, param);
      if (json.code === 200) {

        customAlert(json.message, 'success');
        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
      } else {
        if (json.code === 400) {

          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));

      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}





