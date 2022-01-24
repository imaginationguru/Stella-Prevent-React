import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const FacebookLogIn = (props) => {
  let {
    onSocialLogin = () => { },
} = props;
  const fbAppId = '416468470173904';
  const resFblogin = (res) => {
    console.log('facebook login res', res);
    verifyUser(res);
  };

  const verifyUser = (profile_data) => {
    let params = {
      firstName: profile_data.name,
      email: profile_data.email,
      social_media_id: profile_data.id,
      platform: "facebook",
      session_token: profile_data.accessToken
    }
    profile_data.picture?params["image_path"]=profile_data.picture.data.url:null;
    onSocialLogin(params);
  }

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
