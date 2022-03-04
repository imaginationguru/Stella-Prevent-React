import React, {useState, useEffect} from 'react';
import dashboardHeader from '../../assets/images/dashboardHeader/dashboardHeader.png';
import sleep from '../../assets/images/sleep/sleep.png';
import activity from '../../assets/images/sleep/activity.png';
import face from '../../assets/images/sleep/face.png';
import rightArrow from '../../assets/images/sleep/rightArrow.png';
import stellaGirl from '../../assets/images/stellaGirl/stellaGirl.png';
import successTick from '../../assets/images/successTick.svg';
import past_module from '../../assets/images/dashboardHeader/past_module.png';
import report from '../../assets/images/dashboardHeader/report.png';
import lock from '../../assets/images/lock.png';
import logoWhite from '../../assets/images/logoWhite.svg';

import GLOBALS from '../../constants';
import MasterLayout from '../../components/MasterLayout';
import Swal from 'sweetalert2';
import PopUp from '../../components/common/popUp';
import ProfileHeader from '../../components/common/profileHeader';
import Footer from '../../components/Footer';
import profile from '../../assets/images/profile.png';
import Loader from '../../components/Loader';
import {getItem} from '../../utils/AsyncUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../actions';
import {navigatorPush} from '../../config/navigationOptions.web';
import Modal from 'modal-react-native-web';
import EpdsScreener from '../../components/common/epdsScreener';
const {COLORS, ACTION_TYPE, FONTS} = GLOBALS;
const {DARK_GREEN, WHITE} = COLORS;
import {Dimensions} from 'react-native-web';
import Header from '../../components/Header';
import {epdsModalAction} from '../../actions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import {checkIfWeekCanAccess} from '../../helpers/common.web';
import {customAlert} from '../../helpers/commonAlerts.web';
const Dashboard = () => {
  const [click_week, setClickWeek] = useState(1);

  let firstName = getItem('firstName');
  let lastName = getItem('lastName');
  let epdsAssesment = getItem('epdsAssesment');
  let duration = getItem('duration');
  const dispatch = useDispatch();
  const {data = {}} = useSelector((state) => state);
  const {
    currentActiveCard = [],
    selectedWeek = 1,
    selectedCardId = '',
  } = useSelector((state) => state.moduleOne);
  const {isEPDSModalShow = true} = useSelector((state) => state.common);
  const {programData = []} = useSelector((state) => state.authReducer);
  const {isLoading} = useSelector((state) => state.common);
  const {loginData = []} = useSelector((state) => state.authReducer);
  const {trackerStatus = {}} = useSelector((state) => state.moduleOne);
  const {week, day} = currentActiveCard.length ? currentActiveCard[0] : {};

  const lengthToArray = (len = 0) => {
    let temp = [];
    if (len > 1) {
      for (let i = 0; i < len; +i++) {
        temp.push(i + 1);
      }
    }
    return temp;
  };

  useEffect(() => {
    //console.log('calling dashboard..');
    /**Once program is bind then get program details content */
    // dispatch(
    //   AppActions.bindProgram((cb) => {
    if (getItem('userId') != null) {
      dispatch(AppActions.getProgramById(false));
      dispatch(AppActions.getCurrentActiveCard(false));
    }
    // }),
    // );
  }, []);
  useEffect(() => {
    console.log(trackerStatus, 'trackerStatus....');
  }, [trackerStatus]);
  const TrackersUI = ({title, src, onClick, isComplete}) => {
    console.log(isComplete, 'isComplete....');

    return (
      <div
        style={styles.trackerWrap}
        onClick={onClick}
        className="tracker-option">
        <div className="tracker-desc">
          <div className="tracker-icon">
            <img src={src} />
          </div>
          <p style={styles.trackerTitle} className="tracker-text">
            {title}
          </p>
        </div>
        <div
          className="tracker-arrow"
          style={isComplete ? {width: '35px', height: '35px'} : {}}>
          {isComplete ? (
            <img style={{width: '100%', height: '100%'}} src={successTick} />
          ) : (
            <img src={rightArrow} style={{width: '100%', height: '100%'}} />
          )}
        </div>
      </div>
    );
  };

  const handleWeekClick = (item) => {
    let canWeekAccess = checkIfWeekCanAccess(item, loginData.planInfo);
    if (canWeekAccess) {
      dispatch({
        type: ACTION_TYPE.GET_TEMPLATE_DATA_SUCCESS,
        payload: [],
      });
      dispatch({
        type: GLOBALS.ACTION_TYPE.SELECTED_WEEK,
        payload: item,
      });
      dispatch(
        AppActions.getCurrentActiveCard(true, (res) => {
          if (item <= res.current_week || item == 1) {
            dispatch(AppActions.getWeek(item));
            dispatch({
              type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
              payload: item === week ? day : 1,
            });
            dispatch({
              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
              payload: '',
            });
            dispatch(AppActions.dashboardModalAction(false));
            setTimeout(() => {
              navigatorPush({
                screenName: 'DailyLearningWeeks',
                passProps: {weeksCount: item},
              });
            }, 1000);
          } else {
            customAlert(
              !checkIfWeekCanAccess(item, loginData?.planInfo)
                ? 'Please upgrade your plan to Premium to access content'
                : 'Content not unlocked',
              'error',
            );
          }
        }),
      );
    } else {
      customAlert(
        'Please upgrade your plan to Premium to access content',
        'error',
        {showCloseButton: true},
      );
    }
  };

  const onDailyLearningClick = () => {
    dispatch(AppActions.getTemplateData(currentActiveCard.current_week));

    dispatch({
      type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
      payload: currentActiveCard._id,
    });
    //   :
    // null};
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
      screenName: 'DailyLearningWeeks',
      passProps: {isFromDashboard: true},
    });
  };
  return (
    <div className="main-dashboard">
      <PopUp />
      <div className="site-logo">
        <img src={logoWhite} alt="" />
      </div>
      <ProfileHeader
        onProfileClick={() => navigatorPush({screenName: 'Profile'})}
        showProfileBtn={true}
        showEditIcon={false}
      />
      {isLoading && <Loader />}
      {/* <Header /> */}
      <div className="v-container m-tb-30">
        <div className="v-parent">
          <div className="v-cell-50">
            <div
              style={styles.dailylearnWrap}
              onClick={() => {
                onDailyLearningClick();
                //   debugger
                //  {selectedCardId == '' ?
                // dispatch(AppActions.getCurrentActiveCard());
              }}
              className="display-board">
              <div
                style={{
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  background:
                    'linear-gradient(180deg, rgba(214, 240, 235, 0) 0%, #FFFFFF 73.96%)',
                  paddingLeft: 30,
                  cursor: 'pointer',
                }}>
                <p style={{fontWeight: 'bold', fontSize: 25}}>
                  Today’s Daily Learning
                </p>
                <p>Click here to complete today’s learnings</p>
              </div>
            </div>
          </div>
          <div className="v-cell-50">
            <TrackersUI
              title=" How did you sleep last night?"
              src={sleep}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'SleepTracker'});
              }}
              isComplete={trackerStatus.sleepChecked}
            />
            <TrackersUI
              title="What activities have you done?"
              src={activity}
              onClick={() => {
                navigatorPush({screenName: 'ActivityTracker'});
              }}
              isComplete={trackerStatus.activityChecked}
            />
            <TrackersUI
              title=" What is your mood today?"
              src={face}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'MoodTracker'});
              }}
              isComplete={trackerStatus.moodChecked}
            />

            <TrackersUI
              title=" Reports"
              src={report}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'Report'});
              }}
            />
            <TrackersUI
              title="Past Modules"
              src={past_module}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({screenName: 'PastModule'});
              }}
            />
          </div>
        </div>
        {/* <div className="week-list">
          {lengthToArray(duration).map((item, index) => {
            return (
              <div className="week-item">
                <div
                  className="week-inside"
                  onClick={() => {
                    setClickWeek(item);
                    handleWeekClick(item);
                    return;
                  }}
                  style={{
                    cursor: 'pointer',
                    border:
                      selectedWeek === item
                        ? '#006F59'
                        : `2px solid ${DARK_GREEN}`,
                    borderRadius: 20,
                    justifyContent: 'center',
                    display: 'flex',
                    boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
                    background:
                      selectedWeek === item
                        ? 'linear-gradient(161.44deg, #4AA695 12.57%, #006F59 63.39%)'
                        : WHITE,
                  }}>
                  {index != 0 ? (
                    <>
                      {!checkIfWeekCanAccess(item, loginData?.planInfo) ? (
                        <img
                          src={`${lock}`}
                          style={{
                            justifyContent: 'center',
                            backgroundSize: 'center',
                            position: 'absolute',
                          }}
                        />
                      ) : null}
                    </>
                  ) : null}

                  <span
                    style={{
                      ...styles.weekTitle,
                      color: selectedWeek === item ? '#fff' : '#000',
                    }}>
                    Week <br />
                    <span style={styles.weekNumber}>{item}</span>
                  </span>
                </div>
              </div>
            );
          })}
          <div className="week-item">
            <div
              className="week-inside"
              style={{
                borderRadius: 20,
                justifyContent: 'center',
                display: 'flex',
                boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
                border: `2px solid ${DARK_GREEN}`,
              }}
              onClick={() => {
                customAlert('Content currently not available', 'error', {
                  showCloseButton: true,
                });
              }}>
              <p
                style={{
                  ...styles.weekNumber,
                  fontSize: 15,
                  margin: 0,
                }}>
                Exercises,
                <br /> Readings <br /> & Resources
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};
export default Dashboard;

const styles = {
  weekNumber: {
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontSize: 25,
    fontWeight: '700',
    cursor: 'pointer',
  },
  weekTitle: {paddingTop: 10, fontSize: 15, fontWeight: '700'},
  trackerWrap: {
    display: 'flex',
    //  justifyContent: 'space-around',
    borderRadius: 10,
    //height: 50,
    border: `2px solid ${DARK_GREEN}`,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    cursor: 'pointer',
    //boxShadow: '1px 3px 1px #D6F0EB',
    boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
  },
  trackerTitle: {
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 0,
    fontFamily: FONTS.SEMI_BOLD,
  },
  profileWrapper: {
    //height: '30%',
    border: `2px solid ${DARK_GREEN}`,
    width: '80%',
    //margin: '0 auto',
    position: 'absolute',
    top: 30,
    left: '10%',
    backgroundColor: '#ffffff',
    opacity: 0.8,
    borderRadius: 20,
    borderShadow: ' 0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
  },
  dailylearnWrap: {
    background:
      'linear-gradient(180deg, rgba(214, 240, 235, 0) 0%, #FFFFFF 73.96%) top right',
    backgroundImage: `url(${stellaGirl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '95%',
    borderRadius: 20,
    // marginTop: 30,
    marginBottom: 30,
    position: 'relative',
    // border: '1px solid blue',
    boxShadow: '1px 3px 1px #D6F0EB',
    cursor: 'pointer',
  },
};
