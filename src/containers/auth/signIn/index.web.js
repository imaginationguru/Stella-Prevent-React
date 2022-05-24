/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useState, useEffect } from 'react';

import logoWhite from '@assets/images/logoWhite.svg';
import rightCover from '@assets/images/candle.png';
import icon01 from '@assets/images/icon01.svg';
import icon02 from '@assets/images/icon02.svg';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';
import MasterLayout from '@components/MasterLayout';
import GoogleLoginComponent from '@components/SocialLogin/GoogleLogIn';
import FacebookLoginComponent from '@components/SocialLogin/FacebookLogin';
import AppleLoginComponent from '@components/SocialLogin/AppleLogin';
import { translate as ts } from '@i18n/translate';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import { emailRegex } from '@utils/RegexUtils';
import GLOBALS from '@constants';
import Footer from '@components/Footer';

const { IMAGE_BASE_URL } = GLOBALS;

const SignIn = (componentId) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [socialError, setSocialError] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [quoteImg, setQuoteImage] = useState('');
  const [getId, setGetId] = useState('');
  const dispatch = useDispatch();
  const { quotes = {} } = useSelector((state) => state.moduleOne);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setEmailError('');
    }
    if (name === 'password') {
      setPassword(value);
      setPasswordError('');
    }
  };

  const copyPasteHandler = (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    const { name } = e.target;
    if (name === 'email') {
      setEmail('');
      setEmailError('');
    }
    if (name === 'password') {
      setPassword('');
      setPasswordError('');
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (email.length === 0) {
      setEmailError('Please enter email');
    } else if (email.length && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email id');
    } else if (password.length === 0) {
      setPasswordError('Please enter password');
    } else if (password.length > 16) {
      setPasswordError('Password should not more than 16');
    }
    if (email && password) {
      dispatch(AppActions.login(email, password));
    }
  };

  const onSocialLogin = (params) => {
    dispatch(
      AppActions.verifySocialUser(params, undefined, (res) => {
        if (res && !res.is_user_exist) {
        }
      }),
    );
  };

  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }
  // let query = useQuery();
  // useEffect(() => {
  //   getUserData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getId]);
  // const getUserData = () => {
  //   let id = query.get('id');
  //   setGetId(id);
  //   if (getId) {
  //     const params = {
  //       user_id: getId,
  //     };
  //     dispatch(AppActions.getUser(params));
  //   } else {
  //   }
  // };
  return (
    <>
      <MasterLayout>
        <div className="login">
          <div
            className="login-left"
            style={{
              backgroundColor: 'black',
              backgroundImage:
                quotes.quoteImg != ''
                  ? `url(${IMAGE_BASE_URL}${quotes.quoteImg})`
                  : `url(${rightCover})`,
            }}>
            <div className="quote-view">
              <h1 className="quote-text">{quotes.quoteText}</h1>
            </div>
          </div>
          <div className="login-right">
            <div className="login-content">
              <div className="logo-view">
                <img src={logoWhite} className="logo-img" />
              </div>
              <h2 className="heading">{ts('LOGIN')}</h2>
              <div className="formRow">
                <div className="w100">
                  <div className="formSubmit">
                    <FacebookLoginComponent
                      onSocialLogin={(params) => onSocialLogin(params)}
                    />
                  </div>
                </div>
              </div>
              <div className="formRow">
                <div className="w100">
                  <div className="formSubmit">
                    <GoogleLoginComponent
                      onSocialLogin={(params) => onSocialLogin(params)}
                    />
                  </div>
                </div>
              </div>
              <div className="formRow">
                <div className="w100">
                  <div className="formSubmit">
                    <AppleLoginComponent
                      onSocialLogin={(params) => onSocialLogin(params)}
                    />
                  </div>
                </div>
              </div>
              <p style={commonStyles.socialError}>{socialError}</p>
              <div className="login-form">
                <form noValidate onSubmit={(e) => loginHandler(e)}>
                  <div className="formRow">
                    <div className="w100">
                      <label className="formLabel">{ts('EMAIL')}</label>
                      <div className="formField has-icon">
                        <input
                          type="email"
                          name="email"
                          className="f-field"
                          value={email.toLowerCase()}
                          onChange={onHandleChange}
                          required
                          maxLength={320}
                        />
                        <span className="f-icon">
                          <img src={icon01} />
                        </span>
                      </div>
                      <span style={commonStyles.error}>{emailError}</span>
                    </div>
                  </div>
                  <div className="formRow">
                    <div className="w100">
                      <label className="formLabel">{ts('PASSWORD')}</label>
                      <div className="formField has-icon">
                        <input
                          type="password"
                          name="password"
                          className="f-field"
                          value={password}
                          onChange={onHandleChange}
                          maxLength={16}
                          required
                        />
                        <span className="f-icon">
                          <img src={icon02} />
                        </span>
                      </div>
                    </div>
                    <span style={commonStyles.error}>{passwordError}</span>
                  </div>
                  <div className="formRow">
                    <div className="w100">
                      <div
                        className="formField text-right"
                        style={{ paddingTop: '10px' }}>
                        <Link
                          to="/EmailCheck"
                          className="link"
                          style={{ textDecorationLine: 'underline' }}>
                          {ts('FORGOT_PASSWORD')}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="formRow">
                    <div className="w100">
                      <div className="formSubmit">
                        <input
                          type="submit"
                          className="btn-solid"
                          value={ts('LOGIN')}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 15 }}>
                    {/* <div className="signup-text-view">
                      <span className="signup-text">Don’t have an account? </span>
                      <Link
                        to="/SignUp"
                        className="terms-text"
                        style={{
                          marginLeft: 5,
                          fontFamily: 'HKGrotesk Medium',
                          textDecorationLine: 'underline',
                        }}>
                        Sign up
                      </Link>
                    </div> */}

                    {/* <p
                      onClick={() =>
                        window.open(
                          'https://stella-careportal.curio-dtx.com/upload/PRIVACY_POLICY0203_stella.pdf',
                          '_blank',
                        )
                      }
                      className="terms-condition">
                      terms & conditions.
                    </p> */}
                  </div>
                </form>
              </div>

              {/* <div
                className="power-image"
                onClick={() =>
                  window.open('http://www.curiodigitaltx.com/', '_blank')
                }>
                <img src={powerBy} className="footer-logo" />
              </div> */}
            </div>
          </div>
        </div>
        <Footer />
      </MasterLayout>
    </>
  );
};

export default SignIn;
