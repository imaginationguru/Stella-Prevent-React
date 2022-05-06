import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from 'react-native';
import MasterLayout from '@components/MasterLayout';
import Footer from '@components/Footer';
import GLOBALS from '@constants';
import * as AppActions from '@actions';
import {SubHeader} from '@containers/dailyLearningWeeks/Navbar';
import GenerateUI from '@containers/dailyLearningWeeks/GenerateUI';
import BackToDashboard from '@components/common/backToDashboard';
import {canProceedNextDay} from '@helpers/common.web';
import {customAlert} from '@helpers/commonAlerts.web';
import {navigatorPush} from '@config/navigationOptions.web';
import BackBtn from '@components/common/backbtn';
import moment from 'moment';
import {storeItem, getItem, removeItem} from '../../utils/AsyncUtils';
import {goToPastModule} from '../../config/navigationOptions.web';
const {COLORS, STRINGS} = GLOBALS;

const DailyLearningWeeks = (props) => {
  let isFromDashboard = props.location?.state?.isFromDashboard;
  let backTitle = props.location?.state?.backTitle;
  const dispatch = useDispatch();
  const {userAssessmentData = [], userRatingData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const {
    asessmentData = {},
    assessmentData = {},
    userQuestion = [],
  } = useSelector((state) => state.moduleOne);
  const {
    templateData = [],
    currentActiveCard = [],
    selectedCardId = '',
  } = useSelector((state) => state.moduleOne);
  let {
    selectedDay,
    selectedWeek,
    getScreenStartTime = '',
    currentCardData = '',
  } = useSelector((state) => state.moduleOne);
  let [weeksCount, setWeeksCount] = useState(
    props.location?.state?.isFromDashboard
      ? currentActiveCard.current_week
      : props.location?.state?.weeksCount
      ? props.location?.state?.weeksCount
      : 1,
  );
  const {loginData = []} = useSelector((state) => state.authReducer);
  const {week, day} = currentActiveCard.length ? currentActiveCard[0] : {};
  const [currentData, setCurrentData] = useState({});
  const [isScrollerLoad, setScrollerLoad] = useState(false);
  const [nextData, setNextData] = useState({});
  const [prevData, setPrevData] = useState({});
  const [prevCardDataArray, setPrevDataArray] = useState([]);
  const [selectedCardData, setSelectedCardData] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    dispatch(AppActions.getScreenStartTime(moment().format()));
    storeItem(STRINGS.SCREEN_START_TIME, moment().format());
  }, [dispatch]);
  useEffect(() => {
    dispatch(AppActions.setCurrentData(currentData));
  }, [dispatch, currentData]);
  console.log('get screen start time daily learning', getScreenStartTime);

  useEffect(() => {
    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
      history.go(1);
    };
    AppState.addEventListener('change', _handleAppStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  useEffect(() => {
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  });

  const _handleAppStateChange = (nextAppState) => {
    console.log('_handleAppStateChange_fun');
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('PRIYANKA_NEXT_APP_STATE_IF=>', nextAppState);
      dispatch(AppActions.getScreenStartTime(moment().format()));
      storeItem(STRINGS.SCREEN_START_TIME, moment().format());
    } else {
      console.log('PRIYANKA_NEXT_APP_STATE_ELSE=>', nextAppState);
      addTimeTrackerAPICall();
      addCardTimeTrackerAPICall();
    }
    setAppState(nextAppState);
  };
  const addTimeTrackerAPICall = () => {
    let postData = {
      userId: getItem('userId'),
      group: STRINGS.DAILY_LEARNING,
      screen: STRINGS.DAILY_LEARNING_MODULE,
      startTime: getScreenStartTime,
      endTime: moment().format(),
      date: moment().format(),
    };
    dispatch(AppActions.addTimeTracker(postData));
  };
  const addCardTimeTrackerAPICall = () => {
    console.log('PRIYANKA_currentData', currentData)
    let postData = {
      userId: getItem('userId'),
      group: STRINGS.DAILY_LEARNING,
      screen: STRINGS.CARDS,
      startTime: getScreenStartTime,
      endTime: moment().format(),
      date: moment().format(),
      week: currentData.week,
      day: currentData.day,
      card_number: currentData.card_number,
    };
    dispatch(AppActions.addTimeTracker(postData));
  };
  const addTimeTrackerAPICallOnPast = () => {
    let postData = {
      userId: getItem('userId'),
      group: STRINGS.ENGAGEMENT,
      screen: STRINGS.PAST_MODULES,
      startTime: getScreenStartTime,
      endTime: moment().format(),
      date: moment().format(),
    };
    dispatch(AppActions.addTimeTracker(postData));
  };
  useEffect(() => {
    applicableCards(selectedCardId);
    if (isFromDashboard) {
      applicableCards(selectedCardId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFromDashboard]);

  useEffect(() => {
    console.log(currentData, 'currentData........');
    if (currentData._id) {
      const {card: {assessment_id} = {}} = currentData;
      if (assessment_id !== null) {
        dispatch(
          AppActions.getAssessmentData(
            assessment_id,
            currentData._id,
            currentData.card.template_data[0].template_number == 6 ||
              currentData.card.template_data[0].template_number == 30 ||
              currentData.card.template_data[0].template_number == 34
              ? currentData._id
              : null,
          ),
        );
      }
    }
  }, [currentData, currentData._id, dispatch]);

  // api response handling
  useEffect(() => {
    if (templateData.length) {
      if (mData.length) {
        let data = {};
        data = data = mData.find((item, i) => {
          if (selectedDay && selectedCardId) {
            return item.day === selectedDay && item._id === selectedCardId;
          } else {
            return item.day === selectedDay;
          }
        });
        if (data && data._id) {
          setScrollerLoad(false);
          cardDataHandler(data, false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCardId, selectedDay, selectedWeek, templateData, dispatch]);

  useEffect(() => {
    if (templateData.length == 0) {
      dispatch(AppActions.getCurrentActiveCard());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }, []);

  const templateDataMapper = (data = []) => {
    let temp = [];
    if (data.length) {
      data.forEach((item) => {
        const {cards = []} = item;
        if (cards.length) {
          temp.push(
            ...cards.sort(
              (a, b) => (a.card.card_number > b.card.card_number && 1) || -1,
            ),
          );
        }
      });
    }

    return temp;
  };
  const mData = templateData.length ? templateDataMapper(templateData) : [];

  const lastDay = mData.length
    ? Math.max(...mData.map((item) => item.day))
    : null;
  const isLastDay = lastDay ? lastDay === selectedDay : false;
  const firstDay = mData.length
    ? Math.min(...mData.map((item) => item.day))
    : null;
  const isFirstDay = firstDay ? firstDay === selectedDay : false;
  const cIds = mData
    .filter((item) => item.week === selectedWeek && item.day === selectedDay)
    .map((item) => item._id);

  const cardDataHandler = (data, clear_assesment = true) => {
    if (isScrollerLoad) {
      window.scrollTo(0, 200);
      setScrollerLoad(false);
    }
    if (clear_assesment) {
      dispatch({
        type: GLOBALS.ACTION_TYPE.GET_USER_ASSESSMENT_SUCCESS,
        payload: [],
      });
    }

    setCurrentData(data);
    storeItem(STRINGS.CARD_DATA, data);
    setPrevDataArray(data);

    if (cIds.length) {
      const currentIndex = cIds.findIndex((item) => item === data._id);
      let nextId = '';
      let prevId = '';
      if (currentIndex > -1) {
        nextId = cIds.find((item, index) => index === currentIndex + 1);
        prevId = cIds.find((item, index) => index === currentIndex - 1);

        if (nextId) {
          setNextData(
            mData.find(
              (item) => item.day === selectedDay && item._id === nextId,
            ),
          );
        } else {
          setNextData({});
        }
        if (prevId) {
          setPrevData(
            mData.find(
              (item) => item.day === selectedDay && item._id === prevId,
            ),
          );
        } else {
          setPrevData({});
        }
      }
    }
  };
  const applicableDay = () => {
    let temp = [];
    if (mData.length) {
      const daysArr = [...new Set(mData.map((item) => item.day))];
      daysArr.forEach((item) => {
        temp.push({
          day: item,
          isDisabled: mData.some(
            (val) => val.day === item && val.is_disabled === true,
          ),
        });
      });
    }
    return temp;
  };
  const cardsColorDisable = () => {
    let temp = [];
    if (mData.length) {
      const idsArr = mData
        .filter((val) => val.day === selectedDay)
        .map((item) => item._id);
      idsArr.forEach((item) => {
        temp.push({
          card: item,
          isCompleted: mData.some(
            (val) =>
              val.day === selectedDay &&
              val._id === item &&
              val.is_completed === true,
          ),
          isRead: mData.some(
            (val) =>
              val.day === selectedDay &&
              val._id === item &&
              val.is_read === false,
          ),
          isDisabled: mData.some(
            (val) =>
              val.day === selectedDay &&
              val._id === item &&
              val.is_disabled === true,
          ),
        });
      });
    }
    return temp;
  };

  const applicableCards = (id = '', cardIndex) => {
    let temp = cardsColorDisable();
    var selectedObject = temp.filter((el) => {
      return el.card === id;
    });
    return selectedObject.length > 0 ? selectedObject[0].isCompleted : false;
  };

  const completeCardAPI = (nextday = '') => {
    if (currentData._id) {
      let completeParams = {
        id: currentData._id,
        user_id: currentData.user_id,
        is_last_day: !nextData._id,
        is_last_week: isLastDay,
        week: currentData.week,
        day: currentData.day,
      };

      // card tracking on next click
      let cardTimeTrackingData = {
        userId: currentData.user_id,
        group: STRINGS.DAILY_LEARNING,
        screen: STRINGS.CARDS,
        startTime: getScreenStartTime,
        endTime: moment().format(),
        date: moment().format(),
        week: currentData.week,
        day: currentData.day,
        card_number: currentData.card_number,
      };
      storeItem(STRINGS.SCREEN_START_TIME, moment().format());
      dispatch(AppActions.getScreenStartTime(moment().format()));
      dispatch(AppActions.addTimeTracker(cardTimeTrackingData));
      dispatch(
        AppActions.markCompleteCard(completeParams, selectedWeek, nextday),
      );
    }
  };

  const _onPressUpgrade = () => {
    navigatorPush({
      screenName: 'Subscription',
      passProps: {
        currentPlan: loginData?.planInfo,
        fromScreenDailyLearing: true,
      },
    });
  };

  const onNextDayClick = () => {
    completeCardAPI(true);
    if (loginData?.planInfo?.price == 0 && currentData.day === 2 && lastDay) {
      customAlert(
        "You've reached your free content limit. Please upgrade your plan.",
        'error',
        {showCloseButton: true},
        'Upgrade',
        _onPressUpgrade,
      );
      return;
    }
    let current_Index = mData.findIndex((val) => val._id === currentData._id);

    /**Check if next day is unlocked */
    dispatch(
      AppActions.checkActiveCard((res) => {
        let canProceed = canProceedNextDay(
          selectedWeek,
          selectedDay + 1,
          res.current_week,
          res.current_day,
        );

        if (canProceed) {
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_USER_ASSESSMENT_SUCCESS,
            payload: [],
          });
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
            payload: selectedDay + 1,
          });
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
            payload: mData[current_Index + 1]._id,
          });
          completeCardAPI(true);
          setScrollerLoad(true);
          cardDataHandler(mData[current_Index + 1]);
        } else {
          customAlert('Content will unlock tomorrow', 'error');
        }
      }),
    );
  };
  return (
    <div className="m-main">
      <MasterLayout>
        {backTitle ? (
          <BackBtn
            title={backTitle}
            onPress={() => {
              addTimeTrackerAPICallOnPast();
              //Cards time tracking api calling on back click
              let cardTimeTrackingData = {
                userId: currentData.user_id,
                group: STRINGS.DAILY_LEARNING,
                screen: STRINGS.CARDS,
                startTime: getScreenStartTime,
                endTime: moment().format(),
                date: moment().format(),
                week: currentData.week,
                day: currentData.day,
                card_number: currentData.card_number,
              };
              // dispatch(AppActions.getScreenStartTime(moment().format()));
              dispatch(AppActions.addTimeTracker(cardTimeTrackingData));
              removeItem(STRINGS.CARD_DATA)
              removeItem(STRINGS.SCREEN_START_TIME)
              goToPastModule();
            }}
          />
        ) : (
          <BackToDashboard
            onBack={() => {
              //Cards time tracking api calling on back click
              let cardTimeTrackingData = {
                userId: currentData.user_id,
                group: STRINGS.DAILY_LEARNING,
                screen: STRINGS.CARDS,
                startTime: getScreenStartTime,
                endTime: moment().format(),
                date: moment().format(),
                week: currentData.week,
                day: currentData.day,
                card_number: currentData.card_number,
              };
              // dispatch(AppActions.getScreenStartTime(moment().format()));
              removeItem(STRINGS.CARD_DATA)
              removeItem(STRINGS.SCREEN_START_TIME)
              dispatch(AppActions.addTimeTracker(cardTimeTrackingData));
              addTimeTrackerAPICall();
            }}
          />
        )}

        <div className="dashboard-body">
          <div className="container">
            <div className="dashboard-body-inner">
              <div className="n-content">
                {/* ***********************************Navbar Start********************** */}
                <div>
                  <p style={{color: COLORS.GREEN_TEXT, fontWeight: 'bold'}}>
                    Home /
                    <span style={{color: COLORS.GRAY1, fontWeight: 'bold'}}>
                      {''}
                      Module{' '}
                      {/* {weeksCount === undefined
                        ? currentActiveCard.current_week
                        : weeksCount}{' '} */}
                      {selectedWeek} Day {selectedDay}
                    </span>
                  </p>
                </div>

                {templateData.length ? (
                  <>
                    <SubHeader
                      data={templateData.filter(
                        (item) => item.day === selectedDay,
                      )}
                      isDisabled={cardsColorDisable()}
                      onCardChange={(id, cardData, cardIndex) => {
                        const isClickable = id
                          ? applicableCards(id, cardIndex)
                          : false;
                        //set current data here
                        setSelectedCardData(cardData);
                        if (isClickable) {
                          dispatch({
                            type: GLOBALS.ACTION_TYPE
                              .GET_USER_ASSESSMENT_SUCCESS,
                            payload: [],
                          });
                          dispatch({
                            type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                            payload: id,
                          });
                          //Cards time tracking api calling on click on top cards
                          let cardTimeTrackingData = {
                            userId: cardData.user_id,
                            group: STRINGS.DAILY_LEARNING,
                            screen: STRINGS.CARDS,
                            startTime: getScreenStartTime,
                            endTime: moment().format(),
                            date: moment().format(),
                            week: cardData.week,
                            day: cardData.day,
                            card_number: prevCardDataArray.card_number,
                          };
                          // dispatch(AppActions.clearScreenStartTime());
                          storeItem(STRINGS.SCREEN_START_TIME, moment().format());
                          dispatch(
                            AppActions.getScreenStartTime(moment().format()),
                          );
                          dispatch(
                            AppActions.addTimeTracker(cardTimeTrackingData),
                          );
                        } else if (
                          currentData.is_disabled == false &&
                          currentData.is_read == true &&
                          currentData.is_completed == false &&
                          currentData._id != id
                        ) {
                          console.log('else please complete previous caed');
                          customAlert(
                            'Please complete the previous card',
                            'error',
                          );
                        } else {
                          console.log('else??????');
                          customAlert('Please read previous card', 'error');
                        }
                      }}
                      cardNumber={currentData.card_number || ''}
                    />
                  </>
                ) : null}

                {/* ***********************************Navbar End********************** */}

                {/* ******** ************************** Cards Render UI Start********************** */}
                {currentData._id && (
                  <GenerateUI
                    status={currentData.card?.template_data[0]?.template_number}
                    data={{
                      ...currentData,
                      is_last_day: !nextData._id,
                      is_last_week: isLastDay,
                      status:
                        currentData.card?.template_data[0]?.template_number,
                      weeksCount: weeksCount,
                    }}
                  />
                )}

                {/* ******** ************************** Cards Render UI End********************** */}

                {/* ***********************NAVIGATION BACK AND NEXT BUTTON FOR DAYS START**************** */}
              </div>
              <div className="dashboard-footer-nav">
                <div className="footer-nav-inner">
                  {/*****************************************BOTTOM PREVIOUS BUTTON************* */}

                  <div style={{alignItems: 'flex-end'}}>
                    {prevData._id ? (
                      <div className="footer-nav-left">
                        <div
                          onClick={() => {
                            console.log('OnPrvClick', currentData);
                            //Cards time tracking api call in click on Previous
                            let cardTimeTrackingData = {
                              userId: currentData.user_id,
                              group: STRINGS.DAILY_LEARNING,
                              screen: STRINGS.CARDS,
                              startTime: getScreenStartTime,
                              endTime: moment().format(),
                              date: moment().format(),
                              week: currentData.week,
                              day: currentData.day,
                              card_number: currentData.card_number,
                            };

                            // dispatch(AppActions.clearScreenStartTime());
                            storeItem(STRINGS.SCREEN_START_TIME, moment().format());
                            dispatch(
                              AppActions.getScreenStartTime(moment().format()),
                            );

                            dispatch(
                              AppActions.addTimeTracker(cardTimeTrackingData),
                            );
                            if (
                              currentData.card?.template_data[0]
                                ?.template_number == 27
                            ) {
                              let postData = {
                                userId: getItem('userId'),
                                group: 'Patient reported outcomes',
                                screen: 'EPDS',
                                startTime: getScreenStartTime,
                                endTime: moment().format(),
                                date: moment().format(),
                              };
                              dispatch(AppActions.addTimeTracker(postData));
                            }

                            cardDataHandler(prevData);
                            setScrollerLoad(true);
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                              payload: prevData._id,
                            });
                          }}
                          className="f-nav-link">
                          <div>
                            <div>
                              <h3>{prevData.card.card_title}</h3>
                              <h6>
                                {prevData.card.card_time === '1'
                                  ? `${prevData.card.card_time} Minute`
                                  : `${prevData.card.card_time} Minutes`}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : !isFirstDay ? (
                      <div
                        className="footer-nav-left"
                        style={{alignItems: 'flex-end'}}>
                        <div
                          onClick={() => {
                            dispatch({
                              type: GLOBALS.ACTION_TYPE
                                .GET_USER_ASSESSMENT_SUCCESS,
                              payload: [],
                            });
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                              payload: selectedDay - 1,
                            });
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                              payload: '',
                            });
                          }}
                          className="f-nav-link">
                          <h3>Previous Day </h3>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {/***********************************BOTTOM***NEXT BUTTON************************** */}
                  {nextData._id ? (
                    <div className="footer-nav-right">
                      <div
                        className="f-nav-link"
                        onClick={() => {
                          if (
                            currentData.card?.template_data[0]
                              ?.template_number == 27
                          ) {
                            if (!userQuestion[0]?.saved) {
                              //debugger;

                              customAlert(
                                'Please perform your exercise',
                                'error',
                              );
                              return;
                            }

                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                              payload: nextData._id,
                            });
                            completeCardAPI(true);
                            setScrollerLoad(true);

                            let postData = {
                              userId: getItem('userId'),
                              group: 'Patient reported outcomes',
                              screen: 'EPDS',
                              startTime: getScreenStartTime,
                              endTime: moment().format(),
                              date: moment().format(),
                            };
                            dispatch(AppActions.addTimeTracker(postData));

                            cardDataHandler(nextData);
                          } else if (
                            currentData.card?.template_data[0]
                              ?.template_number == 22
                          ) {
                            if (userRatingData.length === 0) {
                              //debugger;
                              customAlert(
                                'Please perform your exercise',
                                'error',
                              );
                              return;
                            }
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                              payload: nextData._id,
                            });
                            completeCardAPI(true);
                            setScrollerLoad(true);
                            cardDataHandler(nextData);
                          } else if (
                            currentData.card?.template_data[0]
                              ?.template_number == 5 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 9 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 6 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 9 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 11 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 13 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 15 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 17 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 21 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 25 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 26 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 33 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 35 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 41 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 44 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 45 ||
                            currentData.card?.template_data[0]
                              ?.template_number == 46
                          ) {
                            if (userAssessmentData.length == 0) {
                              // debugger;
                              customAlert(
                                'Please perform your exercise',
                                'error',
                              );

                              return;
                            }
                          }
                          dispatch({
                            type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                            payload: nextData._id,
                          });
                          completeCardAPI(true);
                          setScrollerLoad(true);
                          cardDataHandler(nextData);
                        }}>
                        <div>
                          <h3
                            style={{
                              textAlign: 'right',
                            }}>
                            {nextData.card.card_title}
                          </h3>
                          <h6
                            style={{
                              textAlign: 'right',
                            }}>
                            {nextData.card.card_time === '1'
                              ? `${nextData.card.card_time} Minute`
                              : `${nextData.card.card_time} Minutes`}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ) : !isLastDay ? (
                    <div className="footer-nav-right">
                      <div
                        onClick={() => {
                          onNextDayClick();
                          return;
                        }}
                        className="f-nav-link">
                        <h3>Next Day </h3>
                      </div>
                    </div>
                  ) : selectedWeek === 5 && selectedDay === 5 ? (
                    ''
                  ) : (
                    <div className="footer-nav-right">
                      <div
                        onClick={() => {
                          if (selectedWeek <= 4) {
                            dispatch({
                              type: GLOBALS.ACTION_TYPE
                                .GET_USER_ASSESSMENT_SUCCESS,
                              payload: [],
                            });
                            dispatch(
                              AppActions.getTemplateData(selectedWeek + 1),
                            );
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.SELECTED_WEEK,
                              payload: weeksCount + 1,
                            });
                            setWeeksCount(weeksCount + 1);
                            dispatch(AppActions.getWeek(selectedWeek + 1));
                            dispatch({
                              type: 'GET_SELECTED_WEEK',
                              payload: selectedWeek + 1,
                            });
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                              payload: selectedWeek + 1 === week ? day : 1,
                            });
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                              payload: '',
                            });
                          }
                          completeCardAPI();
                        }}
                        className="f-nav-link">
                        <h3>Next Module</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* ***********************NAVIGATION BACK AND NEXT BUTTON FOR DAYS END**************** */}
            </div>
          </div>
        </div>
      </MasterLayout>
      <Footer />
    </div>
  );
};

export default DailyLearningWeeks;
