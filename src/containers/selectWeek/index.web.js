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
import DropDownPicker from '../../updatedNodeModules/react-native-dropdown-picker';
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
const tabsLearingType = [{title: 'By Date', id: 1}];
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
  //currentDay
  if (selectedWeek >= currentWeek && item > currentDay) {
    return (
      <View
        style={[
          styles.dayTouchable,
          {backgroundColor: COLORS.LIGHT_SHADOW_GREEN},
        ]}>
        <Text style={[styles.dayText1, {color: COLORS.WHITE}]}>Day</Text>
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
        <Text style={[styles.dayText1, {color: COLORS.WHITE}]}>Day</Text>
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
            styles.dayText1,
            {color: selectedDay == item ? 'white' : COLORS.DARK_GREEN},
          ]}>
          Day
        </Text>
        <View
          style={[
            styles.dayViewStyle,
            {
              backgroundColor:
                selectedDay == item ? COLORS.WHITE : COLORS.DARK_GREEN,
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
          <Text style={[styles.dayText]}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};
function SelectWeek(props) {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekDataDynamic, setweekDataDynamic] = useState(['Week1', 'Week 2']);
  useEffect(() => {}, []);

  return (
    <View style={[styles.container, {}]}>
      <ProfileHeader
        {...props}
        showProfileBtn={false}
        showEditIcon={true}
        onEditClick={(file) => selectImage(file)}
      />
      <BackBtn></BackBtn>
      <View style={styles.backBtn}></View>
      <View style={{marginTop: 5}}>
        <ScheduleTab
          customStyle={{
            marginTop: 10,
          }}
          tabList={tabsLearingType}
          activeTab={'By Date'}
          //setActiveTab={this._setActiveLearningTab}
          tabTitleStyle={{fontSize: 16}}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          // justifyContent: 'center',
        }}>
        <View style={styles.logoView}>
          <Image
            source={stellaWave}
            resizeMode="contain"
            style={styles.logoStyle}
          />
        </View>
        <DropDownPicker
          placeholder={'Select Week'}
          theme="LIGHT"
          style={styles.dropDownStyleNew}
          containerStyle={[
            {
              width: '100%',
              alignSelf: 'center',
            },
          ]}
          textStyle={{
            fontSize: 15,
            color: COLORS.DARK_GREEN,
            textAlign: 'center',
            // height: 50,
            //  fontFamily: FONTS.MEDIUM,
          }}
          labelStyle={{
            // fontFamily: FONTS.MEDIUM,
            color: COLORS.BLACK,
          }}
          dropDownDirection="TOP"
          //  open={this.state.open}
          value={'Week 1'}
          items={weekDataDynamic}
          // setOpen={() => this.setState({ open: true })}
          onPress={(open) => {
            // if (!open) {
            //   setTimeout(() => {
            //     this.hideDropDown();
            //   }, 500);
            // }
          }}
          //  setValue={this.setValue}
          onChangeValue={(value) => {
            // this.setState({
            //   open: false,
            // });
          }}
        />
        <View style={styles.dayView}>
          {dayData.map((element) => {
            return (
              <DayView
                item={element.index}
                onClick={() => {}}
                selectedDay={selectedDay}
                selectedWeek={selectedWeek}
                currentWeekDay={{week: 1, day: 5}}
              />
            );
          })}
        </View>

        <View style={styles.buttonView}>
          <Button
            btnStyle={{
              height: 35,
              width: '100%',
              marginTop: '1.1vw',
            }}
            onVerifyPress={() =>
              navigatorPush({
                screenName: 'Subscription',
              })
            }
            textStyle={{fontSize: 12}}
            title={'Proceed'}
            bgColor={DARK_GREEN}
            textColor={WHITE}></Button>
        </View>
      </View>
      <Footer></Footer>
    </View>
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
    height: DEVICE_HEIGHT - 0,
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
    borderColor: COLORS.PRIMARY,
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
    borderRadius: 12,
    width: 24,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dayText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonView: {
    paddingHorizontal: 20,
    width: '40%',
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
