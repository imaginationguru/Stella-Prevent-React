import { Text, Pressable, StyleSheet } from 'react-native';
import GLOBALS from '../../constants';
const { FONTS } = GLOBALS;
const Button = (props) => {
  let {
    title,
    bgColor,
    textColor,
    onVerifyPress,
    btnStyle,
    textStyle,
    isDisabled = false,
  } = props;
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onVerifyPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: isDisabled ? '#676767' : bgColor,
        },
        btnStyle,
      ]}>
      <Text style={[{ color: textColor }, styles.titleStyle, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1vw',
  },
  titleStyle: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '1.2vw',
    textAlign: 'center',
  },
});
