import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  navigatorPop,
  goToPastModule,
  navigatorPush,
} from '../../config/navigationOptions.web';
import back from '../../assets/images/subscription/back.png';
import GLOBALS from '../../constants';
import { translate as ts } from '@i18n/translate';
const { COLORS, FONTS } = GLOBALS;
const BackBtn = (props) => {
  let { title = ts('BACK_DASHBOARD'), btnStyle, goBack = true, onPress } = props;
  return (
    <View style={[styles.backBtn, btnStyle]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        // onPress={() => {
        //   goBack
        //     ? navigatorPush({screenName: 'DailyLearningModule'})
        //     : goToPastModule();
        // }}

        onPress={onPress}>
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
