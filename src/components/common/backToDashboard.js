import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { navigatortoStart } from '@config/navigationOptions.web';
import back from '@assets/images/subscription/back.png';
import GLOBALS from '@constants';
import { translate as ts } from '@i18n/translate';
const { COLORS, FONTS } = GLOBALS;
const BackToDashboard = (props) => {
  let {
    title = ts('BACK_DASHBOARD'),
    bgColor,
    textColor,
    onVerifyPress,
    btnStyle = {},
    textStyle,
    isDisabled = false,
    isLoginPage = false,
    onBack,
  } = props;
  return (
    <View style={[styles.backBtn, btnStyle]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {
          onBack();
          navigatortoStart();
        }}
      // onPress={() => {
      //   alert('hello');
      //   console.log('hello');
      // }}
      >
        <Image
          resizeMode={'contain'}
          source={back}
          style={{
            width: '15px',
            height: '15px',
          }}
        />
        <Text
          style={{
            marginLeft: '1vw',
            fontFamily: FONTS.SEMI_BOLD,
            fontSize: '17px',
            fontStyle: 'normal',
            fontWeight: '800',
            color: COLORS.LIGHT_BLACK,
            alignItems: 'center',
            textAlignVertical: 'center',
          }}>
          {isLoginPage ? ts("BACK_LOGIN") : title}
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
