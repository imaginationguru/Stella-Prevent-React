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
  goToPastModule,
} from '../../config/navigationOptions.web';
import back from '../../assets/images/subscription/back.png';
import GLOBALS from '../../constants';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const {COLORS, FONTS} = GLOBALS;
const BackBtn = (props) => {
  let {
    title = 'Back to Dashboard',
    bgColor,
    textColor,
    onVerifyPress,
    btnStyle,
    textStyle,
    isDisabled = false,
    goBack = true,
  } = props;
  return (
    <View style={[styles.backBtn, btnStyle]}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          goBack ? navigatorPop() : goToPastModule();
        }}>
        <Image
          resizeMode={'contain'}
          source={back}
          style={{
            // width: DEVICE_WIDTH > 767 ? '1.3vw' : '15px',
            // height: DEVICE_WIDTH > 767 ? '1.3vw' : '15px',
            width: 14,
            height: 14,
          }}
        />
        <Text
          style={{
            // marginLeft: '1vw',
            marginLeft: 5,
            fontFamily: FONTS.SEMI_BOLD,
            // fontSize: DEVICE_WIDTH > 767 ? '1.3vw' : '16px',
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: '800',
            color: COLORS.LIGHT_BLACK,
            alignItems: 'center',
            textAlignVertical: 'center',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;
const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'flex-start',
    padding: '2vw',
    paddingBottom: '1vw',
  },
});
