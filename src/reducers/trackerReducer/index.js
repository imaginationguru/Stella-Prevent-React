import GLOBALS from '../../constants';

const INITIAL_STATE = {
  moodLoader: false,
  moodTrackerData: [],
  getActivityLoader: false,
  getActivityData: [],
  getSelectedActivityLoader: false,
  getSelectedActivityData: [],
  saveActivityLoader: false,
  saveActivityData: false,

  getSleepTrackerLoader: false,
  getSleepTrackerData: false,
  getWeeklySummaryReportData: {},
};

const { ACTION_TYPE } = GLOBALS;
function trackerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_MOOD_FAIL:
      return { ...state, moodLoader: false };
    case ACTION_TYPE.GET_MOOD_REQUEST:
      return { ...state, moodLoader: true };
    case ACTION_TYPE.GET_MOOD_SUCCESS:
      return {
        ...state,
        moodLoader: false,
        moodTrackerData: action.payload,
      };

    case ACTION_TYPE.GET_ACTIVITY_TRACKER_FAIL:
      return { ...state, getActivityLoader: false };
    case ACTION_TYPE.GET_ACTIVITY_TRACKER_REQUEST:
      return { ...state, getActivityLoader: true };
    case ACTION_TYPE.GET_ACTIVITY_TRACKER_SUCCESS:
      return {
        ...state,
        getActivityLoader: false,
        getActivityData: action.payload,
      };

    case ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_FAIL:
      return { ...state, getSelectedActivityLoader: false };
    case ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_REQUEST:
      return { ...state, getSelectedActivityLoader: true };
    case ACTION_TYPE.GET_SELECTED_ACTIVITY_TRACKER_SUCCESS:
      return {
        ...state,
        getSelectedActivityLoader: false,
        getSelectedActivityData: action.payload,
      };

    case ACTION_TYPE.SAVE_OTHER_ACTIVITY_FAIL:
      return { ...state, saveActivityLoader: false };
    case ACTION_TYPE.SAVE_OTHER_ACTIVITY_REQUEST:
      return { ...state, saveActivityLoader: true };
    case ACTION_TYPE.SAVE_OTHER_ACTIVITY_SUCCESS:
      return {
        ...state,
        saveActivityLoader: false,
        saveActivityData: true,
      };

    case ACTION_TYPE.GET_SLEEP_TRACKER_FAIL:
      return { ...state, getSleepTrackerLoader: false };
    case ACTION_TYPE.GET_SLEEP_TRACKER_REQUEST:
      return { ...state, getSleepTrackerLoader: true };
    case ACTION_TYPE.GET_SLEEP_TRACKER_SUCCESS:
      return {
        ...state,
        getSleepTrackerLoader: false,
        getSleepTrackerData: action.payload,
      };
    case ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_REQUEST:
      return { ...state, getWeeklyLoader: true };
    case ACTION_TYPE.GET_WEEKLY_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        getWeeklySummaryReportData: action.payload,
      };

    default:
      return state;
  }
}
export default trackerReducer;
