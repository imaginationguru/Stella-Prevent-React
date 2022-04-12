import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import GLOBALS from '@constants';
const {COLORS, FONTS} = GLOBALS;
const {BLUR, WHITE, HEADING_BLACK, SOFT_GRAY, BLACK, DARK_GREEN} = COLORS;

import check from '@assets/images/screener/check.png';
import uncheck from '@assets/images/screener/uncheck.png';
export default class RadioButton1 extends React.Component {
  render() {
    const {selectedOption, outerStyle, innerStyle, label, onPress, item} =
      this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress(item.id)}>
          <View style={[styles.outerStyle, outerStyle]}>
            <Text style={styles.radioText}>{label}</Text>
            <Image
              resizeMode={'contain'}
              style={styles.checkBtn}
              source={selectedOption ? check : uncheck}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  outerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: 12,
    fontWeight: '500',
    color: SOFT_GRAY,
    paddingBottom: 5,
    textTransform: 'capitalize',
    lineHeight: 21,
  },
  checkBtn: {
    height: 15,
    width: 15,
  },
});
