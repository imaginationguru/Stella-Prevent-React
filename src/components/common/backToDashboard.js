import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { navigatortoStart } from '../../config/navigationOptions.web';
import back from '../../assets/images/subscription/back.png';
import GLOBALS from '../../constants';

const { COLORS, FONTS } = GLOBALS;
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
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigatortoStart()}>
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
