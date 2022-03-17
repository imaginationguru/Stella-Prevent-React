import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import {
  navigatorPush,
  navigatorPop,
  navigatortoStart,
} from '../../config/navigationOptions.web';
import back from '../../assets/images/subscription/back.png';
import GLOBALS from '../../constants';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const {COLORS, FONTS} = GLOBALS;
const BackToDashboard = (props) => {
  let {
    title = 'Back to Dashboard',
    bgColor,
    textColor,
    onVerifyPress,
    btnStyle = {},
    textStyle,
    isDisabled = false,
    isLoginPage = false,
  } = props;
  return (
    <View style={[styles.backBtn, btnStyle]}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={
          () => navigatortoStart()
          // navigatorPush({
          //   screenName: 'Dashboard',
          // })
        }>
        <Image
          resizeMode={'contain'}
          source={back}
          style={{
            // width: DEVICE_WIDTH > 767 ? '1.3vw' : '15px',
            // height: DEVICE_WIDTH > 767 ? '1.3vw' : '15px',
            width: '15px',
            height: '15px',
          }}
        />
        <Text
          style={{
            marginLeft: '1vw',
            fontFamily: FONTS.SEMI_BOLD,
            // fontSize: DEVICE_WIDTH > 767 ? '1.3vw' : '16px',
            fontSize: '17px',
            fontStyle: 'normal',
            fontWeight: '800',
            color: COLORS.LIGHT_BLACK,
            alignItems: 'center',
            textAlignVertical: 'center',
          }}>
          {isLoginPage ? 'Back to Login ' : title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackToDashboard;
const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'flex-start',
    padding: '2vw',
    paddingBottom: '1vw',
  },
});
