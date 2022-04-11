/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import brand from '../../../assets/images/brand.svg';
import graphic01 from '@assets/images/graphic01.svg';
import icon02 from '@assets/images/icon02.svg';
import successTick from '@assets/images/successTick.svg';
import logoWhite from '@assets/images/logoWhite.png';
import MasterLayout from '@components/MasterLayout';
import {translate as ts} from '@i18n/translate';
import {passwordRegex} from '@utils/RegexUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import history from '@helpers/history';

const RecoverPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const dispatch = useDispatch();
  const {resetData = {}} = useSelector((state) => state.authReducer);

  /** Function for password and confirm password value set*********  */

  const onHandleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    if (name === 'password') {
      setPassword(value);
      setPasswordError('');
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setConfirmPasswordError('');
    }
  };
  /****Function for copy paste handler*********** */
  const copyPasteHandler = (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    const {name} = e.target;
    if (name === 'password') {
      setPassword('');
      setPasswordError('');
    }
    if (name === 'confirmPassword') {
      setConfirmPassword('');
      setConfirmPasswordError('');
    }
  };

  /*Function for Password validations and confirm Password
   validation Reset Password and API hit for changed Password* */

  const _id = useParams();
  const onRecoverPassword = (e) => {
    e.preventDefault();
    if (password.length === 0) {
      setPasswordError('Please enter a new password');
    } else if (password.length && !passwordRegex.test(password)) {
      setPasswordError(
        'Valid password must have atleast 1 special character and 1 digit and 1 capital letter. Password must be atleast 8 characters long',
      );
    } else if (confirmPassword.length === 0) {
      setConfirmPasswordError('Please enter confirm password');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (
      _id.id &&
      password.length !== 0 &&
      password === confirmPassword &&
      _id.resetToken
    ) {
      dispatch(AppActions.changePassword(_id.id, password, _id.resetToken));
    }
  };

  return (
    <>
      <MasterLayout>
        <div className="login">
          <div className="login-left">
            <div className="b-name">
              <img src={logoWhite} />
            </div>
            <div className="graphics">
              <img src={graphic01} />
            </div>
          </div>
          <div className="login-right">
            {resetData === 200 ? (
              <div className="recoverPasswordSuccess">
                <h2 className="heading">{ts('RECOVER_PASSWORD')}</h2>
                <div className="text-center success-img">
                  <img src={successTick} />
                </div>
                <h3 className="success-text">
                  {ts('PASSWORD_RESET_SUCCESSFULLY')}
                </h3>

                <p
                  className="link"
                  onClick={() => {
                    dispatch(AppActions.resetPasswordDataClear());
                    history.push('/');
                  }}>
                  {ts('LOGIN_TO_YOUR_ACCOUNT')}
                </p>
              </div>
            ) : (
              <div className="login-content">
                <h2 className="heading">{ts('RECOVER_PASSWORD')}</h2>
                {/*****************************************************************************  */}
                <div className="login-form">
                  {/**Changed Password Screen on this screen there are two fields 
                      one for password and second one is confirm password*** */}
                  <form noValidate onSubmit={(e) => onRecoverPassword(e)}>
                    <div className="formRow">
                      <div className="w100">
                        <label className="formLabel">
                          {ts('NEW_PASSWORD')}
                        </label>
                        <div className="formField has-icon">
                          <input
                            type="password"
                            name="password"
                            className="f-field"
                            value={password}
                            onChange={onHandleChange}
                            required
                            maxLength={16}
                            onPaste={copyPasteHandler}
                            onCopy={copyPasteHandler}
                            onCut={copyPasteHandler}
                          />
                          <span className="f-icon">
                            <img src={icon02} />
                          </span>
                        </div>
                        <span style={styles.error}>{passwordError}</span>
                      </div>
                    </div>
                    <div className="formRow">
                      <div className="w100">
                        <label className="formLabel">
                          {ts('CONFIRM_PASSWORD')}
                        </label>
                        <div className="formField has-icon">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="f-field"
                            value={confirmPassword}
                            onChange={onHandleChange}
                            required
                            maxLength={16}
                            onPaste={copyPasteHandler}
                            onCopy={copyPasteHandler}
                            onCut={copyPasteHandler}
                          />
                          <span className="f-icon">
                            <img src={icon02} />
                          </span>
                        </div>
                        <span style={styles.error}>{confirmPasswordError}</span>
                      </div>
                    </div>
                    {/************** SUBMIT BUTTON****************** */}
                    <div className="formRow">
                      <div className="w100">
                        <div className="formSubmit">
                          <input
                            type="submit"
                            className="btn-solid"
                            value={ts('SAVE')}
                          />
                        </div>
                      </div>
                    </div>
                    {/************************************************ */}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </MasterLayout>
    </>
  );
};

export default RecoverPassword;

const styles = {
  error: {color: 'red', paddingLeft: '5px'},
};
