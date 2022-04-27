import {useState, useEffect} from 'react';
import FacebookLoginApp from 'react-facebook-login/dist/facebook-login-render-props';
import {customAlert} from '../../helpers/commonAlerts.web';
import {FacebookLogin} from '@capacitor-community/facebook-login';
import {Capacitor, Plugins} from '@capacitor/core';
const FacebookLogIn = (props) => {
  let {onSocialLogin = () => {}} = props;

  const fbAppId = '416468470173904';
  const FACEBOOK_PERMISSIONS = ['email', 'name', 'user_photos', 'user_gender'];

  const resFblogin = (res) => {
    if (res.status == 'unknown') {
      customAlert('Facebook login cancelled.', 'error');
    } else {
      verifyUser(res);
    }
  };

  const resFbloginViaApp = async () => {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
    const result = await Plugins.FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });
    if (result && result.accessToken) {
      console.log('result==>', result);
      // history.push({
      //   pathname: '/home',
      //   state: { token: result.accessToken.token, userId: result.accessToken.userId }
      // });
    }
    // FacebookLogin.initialize({appId: fbAppId}).then((res) => {
    //   console.log('error', res);
    //   if (res) {
    //     FacebookLogin.login({permissions: FACEBOOK_PERMISSIONS}).then(
    //       (data) => {
    //         console.log(data, 'data....');
    //         if (data) {
    //           FacebookLogin.getProfile({
    //             fields: ['email', 'name', 'first_name'],
    //           }).then(
    //             (res) => {
    //               verifyUser({
    //                 name: res.first_name,
    //                 email: res.email,
    //                 id: res.id,
    //                 accessToken: data.accessToken?.token,
    //               });
    //             },
    //             (err) => {
    //               console.log('errr', err);
    //               customAlert('Facebook login error.', 'error');
    //             },
    //           );
    //         } else {
    //           customAlert('Facebook login error.', 'error');
    //         }
    //       },
    //       (err) => {
    //         customAlert('Facebook login error.', 'error');
    //       },
    //     );
    //   } else {
    //     customAlert('Error initializing facebook', 'error');
    //   }
    // });
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
    Capacitor.isNativePlatform() ? FacebookLogin.logout() : window.FB.logout();
  };

  return (
    <>
      {Capacitor.isNativePlatform() ? (
        <div class="btn-fb" onClick={resFbloginViaApp}>
          <span class="btn-fb-title">Log In with Facebook</span>
        </div>
      ) : (
        <FacebookLoginApp
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
      )}
    </>
  );
};

export default FacebookLogIn;
