import AppleLogin from 'react-apple-login';
import {customAlert} from '../../helpers/commonAlerts.web';
import jwt_decode from 'jwt-decode';
import GLOBALS from '../../constants';
import '@capacitor-community/apple-sign-in';
import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';
import React from 'react';

import {Capacitor, Plugins} from '@capacitor/core';

const {WEB_BASE_URL} = GLOBALS;
const AppleLogIn = (props) => {
  let {onSocialLogin = () => {}} = props;
  const appleId = 'com.stellaPreventWeb';
  console.log(`${WEB_BASE_URL}Dashboard`, 'apple');
  const handleResponse = (res) => {
    if (res.error) {
      if (res.error.error == 'popup_closed_by_user') {
        customAlert('Apple login cancelled.', 'error');
      }
      return;
    } else {
      try {
        var decoded = jwt_decode(res.authorization.id_token);
        var email_id = decoded.email;
        verifyUser(res, email_id);
      } catch (err) {}
    }
  };

  const verifyUser = (profile_data, email) => {
    let params = {
      firstName: '',
      email: email,
      social_media_id: profile_data.authorization.code,
      platform: 'apple',
      session_token: profile_data.authorization.id_token,
    };
    onSocialLogin(params);
  };
  const signIn = async () => {
    let options = {
      clientId:
        '785528185928-3pvalm2auoqd01cq3fb08jikfdb7hv5p.apps.googleusercontent.com',
      redirectURI: 'https://www.yourfrontend.com/login',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    };

    SignInWithApple.authorize(options)
      .then((result) => {
        console.log('apple data', result);
        // Handle user information
        // Validate token with server and create new session
        let params = {
          firstName: '',
          email: result.email,
          social_media_id: result.authorization.code,
          platform: 'apple',
          session_token: result.authorization.id_token,
        };
        onSocialLogin(params);
      })
      .catch((error) => {
        customAlert('Apple login fail.', 'error');
      });
  };

  return (
    <>
      {Capacitor.isNativePlatform() ? (
        <div className="btn-apple" onClick={signIn}>
          <span className="btn-apple-title">Log In with Apple</span>
        </div>
      ) : (
        <AppleLogin
          clientId={appleId}
          callback={handleResponse}
          usePopup={true}
          autoLoad={false}
          scope={'name email'}
          responseType={'code id_token'}
          responseMode={'form_post'}
          redirectURI={`${WEB_BASE_URL}Dashboard`}
          render={(renderProps) => (
            <div
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn-apple">
              <span className="btn-apple-title">Log In with Apple</span>
            </div>
          )}
        />
      )}
    </>
  );
};

export default AppleLogIn;
