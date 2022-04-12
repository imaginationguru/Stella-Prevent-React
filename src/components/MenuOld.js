import React, {useEffect} from 'react';
import ModuleBox from './ModuleBox';
import user from '@assets/images/user.png';
import maternity from '@assets/images/maternity.svg';
import thoughts from '@assets/images/thoughts.svg';
import all from '@assets/images/all.svg';
import warnings from '@assets/images/warnings.svg';
import exercise from '@assets/images/exercise.svg';
import couple from '@assets/images/couple.svg';
import GLOBALS from '@constants';
import {TouchableOpacity} from 'react-native';
import {navigatorPush} from '@config/navigationOptions.web';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import {translate as ts} from '@i18n/translate';
import {getItem} from '@utils/AsyncUtils';

const {COLORS} = GLOBALS;
const {GRAY} = COLORS;
const Menu = (props) => {
  const {modalVisible} = props;

  const dispatch = useDispatch();
  const {currentActiveCard = []} = useSelector((state) => state.moduleOne);
  const {programData = []} = useSelector((state) => state.authReducer);
  const {week, day} = currentActiveCard.length ? currentActiveCard[0] : {};
  let duration = getItem('duration');
  let firstName = getItem('firstName');
  let lastName = getItem('lastName');

  useEffect(() => {
    dispatch(AppActions.getProgramById());
  }, []);
  const lengthToArray = (len = 0) => {
    let temp = [];
    if (len > 1) {
      for (let i = 0; i < len; +i++) {
        temp.push(i + 1);
      }
    }
    return temp;
  };

  const image = (val) => {
    if (val === 1) {
      return maternity;
    }
    if (val === 2) {
      return thoughts;
    }
    if (val === 3) {
      return all;
    }
    if (val === 4) {
      return couple;
    }
    if (val === 5) {
      return warnings;
    }
    if (val === 6) {
      return exercise;
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <div style={styles.profileImage}>
          <div style={styles.logoutButtonContainer}>
            <span style={styles.userName}>
              {firstName} {lastName}
            </span>

            <button
              style={styles.buttonStyle}
              className="btn-green"
              onClick={() => {
                dispatch(AppActions.logout());
                dispatch(AppActions.dashboardModalAction(false));
              }}>
              {ts('LOGOUT')}
            </button>
          </div>
        </div>

        <TouchableOpacity onPress={modalVisible}>
          <div style={styles.cancelContainer}>
            <span style={styles.cancelIcon}>X</span>
          </div>
        </TouchableOpacity>
      </div>
      <div className="row" style={styles.weekBox}>
        {lengthToArray(duration).map((item, index) => {
          return (
            <div className="col-md-4">
              <ModuleBox
                key={index}
                img={image(item)}
                moduleText={`Week ${item}`}
                onNavigate={() => {
                  dispatch(AppActions.getWeek(item));
                  dispatch({type: 'GET_SELECTED_WEEK', payload: item});
                  dispatch({
                    type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                    payload: item === week ? day : 1,
                  });
                  dispatch({
                    type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                    payload: '',
                  });
                  dispatch(AppActions.dashboardModalAction(false));
                  dispatch(AppActions.getTemplateData(item));
                  navigatorPush({
                    screenName: 'DailyLearningWeeks',
                    passProps: item,
                  });
                }}
              />
            </div>
          );
        })}
        <div className="col-md-4">
          <ModuleBox
            img={maternity}
            moduleText="Mood Tracker"
            onNavigate={() => {
              dispatch(AppActions.dashboardModalAction(false));
              navigatorPush({screenName: 'MoodTracker'});
            }}
          />
        </div>

        <div className="col-md-4">
          <ModuleBox
            img={maternity}
            moduleText="Activity Tracker"
            onNavigate={() => {
              dispatch(AppActions.dashboardModalAction(false));
              navigatorPush({screenName: 'ActivityTracker'});
            }}
          />
        </div>

        <div className="col-md-4">
          <ModuleBox
            img={maternity}
            moduleText="Sleep Tracker"
            onNavigate={() => {
              dispatch(AppActions.dashboardModalAction(false));
              navigatorPush({screenName: 'SleepTracker'});
            }}
          />
        </div>
        {/* <div className="col-md-4">
          <ModuleBox
            img={maternity}
            moduleText="Exercises & Readings"
            onNavigate={() => {
              dispatch(AppActions.dashboardModalAction(false));
              navigatorPush({screenName: 'Exercises'});
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Menu;

const styles = {
  container: {
    backgroundColor: '#ffff',
    height: '100%',
    overflowY: 'scroll',
    paddingBottom: '100px',
  },
  profileHeader: {
    backgroundColor: COLORS.LIGHT_GREEN1,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px',
  },
  threeBox: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
  },
  profileImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '6%',
  },
  cancelContainer: {
    fontSize: 25,
    backgroundColor: '#ffff',
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
  },
  cancelIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: '10px',
    paddingTop: '5px',
  },
  userName: {fontSize: 20, fontWeight: 'bold'},
  buttonStyle: {
    marginTop: '25px',
    width: '170px',
  },
  weekBox: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutButtonContainer: {
    paddingLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
};
