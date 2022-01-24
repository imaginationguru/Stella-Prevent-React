import GLOBALS from '../../constants';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  templateLoader: false,
  templateData: [],
  cardReadData: {},
  cardCompleteData: {},
  assessmentData: {},
  assessmentData2: {},
  assessmentContentData: {},
  saveAssessmentData: {},
  userAssessmentData: [],
  currentActiveCard: [],
  userRatingData: [],
  userQuestion: [],
  selectedWeek: 1,
  selectedDay: 1,
  selectedWeeks:1,
  selectedCardId: '',
  programFiles: '',
  quotes:{
    quoteText:"",
    quoteImg:""
  },
  plansData:[]
};

const {ACTION_TYPE} = GLOBALS;
function moduleOne(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_TEMPLATE_DATA_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_TEMPLATE_DATA_SUCCESS:
      return {...state, templateLoader: false, templateData: action.payload};
    case ACTION_TYPE.GET_TEMPLATE_DATA_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.CARD_MARK_READ_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.CARD_MARK_READ_SUCCESS:
      return {...state, templateLoader: false, cardReadData: action.payload};
    case ACTION_TYPE.CARD_MARK_READ_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.CARD_MARK_COMPLETE_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.CARD_MARK_COMPLETE_SUCCESS:
      return {
        ...state,
        templateLoader: false,
        cardCompleteData: action.payload,
      };
    case ACTION_TYPE.CARD_MARK_COMPLETE_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_ASSESSMENT_DATA_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_ASSESSMENT_DATA_SUCCESS:
      return {...state, templateLoader: false, assessmentData: action.payload};
    case ACTION_TYPE.GET_ASSESSMENT_DATA_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_ASSESSMENT_DATA2_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_ASSESSMENT_DATA2_SUCCESS:
      return {...state, templateLoader: false, assessmentData2: action.payload};
    case ACTION_TYPE.GET_ASSESSMENT_DATA2_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_ASSESSMENT_CONTENT_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_ASSESSMENT_CONTENT_SUCCESS:
      return {
        ...state,
        templateLoader: false,
        assessmentContentData: action.payload,
      };
    case ACTION_TYPE.GET_ASSESSMENT_CONTENT_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.SAVE_USER_ASSESSMENT_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.SAVE_USER_ASSESSMENT_SUCCESS:
      return {
        ...state,
        templateLoader: false,
        saveAssessmentData: action.payload,
      };
    case ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_USER_ASSESSMENT_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_USER_ASSESSMENT_SUCCESS:
      return {
        ...state,
        templateLoader: false,
        userAssessmentData: action.payload,
      };
    case ACTION_TYPE.GET_USER_ASSESSMENT_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_SUCCESS:
      return {
        ...state,
        templateLoader: false,
        currentActiveCard: action.payload,
      };
    case ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_USER_RATING_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_USER_RATING_SUCCESS:
      return {...state, templateLoader: false, userRatingData: action.payload};
    case ACTION_TYPE.GET_USER_RATING_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.GET_USER_QUESTION_INFO_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_USER_QUESTION_INFO_SUCCESS:
      return {
        ...state,
        templateLoader: false,
        userQuestion: action.payload,
      };
    case ACTION_TYPE.GET_USER_QUESTION_INFO_FAIL:
      return {...state, templateLoader: false};
    case ACTION_TYPE.SELECTED_WEEK:
      return {...state, selectedWeeks: action.payload};
      case ACTION_TYPE.GET_SELECTED_WEEK:
      return {...state, selectedWeek: action.payload};
    case ACTION_TYPE.GET_SELECTED_DAY:
      return {...state, selectedDay: action.payload};
    case ACTION_TYPE.GET_SELECTED_CARD_ID:
      return {...state, selectedCardId: action.payload};
    case ACTION_TYPE.GET_PROGRAM_FILES_REQUEST:
      return {...state, templateLoader: true};
    case ACTION_TYPE.GET_PROGRAM_FILES_SUCCESS:
      return {...state, templateLoader: false, programFiles: action.payload};
    case ACTION_TYPE.GET_PROGRAM_FILES_FAIL:
      return {...state, templateLoader: false};
      case ACTION_TYPE.SET_QUOTES_DATA:
        return {...state, quotes: {...action.payload}};
        case ACTION_TYPE.GET_PLANS:
        return {...state, plansData: action.payload};
    default:
      return state;
  }
}
export default moduleOne;
