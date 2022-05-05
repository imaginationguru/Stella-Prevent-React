/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import brand from '@assets/images/brand.svg';
import graphic01 from '@assets/images/graphic01.svg';
import icon01 from '@assets/images/icon01.svg';
import successTick from '@assets/images/successTick.svg';
import MasterLayout from '@components/MasterLayout';
import logoWhite from '@assets/images/logoWhite.svg';
import logoWhite1 from '@assets/images/logoWhite.png';
import {translate as ts} from '@i18n/translate';
import {emailRegex} from '@utils/RegexUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import history from '@helpers/history';

const EmailCheck = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const {userData = []} = useSelector((state) => state.authReducer);

  /* FUNCTION FOR EMAIL VALUE SET  */

  const onHandleEmailChange = (e) => {
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value);
      setEmailError('');
    }
  };

  /*FUNCTION FOR EMAIL INPUT FIELD VALIDATION OR API HIT for check email id exists*/

  const onEmailCheck = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setEmailError('Please enter an email');
    } else if (email.length && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
    } else if (email) {
      dispatch(AppActions.emailExists(email));
    }
  };

  return (
    <>
      <MasterLayout>
        <div className="login">
          <div className="login-left">
            <div className="b-name">
              <img
                src={logoWhite}
                style={{
                  //  border: '1px solid red',
                  width: '250px',
                  // height: '300px',
                }}
              />
            </div>

            <div className="graphics">
              <img src={graphic01} />
            </div>
          </div>
          <div className="login-right">
            <div className="login-content">
              {/*****************************************************************************  */}
              {userData === 200 ? (
                <div className="recoverPasswordSuccess">
                  <h2 className="heading">{ts('RECOVER_PASSWORD')}</h2>
                  <div className="text-center success-img">
                    <img src={successTick} />
                  </div>
                  <p className="success-desc">
                    {ts('CHECK_EMAIL_TO_RESET_PASSWORD')}
                  </p>
                  <p
                    className="link"
                    onClick={() => {
                      dispatch(AppActions.userDataClear());
                      history.push('/');
                    }}>
                    {ts('LOGIN_TO_YOUR_ACCOUNT')}
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="heading">{ts('RECOVER_PASSWORD')}</h2>
                  {/***On this screen user enter valid email id which used when user joined 
                       if email id exists user will navigate to changed password screen */}
                  <div className="login-form">
                    <p className="form-help-text">{ts('RECOVERY_MESSAGE')}</p>
                    <form noValidate onSubmit={(e) => onEmailCheck(e)}>
                      {/*******************EMAIL INPUT FIELD************* */}
                      <div className="formRow">
                        <div className="w100">
                          <label className="formLabel">{ts('EMAIL')}</label>
                          <div className="formField has-icon">
                            <input
                              type="email"
                              name="email"
                              className="f-field"
                              value={email.toLowerCase()}
                              onChange={onHandleEmailChange}
                              required
                              maxLength={320}
                            />
                            <span className="f-icon">
                              <img src={icon01} />
                            </span>
                          </div>
                          <span style={styles.error}>{emailError}</span>
                        </div>
                      </div>
                      {/************** SUBMIT BUTTON****************** */}
                      <div className="formRow">
                        <div className="w100">
                          <div className="formSubmit">
                            <input
                              type="submit"
                              className="btn-solid"
                              value={ts('SEND')}
                            />
                          </div>
                        </div>
                      </div>
                      {/************************************************ */}
                    </form>
                  </div>
                  <p className="additional-link">
                    {ts('REMEMBER_PASSWORD')}&nbsp;
                    <Link to="/" className="link">
                      {ts('LOGIN')}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </MasterLayout>
    </>
  );
};

export default EmailCheck;

const styles = {
  error: {color: 'red', paddingLeft: '5px'},
};
