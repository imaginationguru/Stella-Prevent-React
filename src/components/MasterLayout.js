/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, TouchableOpacity } from 'react-native';
import Loader from './Loader';
import GLOBALS from '../constants';
import cancel from '../assets/images/cancel.png';
import {
  clearErrorAction,
  clearSuccessAction,
  loadingAction,
  clearSessionExpiredAction,
} from '../actions/common';
import * as AppActions from '../actions';
import week1 from '../assets/images/Week1.svg';
import week2 from '../assets/images/week2.svg';
import week3 from '../assets/images/week3.svg';
import week4 from '../assets/images/week4.svg';
import week5 from '../assets/images/week5.svg';

import menu from '../assets/images/menu.svg';
import Menu from './Menu';
import { getItem } from '../utils/AsyncUtils';
import ReactHtmlParser from 'react-html-parser';
import history from '../helpers/history';
const { COLORS } = GLOBALS;


const MasterLayout = (props) => {
  const {
    isLoading,
    isError,
    errorMessage,
    lang,
    isSuccess,
    successMessage,
    isSessionError,
    sessionExpireMessage,
    isDashboardModal,
  } = useSelector((state) => state.common);
  const { selectedWeek } = useSelector((state) => state.moduleOne);
  const dispatch = useDispatch();
  useEffect(() => { }, [lang]);
  const isLogin = getItem('token') ? true : false;
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => dispatch(clearSuccessAction()), 3000);
    }
  }, [isSuccess, dispatch]);
  useEffect(() => {
    if (isError) {
      setTimeout(() => dispatch(dispatch(clearErrorAction())), 3000);
    }
  }, [isError, dispatch]);
  return (
    <div className="safeHeight">
      {/*********************Header Image****************************** */}
      {isLogin && (
        <div
          style={{ position: 'relative', opacity: isDashboardModal ? 0.4 : 1 }}>
          {selectedWeek === 1 ? (
            <img src={week1} style={{ width: '100%' }} />
          ) : null}

          {selectedWeek === 2 ? (
            <img src={week2} style={{ width: '100%' }} />
          ) : null}

          {selectedWeek === 3 ? (
            <img src={week3} style={{ width: '100%' }} />
          ) : null}

          {selectedWeek === 4 ? (
            <img src={week4} style={{ width: '100%' }} />
          ) : null}

          {selectedWeek === 5 ? (
            <img src={week5} style={{ width: '100%' }} />
          ) : null}

          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => dispatch(AppActions.dashboardModalAction(true))}>
            <img src={menu} />
          </TouchableOpacity>
        </div>
      )}
      {/*********************Header Image End****************************** */}
      <div className="wrapper" style={{ opacity: isDashboardModal ? 0.4 : 1 }}>
        {props.children}
      </div>

      {/*********************************MODAL POPUP FOR MENU START*************** */}
      {isLogin && isDashboardModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDashboardModal}
          onRequestClose={() => {
            dispatch(AppActions.dashboardModalAction(false));
          }}>
          <Menu
            modalVisible={() =>
              dispatch(AppActions.dashboardModalAction(false))
            }
          />
        </Modal>
      )}
      {/*********************************MODAL POPUP FOR MENU END*************** */}
      {isLoading ? <Loader /> : null}
      <div>
        {isError && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isError}
            onRequestClose={() => {
              dispatch(clearErrorAction());
            }}>
            <div style={styles.errorContainer}>
              <div style={styles.cancelDiv}>
                <div
                  onClick={() => {
                    dispatch(clearErrorAction());
                    dispatch(loadingAction(false));
                  }}
                  style={styles.imgContainer}>
                  <img src={cancel} style={styles.cancelImage} />
                </div>
              </div>
              <p style={styles.errorText}>{errorMessage}</p>
            </div>
          </Modal>
        )}

        {isSuccess && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isSuccess}
            onRequestClose={() => {
              dispatch(clearSuccessAction());
            }}>
            <div style={styles.successContainer}>
              <div style={styles.cancelDiv}>
                <div
                  onClick={() => {
                    dispatch(clearSuccessAction());
                  }}
                  style={styles.imgContainer}>
                  <img src={cancel} style={styles.cancelImage} />
                </div>
              </div>

              <p style={styles.successText}>
                {ReactHtmlParser(successMessage)}
              </p>
            </div>
          </Modal>
        )}
        {isSessionError && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isSessionError}
            onRequestClose={() => {
              dispatch(clearSessionExpiredAction());
            }}>
            <div style={styles.errorContainer}>
              <p style={styles.errorText}>{sessionExpireMessage}</p>
              <div style={styles.okTextWrapper}>
                <p
                  style={styles.okText}
                  onClick={() => {
                    dispatch(clearSessionExpiredAction());
                    localStorage.clear();
                    history.push('/');
                  }}>
                  Ok
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MasterLayout;
const styles = {
  errorContainer: {
    borderRadius: '5px',
    backgroundColor: '#ffff',
    width: '30%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '1px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  successContainer: {
    borderRadius: '5px',
    backgroundColor: '#ffff',
    width: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '1px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  cancelDiv: {
    backgroundColor: COLORS.DARK_GREEN,
    boxShadow: '1px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  imgContainer: {
    height: '40px',
  },
  cancelImage: {
    width: '20px',
    position: 'absolute',
    right: '10px',
    top: '10px',
  },
  errorText: {
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '20px',
  },
  successText: {
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '20px',
    paddingLeft: '80px',
    paddingRight: '80px',
  },
  okText: {
    paddingTop: '5px',
    paddingBottom: '5px',
    textAlign: 'center',
    backgroundColor: COLORS.DARK_GREEN,
    marginBottom: '40px',
    width: '20%',
    borderRadius: '5px',
  },
  okTextWrapper: {
    justifyContent: 'center',
    display: 'flex',
    alignSelf: 'center',
  },
  menuIcon: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },
};
