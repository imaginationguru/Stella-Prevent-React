import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import {navigatorPush, navigatortoStart} from '../../config/navigationOptions';
import {storeItem, getItem} from '../../utils/AsyncUtils';
import {loadingAction} from '../common';
const {ACTION_TYPE, URL, STRINGS} = GLOBALS;
const {TRY_AGAIN, CHECK_NETWORK} = STRINGS;
import {Linking, Platform} from 'react-native';
import {getWeek} from '../moduleOne';
import Swal from 'sweetalert2';
import {Dimensions} from 'react-native-web';
const {COLORS, FONTS} = GLOBALS;

import {customAlert} from '../../helpers/commonAlerts.web';

//******************************Login******************* */

const DEVICE_WIDTH = Dimensions.get('window').width;

export function updateTrackerStatus(user) {
  return async (dispatch) => {
    dispatch({
      type: ACTION_TYPE.SET_TRACKER_STATUS,
      payload: {
        sleepChecked: user.sleepChecked,
        moodChecked: user.moodChecked,
        activityChecked: user.activityChecked,
      },
    });
  };
}

export function login(email, password, componentId) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.LOGIN_RESET});
    dispatch({type: ACTION_TYPE.LOGIN_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.LOGIN, {
        email: email,
        password: password,
        product: 1.5,
      });
      console.log('codeLogin', json, componentId);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.LOGIN_SUCCESS,
          payload: json.data,
        });
        dispatch(getWeek(1));
        storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
        storeItem('userId', json.data.user._id);
        storeItem('firstName', json.data.user.firstName);
        storeItem('lastName', json.data.user.lastName);
        storeItem('hospitalId', json.data.user.hospital_id);
        storeItem('epdsAssesment', json.data.epds_assesment);
        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
        if (json.data.user.isInterest === true) {
          storeItem('token', json.data.token);
          dispatch(bindProgram());
          dispatch(getProgramById());
          navigatorPush({componentId, screenName: 'Dashboard'});
        } else {
          dispatch(loadingAction(false));
          navigatorPush({componentId, screenName: 'VerifyUserOTP'});
        }
      } else {
        if (json.code === 400) {
          Swal.fire({
            text: json.message,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: COLORS.DARK_RED,
            width: DEVICE_WIDTH > 1000 ? '' : '60vw',
            // width: DEVICE_WIDTH > 1000 ? '25vw' : '60vw',
          });
          // dispatch({
          //  type: ACTION_TYPE.ERROR,
          // payload: json.message,
          // });
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      console.log('error>>>>>>>>>>>', error);
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.LOGIN_FAIL,
        payload: error,
      });
    }
  };
}

//*****************************Register*************************** */

export function register(params, componentId) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.SIGNUP_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.REGISTER, params);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.SIGNUP_SUCCESS,
          payload: json.data,
        });
        if (json.data.user.isInterest) {
        } else {
          navigatorPush({componentId, screenName: 'DailyLearningWeeks'});
        }
      } else {
        if (json.code === 400) {
          toast(json.message);
          console.log(json.message);
        }
        dispatch({
          type: ACTION_TYPE.SIGNUP_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.SIGNUP_FAIL,
        payload: error,
      });
    } finally {
      dispatch(loadingAction(false));
    }
  };
}

//********************************Bind user cards************************ */

export function bindProgram(cb) {
  let programId = getItem('programId');
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.BIND_PROGRAM_USER_REQUEST});
    try {
      console.log('bind program....');
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.BIND_PROGRAM_USER, {
        program_id: programId,
        user_id: userId,
      });
      if (json.code === 200) {
        console.log('bind progrma>>>>>>>>>>>', json.data);
        dispatch({
          type: ACTION_TYPE.BIND_PROGRAM_USER_SUCCESS,
          payload: json.data,
        });
      } else {
        // if (json.code === 400) {
        //   dispatch({
        //     type: ACTION_TYPE.ERROR,
        //     payload: json.message,
        //   });
        // }
        dispatch({
          type: ACTION_TYPE.BIND_PROGRAM_USER_FAIL,
        });
      }
      dispatch(loadingAction(false));
      cb();
    } catch (error) {
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error,
      // });
      // dispatch({
      //   type: ACTION_TYPE.BIND_PROGRAM_USER_FAIL,
      //   payload: error,
      // });
      // cb();
    }
  };
}

//*********************************GET PROGRAM WITH ID********************* */

export function getProgramById(isLoading = true, cb) {
  let programId = getItem('programId');
  let userId = getItem('userId');

  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_PROGRAM_REQUEST});
    try {
      if (isLoading) {
        dispatch(loadingAction(true));
      }
      let json = await RestClient.getCall(
        `${URL.GET_PROGRAM_BY_ID}/${programId}/${userId}`,
      );
      if (json.code === 200) {
        dispatch(updateTrackerStatus(json.data.user));
        dispatch({
          type: ACTION_TYPE.GET_PROGRAM_SUCCESS,
          payload: json.data.cards,
        });
        storeItem('duration', json.data.program.duration);
        dispatch(loadingAction(false));
        if (cb) {
          cb();
        }
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        } else {
          dispatch({
            type: ACTION_TYPE.GET_PROGRAM_FAIL,
          });
        }
        dispatch(loadingAction(false));
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.GET_PROGRAM_FAIL,
        payload: error,
      });
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
    }
  };
}

/************************************EMAIL EXITS************************** */

export function emailExists(email) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.USER_EMAIL_EXISTS_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.USER_EMAIL_EXISTS, {email});
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.USER_EMAIL_EXISTS_SUCCESS,
          payload: json.code,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch(loadingAction(false));
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        if (json.code === 401) {
          dispatch(loadingAction(false));
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        dispatch({
          type: ACTION_TYPE.USER_EMAIL_EXISTS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.message,
      });
      dispatch({
        type: ACTION_TYPE.USER_EMAIL_EXISTS_FAIL,
        payload: error,
      });
    }
  };
}

/***********************************UPDATE PASSWORD************************** */

export function changePassword(_id, password, forgot_password_token) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.CHANGE_PASSWORD_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.CHANGE_PASSWORD, {
        _id,
        password,
        forgot_password_token,
      });
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.CHANGE_PASSWORD_SUCCESS,
          payload: json.code,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          dispatch(loadingAction(false));
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        dispatch({
          type: ACTION_TYPE.CHANGE_PASSWORD_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error,
      });
      dispatch({
        type: ACTION_TYPE.CHANGE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };
}

//********************************LOGOUT************************ */

export function logout() {
  let userId = getItem('userId');
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.LOGOUT_USER_REQUEST});
    try {
      let json = await RestClient.postCall(URL.LOGOUT, {
        user_id: userId,
      });
      console.log(json, userId, 'on logout');
      setTimeout(() => {
        navigatortoStart();
      }, localStorage.clear());
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.LOGOUT_USER_SUCCESS,
          payload: json.data,
        });
        dispatch({
          type: ACTION_TYPE.CLEAR_MODULE_ONE,
          payload: json.data,
        });
      } else {
        dispatch({
          type: ACTION_TYPE.LOGOUT_USER_FAIL,
        });
      }
    } catch (error) {
      setTimeout(() => {
        navigatortoStart();
      }, localStorage.clear());
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error,
      });
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.LOGOUT_USER_FAIL,
        payload: error,
      });
    }
  };
}

//************************** Get Quote and Image ************************ */
export function getQuoteData(cb) {
  return async (dispatch) => {
    try {
      let json = await RestClient.getCall(`${URL.GET_QUOTE_DATA}`);
      if (json.code === 200) {
        // dispatch({
        //   type: ACTION_TYPE.GET_QUOTE_DATA_SUCCESS,
        //   payload: json.data,
        // });
        const result = json.data.map((e) => {
          dispatch({
            type: ACTION_TYPE.SET_QUOTES_DATA,
            payload: {
              quoteText: e.quote,
              quoteImg: e.image,
            },
          });
          return {
            qText: e.quote,
            qImg: e.image,
          };
        });
        cb(result);
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
      dispatch({
        type: ACTION_TYPE.GET_QUOTE_DATA_FAIL,
        payload: error,
      });
    }
  };
}

//******************** verify user via social login  ********************* */
export function verifySocialUser(params, componentId, cb) {
  return async (dispatch) => {
    try {
      let json = await RestClient.postCall(`${URL.VERIFY_SOCIAL_USER}`, params);
      if (json.code === 200) {
        console.log('jsoonnnn verify social usser api', json);
        if (!json.data.is_user_exist) {
          if (Platform.OS == 'web') {
            Swal.fire({
              html: 'This user is currently not registered with Stella-p. Please register at <a target="_blank" href="https://stella-prevent-careportal.curio-dtx.com/ ">https://stella-prevent-careportal.curio-dtx.com/</a>',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: COLORS.DARK_RED,
              width: DEVICE_WIDTH > 1000 ? '' : '60vw',
              // width: DEVICE_WIDTH > 1000 ? '25vw' : '60vw',
            });
            dispatch(loadingAction(false));
          } else {
            Linking.openURL(json.data.redirect_url);
          }
        } else {
          dispatch({
            type: ACTION_TYPE.VERIFY_USER_DATA_SUCCESS,
            payload: json.data,
          });
          dispatch({
            type: ACTION_TYPE.LOGIN_SUCCESS,
            payload: json.data,
          });
          dispatch({
            type: ACTION_TYPE.SET_PROFILE_IMAGE,
            payload: json.data.user.image_path,
          });
          dispatch(getWeek(1));
          console.log('token>>>>>>>>>>>>>>>>>', json.data.token);
          storeItem('token', json.data.token);
          storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
          storeItem('userId', json.data.user._id);
          storeItem('firstName', json.data.user.firstName);
          storeItem('lastName', json.data.user.lastName);
          storeItem('hospitalId', json.data.user.hospital_id);
          // if (json.data.user.isProgramBind !== true) {
          //   console.log('bind PAI hit');
          dispatch(bindProgram());
          // }
          // dispatch(getProgramById());
          if (json.data.user.isInterest === true) {
            console.log('heloooo1111');
            // navigatorPush({componentId, screenName: 'DailyLearningWeeks'});
            navigatorPush({componentId, screenName: 'Dashboard'});
          } else {
            console.log('heloooo11111222222');
            navigatorPush({componentId, screenName: 'VerifyUserOTP'});
            // navigatorPush({componentId, screenName: 'DailyLearningWeeks'});
            //navigatorPush({componentId, screenName: 'Dashboard'});
          }
        }
        // cb(json.data);
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
            type: ACTION_TYPE.VERIFY_USER_DATA_FAIL,
          });

          // toast(STRINGS.SOMETHING_WENT_WRONG);
        }
      }
    } catch (error) {
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      // });
      // dispatch({
      //   type: ACTION_TYPE.VERIFY_USER_DATA_FAIL,
      //   payload: error,
      // });
    }
  };
}

export function getUser(params, componentId, isRedirect = true) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_USER_REQUEST});
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.GET_USER, params);
      console.log('get user???????', json, componentId);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_SUCCESS,
          payload: json.data,
        });
        dispatch({
          type: ACTION_TYPE.LOGIN_SUCCESS,
          payload: json.data,
        });

        dispatch(getWeek(1));
        console.log('token>>>>>>>>>>>>>>>>>', json.data.token);
        storeItem('token', json.data.token);
        storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
        storeItem('userId', json.data.user._id);
        storeItem('firstName', json.data.user.firstName);
        storeItem('lastName', json.data.user.lastName);
        storeItem('hospitalId', json.data.user.hospital_id);
        // if (json.data.user.isProgramBind !== true) {
        //   console.log('bind PAI hit');
        dispatch(bindProgram());
        // }
        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
        dispatch(getProgramById());
        if (isRedirect) {
          if (json.data.user.isInterest === true) {
            navigatorPush({componentId, screenName: 'Dashboard'});
          } else {
            navigatorPush({componentId, screenName: 'Dashboard'});
          }
        }
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      console.log('error>>>>get user>>>>>>>', error);
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_USER_FAIL,
        payload: error,
      });
    }
  };
}

export function updateUserData(params) {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPE.GET_USER_REQUEST});
    try {
      let json = await RestClient.postCall(URL.GET_USER, params);
      console.log('get user???????', json);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_SUCCESS,
          payload: json.data,
        });
        dispatch({
          type: ACTION_TYPE.LOGIN_SUCCESS,
          payload: json.data,
        });
        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
        storeItem('token', json.data.token);
        storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
        storeItem('userId', json.data.user._id);
        storeItem('firstName', json.data.user.firstName);
        storeItem('lastName', json.data.user.lastName);
        storeItem('hospitalId', json.data.user.hospital_id);
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
      }
    } catch (error) {
      console.log('error>>>>get user>>>>>>>', error);
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
      dispatch({
        type: ACTION_TYPE.GET_USER_FAIL,
        payload: error,
      });
    }
  };
}

//******************** Enter correct OTP and move to dashboard ********************* */

export function acceptWelcomeScreen(params, componentId, cb) {
  return async (dispatch, getState) => {
    try {
      let loginToken = getState().authReducer.loginToken;
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(`${URL.ACCEPT_WELCOME}`, params);
      if (json.code === 200) {
        storeItem('token', loginToken);
        dispatch(bindProgram());
        dispatch(getProgramById());
        navigatorPush({componentId, screenName: 'Dashboard'});
      } else {
        customAlert(json.message, 'error');
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
    }
  };
}

export function resendRegistrationCode(params, cb) {
  return async (dispatch) => {
    console.log('resend otp', params);
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(
        `${URL.RESEND_REGISTRATION_CODE_API}`,
        params,
      );
      if (json.code === 200) {
        console.log('jsoonnnn verify social usser api', json);
        customAlert(json.message);
        cb(json.data);
      } else {
        customAlert(json.message, 'error');
        // navigatorPush({screenName: 'Dashboard'});
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
    }
  };
}

//************************** Get Subject List************************ */
export function getSubject(cb) {
  return async (dispatch) => {
    try {
      let json = await RestClient.getCall(`${URL.GET_SUBJECTS}`);
      if (json.code === 200) {
        cb(json.data.subject);
      } else {
        if (json.code === 400) {
          dispatch({
            type: ACTION_TYPE.ERROR,
            payload: json.message,
          });
        }
        cb([]);
      }
    } catch (error) {
      cb([]);
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      });
    }
  };
}
