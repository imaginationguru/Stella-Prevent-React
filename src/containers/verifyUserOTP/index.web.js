import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {navigatorPop} from '@config/navigationOptions.web';
import rightCover from '@assets/images/candle.png';
import Input from '@components/Input';
import Button from '@components/common/button';
import Loader from '@components/Loader';
import GLOBALS from '@constants';
import {Dimensions} from 'react-native-web';
const {COLORS, FONTS} = GLOBALS;
const {IMAGE_BASE_URL} = GLOBALS;
const {HEADING_BLACK, LOGIN_BG, DARK_GREEN, WHITE} = COLORS;
const DEVICE_WIDTH = Dimensions.get('window').width;
import * as AppActions from '@actions';
import {useDispatch, useSelector} from 'react-redux';

const VerifyUserOTP = () => {
  const [registerCode, setRegisterCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [code, setCode] = useState('');
  const {quotes = {}} = useSelector((state) => state.moduleOne);
  const {loginData = []} = useSelector((state) => state.authReducer);
  const {isLoading} = useSelector((state) => state.common);

  const dispatch = useDispatch();
  const onBackButtonEvent = (e) => {
    if (loginData) {
      dispatch(AppActions.logout());
    } else {
      navigatorPop();
    }
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setRegisterCode(loginData?.user?.registration_code);
  }, [loginData]);
  /**On Verify Button Press */
  const VerifyHandler = () => {
    setCodeError('');
    if (code.trim() === '') {
      setCodeError('Please enter verification code');
    } else if (code.trim() != registerCode) {
      setCodeError('Invalid verification code');
    } else {
      let param = {
        isInterest: true,
        user_id: loginData.user._id,
      };
      dispatch(AppActions.acceptWelcomeScreen(param));
    }
  };

  const resend = () => {
    let postData = {
      user_id: loginData.user._id,
    };
    dispatch(
      AppActions.resendRegistrationCode(postData, (cb) => {
        if (cb) {
          console.log('resend otp res', cb);
          setRegisterCode(cb.registration_code);
        }
      }),
    );
  };
  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.loginLeft}>
        <ImageBackground
          source={
            quotes.quoteImg != ''
              ? `${IMAGE_BASE_URL}${quotes.quoteImg}`
              : `${rightCover}`
          }
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '30px',
          }}>
          <Text style={styles.quoteText}>{quotes.quoteText}</Text>
        </ImageBackground>
      </View>
      <View style={styles.loginRight}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: DEVICE_WIDTH > 1000 ? '60px' : '30px',
            maxWidth: DEVICE_WIDTH > 1000 ? '90%' : '100%',
          }}>
          <View style={{flex: 1, paddingTop: '10vw'}}>
            <Text style={styles.heading}>Verify Yourself</Text>
            <View style={styles.verifyForm}>
              <Input
                maxLength={10}
                placeholder="Code"
                setCode={(code) => {
                  setCode(code);
                  setCodeError('');
                }}
                value={code}
                error={codeError}
                label="Enter Verification Code"
              />
            </View>

            <Button
              onVerifyPress={() => VerifyHandler()}
              title="Verify"
              bgColor={DARK_GREEN}
              textColor={'white'}
              textStyle={{fontSize: 20}}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => resend()}>
                <Text style={styles.noAccount}>Resend Code</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(AppActions.logout());
                }}>
                <Text style={styles.noAccount}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default VerifyUserOTP;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: '100vh',
    flexWrap: DEVICE_WIDTH > 1000 ? 'nowrap' : 'wrap',
  },
  loginLeft: {
    flex: DEVICE_WIDTH > 1000 ? '0 0 50%' : '0 0 100%',
    backgroundColor: LOGIN_BG,
    paddingRight: 0,
  },
  logo: {
    width: '100%',
    paddingVertical: 35,
    marginTop: 30,
  },
  loginRight: {
    flex: DEVICE_WIDTH > 1000 ? '0 0 50%' : '0 0 100%',
    paddingVertical: 35,
  },
  title: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: 40,
    lineHeight: 52,
    color: HEADING_BLACK,
  },
  verifyForm: {
    paddingVertical: '3vw',
  },
  formLabel: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: 16,
    color: HEADING_BLACK,
    paddingBottom: 12,
    textTransform: 'capitalize',
    lineHeight: 21,
    fontWeight: '500',
  },
  quoteText: {
    color: WHITE,
    //@extend: 'HKGrotesk-Medium';
    fontFamily: 'BerkshireSwash Regular',
    fontSize: DEVICE_WIDTH > 1000 ? '2.50vw' : '21px',
    lineHeight: '40px',
    textAlign: 'center',
  },
  heading: {
    fontFamily: FONTS.SEMI_BOLD,
    fontWeight: '500',
    fontSize: DEVICE_WIDTH > 1000 ? '2.50vw' : '21px',
    lineHeight: '40px',
    color: '#0f243d',
  },
  noAccount: {
    textAlign: 'right',
    fontStyle: FONTS.SEMI_BOLD,
    fontSize: DEVICE_WIDTH > 1000 ? '1.3vw' : '16px',
    marginTop: 20,
    color: COLORS.DARK_GREEN,
    textDecorationLine: 'underline',
  },
});
