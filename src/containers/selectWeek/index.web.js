import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import ScheduleTab from '../../components/common/tabs';
import * as AppActions from '../../actions';
import GLOBALS from '../../constants';
import { navigatorPush, navigatorPop } from '../../config/navigationOptions.web';
import Footer from '../../components/Footer';
import Button from '../../components/common/button';
import BackBtn from '../../components/common/backbtn';
import BackToDashboard from '../../components/common/backToDashboard';
import ProfileHeader from '../../components/common/profileHeader';
const { COLORS, FONTS } = GLOBALS;
const { LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN } = COLORS;
import { useSelector, useDispatch } from 'react-redux';
import stellaWave from '../../assets/images/stellaNurse/stellaWave.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const { IMAGE_BASE_URL } = GLOBALS;
let dayData = [
  { index: '1' },
  { index: '2' },
  { index: '3' },
  { index: '4' },
  { index: '5' },
];
const tabsLearingType = [{ title: 'By Date', id: 1 }];

const DayView = ({
  item,
  onClick,
  selectedDay,
  selectedWeek,
  currentWeekDay,
}) => {
  let currentDay, currentWeek;
  if (currentWeekDay !== undefined) {
    currentDay = currentWeekDay.day;
    currentWeek = currentWeekDay.week;
  }
  if (selectedWeek >= currentWeek && item > currentDay) {
    return (
      <View
        style={[
          styles.dayTouchable,
          { backgroundColor: COLORS.LIGHT_SHADOW_GREEN },
        ]}>
        <Text style={[styles.dayText, { color: COLORS.DARK_GREEN }]}>Day</Text>
        <View
          style={[
            styles.dayViewStyle,
            { backgroundColor: COLORS.LIGHT_SHADOW_GREEN },
          ]}>
          <Text style={styles.dayText}>{item}</Text>
        </View>
      </View>
    );
  } else if (selectedWeek > currentWeek) {
    return (
      <View
        style={[
          styles.dayTouchable,
          { backgroundColor: COLORS.LIGHT_SHADOW_GREEN },
        ]}>
        <Text style={[styles.dayText, { color: COLORS.DARK_GREEN }]}>Day</Text>
        <View
          style={[
            styles.dayViewStyle,
            { backgroundColor: COLORS.LIGHT_SHADOW_GREEN },
          ]}>
          <Text style={styles.dayText}>{item}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.dayTouchable,
          { backgroundColor: selectedDay == item ? COLORS.DARK_GREEN : 'white' },
        ]}
        onPress={() => onClick(item)}>
        <Text
          style={[
            styles.dayText,
            { color: selectedDay == item ? 'white' : COLORS.DARK_GREEN },
          ]}>
          Day
        </Text>
        <View
          style={[
            styles.dayViewStyle,
            {
              borderColor: 'red',
              backgroundColor:
                selectedDay == item ? COLORS.WHITE : COLORS.WHITE,
            },

          ]}>
          <Text style={[styles.dayText, {}]}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

//for store currunt selected week and day value in session strage
const useSessionStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) { }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

function SelectWeek(props) {
  const dispatch = useDispatch();
  const { currentActiveCard = {} } = useSelector((state) => state.moduleOne);
  const [value, setValue] = useSessionStorage(
    'value',
    `Module ${currentActiveCard.current_week}`,
  );
  const [selectedDay, setSelectedDay] = useSessionStorage(
    'day',
    currentActiveCard.current_day,
  );
  const [selectedWeek, setSelectedWeek] = useSessionStorage(
    'week',
    parseInt(currentActiveCard.current_week),
  );


  const [weekDataDynamic, setweekDataDynamic] = useState([]);


  useEffect(() => {
    setweekDataDynamic([]);

    _setDynamicWeeks();
  }, [currentActiveCard]);

  useEffect(() => {
    dispatch(AppActions.getProgramById(false));
  }, []);

  /**Create week array for select box */
  const _setDynamicWeeks = () => {
    let weekDataDynamic = [];
    for (var i = 1; i <= 5; i++) {
      weekDataDynamic.push({
        value: 'Module' + ' ' + i,
        label: 'Module' + ' ' + i,
      });
      setweekDataDynamic([...weekDataDynamic]);
    }
  };

  /**When user click on proceed set reducer to selected wek day manage reducer value */
  const _onProceedClick = () => {
    dispatch({
      type: GLOBALS.ACTION_TYPE.GET_TEMPLATE_DATA_SUCCESS,
      payload: [],
    });
    dispatch({
      type: GLOBALS.ACTION_TYPE.SELECTED_WEEK,
      payload: parseInt(selectedWeek),
    });
    dispatch({
      type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
      payload: parseInt(selectedDay),
    });
    dispatch(AppActions.getWeek(parseInt(selectedWeek)));

    dispatch(
      AppActions.getCurrentActiveCard(true, (res) => {
        dispatch(AppActions.getWeek(parseInt(selectedWeek)));
        dispatch({
          type: GLOBALS.ACTION_TYPE.GET_SELECTED_CARD_ID,
          payload: '',
        });
        navigatorPush({
          screenName: 'DailyLearningModule',
          passProps: {
            weeksCount: parseInt(selectedWeek),
            backTitle: 'Back to Past Modules',
          },
        });
      }),
    );
  };

  const onWeekChange = (event) => {
    setValue(event.target.value);
    setSelectedWeek(event.target.value.replace('Module' + ' ', ''));
    setSelectedDay(1);
  };

  const daySelected = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="main-dashboard">
      <ProfileHeader></ProfileHeader>

      <View style={[styles.container, {}]}>
        <div className="v-container m-tb-30">
          <div className="blob-container">
            {/* <BackBtn btnStyle={{padding: 0}} /> */}
            <BackToDashboard btnStyle={{ padding: 0 }} />
            <View style={styles.backBtn} />
            <View style={{ marginTop: 10 }}>
              <ScheduleTab
                customStyle={{
                  marginTop: 10,
                }}
                tabList={tabsLearingType}
                activeTab={'By Date'}
                tabTitleStyle={{ fontSize: 16 }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View style={styles.logoView}>
                <Image
                  source={stellaWave}
                  resizeMode="contain"
                  style={styles.logoStyle}
                />
              </View>
              <div
                className="c-dropdown"
                style={{
                  width: '100%',
                  maxWidth: DEVICE_WIDTH > 1000 ? '40%' : '100%',
                  margin: '0 auto',
                  borderRadius: '12px',
                  padding: '5px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  boxShadow: '0px 30.2415px 60.4831px rgba(0, 111, 89, 0.38)',
                  border: '1px solid rgba(0, 111, 89, 0.38)',
                }}>
                <select
                  value={value}
                  onChange={onWeekChange}
                  style={{
                    width: '100%',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    backgroundColor: '#ffffff',
                    border: '0px solid rgba(0, 111, 89, 0.38)',
                  }}>
                  {weekDataDynamic.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>
              </div>
              <View style={styles.dayView}>
                {dayData.map((element) => {
                  return (
                    <DayView
                      item={element.index}
                      onClick={daySelected}

                      selectedDay={selectedDay}
                      selectedWeek={selectedWeek}
                      currentWeekDay={{
                        week: currentActiveCard.current_week,
                        day: currentActiveCard.current_day,
                      }}
                    />
                  );
                })}
              </View>
              <View style={styles.buttonView}>
                <Button
                  btnStyle={{
                    height: 40,
                    width: '100%',
                    marginTop: '1.1vw',
                  }}
                  onVerifyPress={_onProceedClick}
                  textStyle={{ fontSize: 12 }}
                  title={'Proceed'}
                  bgColor={DARK_GREEN}
                  textColor={WHITE}
                  isDisabled={
                    selectedWeek > currentActiveCard.current_week ? true : false
                  }
                />
              </View>
            </View>
          </div>
        </div>
        <Footer />
      </View>
    </div>
  );
}
export default SelectWeek = React.memo(SelectWeek);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoStyle: {
    height: 150,
    width: 200,
  },
  dayView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  /**Day UI */
  dayTouchable: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 40,
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 1,
    marginBottom: 8,
    margin: 2,
  },
  dayText1: {
    fontSize: 15,
    fontFamily: FONTS.CIRCULAR_MEDIUM,
  },
  dayViewStyle: {
    marginTop: 4,
    borderRadius: '50%',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dayText: {
    color: COLORS.DARK_GREEN,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: FONTS.SEMI_BOLD,
  },
  buttonView: {
    paddingHorizontal: 20,
    width: DEVICE_WIDTH > 1000 ? '40%' : '100%',
    justifyContent: 'center',
  },
  dropDownStyleNew: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.DARK_GREEN,
    shadowOffset: { width: 0.5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 5,
    paddingTop: 20,
    borderRadius: 5,
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 0.5,
    height: 40,
    borderBottomColor: COLORS.DARK_GREEN,
    alignSelf: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    width: '30%',
  },
});
