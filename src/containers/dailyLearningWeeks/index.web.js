import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MasterLayout from '../../components/MasterLayout';
import Footer from '../../components/Footer';
import GLOBALS from '../../constants';
import * as AppActions from '../../actions';
import {Header, SubHeader} from './Navbar';
import GenerateUI from './GenerateUI';
import BackToDashboard from '../../components/common/backToDashboard';
import {
  getSelectedWeekDayCards,
  canProceedNextDay,
} from '../../helpers/common.web';
import {customAlert} from '../../helpers/commonAlerts.web';
import {navigatorPush} from '../../config/navigationOptions.web';
import BackBtn from '../../components/common/backbtn';
const {COLORS} = GLOBALS;
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
  let {selectedDay, selectedWeek} = useSelector((state) => state.moduleOne);
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

  // useEffect(() => {
  //   let nextCardIsActive = mData.find((item) => item._id === currentData._id);
  //   // console.log('index value', nextCardIsActive);
  // }, [currentData]);
  // Api calling part

  useEffect(() => {
    applicableCards(selectedCardId);
    if (isFromDashboard) {
      // console.log('selected card ID', selectedCardId);
      applicableCards(selectedCardId);
    }
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
            currentData.card.template_data[0].template_number == 6
              ? currentData._id
              : null,
          ),
        );
        // dispatch(AppActions.getUserAssessment(currentData._id, assessment_id));
      }
    }
  }, [currentData, currentData._id, dispatch]);

  // api response handling
  useEffect(() => {
    console.log(
      templateData,
      'currentData........1111',
      selectedCardId,
      'selectedCardId',
      mData,
    );
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
        console.log('data >???????', data);
        if (data && data._id) {
          setScrollerLoad(false);
          cardDataHandler(data);
        }
      }
    }
  }, [selectedCardId, selectedDay, selectedWeek, templateData, dispatch]);

  useEffect(() => {
    // dispatch(AppActions.getTemplateData(currentWeek)); No Need
    if (templateData.length == 0) {
      dispatch(AppActions.getCurrentActiveCard());
    }
  }, [dispatch]);

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

  const cardDataHandler = (data) => {
    //  console.log(data, 'dataaaa cardDataHandler');
    if (isScrollerLoad) {
      window.scrollTo(0, 200);
      setScrollerLoad(false);
    }
    setCurrentData(data);
    console.log('set current data', cIds);
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
    //  console.log('mdtaa', mData);
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
    // console.log('temp', temp);
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

  const applicableCards = (id = '') => {
    let temp = cardsColorDisable();
    // console.log(temp, 'Data......', id);
    var selectedObject = temp.filter((el) => {
      return el.card === id;
    });
    //  console.log('selectedObject', selectedObject);
    return selectedObject.length > 0 ? selectedObject[0].isCompleted : false;

    // console.log("selectedObject",selectedObject)

    // const currentIndex = temp.length
    //   ? temp.findIndex((val) => val.card === id)
    //   : null;
    // let prevCardStatus = false;
    // if (temp.length) {
    //    if (currentIndex >= 1) {
    //     const data = temp[currentIndex - 1] || {};
    //     console.log(data,"data",temp)
    //     if (data.card) {
    //       console.log(data,"secrent  ")
    //       prevCardStatus = data.isCompleted === true;
    //     }
    //   } else {
    //     const data = temp[currentIndex] || {};

    //     if (data.card) {
    //       prevCardStatus = data.isCompleted === true;
    //     }
    //   }
    // }

    // return prevCardStatus ? true : false;
  };
  // console.log('mData>>>>>>>', mData);
  // console.log('prev data>>>>>>>>>>...', prevData);
  console.log('current data>>>>>>>>', currentData);
  // console.log('next Data>>>>>>>>>>>.', nextData);
  console.log('current active cards', currentActiveCard);
  const completeCardAPI = (nextday = '') => {
    //  console.log('complete current data', nextday, currentData);
    if (currentData._id) {
      let completeParams = {
        id: currentData._id,
        user_id: currentData.user_id,
        is_last_day: !nextData._id,
        is_last_week: isLastDay,
        week: currentData.week,
        day: currentData.day,
      };

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
    if (
      loginData?.planInfo?.numericPrice == 0 &&
      currentData.day === 2 &&
      lastDay
    ) {
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
        // console.log(res, 'res check active card');
        // console.log('selected day', selectedDay);
        let canProceed = canProceedNextDay(
          selectedWeek,
          selectedDay + 1,
          // res.unlocked_week,
          // res.unlocked_day,
          res.current_week,
          res.current_day,
        );

        if (canProceed) {
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
            payload: selectedDay + 1,
          });
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
            payload: mData[current_Index + 1]._id,
          });
          // console.log(mData[current_Index + 1], 'mData[current_Index + 1....');
          completeCardAPI(true);
          setScrollerLoad(true);
          cardDataHandler(mData[current_Index + 1]);
        } else {
          customAlert('Content will unlock tomorrow', 'error');
        }
        // if(selectedDay + 1 > res.current_day ){
        //   customAlert('Content will unlock tomorrow', 'error');
        // }
        // else if(selectedDay + 1 <= res.current_day  ){
        //   console.log(mData,"mData......")
        //   dispatch({
        //     type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
        //     payload: selectedDay + 1,
        //   });
        //   dispatch({
        //     type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
        //     payload: mData[current_Index + 1]._id,
        //   });
        //   console.log(mData[current_Index + 1],"mData[current_Index + 1....");
        //   completeCardAPI(true);
        //   setScrollerLoad(true)
        //   cardDataHandler(mData[current_Index + 1]);
        // } else {

        // }
        /* 
        if (res.is_disabled == true) {
          customAlert('Content will unlock tomorrow', 'error');
        } else if (selectedDay + 1 <= res.current_day) {
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
            payload: selectedDay + 1,
          });
          dispatch({
            type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
            payload: mData[current_Index + 1]._id,
          });
        } else {
        }
        */
      }),
    );
  };

  return (
    <>
      <MasterLayout>
        {backTitle ? <BackBtn title={backTitle} /> : <BackToDashboard />}

        <div className="dashboard-body">
          <div className="container">
            <div className="dashboard-body-inner">
              {/* ***********************************Navbar Start********************** */}
              <div>
                <p style={{color: COLORS.GREEN_TEXT, fontWeight: 'bold'}}>
                  Home /
                  <span style={{color: COLORS.GRAY1, fontWeight: 'bold'}}>
                    {''}
                    Week{' '}
                    {weeksCount === undefined
                      ? currentActiveCard.current_week
                      : weeksCount}{' '}
                    Day {selectedDay}
                  </span>
                </p>
              </div>

              {templateData.length ? (
                <>
                  {/* <Header
                    data={templateData}
                    currentDay={selectedDay}
                    isDisabled={applicableDay()}
                    onDayChange={(val) => {
                      console.log(val, 'val....');
                      const isClickable = applicableDay().length
                        ? applicableDay().some((e) => {
                          return e.day === val && e.isDisabled === false;
                        })
                        : false;
                      if (isClickable) {
                        dispatch({
                          type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                          payload: val,
                        });
                        dispatch({
                          type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                          payload: '',
                        });
                      } else if (
                        loginData?.planInfo?.numericPrice == 0 &&
                        val > 2
                      ) {
                        customAlert(
                          "You've reached your free content limit. Please upgrade your plan.",
                          'error',
                          { showCloseButton: true },
                          'Upgrade',
                          _onPressUpgrade,
                        );
                        return;
                      } else {
                        customAlert(`Content not unlocked`, 'error');
                      
                      }
                    }}
                  /> */}
                  <SubHeader
                    data={templateData.filter(
                      (item) => item.day === selectedDay,
                    )}
                    isDisabled={cardsColorDisable()}
                    // isDisabled={applicableCards(currentData._id)}
                    // onCardChange={(id) => setCurrentCardId(id)}
                    onCardChange={(id, i) => {
                      const isClickable = id ? applicableCards(id) : false;

                      if (isClickable) {
                        console.log('is clickable??????');
                        dispatch({
                          type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                          payload: id,
                        });
                      }
                      // if (
                      //   currentData.is_disabled == false &&
                      //   currentData.is_read == true &&
                      //   currentData.is_completed == true
                      // ) {
                      //   dispatch({
                      //     type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                      //     payload: id,
                      //   });
                      // } else {
                      //   customAlert(
                      //     'Please complete the previous card',
                      //     'error',
                      //   );
                      // }
                      else if (
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
                        // dispatch({
                        //   type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                        //   payload: id,
                        // });
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
                    status: currentData.card?.template_data[0]?.template_number,
                    weeksCount: weeksCount,
                  }}
                />
              )}

              {/* ******** ************************** Cards Render UI End********************** */}

              {/* ***********************NAVIGATION BACK AND NEXT BUTTON FOR DAYS START**************** */}

              <div className="dashboard-footer-nav">
                <div className="footer-nav-inner">
                  {/*****************************************BOTTOM PREVIOUS BUTTON************* */}

                  <div style={{alignItems: 'flex-end'}}>
                    {prevData._id ? (
                      <div className="footer-nav-left">
                        <div
                          onClick={() => {
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
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                              payload: selectedDay - 1,
                            });
                            dispatch({
                              type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                              payload: '',
                            });
                          }}
                          className="f-nav-link">
                          <h3>Previous Day</h3>
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
                            //  alert('first one');

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
                            cardDataHandler(nextData);
                          } else if (
                            currentData.card?.template_data[0]
                              ?.template_number == 22
                          ) {
                            //  alert('first one');

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
                            // alert('11');
                            if (userAssessmentData.length == 0) {
                              // debugger;
                              // alert('two');
                              console.log('right one??????1');
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
                          <h3>{nextData.card.card_title}</h3>
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

                          //   console.log(nextData,"selectedDay.....");
                          //     const isClickable = applicableDay().length
                          //     ? applicableDay().some((e) => {
                          //       console.log(e,"lololllll")
                          //         return (
                          //           e.day === selectedDay + 1 &&
                          //           e.isDisabled === false
                          //         );
                          //       })
                          //     : false;
                          //  return;
                          // const isClickable = applicableDay().length
                          //   ? applicableDay().some((e) => {
                          //       return (
                          //         e.day === selectedDay + 1 &&
                          //         e.isDisabled === false
                          //       );
                          //     })
                          //   : false;
                          // const isClickable = applicableDay().length
                          //   ? applicableDay().some((e) => {
                          //       return (
                          //         e.day === selectedDay &&
                          //         e.isDisabled === false
                          //       );
                          //     })
                          //   : false;
                          // if (isClickable) {
                          //   completeCardAPI();
                          //   dispatch({
                          //     type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
                          //     payload: selectedDay + 1,
                          //   });
                          //   dispatch({
                          //     type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
                          //     payload: '',
                          //   });
                          // } else {
                          //   alert(` Next day's card enable by tomorrow`);
                          //   completeCardAPI(true);
                          // }
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
                          // debugger;
                          console.log('next week >>>>>>', selectedWeek);
                          if (selectedWeek <= 4) {
                            console.log('selected week', selectedWeek + 1);
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
                        <h3>Next Week</h3>
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
    </>
  );
};

export default DailyLearningWeeks;
