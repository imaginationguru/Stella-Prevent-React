import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {customAlert} from '../../helpers/commonAlerts.web';
const FacebookLogIn = (props) => {
  let {onSocialLogin = () => {}} = props;
  const fbAppId = '416468470173904';
  const resFblogin = (res) => {
    if (res.status == 'unknown') {
      customAlert('Facebook login cancelled.', 'error');
    } else {
      verifyUser(res);
    }
  };

  const verifyUser = (profile_data) => {
    console.log(profile_data, 'profile_data.......');
    if (profile_data.email == '' || profile_data.email == undefined) {
      customAlert(
        "Facebook Login fails! Unable to access user's email",
        'error',
      );
      return;
    }
    let params = {
      firstName: profile_data.name,
      email: profile_data.email,
      social_media_id: profile_data.id,
      platform: 'facebook',
      session_token: profile_data.accessToken,
    };
    profile_data.picture
      ? (params['image_path'] = profile_data.picture.data.url)
      : null;
    onSocialLogin(params);
    window.FB.logout();
  };

  return (
    <>
      <FacebookLogin
        appId={fbAppId}
        render={(renderProps) => (
          <div
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn-fb">
            <span className="btn-fb-title">Log In with Facebook</span>
          </div>
        )}
        autoLoad={false}
        fields="name,email,picture"
        callback={resFblogin}
      />
    </>
  );
};

export default FacebookLogIn;
