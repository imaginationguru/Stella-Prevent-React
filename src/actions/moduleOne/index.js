/* eslint-disable prettier/prettier */
import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import {loadingAction} from '../common';
import {getItem, generateUrlParams} from '../../utils/AsyncUtils';
import {navigatorPush} from '../../config/navigationOptions.web';
import {epdsModalAction} from '..';
import {Dimensions} from 'react-native-web';
import {customAlert} from '../../helpers/commonAlerts.web';
const {ACTION_TYPE, URL, COLORS, STRINGS} = GLOBALS;
const {TRY_AGAIN, CHECK_NETWORK} = STRINGS;
import Swal from 'sweetalert2';
import {getUser} from '../auth';
import {useSelector} from 'react-redux';
const DEVICE_WIDTH = Dimensions.get('window').width;
var h2p = require('html2plaintext');
import {store} from '../../store/setup.web';

/********************GET CURRENT ACTIVE CARD Data************** */
export function getCurrentActiveCard(cb) {
  let userId = getItem('userId');
  const selectedWeeks = store.getState().moduleOne.selectedWeeks;
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_CURRENT_ACTIVE_CARD}/${userId}`,
      );
      if (json.code === 200) {
        console.log('get current active card JSON>', json);
        console.log('get current active card 200 JSON Data>', json.data);
        console.log('get current active card datataas200>', json.data.data);
        if (cb) {
          cb(json.data);
        }
        dispatch({
          type: ACTION_TYPE.GET_CURRENT_ACTIVE_CARD_SUCCESS,
          payload: json.data,
          //  payload: json.data.data,
        });

        dispatch(getTemplateData(selectedWeeks));
        // console.log(selectedWeeks, json.data, 'Setting data');
        // dispatch({
        //   type: 'GET_SELECTED_DAY',
        //   payload:
        //     json.data ? json.data.day : 1,
        // });
        {
          /***on reload same card id exits */
          //   //    payload:
          //   //  json.data.data && json.data.data.length
          //   //    ? json.data.data[0]._id
          //   //    : '',
        }
        // dispatch({
        //   type: 'GET_SELECTED_CARD_ID',
        //   payload: json.data && json.data.length ? json.data._id : '',
        // });
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd=>>>>>>>>>>>get current active card');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
      console.log('get current active card error>>>>>>>>>>>', error);
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
        console.log('get current active card 200>', json.data);
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
          console.log('Session expierd=>>>>>>>>>>>get current active card');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
      console.log('get current active card error>>>>>>>>>>>', error);
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
export function getTemplateData(week) {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_TEMPLATE_DATA_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_USER_CARDS_BY_WEEK}/${week}/${userId}`,
      );
      console.log('json in actions card by week', json);
      if (json.code === 200) {
        console.log('JSON data get Template >>>>>>>>>', json.data);
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_TEMPLATE_DATA_FAIL,
          });
        }
      }
    } catch (error) {
      console.log(
        'erroe>>get template cards data>>>get user cards by week>>>>>>>>>>>',
        error,
      );
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
    dispatch({type: ACTION_TYPE.CARD_MARK_READ_REQUEST});
    try {
      // dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.MARK_READ, params);
      console.log('json in mark read', json);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.CARD_MARK_READ_SUCCESS,
          payload: json.data,
        });
        // dispatch(getCurrentActiveCard());
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd in mark read>>>>>>>>');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.CARD_MARK_READ_FAIL,
          });
        }
      }
    } catch (error) {
      console.log('erroe>> cards read data>>>>>>>>>>>>>>', error);
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
    dispatch({type: ACTION_TYPE.CARD_MARK_COMPLETE_REQUEST});
    try {
      // dispatch(loadingAction(true));
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
export function getAssessmentData(assessmentId, id) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_ASSESSMENT_DATA_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_ASSESSMENT_DATA}/${assessmentId}`,
      );

      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_ASSESSMENT_DATA_SUCCESS,
          payload: json.data,
        });
        console.log('get Assesment data', json.data);
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_ASSESSMENT_DATA_FAIL,
          });

          // toast(STRINGS.SOMETHING_WENT_WRONG);
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
export function getAssessmentDataSecond(assessmentId2, id) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_ASSESSMENT_DATA2_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_ASSESSMENT_DATA}/${assessmentId2}`,
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_ASSESSMENT2_DATA_FAIL,
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
    dispatch({type: ACTION_TYPE.GET_ASSESSMENT_CONTENT_REQUEST});
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
export function saveUserAssessment(params, onSubmitMessage) {
  let userCardId = params.user_card_id;
  let assessmentId = params.assessment_id;
  console.log('parms>>>>>>>>>>>>>>params', params, userCardId, assessmentId);
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.SAVE_USER_ASSESSMENT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_USER_ASSESSMENT, params);
      console.log('json in save assessment read', json);
      if (json.code === 200) {
        console.log('JSON data SAVE USER ASSESSMENT >>>>>>>>>', json);
        const submitMsg = h2p(onSubmitMessage);
        if (submitMsg !== undefined && submitMsg !== null && submitMsg !== '') {
          customAlert(submitMsg, 'success');
        } else {
          customAlert(json.message, 'success');
        }
        // dispatch({
        //   type: ACTION_TYPE.SAVE_USER_ASSESSMENT_SUCCESS,
        //   payload: json.data,
        // });
        // if (
        //   submitMsg !== undefined &&
        //   submitMsg !== null &&
        //   submitMsg !== '' &&
        //   submitMsg.length > 100
        // )
        {
          /* 
           Swal.fire({
            text: submitMsg,
            timer: 7000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: COLORS.DARK_GREEN,
            width: DEVICE_WIDTH > 1000 ? '25vw' : '60vw',
          });
          */
        }
        // else if (
        //   submitMsg !== undefined &&
        //   submitMsg !== null &&
        //   submitMsg !== '' &&
        //   submitMsg.length <= 100
        // )
        // {
        //   dispatch({
        //     type: ACTION_TYPE.SUCCESS_MESSAGE,
        //     payload: submitMsg,
        //   });
        // } else {
        //   dispatch({
        //     type: ACTION_TYPE.SUCCESS_MESSAGE,
        //     payload: json.message,
        //   });
        // }
        /*
         {
          onSubmitMessage !== undefined &&
          onSubmitMessage !== null &&
          onSubmitMessage !== ''
            ? dispatch({
                type: ACTION_TYPE.SUCCESS_MESSAGE,
                payload: onSubmitMessage,
              })
            : dispatch({
                type: ACTION_TYPE.SUCCESS_MESSAGE,
                payload: json.message,
              });
        }
        */

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
          console.log('Session expierd>>>>>>>save user assessment');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL,
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
        type: ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET USER ASSESSMENT ************** */
export function getUserAssessment(userCardId, assessmentId) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_USER_ASSESSMENT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_USER_ASSESSMENTS}/${userCardId}/${assessmentId}`,
      );
      if (json.code === 200) {
        console.log('JSON data gUSER ASSESSMENT>>>>>>>>>', json);
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
          console.log('Session expierd>>>>>>>>>>get user assessment');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_USER_ASSESSMENT_FAIL,
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
        type: ACTION_TYPE.GET_USER_ASSESSMENT_FAIL,
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
) {
  let content_ID2 = content_id2 !== undefined ? '?id2=' + content_id2 : '';
  let content_ID3 = content_id3 !== undefined ? '&id3=' + content_id3 : '';

  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.deleteCall(
        // eslint-disable-next-line prettier/prettier
        `${URL.DELETE_USER_ASSESSMENT_DATA}/${content_id}/${userCardId}` +
          content_ID2 +
          content_ID3,
      );
      console.log('deleteJSON', json);
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
    console.log('id after 0 >>>>>>>>delete', idAfter0);
    dispatch({type: ACTION_TYPE.DELETE_USER_ASSESSMENT_DATA_REQUEST});
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
      console.log('deleteJSON', json);
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
export function rearrangeAssessments(params, onSubmitMessage) {
  let userCardId = params.user_card_id;
  let assessmentId = params.assessment_id;
  console.log('parms>>>>>>>>>REAARNAGE>>>>>params', params);
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.REARRANGE_ASSESSMENT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.REARRANGE_ASSESSMENT, params);
      if (json.code === 200) {
        console.log('JSON dataREARRANGE USER ASSESSMENT >>>>>>>>>', json);
        const submitMsg = h2p(onSubmitMessage);
        if (submitMsg !== undefined && submitMsg !== null && submitMsg !== '') {
          customAlert(submitMsg, 'success');
        } else {
          customAlert(json.message, 'success');
        }
        // dispatch({
        //   type: ACTION_TYPE.REARRANGE_ASSESSMENT_SUCCESS,
        //   payload: json.data,
        // });
        // {
        //   onSubmitMessage !== undefined &&
        //   onSubmitMessage !== null &&
        //   onSubmitMessage !== ''
        //     ? dispatch({
        //         type: ACTION_TYPE.SUCCESS_MESSAGE,
        //         payload: onSubmitMessage,
        //       })
        //     : dispatch({
        //         type: ACTION_TYPE.SUCCESS_MESSAGE,
        //         payload: json.message,
        //       });
        // }
        dispatch(getUserAssessment(userCardId, assessmentId));
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.REARRANGE_ASSESSMENT_FAIL,
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
        type: ACTION_TYPE.REARRANGE_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************UPDATE USER ASSESSMENT ** INPUT************ */
export function updateUserAssessment(params) {
  // let userCardId = params.user_card_id;
  // let assessmentId = params.assessment_id;
  console.log('parms>>>>>>>>update>>>>params', params);
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_USER_ASSESSMENT, params);
      console.log('json in update assessment read', json);
      if (json.code === 200) {
        console.log('JSON datupdate user assessmnet>>>>>>>>>', json);
        dispatch({
          type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_SUCCESS,
          payload: json.data,
        });
        dispatch({
          type: ACTION_TYPE.SUCCESS_MESSAGE,
          payload: json.message,
        });
        //  dispatch(getUserAssessment(userCardId, assessmentId));
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          console.log('eREupdate user assessment>>400>>>>>>>>>', json.message);
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 417) {
          console.log('Session expierd>>>>>>save user assessment');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_FAIL,
          });
        }
      }
    } catch (error) {
      console.log('erroeupdate userassessment>>>>>>>>>>>>>>', error);
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
    dispatch({type: ACTION_TYPE.ADD_USER_RATING_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.ADD_USER_RATING, params);
      console.log('json in save assessment read', json);
      if (json.code === 200) {
        console.log('JSON data SAVE USER ASSESSMENT >>>>>>>>>', json);
        dispatch({
          type: ACTION_TYPE.ADD_USER_RATING_SUCCESS,
          payload: json.data,
        });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // });
        dispatch(getUserRating(userId, programId, week));

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
            type: ACTION_TYPE.ADD_USER_RATING_FAIL,
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
        type: ACTION_TYPE.SAVE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET USER ASSESSMENT ************** */
export function getUserRating(userId, programId, week) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_USER_RATING_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.getCall(
        `${URL.GET_USER_RATING}/${userId}/${programId}/${week}`,
      );
      if (json.code === 200) {
        console.log('JSON data gUSER ASSESSMENT>>>>>>>>>', json);
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
          console.log('Session expierd>>>>>>>>>>get user assessment');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_USER_RATING_FAIL,
          });
        }
      }
    } catch (error) {
      console.log('erroe>>gGET USER ARATING>>>>>>>>>>>>>>', error);
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
    dispatch({type: ACTION_TYPE.UPDATE_USER_RATING_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.UPDATE_USER_RATING, params);
      console.log('json in save assessment read', json);
      if (json.code === 200) {
        console.log('JSON data SAVE USER ASSESSMENT >>>>>>>>>', json);
        dispatch({
          type: ACTION_TYPE.UPDATE_USER_RATING_SUCCESS,
          payload: json.data,
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
            type: ACTION_TYPE.UPDATE_USER_RATING_FAIL,
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
        type: ACTION_TYPE.UPDATE_USER_ASSESSMENT_FAIL,
        payload: error,
      });
    }
  };
}

/********************GET USER get-userQuestionInfo ************** */
export function getUserQuestionInfo(params) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_USER_QUESTION_INFO_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.GET_USER_QUESTION_INFO, params);
      if (json.code === 200) {
        console.log('JSON data get-userQuestionInfo>>>>>>>>>', json.data);
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
          console.log('Session expierd>>>>>>>>>>get-userQuestionInfo');
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        } else {
          dispatch({
            type: ACTION_TYPE.GET_USER_QUESTION_INFO_FAIL,
          });
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      console.log('erroe>>gGET get-userQuestionInfo>>>>>>>>>>>>>', error);
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
  console.log(
    'params save patient assessment',
    JSON.stringify(params),
    'message',
    message,
  );
  let getParams = {
    assessment_id: assessmentId,
    user_id: getItem('userId'),
    stellaPrevent: true,
    card_id: params[0].card_id,
  };
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.SAVE_PATIENT_ASSESSMENT, params);
      console.log('json in save assessment read', json);
      if (json.code === 200) {
        console.log('JSON data SAVE patient ASSESSMENT >>>>>>>>>', json);
        dispatch({
          type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_SUCCESS,
          payload: json.data,
        });
        {
          if (message && message.length) {
            const submitMsg = h2p(message);
            customAlert(submitMsg, 'success');
            // customAlert(message,"success")

            // dispatch({
            //   type: ACTION_TYPE.SUCCESS_MESSAGE,
            //   payload: message,
            // });
            if (isEPDS) {
              dispatch(epdsModalAction(false));
              dispatch({
                type: ACTION_TYPE.LOGIN_SUCCESS,
                payload: json.data[0].userInfo,
              });
              cb();
              // navigatorPush({
              //   screenName: 'DailyLearningWeeks',
              //   passProps: 1,
              // });
            }
          } else {
            customAlert(json.message, 'success');
            // dispatch({
            //   type: ACTION_TYPE.SUCCESS_MESSAGE,
            //   payload: json.message,
            // });
          }
        }
        // if (isEPDS) {
        //   dispatch(epdsModalAction(false));
        // }
        dispatch(getUserQuestionInfo(getParams));
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          console.log(
            'erroe>> csave patient ASSESSMENT>>>>>400>>>>>>>>>',
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
            type: ACTION_TYPE.SAVE_PATIENT_ASSESSMENT_FAIL,
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
    dispatch({type: ACTION_TYPE.GET_PROGRAM_FILES_REQUEST});
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
          dispatch({
            type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
            payload: json.message,
          });
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
        console.log('getPlanData', json);
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
  console.log('add payment');
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

        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // });
        console.log('Addpayment', json);
        dispatch(getUser(postdata));
        navigatorPush({componentId, screenName: 'Dashboard'});
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
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
    }
  };
}
