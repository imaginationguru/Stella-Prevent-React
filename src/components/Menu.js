import React, {useEffect} from 'react';
import ModuleBox from './ModuleBox';
import user from '../assets/images/user.png';
import maternity from '../assets/images/maternity.svg';
import thoughts from '../assets/images/thoughts.svg';
import all from '../assets/images/all.svg';
import warnings from '../assets/images/warnings.svg';
import exercise from '../assets/images/exercise.svg';
import couple from '../assets/images/couple.svg';
import GLOBALS from '../constants';
import {TouchableOpacity} from 'react-native';
import {navigatorPush} from '../config/navigationOptions.web';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../actions';
import {translate as ts} from '../i18n/translate';
import {getItem} from '../utils/AsyncUtils';
import stellaLogo from '../assets/images/dashboardHeader/StellaLogo.png';
import dashboardHeader from '../assets/images/dashboardHeader/dashboardHeader.png';
import sleep from '../assets/images/sleep/sleep.png';
import dashboard from '../assets/images/sleep/dashboard.png';
import activity from '../assets/images/sleep/activity.png';
import daily from '../assets/images/sleep/daily.png';
import face from '../assets/images/sleep/face.png';
const {COLORS} = GLOBALS;
const {GRAY} = COLORS;
const Menu = (props) => {
  const {modalVisible, menuStyle} = props;

  const dispatch = useDispatch();

  const TabUI = ({src, title, onClick, imgWrap, imgSize, img}) => {
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
        <div style={{...styles.imageWrap, ...imgWrap}}>
          <div style={{...styles.imgDiv, ...imgSize}}>
            <img src={src} style={{...styles.imgStyle, ...img}} />
          </div>
        </div>
        <p
          style={{
            display: 'flex',
            paddingLeft: '5%',
            fontWeight: 'bold',
          }}>
          {title}
        </p>
      </div>
    );
  };
  return (
    <div
      style={{...styles.container, ...menuStyle}}
      onClick={() => dispatch(AppActions.dashboardModalAction(false))}>
      <div
        style={{
          width: 220,
          height: 380,
          // border: '1px solid blue',
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
          <div style={{width: '70%', margin: '0 auto'}}>
            <img src={stellaLogo} style={{width: '100%', height: '100%'}} />
          </div>

          <div
            style={{
              marginLeft: 15,
              marginRight: 15,
              marginTop: 15,
            }}>
            <p style={{fontWeight: 'bold'}}>Daily Playlist</p>

            <TabUI
              src={sleep}
              title={'Sleep Tracker'}
              imgWrap={{backgroundColor: '#FFD789'}}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'SleepTracker'});
              }}
            />
            <TabUI
              src={daily}
              title={'Daily Learning'}
              imgWrap={{backgroundColor: '#6FCF97'}}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'DailyLearningWeeks'});
              }}
            />
            <TabUI
              src={face}
              title={'Mood Check In'}
              imgWrap={{backgroundColor: '#FFCEFF'}}
              imgSize={{width: 15, height: 13}}
              img={{marginLeft: '45%'}}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'MoodTracker'});
              }}
            />
            <TabUI
              src={activity}
              title={'Activity Tracker'}
              imgWrap={{backgroundColor: '#87DEFF'}}
              imgSize={{width: 13, height: 10}}
              img={{marginLeft: '59%'}}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'ActivityTracker'});
              }}
            />
            <TabUI
              src={dashboard}
              title={'Dashboard'}
              imgWrap={{backgroundColor: '#DADADA'}}
              imgSize={{width: 15, height: 13}}
              img={{marginLeft: '59%'}}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'Dashboard'});
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
    // overflowY: 'scroll',

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
