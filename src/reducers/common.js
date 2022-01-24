import GLOBALS from '../constants';

const INITIAL_STATE = {
  isLoading: false,
  lang: 'en',
  isError: false,
  errorMessage: '',
  isSuccess: false,
  successMessage: '',
  isDashboardModal: false,
  sessionExpireMessage: '',
  isSessionError: false,
  isEPDSModalShow: false,
};
const {ACTION_TYPE} = GLOBALS;
function common(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.LOADING:
      return {...state, isLoading: action.payload};
    case ACTION_TYPE.CHANGE_LANGUAGE:
      return {...state, lang: action.payload};
    case ACTION_TYPE.ERROR:
      return {...state, isError: true, errorMessage: action.payload};
    case ACTION_TYPE.CLEAR_ERROR:
      return {...state, isError: false, errorMessage: ''};
    case ACTION_TYPE.SUCCESS_MESSAGE:
      return {...state, isSuccess: true, successMessage: action.payload};
    case ACTION_TYPE.CLEAR_SUCCESS_MESSAGE:
      return {...state, isSuccess: false, successMessage: ''};
    case ACTION_TYPE.DASHBOARD_MODAL_HANDLER:
      return {...state, isDashboardModal: action.payload};
    case ACTION_TYPE.SESSION_EXPIRED_MESSAGE:
      return {
        ...state,
        isSessionError: true,
        sessionExpireMessage: action.payload,
      };
    case ACTION_TYPE.CLEAR_SESSION_EXPIRED_MESSAGE:
      return {...state, isSessionError: false, sessionExpireMessage: ''};
    case ACTION_TYPE.TOGGLE_EPDS_MODAL:
      return {...state, isEPDSModalShow: action.payload};
    default:
      return state;
  }
}
export default common;
