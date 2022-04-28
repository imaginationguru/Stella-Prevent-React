/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Dimensions,
  AppState,
} from 'react-native';
import MasterLayout from '@components/MasterLayout';
import BackBtn from '@components/common/backbtn';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import GLOBALS from '@constants';
import * as AppActions from '@actions';
import hoursJson from './HoursJson';
import minutesJson from './MinutesJson';
import momentZone from 'moment-timezone';
import BackToDashboard from '@components/common/backToDashboard';
import {Line} from 'react-chartjs-2';
import {getItem} from '../../utils/AsyncUtils';
import {navigatorPop} from '../../config/navigationOptions.web';
const {STRINGS, COLORS} = GLOBALS;
import ReactSlider from 'react-slider';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const LineGraphUI = ({xAxis, yAxis, lable}) => {
  const graphOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Line
      data={{
        labels: xAxis,
        datasets: [
          {
            label: '# ' + lable,
            data: yAxis,
            fill: false,
            backgroundColor: COLORS.DARK_GREEN,
            borderColor: COLORS.GREEN_TEXT,
          },
        ],
      }}
      // bezier,
      options={graphOptions}
    />
  );
};

const SliderUI = ({setScale, getScale, isEditUI}) => {
  const onSliderChange = (value) => {
    setScale(value);
  };

  return (
    <View>
      <ReactSlider
        min={0}
        max={10}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        value={getScale}
        onChange={(value) => (!isEditUI ? onSliderChange(value) : null)}
      />
    </View>
  );
};

const SleepTracker = ({location}) => {
  let isFromCard = location?.state?.isFromCard;

  const dispatch = useDispatch();
  const {getSleepTrackerData} = useSelector((state) => state.tracker);
  const [sleepHoursXaxis, setSleepHoursXaxis] = useState([]);
  const [sleepHoursYaxis, setSleepHoursYaxis] = useState([]);
  const [sleeQualityYaxis, setSleepQualityYaxis] = useState([]);
  const [sleepEnergyYaxis, setSleepEnergyYaxis] = useState([]);
  const [dateArray, setDateArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hoursValue, setHoursValue] = useState(Number('00'));
  const [minutesValue, setMinutesValue] = useState(Number('00'));
  const [showHoursArray, setShowHoursArray] = useState(false);
  const [showMinutesArray, setShowMinutesArray] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [sleepScale, setSleepScale] = useState();
  const [energeticScale, setEnergeticScale] = useState();
  const [isEditUI, setIsEditUI] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  let currentTimeZone = momentZone.tz.guess();
  const {getScreenStartTime = ''} = useSelector((state) => state.moduleOne);
  console.log('get screen start time sleep', getScreenStartTime);
  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      console.log('document visible', document.visibilityState);
      if (document.visibilityState === 'hidden') {
        addTimeTrackerAPICall();
      } else {
        dispatch(AppActions.getScreenStartTime(moment().format()));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var dateArrayList = [];
  useEffect(() => {
    for (var i = 6; i >= 0; i--) {
      dateArrayList.push({
        dates: moment().subtract(i, 'days').format('YYYY-MM-DD'),
        selectedItem: false,
        _id: i,
        isEditTracker: false,
      });

      if (dateArrayList.length) {
        dateArrayList.map((ele) => {
          if (ele.dates === moment(new Date()).format('YYYY-MM-DD')) {
            ele.selectedItem = true;
          }
          if (
            ele.dates === moment().subtract(0, 'days').format('YYYY-MM-DD') ||
            ele.dates === moment().subtract(1, 'days').format('YYYY-MM-DD') ||
            ele.dates === moment().subtract(2, 'days').format('YYYY-MM-DD')
          ) {
            ele.isEditTracker = true;
          }
        });
      }

      setDateArray([...dateArrayList]);
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
      getSleepTrackerAPI(moment(new Date()).format(STRINGS.DATE_FORMATE));
    }, 500);
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (getSleepTrackerData && getSleepTrackerData.sleepData) {
      let data = getSleepTrackerData.sleepData;
      if (data.hours !== undefined) {
        setHoursValue(data.hours);
      } else {
        setHoursValue(Number('00'));
      }
      if (data.minute !== undefined) {
        setMinutesValue(data.minute);
      } else {
        setMinutesValue(Number('00'));
      }
      if (data.sleepRate !== undefined) {
        setSleepScale(data.sleepRate);
      } else {
        setSleepScale(0);
      }
      if (data.feelingRate !== undefined) {
        setEnergeticScale(data.feelingRate);
      } else {
        setEnergeticScale(0);
      }
    }

    let sleepDataArray =
      getSleepTrackerData &&
      getSleepTrackerData.last7DaysData &&
      getSleepTrackerData.last7DaysData.length
        ? daysCheck(getSleepTrackerData.last7DaysData)
        : [];

    //set all sleep XAxis
    let sleepHoursXAxis = sleepDataArray.length
      ? sleepDataArray.map((item) => {
          return moment(item.sleepdate).format('MM/DD');
        })
      : [];
    setSleepHoursXaxis(sleepHoursXAxis.reverse());

    // Sleep Hours
    let sleepHoursYAxis = sleepDataArray.length
      ? sleepDataArray.map((item) => {
          return Number(item.hours) + '.' + Number(item.minute);
        })
      : [];
    setSleepHoursYaxis(sleepHoursYAxis.reverse());

    //Sleep Quality
    let sleepQualityYAxis = sleepDataArray.length
      ? sleepDataArray.map((item) => {
          return item.sleepRate;
        })
      : [];
    setSleepQualityYaxis(sleepQualityYAxis.reverse());

    //Sleep Energy
    let sleepEnergyYAxis = sleepDataArray.length
      ? sleepDataArray.map((item) => {
          return item.feelingRate;
        })
      : [];
    setSleepEnergyYaxis(sleepEnergyYAxis.reverse());
  }, [getSleepTrackerData]);

  const daysCheck = (arr = []) => {
    let minDate = new Date();
    let temp = [];
    for (let i = 0; i < 7; i++) {
      temp.push(`${moment(minDate).subtract(i, 'day').format('YYYY-MM-DD')}`);
    }
    let finalArray = temp.map((item, i) => {
      return (
        arr.find(
          (data) =>
            momentZone
              .tz(data.sleepdate, currentTimeZone)
              .format('YYYY-MM-DD') === item,
        ) || {
          _id: i,
          hours: 0,
          minute: 0,
          sleepRate: 0,
          feelingRate: 0,
          sleepdate: item,
        }
      );
    });
    return finalArray;
  };

  const getSleepTrackerAPI = (date) => {
    let postData = {
      sleepdate: date,
      patientDate: moment().format(STRINGS.DATE_FORMATE),
      timeZone: currentTimeZone,
    };
    dispatch(AppActions.getSleepData(postData));
  };

  const onSaveSleepTracker = () => {
    if (hoursValue === 0) {
      // eslint-disable-next-line no-alert
      alert('Sleep hours should be more than 1');
    } else {
      let postData = {
        hours: hoursValue,
        minute: minutesValue,
        sleepdate: selectedDate,
        sleepRate: sleepScale,
        feelingRate: energeticScale,
        patientDate: moment().format(STRINGS.DATE_FORMATE),
        timeZone: currentTimeZone,
      };

      let postDataGetAPI = {
        sleepdate: selectedDate,
        patientDate: moment().format(STRINGS.DATE_FORMATE),
        timeZone: currentTimeZone,
      };
      let timePostData = {
        userId: getItem('userId'),
        group: STRINGS.PATIENT_REPORTED_OUTCOMES,
        screen: STRINGS.SLEEP_TRACKER,
        startTime: getScreenStartTime,
        endTime: moment().format(),
        date: moment().format(),
      };
      dispatch(
        AppActions.saveSleepTracker(postData, postDataGetAPI, timePostData),
      );
      dispatch(AppActions.saveSleepTracker(postData, postDataGetAPI));

      //users last seen api
      dispatch(AppActions.updateUserLastSeen());
    }
  };

  const onHoursPlus = () => {
    if (hoursValue < 24) {
      setHoursValue(Number(hoursValue) + 1);
    } else {
      setHoursValue(0 + 1);
    }
    if (hoursValue == 24) {
      setMinutesValue(0);
    }
  };

  const onHoursMinus = () => {
    if (hoursValue > 1) {
      setHoursValue(Number(hoursValue) - 1);
    } else {
      setHoursValue(25 - 1);
    }
    if (hoursValue == 24) {
      setMinutesValue(0);
    }
  };

  const onMinutePlus = () => {
    if (hoursValue !== 24 && minutesValue < 59) {
      setMinutesValue(Number(minutesValue) + 1);
    } else {
      setMinutesValue(0);
    }
  };

  const onMinuteMinus = () => {
    if (hoursValue !== 24) {
      if (minutesValue > 0) {
        setMinutesValue(Number(minutesValue) - 1);
      } else {
        setMinutesValue(60 - 1);
      }
    }
  };

  const onDateClick = (item) => {
    dateArray.map((ele) => {
      if (ele._id === item._id) {
        ele.selectedItem = true;
      } else {
        ele.selectedItem = false;
      }
      if (ele.dates === item.dates) {
        if (ele.isEditTracker) {
          setIsEditUI(false);
        } else {
          setIsEditUI(true);
        }
      }
    });
    getSleepTrackerAPI(item.dates);
    setSelectedDate(item.dates);
    setRefresh(!refresh);
  };
  useEffect(() => {
    dispatch(AppActions.getScreenStartTime(moment().format()));
  }, [dispatch]);

  const addTimeTrackerAPICall = () => {
    let postData = {
      userId: getItem('userId'),
      group: STRINGS.PATIENT_REPORTED_OUTCOMES,
      screen: STRINGS.SLEEP_TRACKER,
      startTime: getScreenStartTime,
      endTime: moment().format(),
      date: moment().format(),
    };
    dispatch(AppActions.addTimeTracker(postData));
  };
  return (
    <View>
      <MasterLayout>
        {/* <BackBtn title = {isFromCard ? 'Back to Card' : 'Back to Dashboard'} /> */}

        {isFromCard ? (
          <BackBtn
            title="Back to Card"
            onPress={() => {
              addTimeTrackerAPICall();
              navigatorPop();
            }}
          />
        ) : (
          <BackToDashboard onBack={() => addTimeTrackerAPICall()} />
        )}
        <View style={styles.wrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
              margin: ' 0 -10px',
              flexWrap: 'wrap',
              width: '100%',
            }}>
            <View style={{padding: '10px'}}>
              <h2 className="dashboard-heading">{'Sleep Tracker'}</h2>
            </View>
            {/* Date strip UI */}
            <View
              style={{
                flexDirection: 'row',
                padding: '10px',
                width: '100%',
                maxWidth: '520px',
              }}>
              {dateArray.length
                ? dateArray.map((item) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onDateClick(item)}
                        style={[styles.dateView]}>
                        <View
                          style={[
                            {
                              backgroundColor: item.selectedItem
                                ? 'white'
                                : COLORS.BOX_GRAY,
                            },
                            styles.dateViewStyle,
                          ]}>
                          <Text style={styles.dayText}>
                            {moment(item.dates).format('DD')}
                          </Text>
                          <Text style={styles.monthText}>
                            {moment(item.dates).format('MMM')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
          </View>
          <View style={{padding: '10px'}}>
            <View style={styles.outerBox}>
              {/* sleep hours UI */}
              <View style={styles.innerBox}>
                <Text style={styles.boxText}>
                  How many hours did you sleep today including naps?
                </Text>

                <View style={styles.sleepHoursOuterView}>
                  <View style={styles.sleepHrsView}>
                    {!showHoursArray ? (
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => (!isEditUI ? onHoursPlus() : null)}>
                          <Text style={{color: COLORS.GRAY}}>▲</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            !isEditUI ? setShowHoursArray(true) : null
                          }>
                          <Text style={{marginTop: 10, marginBottom: 10}}>
                            {hoursValue !== undefined ? hoursValue : '00'} {'h'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => (!isEditUI ? onHoursMinus() : null)}>
                          <Text style={{color: COLORS.GRAY}}>▼</Text>
                        </TouchableOpacity>
                      </View>
                    ) : !isEditUI ? (
                      <View style={{width: '50px', height: '350px'}}>
                        <FlatList
                          data={hoursJson}
                          contentContainerStyle={styles.flStyles}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              onPress={() => {
                                setHoursValue(item.hours);
                                setShowHoursArray(false);
                              }}
                              style={styles.timeTbStyle}>
                              <Text style={{color: COLORS.GRAY}}>
                                {item.hours}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.colonStyle}>
                    <Text>:</Text>
                  </View>

                  <View style={styles.sleepHrsView}>
                    {!showMinutesArray ? (
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => (!isEditUI ? onMinutePlus() : null)}>
                          <Text style={{color: COLORS.GRAY}}>▲</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            !isEditUI
                              ? hoursValue == 24
                                ? null
                                : setShowMinutesArray(true)
                              : null
                          }>
                          <Text style={{marginTop: 10, marginBottom: 10}}>
                            {minutesValue !== undefined
                              ? hoursValue === 24
                                ? '00'
                                : minutesValue
                              : '00'}{' '}
                            {'m'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => (!isEditUI ? onMinuteMinus() : null)}>
                          <Text style={{color: COLORS.GRAY}}>▼</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: '50px',
                          height: '350px',
                        }}>
                        <FlatList
                          data={minutesJson}
                          contentContainerStyle={styles.flStyles}
                          showsVerticalScrollIndicator={false}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              style={styles.timeTbStyle}
                              onPress={() => {
                                setShowMinutesArray(false);
                                setMinutesValue(item.minutes);
                              }}>
                              <Text style={{color: COLORS.GRAY}}>
                                {item.minutes}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* sleep Scale UI */}
              <View style={styles.innerBox}>
                <Text style={styles.boxText}>
                  How well did you sleep on a scale of 1-10?
                </Text>
                <View style={{marginTop: 40, maxWidth: '350px', width: '100%'}}>
                  <SliderUI
                    setScale={setSleepScale}
                    getScale={sleepScale}
                    isEditUI={isEditUI}
                  />
                </View>
              </View>

              {/* energy Scale UI */}
              <View style={styles.innerBox}>
                <Text style={styles.boxText}>
                  How energetic do you feel on a scale of 1-10?
                </Text>
                <View style={{marginTop: 40, maxWidth: '350px', width: '100%'}}>
                  <SliderUI
                    setScale={setEnergeticScale}
                    getScale={energeticScale}
                    isEditUI={isEditUI}
                  />
                </View>
              </View>

              {/* Button UI */}
              {selectedDate ===
                moment().subtract(0, 'days').format('YYYY-MM-DD') ||
              selectedDate ===
                moment().subtract(1, 'days').format('YYYY-MM-DD') ||
              selectedDate ===
                moment().subtract(2, 'days').format('YYYY-MM-DD') ? (
                <TouchableOpacity
                  onPress={() => onSaveSleepTracker()}
                  style={styles.btnStyle}>
                  <Text style={{color: 'white'}}>ADD TRACKING</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Graph UI */}
            <Text style={{marginTop: 20, marginBottom: 10}}>
              Last 7 days history
            </Text>
            <View style={[styles.outerBox, {marginBottom: 40, padding: 0}]}>
              <View style={styles.graphOuterView}>
                <View style={styles.lineGraphWrapper}>
                  <LineGraphUI
                    xAxis={sleepHoursXaxis}
                    yAxis={sleepHoursYaxis}
                    lable={'Daily Sleep Tracker: Hours/Day'}
                  />
                </View>
                <View style={styles.lineGraphWrapper}>
                  <LineGraphUI
                    xAxis={sleepHoursXaxis}
                    yAxis={sleeQualityYaxis}
                    lable={'Weekly Sleep Quality Report'}
                  />
                </View>
                <View style={styles.lineGraphWrapper}>
                  <LineGraphUI
                    xAxis={sleepHoursXaxis}
                    yAxis={sleepEnergyYaxis}
                    lable={'Weekly Energy Report'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </MasterLayout>
    </View>
  );
};
export default SleepTracker;
const styles = {
  wrapper: {
    width: DEVICE_WIDTH > 1025 ? '60%' : '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '68px',
    padding: '0 15px',
  },
  ques: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '50px',
  },
  outerBox: {
    backgroundColor: COLORS.BOX_GRAY,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  innerBox: {
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  boxText: {color: COLORS.CIRCLE_GRAY, fontWeight: 'bold'},
  dateView: {
    backgroundColor: COLORS.BOX_GRAY,
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '14%',
  },
  dayText: {fontSize: '16px', fontWeight: 'bold'},
  monthText: {fontSize: '16px', color: '#1C2037'},
  dateViewStyle: {
    padding: 5,
    alignItems: 'center',
  },
  sleepHoursOuterView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    padding: 20,
  },
  sleepHrsView: {
    backgroundColor: 'white',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  flStyles: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  timeTbStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  colonStyle: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: COLORS.BUTTON_ORANGE,
    alignItems: 'center',
    padding: 15,
    width: DEVICE_WIDTH > 767 ? '25%' : '100%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  graphOuterView: {
    width: '100%',
    minHeight: '300px',
    flexDirection: 'row',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  lineGraphWrapper: {
    backgroundColor: 'white',
    margin: DEVICE_WIDTH > 767 ? '' : '15px',
    width: DEVICE_WIDTH > 767 ? '30%' : '88%',
  },
};
