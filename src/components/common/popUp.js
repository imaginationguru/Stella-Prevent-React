import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import GLOBALS from '../../constants';
import Button from './button';
import cross from '../../assets/images/cross.svg';
const { COLORS, FONTS } = GLOBALS;
const { DARK_GREEN, WHITE } = COLORS;
import * as AppActions from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
const PopUp = (props) => {
  let { title, bgColor, textColor, onVerifyPress, btnStyle, textStyle } = props;
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => dispatch(AppActions.clearSuccessAction()), 3000);
      setTimeout(() => dispatch(AppActions.clearErrorAction()), 3000);
    }
  }, [isSuccess]);
  return (
    <>
      {isSuccess && (
        <View style={styles.mainContainer}>
          <View style={styles.innerView}>
            <TouchableOpacity
              onPress={() => {
                dispatch(AppActions.clearSuccessAction());
              }}
              style={styles.crossContainer}>
              <img src={cross} />
            </TouchableOpacity>
            <Text style={styles.text}> {successMessage}</Text>
          </View>
        </View>
      )}
      {isError && (
        <View style={styles.mainContainer}>
          <View style={[styles.innerView, { borderColor: 'red' }]}>
            <TouchableOpacity
              onPress={() => {
                dispatch(AppActions.clearErrorAction());
              }}
              style={[styles.crossContainer, { backgroundColor: 'red' }]}>
              <img src={cross} />
            </TouchableOpacity>
            <Text style={[styles.text, { color: 'red' }]}>{errorMessage}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default PopUp;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    zIndex: 110,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    elevation: 1,
  },
  innerView: {
    alignItems: 'center',
    backgroundColor: WHITE,
    width: '30%',
    height: '20%',
    borderRadius: '2vw',
    borderColor: DARK_GREEN,
  },
  text: {
    fontSize: '1.5vw',
    fontFamily: FONTS.NEW_REGULAR,
    color: DARK_GREEN,
    textAlign: 'center',
    paddingTop: '1vw',
    paddingHorizontal: '0.5vw',
  },
  crossContainer: {
    backgroundColor: DARK_GREEN,
    width: '100%',
    borderTopLeftRadius: '2vw',
    borderTopRightRadius: '2vw',
    height: '3vw',
    alignItems: 'flex-end',
    paddingHorizontal: '2vw',
    paddingTop: '1vw',
  },
});
