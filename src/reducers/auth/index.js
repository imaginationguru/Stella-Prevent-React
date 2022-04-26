import GLOBALS from '../../constants';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  loginData: null,
  loginToken: null,
  signupData: null,
  programData: [],
  userData: [],
  resetData: {},
  quoteData: [],
  verifySocailUserData: [],
  profileImg: '',
};

const { ACTION_TYPE } = GLOBALS;
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.LOGIN_RESET /* RESET LOGIN */:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loginData: null,
        loginToken: null,
      };
    case ACTION_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loginData: action.payload,
        loginToken: action.payload.token,
      };
    case ACTION_TYPE.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loginData: null,
        loginToken: null,
      };
    case ACTION_TYPE.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        loginData: null,
        isLoading: false,
        loginToken: null,
        programData: [],
        profileImg: null,
      };
    case ACTION_TYPE.GET_PROGRAM_REQUEST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.GET_PROGRAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        programData: action.payload,
      };
    case ACTION_TYPE.GET_PROGRAM_FAIL:
      return { ...state, isLoading: false, programData: null };
    case ACTION_TYPE.USER_EMAIL_EXISTS_REQUEST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.USER_EMAIL_EXISTS_SUCCESS:
      return { ...state, isLoading: false, userData: action.payload };
    case ACTION_TYPE.USER_EMAIL_EXISTS_CLEAR:
      return { ...state, isLoading: false, userData: [] };
    case ACTION_TYPE.USER_EMAIL_EXISTS_FAIL:
      return { ...state, isLoading: false, userData: null };
    case ACTION_TYPE.CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true };
    case ACTION_TYPE.CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, resetData: action.payload };
    case ACTION_TYPE.CHANGE_PASSWORD_CLEAR:
      return { ...state, isLoading: false, resetData: {} };
    case ACTION_TYPE.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: 'false',
        resetData: null,
      };
    case ACTION_TYPE.GET_QUOTE_DATA_REQUEST:
      return { ...state, isLoading: true };

    case ACTION_TYPE.GET_QUOTE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        quoteData: action.payload,
        loginData: null,
        loginToken: null,
      };
    case ACTION_TYPE.GET_QUOTE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loginData: null,
        quoteData: null,
        loginToken: null,
      };
    case ACTION_TYPE.VERIFY_USER_DATA_REQUEST:
      return { ...state, isLoading: true };

    case ACTION_TYPE.VERIFY_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        verifySocailUserData: action.payload,
      };
    case ACTION_TYPE.VERIFY_USER_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        verifySocailUserData: null,
        loginData: null,
        loginToken: null,
      };
    case ACTION_TYPE.SET_PROFILE_IMAGE /* RESET LOGIN */:
      return {
        ...state,
        profileImg: action.payload,
      };
    case ACTION_TYPE.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
      };
    case ACTION_TYPE.GET_LANGUGAE_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
      };
    default:
      return state;
  }
}
export default authReducer;
