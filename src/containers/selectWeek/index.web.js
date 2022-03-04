import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import moment from 'moment';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Select from 'react-select';

import ScheduleTab from '../../components/common/tabs';
import {getItem} from '../../utils/AsyncUtils';
import * as AppActions from '../../actions';
import GLOBALS from '../../constants';
import Strings from '../../constants/Strings';
import {navigatorPush, navigatorPop} from '../../config/navigationOptions.web';
import Footer from '../../components/Footer';
import Button from '../../components/common/button';
import Toggle from '../../components/common/toggle';
import PopUp from '../../components/common/popUp';
import BackBtn from '../../components/common/backbtn';
import Loader from '../../components/Loader';
import ProfileHeader from '../../components/common/profileHeader';
const {COLORS, FONTS} = GLOBALS;
const {LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;
import Header from '../../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import journal from '../../assets/images/subscription/journal.png';
import stellaWave from '../../assets/images/stellaNurse/stellaWave.png';
import back from '../../assets/images/subscription/back.png';
import Input1 from '../../components/TextInput';
import RadioButton1 from '../../components/RadioButton1';
import {customAlert} from '../../helpers/commonAlerts.web';
import MasterLayout from '../../components/MasterLayout';
import {
  validateIsEmpty,
  validatePassword,
  validateContact,
  validateZipcode,
  validateANZipcode,
  validatePhoneWithSpecialSymbol,
  validateName,
} from '../../utils/validations';
import {normalize} from '../../utils/Helper';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const {IMAGE_BASE_URL} = GLOBALS;
let dayData = [
  {index: '1'},
  {index: '2'},
  {index: '3'},
  {index: '4'},
  {index: '5'},
];
const tabsLearingType = [
  {title: 'By Date', id: 1},
  // {title: 'Suggested', id: 1},
  // {title: 'Liked', id: 1},
];

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
          {backgroundColor: COLORS.LIGHT_SHADOW_GREEN},
        ]}>
        <Text style={[styles.dayText, {color: COLORS.DARK_GREEN}]}>Day</Text>
        <View
          style={[
            styles.dayViewStyle,
            {backgroundColor: COLORS.LIGHT_SHADOW_GREEN},
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
          {backgroundColor: COLORS.LIGHT_SHADOW_GREEN},
        ]}>
        <Text style={[styles.dayText, {color: COLORS.DARK_GREEN}]}>Day</Text>
        <View
          style={[
            styles.dayViewStyle,
            {backgroundColor: COLORS.LIGHT_SHADOW_GREEN},
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
          {backgroundColor: selectedDay == item ? COLORS.DARK_GREEN : 'white'},
        ]}
        onPress={() => onClick(item)}>
        <Text
          style={[
            styles.dayText,
            {color: selectedDay == item ? 'white' : COLORS.DARK_GREEN},
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
            // {
            //   backgroundColor:
            //     selectedDay == item
            //       ? COLOR.WHITE
            //       : selectedDay <= currentDay
            //       ? COLOR.DARK_GREEN
            //       : COLOR.PRIMARY,
            // },
          ]}>
          <Text style={[styles.dayText, {}]}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

function SelectWeek(props) {
  const dispatch = useDispatch();
  const {currentActiveCard = {}} = useSelector((state) => state.moduleOne);

  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekDataDynamic, setweekDataDynamic] = useState([]);
  const [value, setValue] = useState('Week 1');

  useEffect(() => {
    setweekDataDynamic([]);
    setSelectedWeek(parseInt(currentActiveCard.current_week));
    dispatch(AppActions.getWeek(currentActiveCard.current_week));
    setSelectedDay(currentActiveCard.current_day);
    setValue(`Week ${currentActiveCard.current_week}`);
    _setDynamicWeeks();
  }, [currentActiveCard]);

  useEffect(() => {
    dispatch(AppActions.getProgramById(false));
    dispatch({
      type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
      payload: selectedDay,
    });
  }, []);

  const _setDynamicWeeks = () => {
    let weekDataDynamic = [];
    for (var i = 1; i <= 5; i++) {
      weekDataDynamic.push({
        value: 'Week' + ' ' + i,
        label: 'Week' + ' ' + i,
      });
      setweekDataDynamic([...weekDataDynamic]);
    }
  };
  const _onProceedClick = () => {
    dispatch(
      AppActions.getCurrentActiveCard(true, (res) => {
        navigatorPush({
          screenName: 'DailyLearningWeeks',
          passProps: {
            weeksCount: selectedWeek,
            backTitle: 'Back to Past Modules',
          },
        });
      }),
    );
  };
  const onWeekChange = (event) => {
    setValue(event.target.value);
    dispatch(AppActions.getWeek(event.target.value.replace('Week' + ' ', '')));
    setSelectedWeek(event.target.value.replace('Week' + ' ', ''));
  };
  const daySelected = (day) => {
    dispatch({
      type: GLOBALS.ACTION_TYPE.GET_SELECTED_DAY,
      payload: parseInt(day),
    });
    setSelectedDay(day);
  };

  return (
    // <MasterLayout>
    <div className="main-dashboard">
      <ProfileHeader></ProfileHeader>

      <View style={[styles.container, {}]}>
        <div className="v-container m-tb-30">
          <div className="blob-container">
            <BackBtn btnStyle={{padding: 0}} />

            <View style={styles.backBtn} />
            <View style={{marginTop: 10}}>
              <ScheduleTab
                customStyle={{
                  marginTop: 10,
                }}
                tabList={tabsLearingType}
                activeTab={'By Date'}
                tabTitleStyle={{fontSize: 16}}
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
                      // selectedDay={1}
                      // selectedWeek={1}
                      // currentWeekDay={{
                      //   week: 1,
                      //   day: 5,
                      // }}
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
                  textStyle={{fontSize: 12}}
                  title={'Proceed'}
                  bgColor={DARK_GREEN}
                  textColor={WHITE}
                />
              </View>
            </View>
          </div>
        </div>
        <Footer />
      </View>
    </div>
    // </MasterLayout>
  );
}
export default SelectWeek = React.memo(SelectWeek);
//export default ProfileDetails;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red',

    //  flex: 1,
    //  padding: 20,
    // height: DEVICE_HEIGHT - 0,
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
    // bottom: 30,
  },
  dropDownStyleNew: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.DARK_GREEN,
    shadowOffset: {width: 0.5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 5,
    // elevation: 10,
    paddingTop: 20,
    borderRadius: 5,
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 0.5,
    height: 40,
    //  marginHorizontal: 16,
    borderBottomColor: COLORS.DARK_GREEN,
    alignSelf: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    width: '30%',
  },
});
