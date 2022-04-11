import React from 'react';
import {translate as ts} from '@i18n/translate';
const DropDown = ({data = [], value, handleChange, name}) => {
  const optionJsx = data.length
    ? data.map((item) => <option value={item.id}>{item.label}</option>)
    : null;
  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      style={styles.dropDown}>
      {!value && <option>{ts('SELECT')}</option>}
      {optionJsx}
    </select>
  );
};

export default DropDown;
const styles = {
  dropDown: {
    width: '100%',
    padding: '12px',
    border: '1px solid rgba(147, 147, 147, 0.2)',
    boxShadow: '0px 2px 6px rgb(60 134 221 / 20%)',
    borderRadius: '5px',
  },
};
