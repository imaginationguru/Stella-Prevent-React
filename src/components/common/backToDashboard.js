import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet , TouchableOpacity, Image} from 'react-native';

import {navigatorPush, navigatorPop} from '../../config/navigationOptions.web';
import back from '../../assets/images/subscription/back.png';
import GLOBALS from '../../constants';
const { COLORS, FONTS } = GLOBALS;
const BackToDashboard = (props) => {
    let { title="Back to Dashboard", bgColor, textColor, onVerifyPress, btnStyle, textStyle, isDisabled=false } = props;
    return (
        <View style={styles.backBtn}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>  navigatorPush({
            screenName: 'Dashboard',
            
          })}>
          <Image
            resizeMode={'contain'}
            source={back}
            style={{width: '1.3vw', height: '1.3vw'}}
          />
          <Text
            style={{
              marginLeft: '1vw',
              fontFamily: FONTS.SEMI_BOLD,
              fontSize: '1.3vw',
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
    )

}

export default BackToDashboard
const styles = StyleSheet.create({
    backBtn: {
        alignItems: 'flex-start',
        padding: '2vw',
        paddingBottom: '1vw',
      },
})