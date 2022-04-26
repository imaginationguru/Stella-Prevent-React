import GLOBALS from '../constants';
const { ACTION_TYPE } = GLOBALS;

export const loadingAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.LOADING,
    payload,
  });

export const errorAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.ERROR,
    payload,
  });
export const clearErrorAction = () => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.CLEAR_ERROR,
  });

export const sessionExpiredAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
    payload,
  });
export const clearSessionExpiredAction = () => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.CLEAR_SESSION_EXPIRED_MESSAGE,
  });

export const successAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.SUCCESS_MESSAGE,
    payload,
  });

export const clearSuccessAction = () => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.CLEAR_SUCCESS_MESSAGE,
  });
export const dashboardModalAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.DASHBOARD_MODAL_HANDLER,
    payload,
  });
export const resetPasswordDataClear = () => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.CHANGE_PASSWORD_CLEAR,
  });
export const userDataClear = () => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.USER_EMAIL_EXISTS_CLEAR,
  });
export const changeLanguageAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.CHANGE_LANGUAGE,
    payload,
  });

export const epdsModalAction = (payload) => (dispatch) =>
  dispatch({
    type: ACTION_TYPE.TOGGLE_EPDS_MODAL,
    payload,
  });
