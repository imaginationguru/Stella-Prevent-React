import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import icon01 from '../assets/images/icon01.svg';
import icon02 from '../assets/images/icon02.svg';
import icon03 from '../assets/images/icon03.svg';
import icon04 from '../assets/images/icon04.svg';
import key from '../assets/images/subscription/key.png';
import cards from '../assets/images/subscription/cards.png';
import downArrow from '../assets/images/subscription/dropdown.png';
import GLOBALS from '../constants';
const {COLORS, FONTS} = GLOBALS;

const {BORDER_COLOR, SHADOW_COLOR, DARK_GREEN, SOFT_GRAY, WHITE, ERROR} =
  COLORS;
const Input1 = (props) => {
  let {
    label,
    error,
    value,
    setCode,
    placeholder,
    containerStyle,
    inputStyle,
    maxLength,
    type,
    isDropdown,
    labelStyle = {},
    editable = true,
    secureTextEntry = false,
  } = props;
  return (
    <View style={[containerStyle, {marginBottom: 15}]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View>
        {isDropdown ? (
          <Pressable
            style={[styles.inputContainer, inputStyle]}
            onPress={() => props.btnPress()}>
            <TextInput
              editable={false}
              style={[styles.textInput]}
              value={value}
              placeholder={placeholder}
              maxLength={maxLength}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setCode(text)}
              autoCapitalize="none"
            />
            <Image
              resizeMode={'contain'}
              style={styles.logo}
              source={
                type == 'user'
                  ? icon03
                  : type == 'email'
                  ? icon01
                  : type == 'phone'
                  ? icon04
                  : type == 'dropdown'
                  ? downArrow
                  : icon02
              }
            />
          </Pressable>
        ) : (
          <View
            style={[
              styles.inputContainer,
              inputStyle,
              {backgroundColor: editable ? 'transparent' : COLORS.GRAY2},
            ]}>
            <TextInput
              secureTextEntry={secureTextEntry}
              editable={editable}
              style={[styles.textInput]}
              value={value}
              placeholder={placeholder}
              maxLength={maxLength}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => setCode(text)}
              autoCapitalize="none"
              ellipsizeMode="middle"
              numberOfLines={1}
              ellipsizeMode="head"
            />
            {/* <Image
              resizeMode={'contain'}
              style={styles.logo}
              source={
                type == 'user'
                  ? icon03
                  : type == 'email'
                  ? icon01
                  : type == 'phone'
                  ? icon04
                  : type == 'cards'
                  ? cards
                  : type == 'key'
                  ? key
                  : ''
              }
            /> */}
          </View>
        )}
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default Input1;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
    borderColor: DARK_GREEN,
    flex: 1,
    padding: 15,
  },
  label: {
    fontStyle: 'HK Grotesk',
    fontSize: 12,
    fontWeight: '500',
    color: SOFT_GRAY,
    paddingBottom: 5,
    textTransform: 'capitalize',
    lineHeight: 21,
  },
  textInput: {
    fontSize: 15,
    height: '100%',
    flex: 1,
    fontStyle: FONTS.NEW_REGULAR,
    color: SOFT_GRAY,
    outlineStyle: 'none',
    overflow: 'hidden',
    //flexWrap: 'wrap',
  },
  logo: {
    width: 50,
    height: 20,
    flex: 0.2,
  },
  error: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '11px',
    padding: 1,
    color: ERROR,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //   alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
    borderColor: BORDER_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
    flex: 1,
    width: '200%',
    //  padding: 15
  },
});
