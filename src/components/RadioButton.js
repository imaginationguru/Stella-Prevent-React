import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import GLOBALS from '../constants';
const {COLORS, FONTS} = GLOBALS;
const {BLUR, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;

import check from '../assets/images/screener/check.png';
import uncheck from '../assets/images/screener/uncheck.png';
export default class RadioButton extends React.Component {
  render() {
    const {selectedOption, outerStyle, innerStyle, label, onPress} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress(label)}>
          <View style={[styles.outerStyle, outerStyle]}>
            <Image
              resizeMode={'contain'}
              style={styles.checkBtn}
              source={selectedOption ? check : uncheck}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.radioText}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  outerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioText: {
    color: DARK_GREEN,
    marginHorizontal: 10,
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '0.9vw',
    textAlign: 'center',
  },
  checkBtn: {
    height: '4vw',
    width: '4vw',
  },
});
