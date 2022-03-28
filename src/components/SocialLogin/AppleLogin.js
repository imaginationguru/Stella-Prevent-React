import React, { useState } from 'react';
import AppleLogin from 'react-apple-login';
import { customAlert } from '../../helpers/commonAlerts.web';
import jwt_decode from 'jwt-decode';
const AppleLogIn = (props) => {
  let { onSocialLogin = () => { } } = props;
  const appleId = 'com.stellaPreventWeb';

  const handleResponse = (res) => {
    console.log('apple login response', res);
    if (res.error) {
      if (res.error.error == 'popup_closed_by_user') {
        customAlert('Apple login cancelled.', 'error');
      }
      return;
    } else {
      try {
        var decoded = jwt_decode(res.authorization.id_token);
        console.log(decoded);
        var email_id = decoded.email;
        console.log(email_id);
        verifyUser(res, email_id);
      } catch (err) {
        console.log(err);
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
        redirectURI="https://mamalift-web.curiodigitaltx.com/Dashboard"
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
