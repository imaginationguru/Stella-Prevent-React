import GLOBALS from '../../constants';
import RestClient from '../../helpers/RestClient';
import {navigatorPush} from '../../config/navigationOptions';
import {storeItem, getItem} from '../../utils/AsyncUtils';
import {loadingAction} from '../common';
const {ACTION_TYPE, URL, STRINGS} = GLOBALS;
const {TRY_AGAIN, CHECK_NETWORK} = STRINGS;
import {Linking, Platform} from 'react-native';
import {getWeek} from '../moduleOne';
import {customAlert} from '../../helpers/commonAlerts.web';
//******************************Login******************* */

export function changeLanguage(param) {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      let json = await RestClient.postCall(URL.CHANGE_LANGUAGE, param);
      console.log('codeLogin', json);
      if (json.code === 200) {
        // dispatch({
        //   type: ACTION_TYPE.GET_LANGUGAE_SUCCESS,
        //   payload: json.data,
        // });
        customAlert(json.message, 'success');
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // })
        // dispatch({
        //   type: ACTION_TYPE.LOGIN_SUCCESS,
        //   payload: json.data,
        // });
        // storeItem('firstName', json.data.user.firstName);
        // storeItem('lastName', json.data.user.lastName);
      } else {
        if (json.code === 400) {
          // dispatch({
          //   type: ACTION_TYPE.ERROR,
          //   payload: json.message,
          // });
          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      console.log('error>>>>>>>>>>>', error);
      dispatch(loadingAction(false));
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      // });
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
      console.log('codeLogin', json);
      if (json.code === 200) {
        // dispatch({
        //   type: ACTION_TYPE.GET_NOTIFICATION_SUCCESS,
        //   payload: json.data,
        // });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // })
        customAlert(json.message, 'success');
      } else {
        if (json.code === 400) {
          // dispatch({
          //   type: ACTION_TYPE.ERROR,
          //   payload: json.message,
          // });
          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      console.log('error>>>>>>>>>>>', error);
      dispatch(loadingAction(false));
      customAlert(
        error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
        'error',
      );
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      // });
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
      console.log('codeLogin', json);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_SUCCESS,
          payload: json.data,
        });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // })
        customAlert(json.message, 'success');
      } else {
        if (json.code === 400) {
          // dispatch({
          //   type: ACTION_TYPE.ERROR,
          //   payload: json.message,
          // });
          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      console.log('error>>>>>>>>>>>', error);
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      // });
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
      console.log('URL.UPDATE_PROFILE', json);
      if (json.code === 200) {
        dispatch({
          type: ACTION_TYPE.GET_USER_SUCCESS,
          payload: json.data,
        });
        customAlert(json.message, 'success');
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // })
        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
        dispatch(loadingAction(false));
      } else {
        if (json.code === 400) {
          // dispatch({
          //   type: ACTION_TYPE.ERROR,
          //   payload: json.message,
          // });
          customAlert(json.message, 'error');
          dispatch(loadingAction(false));
        }
      }
    } catch (error) {
      console.log('error>>>>>>>>>>>', error);
      dispatch(loadingAction(false));
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      // });
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
      console.log('URL.UPDATE_PROFILE', json);
      if (json.code === 200) {
        // dispatch({
        //   type: ACTION_TYPE.GET_USER_SUCCESS,
        //   payload: json.data,
        // });
        // dispatch({
        //   type: ACTION_TYPE.SUCCESS_MESSAGE,
        //   payload: json.message,
        // })

        customAlert(json.message, 'success');
        dispatch({
          type: ACTION_TYPE.SET_PROFILE_IMAGE,
          payload: json.data.user.image_path,
        });
      } else {
        if (json.code === 400) {
          // dispatch({
          //   type: ACTION_TYPE.ERROR,
          //   payload: json.message,
          // });
          customAlert(json.message, 'error');
        }
      }
      dispatch(loadingAction(false));
    } catch (error) {
      console.log('error>>>>>>>>>>>', error);
      dispatch(loadingAction(false));
      // dispatch({
      //   type: ACTION_TYPE.ERROR,
      //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
      // });
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
// //*****************************Register*************************** */

// export function register(params, componentId) {
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.SIGNUP_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.postCall(URL.REGISTER, params);
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.SIGNUP_SUCCESS,
//           payload: json.data,
//         });
//         if (json.data.user.isInterest) {
//         } else {
//           navigatorPush({componentId, screenName: 'DailyLearningWeeks'});
//         }
//       } else {
//         if (json.code === 400) {
//           toast(json.message);
//           console.log(json.message);
//         }
//         dispatch({
//           type: ACTION_TYPE.SIGNUP_FAIL,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.SIGNUP_FAIL,
//         payload: error,
//       });
//     } finally {
//       dispatch(loadingAction(false));
//     }
//   };
// }

// //********************************Bind user cards************************ */

// export function bindProgram() {
//   let programId = getItem('programId');
//   let userId = getItem('userId');
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.BIND_PROGRAM_USER_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.postCall(URL.BIND_PROGRAM_USER, {
//         program_id: programId,
//         user_id: userId,
//       });
//       if (json.code === 200) {
//         console.log('bind progrma>>>>>>>>>>>', json.data);
//         dispatch({
//           type: ACTION_TYPE.BIND_PROGRAM_USER_SUCCESS,
//           payload: json.data,
//         });
//       } else {
//         // if (json.code === 400) {
//         //   dispatch({
//         //     type: ACTION_TYPE.ERROR,
//         //     payload: json.message,
//         //   });
//         // }
//         dispatch({
//           type: ACTION_TYPE.BIND_PROGRAM_USER_FAIL,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error,
//       });
//       dispatch({
//         type: ACTION_TYPE.BIND_PROGRAM_USER_FAIL,
//         payload: error,
//       });
//     }
//   };
// }

// //*********************************GET PROGRAM WITH ID********************* */

// export function getProgramById() {
//   let programId = getItem('programId');
//   let userId = getItem('userId');

//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.GET_PROGRAM_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.getCall(
//         `${URL.GET_PROGRAM_BY_ID}/${programId}/${userId}`,
//       );
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.GET_PROGRAM_SUCCESS,
//           payload: json.data.cards,
//         });
//         storeItem('duration', json.data.program.duration);
//         dispatch(loadingAction(false));
//       } else {
//         if (json.code === 400) {
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         } else {
//           dispatch({
//             type: ACTION_TYPE.GET_PROGRAM_FAIL,
//           });
//         }
//         dispatch(loadingAction(false));
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.GET_PROGRAM_FAIL,
//         payload: error,
//       });
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
//       });
//     }
//   };
// }

// /************************************EMAIL EXITS************************** */

// export function emailExists(email) {
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.USER_EMAIL_EXISTS_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.postCall(URL.USER_EMAIL_EXISTS, {email});
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.USER_EMAIL_EXISTS_SUCCESS,
//           payload: json.code,
//         });
//         dispatch(loadingAction(false));
//       } else {
//         if (json.code === 400) {
//           dispatch(loadingAction(false));
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         }
//         if (json.code === 401) {
//           dispatch(loadingAction(false));
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         }
//         dispatch({
//           type: ACTION_TYPE.USER_EMAIL_EXISTS_FAIL,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error.message,
//       });
//       dispatch({
//         type: ACTION_TYPE.USER_EMAIL_EXISTS_FAIL,
//         payload: error,
//       });
//     }
//   };
// }

// /***********************************UPDATE PASSWORD************************** */

// export function changePassword(_id, password, forgot_password_token) {
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.CHANGE_PASSWORD_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.postCall(URL.CHANGE_PASSWORD, {
//         _id,
//         password,
//         forgot_password_token,
//       });
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.CHANGE_PASSWORD_SUCCESS,
//           payload: json.code,
//         });
//         dispatch(loadingAction(false));
//       } else {
//         if (json.code === 400) {
//           dispatch(loadingAction(false));
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         }
//         dispatch({
//           type: ACTION_TYPE.CHANGE_PASSWORD_FAIL,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error,
//       });
//       dispatch({
//         type: ACTION_TYPE.CHANGE_PASSWORD_FAIL,
//         payload: error,
//       });
//     }
//   };
// }

// //********************************LOGOUT************************ */

// export function logout() {
//   let userId = getItem('userId');
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.LOGOUT_USER_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.postCall(URL.LOGOUT, {
//         user_id: userId,
//       });
//       console.log(json, userId, 'on logout');
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.LOGOUT_USER_SUCCESS,
//           payload: json.data,
//         });
//         localStorage.clear();
//         setTimeout(() => {
//           navigatorPush({screenName: 'DailyLearningWeeks'});
//         }, 5000);
//         navigatorPush({screenName: 'DailyLearningWeeks'});

//         dispatch(loadingAction(false));
//       } else {
//         dispatch({
//           type: ACTION_TYPE.LOGOUT_USER_FAIL,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error,
//       });
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
//       });
//       dispatch({
//         type: ACTION_TYPE.LOGOUT_USER_FAIL,
//         payload: error,
//       });
//     }
//   };
// }

// //************************** Get Quote and Image ************************ */
// export function getQuoteData(cb) {
//   console.log('getQuoteData');
//   return async (dispatch) => {
//     // dispatch({ type: ACTION_TYPE.GET_QUOTE_DATA_REQUEST });
//     try {
//       let json = await RestClient.getCall(`${URL.GET_QUOTE_DATA}`);
//       if (json.code === 200) {
//         // dispatch({
//         //   type: ACTION_TYPE.GET_QUOTE_DATA_SUCCESS,
//         //   payload: json.data,
//         // });
//         const result = json.data.map((e) => {
//           dispatch({
//             type: ACTION_TYPE.SET_QUOTES_DATA,
//             payload: {
//               quoteText: e.quote,
//               quoteImg: e.image,
//             },
//           });
//           return {
//             qText: e.quote,
//             qImg: e.image,
//           };
//         });
//         cb(result);
//       } else {
//         if (json.code === 400) {
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         }
//       }
//     } catch (error) {
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
//       });
//       dispatch({
//         type: ACTION_TYPE.GET_QUOTE_DATA_FAIL,
//         payload: error,
//       });
//     }
//   };
// }

// //******************** verify user via social login  ********************* */

// export function verifySocialUser(params, componentId, cb) {
//   return async (dispatch) => {
//     try {
//       let json = await RestClient.postCall(`${URL.VERIFY_SOCIAL_USER}`, params);
//       if (json.code === 200) {
//         console.log('jsoonnnn verify social usser api', json);
//         if (!json.data.is_user_exist) {
//           if (Platform.OS == 'web') {
//             window.open(json.data.redirect_url, '_blank');
//             cb(json.data);
//           } else {
//             Linking.openURL(json.data.redirect_url);
//           }
//         } else {
//           dispatch({
//             type: ACTION_TYPE.VERIFY_USER_DATA_SUCCESS,
//             payload: json.data,
//           });
//           dispatch({
//             type: ACTION_TYPE.LOGIN_SUCCESS,
//             payload: json.data,
//           });

//           dispatch(getWeek(1));
//           console.log('token>>>>>>>>>>>>>>>>>', json.data.token);
//           storeItem('token', json.data.token);
//           storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
//           storeItem('userId', json.data.user._id);
//           storeItem('firstName', json.data.user.firstName);
//           storeItem('lastName', json.data.user.lastName);
//           storeItem('hospitalId', json.data.user.hospital_id);
//           if (json.data.user.isProgramBind !== true) {
//             console.log('bind PAI hit');
//             dispatch(bindProgram());
//           }

//           dispatch(getProgramById());

//           if (json.data.user.isInterest === true) {
//             console.log('heloooo1111');
//             // navigatorPush({componentId, screenName: 'DailyLearningWeeks'});
//             navigatorPush({componentId, screenName: 'Dashboard'});
//           } else {
//             console.log('heloooo11111222222');
//             // navigatorPush({componentId, screenName: 'DailyLearningWeeks'});
//             navigatorPush({componentId, screenName: 'Dashboard'});
//           }
//         }
//         cb(json.data);
//       } else {
//         if (json.code === 400) {
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         }
//         if (json.code === 417) {
//           dispatch({
//             type: ACTION_TYPE.SESSION_EXPIRED_MESSAGE,
//             payload: json.message,
//           });
//           dispatch(loadingAction(false));
//         } else {
//           dispatch({
//             type: ACTION_TYPE.VERIFY_USER_DATA_FAIL,
//           });

//           // toast(STRINGS.SOMETHING_WENT_WRONG);
//         }
//       }
//     } catch (error) {
//       // dispatch({
//       //   type: ACTION_TYPE.ERROR,
//       //   payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
//       // });
//       // dispatch({
//       //   type: ACTION_TYPE.VERIFY_USER_DATA_FAIL,
//       //   payload: error,
//       // });
//     }
//   };
// }

// export function getUser(params, componentId,isRedirect=true) {
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.GET_USER_REQUEST});
//     try {
//       dispatch(loadingAction(true));
//       let json = await RestClient.postCall(URL.GET_USER, params);
//       console.log('get user???????', json, componentId);
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.GET_USER_SUCCESS,
//           payload: json.data,
//         });
//         dispatch({
//           type: ACTION_TYPE.LOGIN_SUCCESS,
//           payload: json.data,
//         });

//         dispatch(getWeek(1));
//         console.log('token>>>>>>>>>>>>>>>>>', json.data.token);
//         storeItem('token', json.data.token);
//         storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
//         storeItem('userId', json.data.user._id);
//         storeItem('firstName', json.data.user.firstName);
//         storeItem('lastName', json.data.user.lastName);
//         storeItem('hospitalId', json.data.user.hospital_id);
//         if (json.data.user.isProgramBind !== true) {
//           console.log('bind PAI hit');
//           dispatch(bindProgram());
//         }

//         dispatch(getProgramById());
//         if(isRedirect){
//           if (json.data.user.isInterest === true) {
//             navigatorPush({componentId, screenName: 'Dashboard'});
//           } else {
//            navigatorPush({componentId, screenName: 'Dashboard'});
//           }
//         }

//       } else {
//         if (json.code === 400) {
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//           dispatch(loadingAction(false));
//         }
//       }
//     } catch (error) {
//       console.log('error>>>>get user>>>>>>>', error);
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
//       });
//       dispatch({
//         type: ACTION_TYPE.GET_USER_FAIL,
//         payload: error,
//       });
//     }
//   };
// }

// export function updateUserData(params) {
//   return async (dispatch) => {
//     dispatch({type: ACTION_TYPE.GET_USER_REQUEST});
//     try {
//       let json = await RestClient.postCall(URL.GET_USER, params);
//       console.log('get user???????', json);
//       if (json.code === 200) {
//         dispatch({
//           type: ACTION_TYPE.GET_USER_SUCCESS,
//           payload: json.data,
//         });
//         dispatch({
//           type: ACTION_TYPE.LOGIN_SUCCESS,
//           payload: json.data,
//         });
//     storeItem('token', json.data.token);
//         storeItem('programId', json.data.user.programId); // '608aa90eb9a5442de2e81673';
//         storeItem('userId', json.data.user._id);
//         storeItem('firstName', json.data.user.firstName);
//         storeItem('lastName', json.data.user.lastName);
//         storeItem('hospitalId', json.data.user.hospital_id);
//       } else {
//         if (json.code === 400) {
//           dispatch({
//             type: ACTION_TYPE.ERROR,
//             payload: json.message,
//           });
//         }
//       }
//     } catch (error) {
//       console.log('error>>>>get user>>>>>>>', error);
//       dispatch({
//         type: ACTION_TYPE.ERROR,
//         payload: error.problem === 'NETWORK_ERROR' ? CHECK_NETWORK : TRY_AGAIN,
//       });
//       dispatch({
//         type: ACTION_TYPE.GET_USER_FAIL,
//         payload: error,
//       });
//     }
//   };
//}
