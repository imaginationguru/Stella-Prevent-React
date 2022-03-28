import React, { useEffect } from 'react';
import ModuleBox from './ModuleBox';
import user from '../assets/images/user.png';
import maternity from '../assets/images/maternity.svg';
import thoughts from '../assets/images/thoughts.svg';
import all from '../assets/images/all.svg';
import warnings from '../assets/images/warnings.svg';
import exercise from '../assets/images/exercise.svg';
import couple from '../assets/images/couple.svg';
import GLOBALS from '../constants';
import history from '../helpers/history';
import { TouchableOpacity } from 'react-native';
import { navigatorPush } from '../config/navigationOptions.web';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../actions';
import { translate as ts } from '../i18n/translate';
import { getItem } from '../utils/AsyncUtils';
import stellaLogo from '../assets/images/dashboardHeader/StellaLogo.png';
import dashboardHeader from '../assets/images/dashboardHeader/dashboardHeader.png';
import sleep from '../assets/images/sleep/sleep.png';
import dashboard from '../assets/images/sleep/dashboard.png';
import activity from '../assets/images/sleep/activity.png';
import daily from '../assets/images/sleep/daily.png';
import face from '../assets/images/sleep/face.png';
import logout from '../assets/images/logout.png';
import logoWhite from '../assets/images/logoWhite.png';
const { COLORS } = GLOBALS;
const { GRAY, PLAN_GRAY } = COLORS;
const Menu = (props) => {
  const { modalVisible, menuStyle } = props;
  const {
    currentActiveCard = [],
    selectedWeek = 1,
    selectedCardId = '',
  } = useSelector((state) => state.moduleOne);
  const dispatch = useDispatch();
  const current_screen = history.location.pathname;
  const TabUI = ({
    src,
    title,
    onClick,
    imgWrap,
    imgSize,
    img,
    txtColor = {},
  }) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: '5%',

          borderTop: `0.5px solid 
          ${'#BDBDBD'}`,
        }}
        onClick={onClick}>
        <div style={{ ...styles.imageWrap, ...imgWrap }}>
          <div style={{ ...styles.imgDiv, ...imgSize }}>
            <img src={src} style={{ ...styles.imgStyle, ...img }} />
          </div>
        </div>
        <p
          style={{
            display: 'flex',
            paddingLeft: '5%',
            fontWeight: 'bold',
            ...txtColor,
          }}>
          {title}
        </p>
      </div>
    );
  };

  const checkMenuDisable = (option) => {
    if (current_screen == '/SleepTracker' && option == 'sleep') {
      return true;
    } else if (
      (current_screen == '/ActivityTracker' ||
        current_screen == '/AddActivityTracker') &&
      option == 'activity'
    ) {
      return true;
    } else if (current_screen == '/MoodTracker' && option == 'mood') {
      return true;
    } else if (current_screen == '/Dashboard' && option == 'dashboard') {
      return true;
    } else if (current_screen == '/DailyLearningModule' && option == 'module') {
      return true;
    }
    return false;
  };
  return (
    <div
      style={{ ...styles.container, ...menuStyle }}
      onClick={() => dispatch(AppActions.dashboardModalAction(false))}>
      <div
        style={{
          width: 220,
          height: 400,
          backgroundColor: '#ffff',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          overflow: 'hidden',
          boxShadow: '1px 1px 1px 1px #9E9E9E',
        }}
        onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            padding: 10,
          }}>
          <div style={{ width: '70%', margin: '0 auto' }}>
            <img src={logoWhite} style={{ width: '100%', height: '100%' }} />
          </div>

          <div
            style={{
              marginLeft: 15,
              marginRight: 15,
              marginTop: 15,
            }}>
            <p style={{ fontWeight: 'bold' }}>Daily Playlist</p>

            <TabUI
              src={sleep}
              title={'Sleep Tracker'}
              imgWrap={{ backgroundColor: '#FFD789' }}
              onClick={(e) => {
                e.stopPropagation();
                if (!checkMenuDisable('sleep')) {
                  dispatch(AppActions.dashboardModalAction(false));
                  navigatorPush({ screenName: 'SleepTracker' });
                }
              }}
              txtColor={checkMenuDisable('sleep') ? { color: PLAN_GRAY } : {}}
            />
            <TabUI
              src={daily}
              title={'Daily Learning'}
              imgWrap={{ backgroundColor: '#6FCF97' }}
              onClick={() => {
                if (!checkMenuDisable('module')) {
                  dispatch(AppActions.dashboardModalAction(false));
                  dispatch(
                    AppActions.getTemplateData(currentActiveCard.current_week),
                  );

                  dispatch({
                    type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                    payload: currentActiveCard._id,
                  });
                  dispatch({
                    type: GLOBALS.ACTION_TYPE.GET_SELECTED_WEEK,
                    payload: currentActiveCard.current_week,
                  });
                  dispatch({
                    type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                    payload: currentActiveCard.current_day,
                  });
                  dispatch({
                    type: GLOBALS.ACTION_TYPE.SELECTED_WEEK,
                    payload: currentActiveCard.current_week,
                  });
                  navigatorPush({
                    screenName: 'DailyLearningModule',
                    passProps: { isFromDashboard: true },
                  });
                }
              }}
              txtColor={checkMenuDisable('module') ? { color: PLAN_GRAY } : {}}
            />
            <TabUI
              src={face}
              title={'Mood Check In'}
              imgWrap={{ backgroundColor: '#FFCEFF' }}
              imgSize={{ width: 15, height: 13 }}
              img={{ marginLeft: '45%' }}
              onClick={() => {
                if (!checkMenuDisable('mood')) {
                  dispatch(AppActions.dashboardModalAction(false));
                  navigatorPush({ screenName: 'MoodTracker' });
                }
              }}
              txtColor={checkMenuDisable('mood') ? { color: PLAN_GRAY } : {}}
            />
            <TabUI
              src={activity}
              title={'Activity Tracker'}
              imgWrap={{ backgroundColor: '#87DEFF' }}
              imgSize={{ width: 13, height: 10 }}
              img={{ marginLeft: '59%' }}
              onClick={() => {
                if (!checkMenuDisable('activity')) {
                  dispatch(AppActions.dashboardModalAction(false));
                  navigatorPush({ screenName: 'ActivityTracker' });
                }
              }}
              txtColor={checkMenuDisable('activity') ? { color: PLAN_GRAY } : {}}
            />
            <TabUI
              src={dashboard}
              title={'Dashboard'}
              imgWrap={{ backgroundColor: '#DADADA' }}
              imgSize={{ width: 15, height: 13 }}
              img={{ marginLeft: '59%' }}
              onClick={() => {
                if (!checkMenuDisable('dashboard')) {
                  dispatch(AppActions.dashboardModalAction(false));
                  navigatorPush({ screenName: 'Dashboard' });
                }
              }}
              txtColor={checkMenuDisable('dashboard') ? { color: PLAN_GRAY } : {}}
            />
            <TabUI
              src={logout}
              title={'Logout'}
              imgWrap={{ backgroundColor: '#D85454' }}
              imgSize={{ width: 13, height: 10 }}
              img={{ marginLeft: '70%' }}
              onClick={() => {
                dispatch(AppActions.logout());
                dispatch(AppActions.dashboardModalAction(false));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

const styles = {
  container: {

    height: '100vh',
    width: '100%',

    justifyContent: 'end',
    display: 'flex',
  },
  imageWrap: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  imgDiv: {
    width: 20,
    height: 20,
  },
  imgStyle: {
    marginLeft: '24%',
    marginTop: '20%',
  },
};
