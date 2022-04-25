import React from 'react';
import {Spinner} from 'reactstrap';
import GLOBALS from '@constants';
import {View} from 'react-native';
const {COLORS} = GLOBALS;
const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.loaderContainer}>
        <Spinner animation="grow" variant="info" />
      </div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: 'absolute',
    background: COLORS.DARK_GREEN,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 99,
    width: 100,
    height: 100,
    borderRadius: 8,
    lineHeight: '110px',
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  loaderOuter: {},
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
};
export default Loader;
