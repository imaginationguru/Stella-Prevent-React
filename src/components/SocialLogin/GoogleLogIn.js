import React, {useState} from 'react';
import {GoogleLogin, useGoogleLogout, GoogleLogout} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../actions';
import {Linking, Platform} from 'react-native';
import {customAlert} from '../../helpers/commonAlerts.web';
import {Capacitor} from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';
import {Plugins} from '@capacitor/core';

const GoogleLogIn = (props) => {
  let {onSocialLogin = () => {}} = props;

  const googleCLientId =
    '868302960918-car2574j9cd95m72sehkfipp24hmrdku.apps.googleusercontent.com';

  const onLogoutSuccess = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect().then(onLogoutSuccess));
    }
  };
  const onFailure = (res) => {
    console.log('Google login fail res', res);
  };
  const {signOut} = useGoogleLogout({
    clientId: googleCLientId,
    onFailure: onFailure,
    onLogoutSuccess: onLogoutSuccess,
  });
  const responseGoogle = (res) => {
    verifyUser(res.profileObj, res);
  };

  const verifyUser = (profile_data, userInfo) => {
    let params = {
      firstName: profile_data.givenName,
      email: profile_data.email,
      image_path: profile_data.imageUrl,
      social_media_id: userInfo.googleId,
      platform: 'google',
      session_token: userInfo.accessToken,
    };
    onSocialLogin(params);
  };

  const signIn = async () => {
    await Plugins.GoogleAuth.signOut();
    Plugins.GoogleAuth.signIn()
      .then((result) => {
        let params = {
          firstName: result.givenName,
          email: result.email,
          image_path: result.imageUrl,
          social_media_id: result.id,
          platform: 'google',
          session_token: result.authentication.accessToken,
        };
        onSocialLogin(params);
      })
      .catch((err) => {
        customAlert('Google login fail.', 'error');
      });
  };

  return (
    <>
      {Capacitor.isNativePlatform() ? (
        <div onClick={() => signIn()} className="btn-google">
          <span className="btn-google-title">Log In with Google</span>
        </div>
      ) : (
        <GoogleLogin
          clientId={googleCLientId}
          render={(renderProps) => (
            <div
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn-google">
              <span className="btn-google-title">Log In with Google</span>
            </div>
          )}
          onSuccess={responseGoogle}
          approvalPrompt="force"
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
          autoLoad={false}
          uxMode={'popup'}
        />
      )}
    </>
  );
};

export default GoogleLogIn;

/**
 *
 * "Not a valid origin for the client: http://localhost:3000 has not been registered for client ID 868302960918-car2574j9cd95m72sehkfipp24hmrdku.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
 */
