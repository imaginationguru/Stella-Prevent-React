import React, { useState } from 'react';
import AppleLogin from 'react-apple-login';
import { customAlert } from '../../helpers/commonAlerts.web';
import jwt_decode from 'jwt-decode';
import GLOBALS from '../../constants';
const { IMAGE_BASE_URL } = GLOBALS;
const AppleLogIn = (props) => {
  let { onSocialLogin = () => { } } = props;
  const appleId = 'com.stellaPreventWeb';

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
      } catch (err) {
      }
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

  return (
    <>
      <AppleLogin
        clientId={appleId}
        callback={handleResponse}
        usePopup={true}
        autoLoad={false}
        scope={'name email'}
        responseType={'code id_token'}
        responseMode={'form_post'}
        redirectURI={`${IMAGE_BASE_URL}Dashboard`}
        render={(renderProps) => (
          <div
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn-apple">
            <span className="btn-apple-title">Log In with Apple</span>
          </div>
        )}
      />
    </>
  );
};

export default AppleLogIn;
