import React, { useState, useEffect } from 'react';
import dashboardHeader from '../../assets/images/dashboardHeader/dashboardHeader.png';
import sleep from '../../assets/images/sleep/sleep.png';
import activity from '../../assets/images/sleep/activity.png';
import face from '../../assets/images/sleep/face.png';
import rightArrow from '../../assets/images/sleep/rightArrow.png';
import stellaGirl from '../../assets/images/stellaGirl/stellaGirl.png';
import lock from '../../assets/images/lock.png';

import GLOBALS from '../../constants';
import MasterLayout from '../../components/MasterLayout';
import Swal from 'sweetalert2';
import PopUp from '../../components/common/popUp';
import ProfileHeader from '../../components/common/profileHeader';
import Footer from '../../components/Footer';
import profile from '../../assets/images/profile.png';
import Loader from '../../components/Loader';
import { getItem } from '../../utils/AsyncUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../actions';
import { navigatorPush } from '../../config/navigationOptions.web';
import Modal from 'modal-react-native-web';
import EpdsScreener from '../../components/common/epdsScreener';
const { COLORS, ACTION_TYPE } = GLOBALS;
const { DARK_GREEN, WHITE } = COLORS;
import { Dimensions } from 'react-native-web';
import Header from '../../components/Header';
import { epdsModalAction } from '../../actions';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { checkIfWeekCanAccess } from '../../helpers/common.web';
import { customAlert } from '../../helpers/commonAlerts.web';
const Dashboard = () => {
  const [showModal, setModalVisibility] = useState(false);
  const [click_week, setClickWeek] = useState(1);

  let firstName = getItem('firstName');
  let lastName = getItem('lastName');
  let epdsAssesment = getItem('epdsAssesment');
  let duration = getItem('duration');
  const dispatch = useDispatch();
  const { data = {} } = useSelector((state) => state);
  const { currentActiveCard = [], selectedWeek = 1,selectedCardId = '' } = useSelector(
    (state) => state.moduleOne,
  );
  const { isEPDSModalShow = true } = useSelector((state) => state.common);
  //setModalVisibility(isEPDSModalShow);
  const { programData = [] } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.common);
  const { loginData = [] } = useSelector((state) => state.authReducer);
  const { week, day } = currentActiveCard.length ? currentActiveCard[0] : {};
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
    console.log('login data dashboard', loginData);
    dispatch(AppActions.getPlans());
    dispatch(AppActions.getProgramById());
    if(currentActiveCard.length ==0){
      dispatch(AppActions.getCurrentActiveCard());
    }
    dispatch(
      AppActions.getUserQuestionInfo({
        stellaPrevent: true,
        user_id: getItem('userId'),
      }),
    );
  }, []);
  const TrackersUI = ({ title, src, onClick }) => {
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
        <div className="tracker-arrow">
          <img src={rightArrow} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    );
  };
  const saveEPDSAssememt = (all_question) => {
    setModalVisibility(false);
    console.log('savinggg');
    dispatch(
      AppActions.savePatientAssessment(
        all_question,
        'Thank you for submitting...',
        all_question[0].assessment_id,
        true,
        (res) => {
          navigatorPush({
            screenName: 'DailyLearningWeeks',
            passProps: 1,
          });
          /* 
          if (click_week == 1) {
            navigatorPush({
              screenName: 'DailyLearningWeeks',
              passProps: 1,
            });
          } else {
            customAlert('Content not unlocked.', 'error');
          }
          */
        },
      ),
    );
  };

  const checkFirstEPDSFilled = () => {
    if (loginData?.epds_assesment == true) return true;
    else {
      setModalVisibility(true);
      return false;
    }
  };

  const handleWeekClick = (item) => {
    let canWeekAccess = checkIfWeekCanAccess(item, loginData.planInfo);
    if (canWeekAccess) {
      setModalVisibility(false);
      dispatch({
        type: ACTION_TYPE.GET_TEMPLATE_DATA_SUCCESS,
        payload: [],
      });
      dispatch({
        type: GLOBALS.ACTION_TYPE.SELECTED_WEEK,
        payload: item,
      });
      dispatch(
        AppActions.getCurrentActiveCard((res) => {
          if (item <= res.current_week || item ==1) {
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
               passProps: { weeksCount: item },
              });
            }, 1000);
        
          } else {
            customAlert(!checkIfWeekCanAccess(item, loginData?.planInfo) ? " You'll have to upgrade to a paid plan " : 'Content not unlocked', 'error');
          }
        }),
      );
    } else {
      customAlert(
        'Please upgrade your plan to Premium to access content',
        'error',
      );
    }
    /* 
     if (canWeekAccess) {
      if (loginData.epds_assesment === false) {
        setModalVisibility(true);
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
      } else {
        setModalVisibility(false);
        dispatch(
          AppActions.getCurrentActiveCard((res) => {
            console.log(item, res.current_week, 'compar,', res);
            console.log(item <= res.current_week, 'Comparis');
            if (item <= res.current_week) {
              dispatch(AppActions.getWeek(item));
              dispatch({
                type: 'GET_SELECTED_WEEK',
                payload: item,
              });
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
            } else {
              customAlert('Content not unlocked.', 'error');
            }
          }),
        );
      }
    } else {
      customAlert(
        'Please upgrade your plan to Premium to access content',
        'error',
      );
    }
     */
  };
  return (
    <div>
      <PopUp />
      <ProfileHeader
        onProfileClick={() => navigatorPush({ screenName: 'Profile' })}
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
                {selectedCardId == '' ? 
                dispatch({
                  type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                  payload: currentActiveCard.card_id,
                })
                : 
              null};
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
                  passProps: { isFromDashboard: true },
                });
                // navigatorPush({ screenName: 'DailyLearningWeeks',passProps:{isFromDashboard:true}})
                // if (checkFirstEPDSFilled()) {

                // }
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
                <p style={{ fontWeight: 'bold', fontSize: 25 }}>
                  Today’s Daily Learning
                </p>
                <p>
                  Learn something new today and take it with <br />
                  you wherever you go
                </p>
              </div>
            </div>
          </div>
          <div className="v-cell-50">
            <TrackersUI
              title=" How did you sleep last night?"
              src={sleep}
              onClick={() => {
                // navigatorPush({screenName: 'SleepTracker'});
                // if (checkFirstEPDSFilled()) {

                // }
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({ screenName: 'SleepTracker' });
              }}
            />
            <TrackersUI
              title="What activities have you done?"
              src={activity}
              onClick={() => {
                navigatorPush({ screenName: 'ActivityTracker' });
                // if (checkFirstEPDSFilled()) {
                //   dispatch(AppActions.dashboardModalAction(false));
                //   navigatorPush({screenName: 'ActivityTracker'});
                // }
              }}
            />
            <TrackersUI
              title=" What is your mood today?"
              src={face}
              onClick={() => {
                console.log(checkIfWeekCanAccess(2, loginData.planInfo));
                //  return;
                // navigatorPush({screenName: 'MoodTracker'});
                // if (checkFirstEPDSFilled()) {

                // }
                dispatch(AppActions.dashboardModalAction(false));
                navigatorPush({ screenName: 'MoodTracker' });
              }}
            />
          </div>
        </div>
        <div className="week-list">
          {lengthToArray(duration).map((item, index) => {
            console.log('week item??????', item, selectedWeek);
            return (
              <div className="week-item">

                <div
                className="week-inside"
                  onClick={() => {
                    setClickWeek(item);
                    handleWeekClick(item);
                    return;

                  }}
                  // className="col-sm-2 col-md-2"
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
                    {index !=0 ? 
                    <>
                    {!checkIfWeekCanAccess(item, loginData?.planInfo) ? 
                       <img src= {`${lock}`}
                     style={{
                      justifyContent: 'center',
                      backgroundSize: 'center',
                      position: 'absolute',
                  
                   }}/>
                  : null}
                   </>
                  : null}
                  
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
              // className="col-sm-2 col-md-2"
              style={{
                borderRadius: 20,
                justifyContent: 'center',
                display: 'flex',
                boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
                border: `2px solid ${DARK_GREEN}`,
              }}
              onClick={() => {
                // alert('Content not unlocked');
                Swal.fire({
                  text: !checkIfWeekCanAccess(7, loginData?.planInfo) ? " You'll have to upgrade to a paid plan " : 'Content not unlocked',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  confirmButtonColor: DARK_GREEN,
                  width: DEVICE_WIDTH > 1000 ? '25vw' : '60vw',
                });
                // dispatch(AppActions.dashboardModalAction(false));
                // navigatorPush({screenName: 'Exercises'});
              }}>
              <p
                style={{
                  ...styles.weekNumber,
                  fontSize: 15,
                  margin: 0,
                }}>
                Exercises,
                <br /> Readings <br /> & Resourcessdf
              </p>
              {!checkIfWeekCanAccess(5, loginData?.planInfo) ? 
                       <img src= {`${lock}`}
                     style={{
                      justifyContent: 'center',
                      backgroundSize: 'center',
                      position: 'absolute',
                  
                   }}/>
                  : null}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Modal
        animationType="slide"
        transparent={true}
        //visible={isEPDSModalShow}
        visible={showModal}
        onDismiss={() => {
          //  setModalVisibility(false)
          console.log('Modal has been closed.');
        }}>
        <EpdsScreener
          onClose={() => {
            setModalVisibility(false);
          }}
          saveEPDSAssememt={(data) => saveEPDSAssememt(data)}
          currentIndex={-1}
        // showModal={setModalVisibility}
        // onItemSelection={(type, data) => { navigator(type, data) }}
        //  data={list}
        // title={popUpTitle}
        />
      </Modal>
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
  weekTitle: { paddingTop: 10, fontSize: 15, fontWeight: '700' },
  trackerWrap: {
    display: 'flex',
    //  justifyContent: 'space-around',
    borderRadius: 10,
    //height: 50,
    border: `2px solid ${DARK_GREEN}`,
    paddingTop: 33,
    paddingBottom: 33,
    marginBottom: 18,
    cursor: 'pointer',
    //boxShadow: '1px 3px 1px #D6F0EB',
    boxShadow: '0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
  },
  trackerTitle: {
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 0,
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
    ///  border: '1px solid blue',
    boxShadow: '1px 3px 1px #D6F0EB',
  },
 
};
