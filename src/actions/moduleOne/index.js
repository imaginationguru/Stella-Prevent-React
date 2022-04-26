/* eslint-disable prettier/prettier */


import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import { loadingAction } from '../common';
import { sessionExpire } from '../tracker';
import { getItem, generateUrlParams } from '../../utils/AsyncUtils';
import { navigatorPush } from '../../config/navigationOptions.web';
import { epdsModalAction } from '..';
import { customAlert } from '../../helpers/commonAlerts.web';
import { getUser } from '../auth';
import { store } from '../../store/setup.web';
const { ACTION_TYPE, URL, STRINGS } = GLOBALS;
const { TRY_AGAIN, CHECK_NETWORK } = STRINGS;
var h2p = require('html2plaintext');



/********************GET CURRENT ACTIVE CARD Data************** */
export function getCurrentActiveCard(isLoading = true, cb) {
  let userId = getItem('userId');
  const selectedWeeks = store.getState().moduleOne.selectedWeek;
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_REQUEST });
    try {
      if (isLoading) {
        dispatch(loadingAction(true));
      }

      let json = await RestClient.getCall(
        `${URL.GET_CURRENT_ACTIVE_CARD}/${userId}`,
      );
      if (json.code === 200) {
        if (cb) {
          cb(json.data);
        }
        dispatch({
          type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_SUCCESS,
          payload: json.data,
        });

        dispatch(getTemplateData(selectedWeeks, isLoading));
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
            type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_FAIL,
          });
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_FAIL,
        payload: error,
      });
    }
  };
}

export function checkActiveCard(cb) {
  let userId = getItem('userId');
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_CURRENT_ACTIVE_CARD}/${userId}`,
      );
      if (json.code === 200) {
        if (cb) {
          cb(json.data);
        }
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
            type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_FAIL,
          });
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_FAIL,
        payload: error,
      });
    }
  };
}
/********************Template  Data************** */
export function getTemplateData(week, isLoading = true) {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_TEMPLATE_DATA_REQUEST });
    try {
      if (isLoading) {
        dispatch(loadingAction(true));
      }

      let json = await RestClient.getCall(
        `${URL.GET_USER_CARDS_BY_WEEK}/${week}/${userId}`,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_TEMPLATE_DATA_SUCCESS,
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
          // dispatch({
          //   type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
          //   payload: json.message,
          // });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_TEMPLATE_DATA_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_TEMPLATE_DATA_FAIL,
        payload: error,
      });
    }
  };
}

/********************MARK READ************** */
export function markRead(params, week) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.CARD_MARK_READ_REQUEST });
    try {
      let json = await RestClient.postCall(URL.MARK_READ, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.CARD_MARK_READ_SUCCESS,
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
            type: ACTION_TYPE.CARD_MARK_READ_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.CARD_MARK_READ_FAIL,
        payload: error,
      });
    }
  };
}

/********************MARK COMPLETE************** */
export function markCompleteCard(params, week, nextDay) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.CARD_MARK_COMPLETE_REQUEST });
    try {
      let json = await RestClient.postCall(URL.MARK_COMPLETE, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.CARD_MARK_COMPLETE_SUCCESS,
          payload: json.data,
        });
        dispatch(getTemplateData(week));
        if (!nextDay) {
          dispatch(getCurrentActiveCard());
        }
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
            type: ACTION_TYPE.CARD_MARK_COMPLETE_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.CARD_MARK_COMPLETE_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET ASSESSMENT DATA************** */
export function getAssessmentData(assessmentId, id, card_id = 'null') {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_ASSESSMENT_DATA_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_ASSESSMENT_DATA}/${assessmentId}/${userId}/${card_id}`,
      );

      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_ASSESSMENT_DATA_SUCCESS,
          payload: json.data,
        });
        if (id) {
          dispatch(getUserAssessment(id, assessmentId));
        }
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
            type: ACTION_TYPE.GET_ASSESSMENT_DATA_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_ASSESSMENT_DATA_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET ASSESSMENT DATA Second************** */
export function getAssessmentDataSecond(assessmentId2, id, card_id = 'null') {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_ASSESSMENT_DATA2_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_ASSESSMENT_DATA}/${assessmentId2}/${userId}/${card_id}`,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_ASSESSMENT_DATA2_SUCCESS,
          payload: json.data,
        });
        if (id) {
          dispatch(getUserAssessment(id, assessmentId2));
        }
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
            type: ACTION_TYPE.GET_ASSESSMENT_DATA_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_ASSESSMENT_DATA_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET ASSESSMENT CONTENT************** */
export function getAssessmentContent(assessmentId) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_ASSESSMENT_CONTENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_ASSESSMENT_CONTENT}/${assessmentId}`,
      );

      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_ASSESSMENT_CONTENT_SUCCESS,
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
            type: ACTION_TYPE.GET_ASSESSMENT_CONTENT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_ASSESSMENT_CONTENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************SAVE ASSESSMENT ************** */
export function saveUserAssessment(params, onSubmitMessage, customMsg = '') {
  let userCardId = params.user_card_id;
  let assessmentId = params.assessment_id;
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.SAVE_USER_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_USER_ASSESSMENT, params);
      if (json.code === 200) {
        const submitMsg = customMsg == '' ? h2p(onSubmitMessage) : customMsg;
        if (submitMsg !== undefined && submitMsg !== null && submitMsg !== '') {
          customAlert(submitMsg, 'success');
        } else {
          customAlert(json.message, 'success');
        }
        dispatch(getUserAssessment(userCardId, assessmentId));
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
            type: ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************SAVE MULTI ASSESSMENT ************** */
export function saveMultiAssessment(params, onSubmitMessage, customMsg = '') {
  let userCardId = params.firstAssessment.user_card_id;
  let assessmentId = params.firstAssessment.assessment_id;
  console.log('parms>>>>>>>>>>>>>>params', params, userCardId, assessmentId);
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.SAVE_USER_MULTI_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(
        URL.SAVE_USER_MULTI_ASSESSMENT,
        params,
      );
      console.log('json in save assessment MULTI read', json);
      if (json.code === 200) {
        console.log('JSON data SAVE USER ASSESSMENT >>>>MULTI>>>>>', json);
        const submitMsg = customMsg == '' ? h2p(onSubmitMessage) : customMsg;
        if (submitMsg !== undefined && submitMsg !== null && submitMsg !== '') {
          customAlert(submitMsg, 'success');
        } else {
          customAlert(json.message, 'success');
        }

        dispatch(getUserMultiAssessment(userCardId, assessmentId));
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd>>>>>>>save user assessment');
          dispatch(sessionExpire(json.message));

          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_USER_MULTI_ASSESSMENT_FAIL,
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
        type: ACTION_TYPE.SAVE_USER_MULTI_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET USER ASSESSMENT ************** */
export function getUserAssessment(userCardId, assessmentId) {
  return async (dispatch, getState) => {
    //console.log(getState().authReducer.loginData.user._id, 'nbmbmbmb');
    let user_id = getItem('userId');
    dispatch({ type: ACTION_TYPE.GET_USER_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_USER_ASSESSMENTS}/${userCardId}/${assessmentId}/${user_id}`,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_ASSESSMENT_SUCCESS,
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
            type: ACTION_TYPE.GET_USER_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET  USER MULTI ASSESSMENT ************** */
export function getUserMultiAssessment(userCardId, assessmentId) {
  return async (dispatch, getState) => {
    console.log(getState().authReducer.loginData.user._id, 'nbmbmbmb');
    //  let user_id = getState().authReducer.loginData.user._id;
    let user_id = getItem('userId');
    dispatch({ type: ACTION_TYPE.GET_USER_MULTI_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_USER_MULTI_ASSESSMENT}/${userCardId}/${assessmentId}/${user_id}`,
      );
      if (json.code === 200) {
        console.log('JSON data gUSER  multi ASSESSMENT>>>>>>>>>', json);
        dispatch({
          type: ACTION_TYPE.GET_USER_MULTI_ASSESSMENT_SUCCESS,
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
          console.log('Session expierd>>>>>>>>>>get user assessment');
          dispatch(sessionExpire(json.message));
          // dispatch({
          //   type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
          //   payload: json.message,
          // });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_USER_MULTI_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      console.log('erroe>>gGET USER ASSESSMENT>>>>>>>>>>>>>>', error);
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_USER_MULTI_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}
// /********************DELETE USER ASSESSMENT DATA ************** */
export function deleteUserAssessmentDataNew(
  content_id,
  userCardId,
  assessment_id,
  content_id2,
  content_id3,
  multi = '',
) {
  let content_ID2 = content_id2 !== undefined ? '?id2=' + content_id2 : '';
  let content_ID3 = content_id3 !== undefined ? '&id3=' + content_id3 : '';

  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.deleteCall(
        `${URL.DELETE_USER_ASSESSMENT_DATA}/${content_id}/${userCardId}` +
        content_ID2 +
        content_ID3,
      );
      if (json.code === 200) {
        //  dispatch(getUserAssessment(userCardId, assessment_id));
        if (multi) {
          console.log('multi???');
          customAlert(json.message, 'success');
          dispatch(getUserMultiAssessment(userCardId, assessment_id));
        } else {
          dispatch(getUserAssessment(userCardId, assessment_id));
        }
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
            type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_FAIL,
        payload: error,
      });
    }
  };
}

/***********************DELETE USER ASSESSMENT DATA*********** */
export function deleteUserAssessmentData(
  content_id,
  userCardId,
  assessment_id,
  idAfter0 = [],
) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = '';
      if (idAfter0.length) {
        json = await RestClient.deleteCall(
          `${URL.DELETE_USER_ASSESSMENT_DATA}/${content_id}/${userCardId}` +
          generateUrlParams(idAfter0),
        );
      } else {
        json = await RestClient.deleteCall(
          `${URL.DELETE_USER_ASSESSMENT_DATA}/${content_id}/${userCardId}`,
        );
      }
      if (json.code === 200) {
        dispatch(getUserAssessment(userCardId, assessment_id));
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
            type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_FAIL,
        payload: error,
      });
    }
  };
}

/********************REARRANGE ASSESSMENT ************** */
export function rearrangeAssessments(params, onSubmitMessage, customMsg = '') {
  let userCardId = params.user_card_id;
  let assessmentId = params.assessment_id;
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.REARRANGE_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.REARRANGE_ASSESSMENT, params);
      if (json.code === 200) {
        const submitMsg = customMsg == '' ? h2p(onSubmitMessage) : customMsg;
        if (submitMsg !== undefined && submitMsg !== null && submitMsg !== '') {
          customAlert(submitMsg, 'success');
        } else {
          customAlert(json.message, 'success');
        }

        dispatch(getUserAssessment(userCardId, assessmentId));
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
            type: ACTION_TYPE.REARRANGE_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.REARRANGE_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************REARRANGE ASSESSMENT ************** */
export function rearrangeMultiAssessments(
  params,
  onSubmitMessage,
  userCardId,
  assessmentId,
  customMsg = '',
) {
  // let userCardId = userCardId;
  // let assessmentId = assessmentId;
  console.log('parms>>>>>>>>>REAARNAGE>>MULTI>>>params', params);
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.REARRANGE_MULTI_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(
        URL.REARRANGE_MULTI_ASSESSMENT,
        params,
      );
      if (json.code === 200) {
        console.log('JSON dataREARRANGE multi USER ASSESSMENT >>>>>>>>>', json);
        const submitMsg = customMsg == '' ? h2p(onSubmitMessage) : customMsg;
        // if (submitMsg !== undefined && submitMsg !== null && submitMsg !== '') {
        //   customAlert(submitMsg, 'success');
        // } else {
        //   customAlert(json.message, 'success');
        // }
        customAlert(json.message, 'success');
        dispatch(getUserMultiAssessment(userCardId, assessmentId));
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          console.log('eREARRANGE ASSESSMENTS>>>>400>>>>>>>>>', json.message);
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd>>>>>>>>>>rearrange assessment');
          dispatch(sessionExpire(json.message));
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.REARRANGE_MULTI_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      console.log('erroeREAARANGE ASSEMENMENT>>>>>>>>>>>>>>', error);
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.REARRANGE_MULTI_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************UPDATE USER ASSESSMENT ** INPUT************ */
export function updateUserAssessment(params, msg = 'true') {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_USER_ASSESSMENT, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_SUCCESS,
          payload: json.data,
        });
        if (msg) {
          customAlert(json.message, 'success');
        }

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
            type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************ADD USER RATING COMMENT ASSESSMENT ************** */
export function addUserRating(params, week) {
  let userId = params.user_id;
  let programId = params.program_id;
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.ADD_USER_RATING_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.ADD_USER_RATING, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.ADD_USER_RATING_SUCCESS,
          payload: json.data,
        });

        dispatch(getUserRating(userId, programId, week));

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
            type: ACTION_TYPE.ADD_USER_RATING_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET USER ASSESSMENT ************** */
export function getUserRating(userId, programId, week) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_USER_RATING_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_USER_RATING}/${userId}/${programId}/${week}`,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_RATING_SUCCESS,
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
            type: ACTION_TYPE.GET_USER_RATING_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_USER_RATING_FAIL,
        payload: error,
      });
    }
  };
}

/********************UPDATE USER RATING LIKE ASSESSMENT ************** */
export function updateUserRating(params) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.UPDATE_USER_RATING_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_USER_RATING, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.UPDATE_USER_RATING_SUCCESS,
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
            type: ACTION_TYPE.UPDATE_USER_RATING_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET USER get-userQuestionInfo ************** */
export function getUserQuestionInfo(params) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_USER_QUESTION_INFO_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.GET_USER_QUESTION_INFO, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_QUESTION_INFO_SUCCESS,
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
            type: ACTION_TYPE.GET_USER_QUESTION_INFO_FAIL,
          });
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_USER_QUESTION_INFO_FAIL,
        payload: error,
      });
      dispatch(loadingAction(false));
    }
  };
}

/********************SAVE PATIENT ASSESSMENT ************** */
export function savePatientAssessment(
  params,
  message,
  assessmentId,
  isEPDS,
  cb,
  _id,
) {
  let getParams = {
    assessment_id: assessmentId,
    user_id: getItem('userId'),
    stellaPrevent: true,
    card_id: params[0].card_id,
  };
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_PATIENT_ASSESSMENT, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_SUCCESS,
          payload: json.data,
        });
        {
          if (message && message.length) {
            const submitMsg = h2p(message);
            customAlert(submitMsg, 'success');

            if (isEPDS) {
              dispatch(epdsModalAction(false));
              dispatch({
                type: ACTION_TYPE.LOGIN_SUCCESS,
                payload: json.data[0].userInfo,
              });
              cb();
            }
          } else {
            customAlert(json.message, 'success');
          }
        }

        dispatch(getUserQuestionInfo(getParams));
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
            type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************SAVE Week ************** */
export function getWeek(week) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPE.GET_SELECTED_WEEK,
      payload: week,
    });
    dispatch({
      type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
      payload: '',
    });
  };
}

/********************GET PROGRAM FILE************** */
export function getProgramFiles() {
  let programId = getItem('programId');
  let hospitalId = getItem('hospitalId');
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.GET_PROGRAM_FILES_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_PROGRAM_FILES}/${programId}/${hospitalId}`,
      );
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_PROGRAM_FILES_SUCCESS,
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
            type: ACTION_TYPE.GET_PROGRAM_FILES_FAIL,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_PROGRAM_FILES_FAIL,
        payload: error,
      });
    }
  };
}

/********************Get Plans************** */

export function getPlans() {
  return async (dispatch) => {
    try {
      let json = await RestClient.getCall(`${URL.GET_PLANS_LIST}`);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_PLANS,
          payload: json.data,
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
    }
  };
}

export function Addpayment(params, componentId) {
  return async (dispatch) => {
    dispatch(loadingAction(true));
    let userId = getItem('userId');
    const postdata = {
      user_id: userId,
    };
    try {
      let json = await RestClient.postCall(URL.SAVE_PAYMENT, params);
      if (json.code === 200) {
        customAlert(json.message, 'success');

        dispatch(getUser(postdata));
        navigatorPush({ componentId, screenName: 'Dashboard' });
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          dispatch(sessionExpire(json.message));
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
    }
  };
}

export function contactUs(params) {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPE.SAVE_CONTACT_REQUEST });
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.CONTACT_US, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.SAVE_CONTACT_SUCCESS,
          payload: json,
        });
        customAlert(json.message, 'success');
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
            type: ACTION_TYPE.SAVE_CONTACT_FAIL,
          });
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.SAVE_CONTACT_FAIL,
        payload: error,
      });
      dispatch(loadingAction(false));
    }
  };
}
