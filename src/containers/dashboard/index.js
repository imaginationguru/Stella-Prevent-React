import {useEffect} from 'react';
import sleep from '@assets/images/sleep/sleep.png';
import activity from '@assets/images/sleep/activity.png';
import face from '@assets/images/sleep/face.png';
import rightArrow from '@assets/images/sleep/rightArrow.png';
import stellaGirlGif from '@assets/images/stellaGirlGif.gif';
import successTick from '@assets/images/successTick.svg';
import past_module from '@assets/images/dashboardHeader/past_module.png';
import report from '@assets/images/dashboardHeader/report.png';
import logoWhite from '@assets/images/logoWhite.svg';
import GLOBALS from '@constants';
import PopUp from '@components/common/popUp';
import ProfileHeader from '@components/common/profileHeader';
import Footer from '@components/Footer';
import Loader from '@components/Loader';
import {getItem} from '@utils/AsyncUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import {navigatorPush} from '@config/navigationOptions.web';
import {checkIfWeekCanAccess} from '@helpers/common.web';
import {customAlert} from '@helpers/commonAlerts.web';
import moment from 'moment';
const {COLORS, ACTION_TYPE, FONTS} = GLOBALS;
const {DARK_GREEN} = COLORS;

const Dashboard = () => {
  const dispatch = useDispatch();

  const {currentActiveCard = []} = useSelector((state) => state.moduleOne);
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
    if (getItem('userId') != null) {
      dispatch(AppActions.getProgramById(false));
      dispatch(AppActions.getCurrentActiveCard(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [trackerStatus]);
  const TrackersUI = ({title, src, onClick, isComplete}) => {
    return (
      <div
        style={styles().trackerWrap}
        onClick={onClick}
        className="tracker-option">
        <div className="tracker-desc">
          <div className="tracker-icon">
            <img src={src} />
          </div>
          <p style={styles().trackerTitle} className="tracker-text">
            {title}
          </p>
        </div>
        <div
          className="tracker-arrow"
          style={isComplete ? {width: '30px', height: '30px'} : {}}>
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
                screenName: 'DailyLearningModule',
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
              style={styles().dailylearnWrap}
              onClick={() => {
                onDailyLearningClick();
              }}
              className="display-board">
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  borderRadius: 8,
                  paddingLeft: 30,
                  cursor: 'pointer',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: COLORS.WHITE,
                }}>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: FONTS.SEMI_BOLD,
                    marginBottom: 0,
                    lineHeight: '23px',
                  }}>
                  Today’s Daily Learning
                </p>
                <p
                  style={{
                    lineHeight: '17px',
                    fontSize: 14,
                    fontFamily: FONTS.REGULAR,
                    margin: 0,
                  }}>
                  Click here to complete today’s learnings
                </p>
              </div>
            </div>
          </div>
          <div className="v-cell-50">
            <TrackersUI
              title=" How did you sleep last night?"
              src={sleep}
              onClick={() => {
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({
                  screenName: 'SleepTracker',
                });
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
                window.sessionStorage.removeItem('value');
                window.sessionStorage.removeItem('day');
                window.sessionStorage.removeItem('week');
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
                      ...styles().weekTitle,
                      color: selectedWeek === item ? '#fff' : '#000',
                    }}>
                    Week <br />
                    <span style={styles().weekNumber}>{item}</span>
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
                  ...styles().weekNumber,
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

export const styles = () => {
  return {
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
      borderRadius: 10,
      border: `2px solid ${DARK_GREEN}`,
      paddingTop: 15,
      paddingBottom: 15,
      marginBottom: 15,
      cursor: 'pointer',
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
      border: `2px solid ${DARK_GREEN}`,
      width: '80%',
      position: 'absolute',
      top: 30,
      left: '10%',
      boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
      background:
        'linear-gradient(161.44deg, #CEE6E1 55.96%, #A1CDC4 78.08%, #97BECE 95.87%)',
      opacity: 0.8,
      borderRadius: 20,
      borderShadow: ' 0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
    },
    dailylearnWrap: {
      background:
        'linear-gradient(180deg, rgba(214, 240, 235, 0) 0%, #FFFFFF 73.96%) top right',
      backgroundImage: `url(${stellaGirlGif})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100%',
      height: '95%',
      borderRadius: 20,
      marginBottom: 30,
      position: 'relative',
      boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
      cursor: 'pointer',
      backgroundPosition: '50%',
    },
  };
};
