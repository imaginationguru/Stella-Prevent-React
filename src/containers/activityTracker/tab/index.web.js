import React from 'react';
import { TouchableOpacity } from 'react-native';
import GLOBALS from '../../../constants';
const { COLORS, FONTS } = GLOBALS;
const { DARK_GREEN, BLACK, WHITE, GRAY, HEADING_BLACK } = COLORS;
const Tab = (props) => {
  return (
    <div>
      {props.tabList.map((item) => {
        return (
          <TouchableOpacity
            style={[
              styles.menuIcon,
              item.title === props.activeTab
                ? { backgroundColor: 'rgb(0, 111, 89)' }
                : { backgroundColor: GRAY },
            ]}
            onPress={() => props.setActiveTabClick(item.title)}>
            {item.title === props.activeTab ? (
              <p style={{ ...styles.title, color: WHITE }}>{item.title}</p>
            ) : null}
            {item.title !== props.activeTab ? (
              <p style={{ ...styles.title, color: HEADING_BLACK }}>
                {item.title}
              </p>
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

    marginRight: 10,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  title: {
    marginBottom: '0px',
    fontSize: '15px',
    fontWeight: 'bold',
    fontSize: FONTS.REGULAR,
  },
  /**
   *
   */
};
