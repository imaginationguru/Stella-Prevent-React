import React from 'react';
import {TouchableOpacity} from 'react-native';
import GLOBALS from '../../../constants';
const {COLORS} = GLOBALS;
const {DARK_GREEN, BLACK} = COLORS;
const Tab = (props) => {
  return (
    <div>
      {props.tabList.map((item) => {
        return (
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => props.setActiveTabClick(item.title)}>
            {item.title === props.activeTab ? (
              <p style={{...styles.title, color: DARK_GREEN}}>{item.title}</p>
            ) : null}
            {item.title !== props.activeTab ? (
              <p style={{...styles.title, color: BLACK}}>{item.title}</p>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </div>
  );
};
export default Tab;
const styles = {
  menuIcon: {
    display: 'inline-block',
    marginBottom: '3%',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    paddingRight: '30px',
  },
};
