import * as Images from '../assets/images/index.js';
import VeryHappy from '../assets/images/veryHappy/veryHappy.png';
import VeryHappyActive from '../assets/images/veryHappyActive/veryHappyActive.png';
import Happy from '../assets/images/happy/happy.png';
import HappyActive from '../assets/images/happyActive/happyActive.png';
import Confused from '../assets/images/confused/confused.png';
import ConfusedActive from '../assets/images/confusedActive/confusedActive.png';
import Sad from '../assets/images/sad/sad.png';
import SadActive from '../assets/images/sadActive/sadActive.png';
import Angry from '../assets/images/angry/angry.png';
import AngryActive from '../assets/images/angryActive/angryActive.png';
const isLive = false;
export default {
  BASE_URL: isLive
    ? 'https://stella-prevent-careportal.curio-dtx.com/api/'
    : 'http://52.170.117.197/api/', //1.5 stella
  IMAGE_BASE_URL: isLive
    ? 'https://stella-prevent-careportal.curio-dtx.com/' //UAT
    : 'http://52.170.117.197/', //dev

  // BASE_URL: 'http://104.43.172.201:4001/api/',
  // IMAGE_BASE_URL: 'http://104.43.172.201:4001/', //QA
  /********************************** * URL ***********************************/
  URL: {
    LOGIN: 'login',
    REGISTER: 'register',
    GET_USER_CARDS_BY_WEEK: 'get-user-cards-by-week',
    BIND_PROGRAM_USER: 'add-user-program-cards',
    GET_PROGRAM_BY_ID: 'get-program-by-id',
    USER_EMAIL_EXISTS: 'check-email',
    CHANGE_PASSWORD: 'change-password',
    MARK_READ: 'mark-read',
    MARK_COMPLETE: 'mark-complete',
    GET_ASSESSMENT_DATA: 'get-assessment-data',
    GET_QUOTE_DATA: 'get-quote',
    VERIFY_SOCIAL_USER: 'verify-email',
    GET_ASSESSMENT_CONTENT: 'get-assessment-content',
    SAVE_USER_ASSESSMENT: 'save-user-assessment',
    GET_USER_ASSESSMENTS: 'get-user-assessments',
    DELETE_USER_ASSESSMENT_DATA: 'delete-user-assessment-data',
    REARRANGE_ASSESSMENT: 'rearrange-assessment',
    UPDATE_USER_ASSESSMENT: 'update-user-assessment',
    GET_CURRENT_ACTIVE_CARD: 'get-current-active-card',
    LOGOUT: 'logout',
    ADD_USER_RATING: 'add-user-rating',
    UPDATE_USER_RATING: 'update-user-rating',
    GET_USER_RATING: 'get-user-rating',
    GET_USER_QUESTION_INFO: 'get-assessmentQuestion',
    SAVE_PATIENT_ASSESSMENT: 'save-patientAssessment',
    GET_PLANS_LIST: 'list-plans',
    //tracker api
    GET_MOOD_API: 'get-symptom-list',
    SAVE_MOOD_API: 'send-response',
    GET_ALL_ACTIVITY_TRACKER_API: 'getAllActivityTraker',
    GET_SELECTED_ACTIVITY_TRACKER_API: 'getActivityTrakerSelected',
    SAVE_ACTIVITY_API: 'addOtherActivitydata',
    SAVE_SLEEP_API: 'add-sleep-traker',
    GET_SLEEP_TRACKER_API: 'get-sleep-trakerbyId',
    GET_PROGRAM_FILES: 'get-program-files',
    GET_USER: 'get-user',
    SAVE_PAYMENT: 'squareup-payment',
    /**Profile */
    CHANGE_LANGUAGE: 'change-language',
    UPDATE_NOTIFICATION: 'update-notification',
    UPDATE_PASSWORD: 'update-password',
    UPDATE_PROFILE: 'uploadProfileImg',
    UPDATE_USER_DATA: 'update-user-details',
    ACCEPT_WELCOME: 'accept-welcomescreen',
    RESEND_REGISTRATION_CODE_API: 'resend-regestration-code',
    GET_WEEKLY_SUMMARY_API: 'get-alltrackerdata',
  },

  /*************************FONTS************************** */
  FONTS: {
    EXTRA_LIGHT: 'Oswald-ExtraLight',
    BOLD: 'CircularStd-Bold',
    LIGHT: 'CircularStd-Book',
    REGULAR: 'HKGrotesk-Regular',
    SEMI_BOLD: 'HKGrotesk SemiBold',
    MEDIUM: 'HKGrotesk Medium',
    CIRCULAR_REGULAR: 'CircularStd-Book',
    CIRCULAR_MEDIUM: 'CircularStd-Medium',
    CIRCULAR_BOLD: 'CircularStd-Bold',
    SF_DISPLAY_REGULAR: 'SFUIDisplay-Regular',
    NEW_REGULAR: 'HKGrotesk-Regular',
    // NEW_REGULAR: 'HKGrotesk-Medium',
  },

  /******************************STRINGS************************* */

  STRINGS: {
    SOMETHING_WENT_WRONG: 'Something went wrong',
    CHECK_NETWORK: 'Please check your internet connection',
    TRY_AGAIN: 'Something went wrong. Please try again !',
    USER_ID: 'userId',
    DATE_FORMATE: 'YYYY-MM-DD',
    ACTIVITY: 'Pleasant Activities',
    DAILY_ACTIVITY: 'Daily Activities',
  },

  MOODS_ARRAY: [
    {
      id: 5,
      // image: VeryHappy,
      // activeImage: Images.VeryHappyActive,
      image: VeryHappy,
      activeImage: VeryHappyActive,
      isClickTrue: false,
      moodValue: 2,
    },
    {
      id: 4,
      image: Happy,
      activeImage: HappyActive,
      // image: '../assets/images/happy/happy.png',
      // activeImage: '../assets/images/happyActive/happyActive.png',
      isClickTrue: false,
      moodValue: 1,
    },
    {
      id: 3,
      image: Confused,
      activeImage: ConfusedActive,
      // image: '../assets/images/confused/confused.png',
      // activeImage: '../assets/images/confusedActive/confusedActive.png',
      isClickTrue: false,
      moodValue: 2,
    },
    {
      id: 2,
      image: Sad,
      activeImage: SadActive,
      // image: '../assets/images/sad/sad.png',
      // activeImage: '../assets/images/sadActive/sadActive.png',
      isClickTrue: false,
      moodValue: 1,
    },
    {
      id: 1,
      image: Angry,
      activeImage: AngryActive,
      // image: '../assets/images/angry/angry.png',
      // activeImage: '../assets/images/angryActive/angryActive.png',
      isClickTrue: false,
      moodValue: 1,
    },
  ],

  /****************************** ACTION TYPE********************* */
  ACTION_TYPE: {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_RESET: 'LOGIN_RESET',
    GET_TEMPLATE_DATA_REQUEST: 'GET_TEMPLATE_DATA_REQUEST',
    GET_TEMPLATE_DATA_SUCCESS: 'GET_TEMPLATE_DATA_SUCCESS',
    GET_TEMPLATE_DATA_FAIL: 'GET_TEMPLATE_DATA_FAIL',
    LOADING: 'LOADING',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    SIGNUP_REQUEST: 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
    ERROR: 'ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SESSION_EXPIRED_MESSAGE: 'SESSION_EXPIRED_MESSAGE',
    CLEAR_SESSION_EXPIRED_MESSAGE: 'CLEAR_SESSION_EXPIRED_MESSAGE',
    BIND_PROGRAM_USER_REQUEST: 'BIND_PROGRAM_USER_REQUEST',
    BIND_PROGRAM_USER_SUCCESS: 'BIND_PROGRAM_USER_SUCCESS',
    BIND_PROGRAM_USER_FAIL: 'BIND_PROGRAM_USER_FAIL',
    GET_PROGRAM_REQUEST: 'GET_PROGRAM_REQUEST',
    GET_PROGRAM_SUCCESS: 'GET_PROGRAM_SUCCESS',
    GET_PROGRAM_FAIL: 'GET_PROGRAM_FAIL',
    USER_EMAIL_EXISTS_REQUEST: 'USER_EMAIL_EXISTS_REQUEST',
    USER_EMAIL_EXISTS_SUCCESS: 'USER_EMAIL_EXISTS_SUCCESS',
    USER_EMAIL_EXISTS_CLEAR: 'USER_EMAIL_EXISTS_CLEAR',
    USER_EMAIL_EXISTS_FAIL: 'USER_EMAIL_EXISTS_FAIL',
    CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAIL: 'CHANGE_PASSWORD_FAIL',
    DASHBOARD_MODAL_HANDLER: 'DASHBOARD_MODAL_HANDLER',
    CHANGE_PASSWORD_CLEAR: 'CHANGE_PASSWORD_CLEAR',
    CARD_MARK_READ_REQUEST: 'CARD_MARK_READ_REQUEST',
    CARD_MARK_READ_SUCCESS: 'CARD_MARK_READ_SUCCESS',
    CARD_MARK_READ_FAIL: 'CARD_MARK_READ_FAIL',
    CARD_MARK_COMPLETE_REQUEST: 'CARD_MARK_COMPLETE_REQUEST',
    CARD_MARK_COMPLETE_SUCCESS: 'CARD_MARK_COMPLETE_SUCCESS',
    CARD_MARK_COMPLETE_FAIL: 'CARD_MARK_COMPLETE_FAIL',
    GET_QUOTE_DATA_REQUEST: 'GET_QUOTE_DATA_REQUEST',
    GET_QUOTE_DATA_SUCCESS: 'GET_QUOTE_DATA_SUCCESS',
    GET_QUOTE_DATA_FAIL: 'GET_QUOTE_DATA_FAIL',
    VERIFY_USER_DATA_REQUEST: 'VERIFY_USER_DATA_REQUEST',
    VERIFY_USER_DATA_SUCCESS: 'VERIFY_USER_DATA_SUCCESS',
    VERIFY_USER_DATA_FAIL: 'VERIFY_USER_DATA_FAIL',
    GET_ASSESSMENT_DATA_REQUEST: 'GET_ASSESSMENT_DATA_REQUEST',
    GET_ASSESSMENT_DATA_SUCCESS: 'GET_ASSESSMENT_DATA_SUCCESS',
    GET_ASSESSMENT_DATA_FAIL: 'GET_ASSESSMENT_DATA_FAIL',
    GET_ASSESSMENT_DATA2_REQUEST: 'GET_ASSESSMENT_DATA2_REQUEST',
    GET_ASSESSMENT_DATA2_SUCCESS: 'GET_ASSESSMENT_DATA2_SUCCESS',
    GET_ASSESSMENT_DATA2_FAIL: 'GET_ASSESSMENT_DATA2_FAIL',
    GET_ASSESSMENT_CONTENT_REQUEST: 'GET_ASSESSMENT_CONTENT_REQUEST',
    GET_ASSESSMENT_CONTENT_SUCCESS: 'GET_ASSESSMENT_CONTENT_SUCCESS',
    GET_ASSESSMENT_CONTENT_FAIL: 'GET_ASSESSMENT_CONTENT_FAIL',
    SAVE_USER_ASSESSMENT_REQUEST: 'SAVE_USER_ASSESSMENT_REQUEST',
    SAVE_USER_ASSESSMENT_SUCCESS: 'SAVE_USER_ASSESSMENT_SUCCESS',
    SAVE_USER_ASSESSMENT_FAIL: 'SAVE_USER_ASSESSMENT_FAIL',
    SUCCESS_MESSAGE: 'SUCCESS_MESSAGE',
    CLEAR_SUCCESS_MESSAGE: 'CLEAR_SUCCESS_MESSAGE',
    GET_USER_ASSESSMENT_REQUEST: 'GET_USER_ASSESSMENT_REQUEST',
    GET_USER_ASSESSMENT_SUCCESS: 'GET_USER_ASSESSMENT_SUCCESS',
    GET_USER_ASSESSMENT_FAIL: 'GET_USER_ASSESSMENT_FAIL',
    DELETE_USER_ASSESSMENT_DATA_REQUEST: 'DELETE_USER_ASSESSMENT_DATA_REQUEST',
    DELETE_USER_ASSESSMENT_DATA_SUCCESS: 'DELETE_USER_ASSESSMENT_DATA_SUCCESS',
    DELETE_USER_ASSESSMENT_DATA_FAIL: 'DELETE_USER_ASSESSMENT_DATA_FAIL',
    REARRANGE_ASSESSMENT_REQUEST: 'REARRANGE_ASSESSMENT_REQUEST',
    REARRANGE_ASSESSMENT_SUCCESS: 'REARRANGE_ASSESSMENT_SUCCESS',
    REARRANGE_ASSESSMENT_FAIL: 'REARRANGE_ASSESSMENT_FAIL',
    UPDATE_USER_ASSESSMENT_REQUEST: 'UPDATE_USER_ASSESSMENT_REQUEST',
    UPDATE_USER_ASSESSMENT_SUCCESS: 'UPDATE_USER_ASSESSMENT_SUCCESS',
    UPDATE_USER_ASSESSMENT_FAIL: 'UPDATE_USER_ASSESSMENT_FAIL',
    GET_CURRENT_ACTIVE_CARD_REQUEST: 'GET_CURRENT_ACTIVE_CARD_REQUEST',
    GET_CURRENT_ACTIVE_CARD_SUCCESS: 'GET_CURRENT_ACTIVE_CARD_SUCCESS',
    GET_CURRENT_ACTIVE_CARD_FAIL: 'GET_CURRENT_ACTIVE_CARD_FAIL',
    LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST',
    LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
    LOGOUT_USER_FAIL: 'LOGOUT_USER_FAIL',
    ADD_USER_RATING_REQUEST: 'ADD_USER_RATING_REQUEST',
    ADD_USER_RATING_SUCCESS: 'ADD_USER_RATING_SUCCESS',
    ADD_USER_RATING_FAIL: 'ADD_USER_RATING_FAIL',
    GET_USER_RATING_REQUEST: 'GET_USER_RATING_REQUEST',
    GET_USER_RATING_SUCCESS: 'GET_USER_RATING_SUCCESS',
    GET_USER_RATING_FAIL: 'GET_USER_RATING_FAIL',
    UPDATE_USER_RATING_REQUEST: 'UPDATE_USER_RATING_REQUEST',
    UPDATE_USER_RATING_SUCCESS: 'UPDATE_USER_RATING_SUCCESS',
    UPDATE_USER_RATING_FAIL: 'UPDATE_USER_RATING_FAIL',
    GET_USER_QUESTION_INFO_REQUEST: 'GET_USER_QUESTION_INFO_REQUEST',
    GET_USER_QUESTION_INFO_SUCCESS: 'GET_USER_QUESTION_INFO_SUCCESS',
    GET_USER_QUESTION_INFO_FAIL: 'GET_USER_QUESTION_INFO_FAIL',
    SAVE_PATIENT_ASSESSMENT_REQUEST: 'SAVE_PATIENT_ASSESSMENT_REQUEST',
    SAVE_PATIENT_ASSESSMENT_SUCCESS: 'SAVE_PATIENT_ASSESSMENT_SUCCESS',
    SAVE_PATIENT_ASSESSMENT_FAIL: 'SAVE_PATIENT_ASSESSMENT_FAIL',
    //Trackers apis
    GET_MOOD_REQUEST: 'GET_MOOD_REQUEST',
    GET_MOOD_SUCCESS: 'GET_MOOD_SUCCESS',
    GET_MOOD_FAIL: 'GET_MOOD_FAIL',

    SAVE_MOOD_REQUEST: 'SAVE_MOOD_REQUEST',
    SAVE_MOOD_SUCCESS: 'SAVE_MOOD_SUCCESS',
    SAVE_MOOD_FAIL: 'SAVE_MOOD_FAIL',

    GET_ACTIVITY_TRACKER_REQUEST: 'GET_ACTIVITY_TRACKER_REQUEST',
    GET_ACTIVITY_TRACKER_SUCCESS: 'GET_ACTIVITY_TRACKER_SUCCESS',
    GET_ACTIVITY_TRACKER_FAIL: 'GET_ACTIVITY_TRACKER_FAIL',

    GET_SELECTED_ACTIVITY_TRACKER_REQUEST:
      'GET_SELECTED_ACTIVITY_TRACKER_REQUEST',
    GET_SELECTED_ACTIVITY_TRACKER_SUCCESS:
      'GET_SELECTED_ACTIVITY_TRACKER_SUCCESS',
    GET_SELECTED_ACTIVITY_TRACKER_FAIL: 'GET_SELECTED_ACTIVITY_TRACKER_FAIL',

    SAVE_OTHER_ACTIVITY_REQUEST: 'SAVE_OTHER_ACTIVITY_REQUEST',
    SAVE_OTHER_ACTIVITY_SUCCESS: 'SAVE_OTHER_ACTIVITY_SUCCESS',
    SAVE_OTHER_ACTIVITY_FAIL: 'SAVE_OTHER_ACTIVITY_FAIL',

    SAVE_SLEEP_TRACKER_REQUEST: 'SAVE_SLEEP_TRACKER_REQUEST',
    SAVE_SLEEP_TRACKER_SUCCESS: 'SAVE_SLEEP_TRACKER_SUCCESS',
    SAVE_SLEEP_TRACKER_FAIL: 'SAVE_SLEEP_TRACKER_FAIL',

    GET_SLEEP_TRACKER_REQUEST: 'GET_SLEEP_TRACKER_REQUEST',
    GET_SLEEP_TRACKER_SUCCESS: 'GET_SLEEP_TRACKER_SUCCESS',
    GET_SLEEP_TRACKER_FAIL: 'GET_SLEEP_TRACKER_FAIL',
    SELECTED_WEEK: 'SELECTED_WEEK',

    GET_SELECTED_WEEK: 'GET_SELECTED_WEEK',
    GET_SELECTED_DAY: 'GET_SELECTED_DAY',
    GET_SELECTED_CARD_ID: 'GET_SELECTED_CARD_ID',

    GET_PROGRAM_FILES_REQUEST: 'GET_PROGRAM_FILES_REQUEST',
    GET_PROGRAM_FILES_SUCCESS: 'GET_PROGRAM_FILES',
    GET_PROGRAM_FILES_FAIL: 'GET_PROGRAM_FILES_FAIL',

    SET_QUOTES_DATA: 'SET_QUOTES_DATA',
    TOGGLE_EPDS_MODAL: 'TOGGLE_EPDS_MODAL',
    GET_PLANS: 'GET_PLANS',

    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',
    SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',

    GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',
    GET_LANGUGAE_SUCCESS: 'GET_LANGUGAE_SUCCESS',
    GET_WEEKLY_SUMMARY_REPORT_REQUEST: 'GET_WEEKLY_SUMMARY_REPORT_REQUEST',
    GET_WEEKLY_SUMMARY_REPORT_SUCCESS: 'GET_WEEKLY_SUMMARY_REPORT_SUCCESS',
    GET_WEEKLY_SUMMARY_REPORT_FAIL: 'GET_WEEKLY_SUMMARY_REPORT_FAIL',

    SET_TRACKER_STATUS: 'SET_TRACKER_STATUS',
    CLEAR_MODULE_ONE: 'CLEAR_MODULE_ONE',
  },

  /***************************COLORS*************************** */

  COLORS: {
    GRAY: '#C4C4C4',
    BUTTON_ORANGE: '#F08B22',
    BOX_GRAY: '#D7E7ED',
    CIRCLE_GRAY: '#57576D',
    LIGHT_GRAY: '#F1F3FA',
    LIGHT_PINK: '#FAD6D5',
    LIGHT_ORANGE: '#FCE3CC',
    LIGHT_YELLOW: '#FCF2D4',
    LIGHT_GREEN: '#D9EFEA',
    DARK_RED: '#D85454',
    DARK_GREEN: '#5BB7A4',
    RED: '#F05A28',
    GRAY2: '#D8D8D8',
    GRAY1: '#CCCCCC',
    YELLOW: '#F2C842',
    LIGHT_GREEN1: '#E0F8DC',
    BORDER_GRAY: '#E4E4E4',
    GREEN_TEXT: '#5DBDA9',
    WHITE: '#ffff',
    BG_RED: '#E15555',
    PRIMARY: '#1B82D4',
    BLACK: '#000000',
    HEADING_BLACK: '#0f243d',
    SOFT_GRAY: '#313132',
    LOGIN_BG: '#e6f2ff',
    BORDER_COLOR: 'rgba(147, 147, 147, 0.2)',
    SHADOW_COLOR: 'rgba(60, 134, 221,0.2)',
    ERROR: 'red',
    DARK_GREEN: '#006f59',
    BLUR: 'rgba(0, 0, 0,0.6)',
    facebook: '#1877F2',
    LIGHT_BLACK: '#35353F',
    PLAN_GRAY: '#A9A9AA',
    text_Gray: '#697386',
    LIGHT_SHADOW_GREEN: '#C9E2DE',
    GREY: '#676767' /* Font Regular */,
  },
};
