import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import icon01 from '@assets/images/icon01.svg';
import icon02 from '@assets/images/icon02.svg';
import icon03 from '@assets/images/icon03.svg';
import icon04 from '@assets/images/icon04.svg';
import key from '@assets/images/subscription/key.png';
import cards from '@assets/images/subscription/cards.png';
import downArrow from '@assets/images/subscription/dropdown.png';
import GLOBALS from '@constants';
const {COLORS, FONTS} = GLOBALS;

const {BORDER_COLOR, SHADOW_COLOR, HEADING_BLACK, WHITE, ERROR} = COLORS;
const Input = (props) => {
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
          <View style={[styles.inputContainer, inputStyle]}>
            <TextInput
              style={styles.textInput}
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
                  : type == 'cards'
                  ? cards
                  : type == 'key'
                  ? key
                  : ''
              }
            />
          </View>
        )}
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 15,
  },
  label: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: 15,
    color: HEADING_BLACK,
    paddingBottom: 10,
    textTransform: 'capitalize',
    lineHeight: 21,
  },
  textInput: {
    fontSize: 15,
    // color: 'black',
    height: '100%',
    flex: 0.8,
    fontStyle: FONTS.NEW_REGULAR,
    color: HEADING_BLACK,
    outlineStyle: 'none',
  },
  logo: {
    width: 50,
    height: 20,
    flex: 0.2,
  },
  error: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: 14,
    paddingLeft: 5,
    color: ERROR,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});
