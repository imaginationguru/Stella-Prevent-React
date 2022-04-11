import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {navigatorPop, goToPastModule} from '@config/navigationOptions.web';
import back from '@assets/images/subscription/back.png';
import GLOBALS from '@constants';

const {COLORS, FONTS} = GLOBALS;
const BackBtn = (props) => {
  let {title = 'Back to Dashboard', btnStyle, goBack = true} = props;
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
            width: 14,
            height: 14,
          }}
        />
        <Text
          style={{
            marginLeft: 5,
            fontFamily: FONTS.SEMI_BOLD,
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
