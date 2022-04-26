import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import GLOBALS from '../constants';
import check from '../assets/images/screener/check.png';
import uncheck from '../assets/images/screener/uncheck.png';
const { COLORS, FONTS } = GLOBALS;
const { DARK_GREEN } = COLORS;
export default class RadioButton extends React.Component {
  render() {
    const { selectedOption, outerStyle, innerStyle, label, onPress } = this.props;
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
