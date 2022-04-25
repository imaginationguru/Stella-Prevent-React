import React from 'react';
import {TouchableOpacity} from 'react-native';
import GLOBALS from '@constants';
const {COLORS} = GLOBALS;
const ModuleBox = (props) => {
  const {moduleText, onNavigate, img, moduleStyle} = props;
  return (
    <TouchableOpacity
      onPress={(val) => onNavigate(val)}
      style={styles.imgContent}
      activeOpacity={1}>
      <div style={styles.imgDiv}>
        <img src={img} />
      </div>
      <div style={styles.moduleTextWrapper}>
        <p style={{...styles.moduleText, ...moduleStyle}}>{moduleText}</p>
      </div>
    </TouchableOpacity>
  );
};

export default ModuleBox;
const styles = {
  moduleTextWrapper: {paddingLeft: '15px', width: '60%'},
  moduleText: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center',
  },

  imgContent: {
    border: '1px solid',
    borderColor: COLORS.BORDER_GRAY,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    paddingBottom: '20px',
    alignItems: 'center',
    borderRadius: '5px',
    marginTop: '40px',
  },
  imgDiv: {
    width: '35%',
    height: '70px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
