import React, { useState } from 'react';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../actions';
import {
  Linking, Platform
} from "react-native";
const GoogleLogIn = (props) => {
  let {
    onSocialLogin = () => { },
  } = props;
  const googleCLientId =
    '868302960918-car2574j9cd95m72sehkfipp24hmrdku.apps.googleusercontent.com';

  const responseGoogle = (res) => {
    verifyUser(res.profileObj, res)
  };
  const onFailure = (res) => {
    console.log('Google login fail res', res);
  };
  const verifyUser = (profile_data, userInfo) => {
    let params = {
      firstName: profile_data.givenName,
      email: profile_data.email,
      image_path: profile_data.imageUrl,
      social_media_id: userInfo.googleId,
      platform: "google",
      session_token: userInfo.accessToken
    }
    onSocialLogin(params);
  }
  const onLogoutSuccess = () => {
    console.log('logout');
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      auth2.disconnect()
      console.log('logout===>');
      document.cookie = "__Secure-3PSIDCC" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    })
    localStorage.clear()
  };
  const onFailuree = () => {
    console.log('logout fail');
  };
  const { signOut } = useGoogleLogout({
    clientId: googleCLientId,
    onLogoutSuccess: onLogoutSuccess,
    onFailure: onFailuree,
    cookiePolicy: 'single_host_origin'
  });



  return (
    <>
      <GoogleLogin
        clientId={googleCLientId}
        render={(renderProps) => (
          <div
            onClick={() => {
              signOut()
              renderProps.onClick()
            }}
            disabled={renderProps.disabled}
            className="btn-google">
            <span className="btn-google-title">Log In with Google</span>
          </div>
        )}
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        ux_mode={'redirect'}
        // isSignedIn={false}
        autoLoad={false}
      />
    </>
  );
};

export default GoogleLogIn;


/**
 *
 * "Not a valid origin for the client: http://localhost:3000 has not been registered for client ID 868302960918-car2574j9cd95m72sehkfipp24hmrdku.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
 */