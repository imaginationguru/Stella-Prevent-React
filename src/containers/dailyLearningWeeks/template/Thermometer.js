import React from 'react';
import GLOBALS from '../../../constants';
import emptyMeter from '../../../assets/images/emptyMeter.png';
import greenbottm from '../../../assets/images/greenbottom.png';
import { TouchableOpacity } from 'react-native';

import { Dimensions } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const { COLORS } = GLOBALS;
const styles = {
  mainWrapper: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: '20px',
    position: 'relative',
  },
  greenBottom: { width: '30px', position: 'absolute', bottom: 13, left: 14 },
  shades: {
    width: '12px',
    height: '18px',
    position: 'absolute',
    left: 21,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    marginLeft: DEVICE_WIDTH > 767 ? '10px' : '0',
  },
  plus: {
    fontWeight: 'bold',
    fontSize: '30px',
    color: '#C4C4C4',
  },
  minus: {
    fontWeight: 'bold',
    fontSize: '36px',
    color: '#C4C4C4',
  },
};
const thermometerBox = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const dynamicBgColor = (val) => {
  if (val >= 1 && val < 4) {
    return COLORS.LIGHT_GREEN;
  }
  if (val >= 4 && val < 7) {
    return COLORS.LIGHT_YELLOW;
  }
  if (val >= 7 && val < 9) {
    return COLORS.LIGHT_ORANGE;
  }
  if (val >= 9 && val <= 10) {
    return COLORS.LIGHT_PINK;
  }
};
/*
here we generate small boxes inside the thermometer dynamic height generate boxes
*/
const dynamicHeight = (val) => {
  if (val === 1) {
    return 60;
  }
  if (val === 2) {
    return 82;
  }
  if (val === 3) {
    return 104;
  }
  if (val === 4) {
    return 126;
  }
  if (val === 5) {
    return 148;
  }
  if (val === 6) {
    return 172;
  }
  if (val === 7) {
    return 192;
  }
  if (val === 8) {
    return 214;
  }
  if (val === 9) {
    return 236;
  }
  if (val === 10) {
    return 258;
  }
};

/*
on plus handler dynamic color set
*/
const activeDynamicColor = (val) => {
  if (val >= 1 && val < 4) {
    return COLORS.DARK_GREEN;
  }
  if (val >= 4 && val < 7) {
    return COLORS.YELLOW;
  }
  if (val >= 7 && val < 9) {
    return COLORS.BUTTON_ORANGE;
  }
  if (val >= 9 && val <= 10) {
    return COLORS.DARK_RED;
  }
};

const Thermometer = ({ current, plusHandler, minusHandler }) => {
  const generateBoxes = thermometerBox.map((item, i) => {
    return (
      <div
        key={i}
        style={{
          ...styles.shades,
          backgroundColor:
            current >= item ? activeDynamicColor(item) : dynamicBgColor(item),
          bottom: `${dynamicHeight(item)}px`,
        }}
      />
    );
  });
  return (
    <div style={styles.mainWrapper}>
      <img src={emptyMeter} />
      <div style={styles.greenBottom}>
        <img src={greenbottm} />
      </div>
      {generateBoxes}
      <div style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => plusHandler(current)}>
          <span style={styles.plus}>+</span>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => minusHandler(current)}>
          <span style={styles.minus}>-</span>
        </TouchableOpacity>
      </div>
    </div>
  );
};

export default Thermometer;
