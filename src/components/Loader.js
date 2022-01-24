import React from 'react';
import {Spinner} from 'reactstrap';
import GLOBALS from '../constants';
const {COLORS} = GLOBALS;
const Loader = () => {
  return (
    <>
      <div style={styles.loaderContainer}>
        <Spinner animation="grow" variant="info" />
      </div>
    </>
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
};
export default Loader;
