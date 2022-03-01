import React, { useState, useEffect } from 'react';
import {
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import MasterLayout from '../../components/MasterLayout';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../actions';
import { navigatorPush } from '../../config/navigationOptions.web';
import GLOBALS from '../../constants';
const { STRINGS, COLORS, ACTION_TYPE } = GLOBALS;
const { GREEN_TEXT } = COLORS;
import ActivityTab from './tab';
import { getItem } from '../../utils/AsyncUtils';
import plusIcon from '../../assets/images/plusIcon.png';
import { translate as ts } from '../../i18n/translate';
import BackToDashboard from '../../components/common/backToDashboard';
import BackBtn from '../../components/common/backbtn';
import moment from 'moment';
import momentZone from 'moment-timezone';
let currentTimeZone = momentZone.tz.guess();
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ActivityView = ({
  item,
  addNewActivity,
  setSelectedActivity,
  selectedTabArray,
  allActivityData,
  allSelectedActivityData,
}) => {
  const [isImageClick, setImageClick] = useState(false);
  const [checked, setChecked] = useState([]);
  let selectedListArray = [];

  const onSelectActivity = (title, item) => {
    setImageClick(!isImageClick);
    setSelectedActivity(title);

    selectedTabArray.forEach((element) => {
      if (element._id === item._id) {
        element.isChecked = !item.isChecked;
      }
    });

    if (!checked.includes(item)) {
      setChecked([...checked, item]);
    } else {
      setChecked([checked.filter((a) => a !== item)]);
    }
  };

  if (allActivityData !== undefined) {
    allActivityData.forEach((element) => {
      if (element.isChecked !== undefined && element.isChecked) {
        selectedListArray.push(element);
      }
    });
  }

  let id = '';
  if (
    allSelectedActivityData !== undefined &&
    allSelectedActivityData.length > 0
  ) {
    id = allSelectedActivityData[0]._id;
  }

  if (item.plusImage !== undefined && item.plusImage) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigatorPush({
            screenName: 'AddActivityTracker',
            passProps: {
              AddPlesantActivityArray: addNewActivity,
              updateId: id,
              selectedListArray: selectedListArray,
            },
          })
        }
        style={styles.activityBox}>
        {/* <p
          style={{
            width: '30%',
            border: '1px solid #1B82D4',
            textAlign: 'center',
            borderRadius: '70%',
            borderWidth: '5%',
            color: COLORS.PRIMARY,
          }}>
          {'+'}
        </p> */}
        <div
          style={{
            textAlign: 'center',
            // border: '1px solid blue',
          }}>
          <img src={plusIcon} style={{ width: '70px' }} />
        </div>

        <p style={styles.activityTitle}>{'Add Activity'}</p>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => onSelectActivity(item.title, item)}
      style={styles.activityBox}>
      <div
        style={{
          textAlign: 'center',
          // border: '1px solid blue',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          padding: '10px',
          border: item.isChecked
            ? `3px solid ${GREEN_TEXT}`
            : '1px solid #000000',
        }}
        className="activity-icon">
        <img
          src={GLOBALS.IMAGE_BASE_URL + item.image}
          style={{
            ...styles.activityImage,
          }}
        />
      </div>

      <p
        style={{
          ...styles.activityTitle,
          color: item.isChecked ? GREEN_TEXT : '#747878',
        }}>
        {item.title}
      </p>
    </TouchableOpacity>
  );
};

const ActivityTracker = ({ location }) => {
  let isFromCard = location?.state?.isFromCard;

  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.authReducer);
  const { getActivityData, getSelectedActivityData } = useSelector(
    (state) => state.tracker,
  );

  const [activeTab, setActiveTab] = useState(STRINGS.ACTIVITY);
  const [allSelectedActivityData, setAllSelectedActivityData] = useState([]);
  const [allActivityData, setAllActivityData] = useState([]);
  const [plasentActivityArray, setPlasentActivityArray] = useState([]);
  const [dailyActivityArray, setDailyActivityArray] = useState([]);
  const [addNewActivity, setNewActivity] = useState([]);
  const [selectedActivityName, setSelectedActivity] = useState('');
  let hospitalId = getItem('hospitalId');
  let userId = getItem('userId');
  const tabsType = [
    {
      title: STRINGS.ACTIVITY,
      id: 0,
    },
    {
      title: STRINGS.DAILY_ACTIVITY,
      id: 1,
    },
  ];

  useEffect(() => {
    let postData = {
      hospital_id: hospitalId,
      patient_id: userId,
      timeZone: moment.tz.guess(),
      patientDate: moment().format(STRINGS.DATE_FORMATE),
    };
    dispatch(AppActions.getActivityTracker(postData));
    dispatch(AppActions.getSelectedActivityTracker(postData));
  }, []);

  useEffect(() => {
    console.log('activity data>>>>>>>', getActivityData);
    console.log('selected activity data>>>>>>>', getSelectedActivityData);
    const getActivityTrackerData = [],
      getDailtActivityData = [],
      getAddNewActivity = [],
      getAllActivityData = [],
      getSelectedActivityArray = [];
    let newSelectedActivity = [];
    let newPlasentActivity = [];
    let pleasentActivityArray;

    if (
      getActivityData &&
      getActivityData.iconlistdata &&
      getActivityData.iconlistdata.length
    ) {
      getActivityData.iconlistdata.map((e) => {
        getAllActivityData.push(e);
      });

      getActivityData.iconlistdata.forEach((element) => {
        if (
          getSelectedActivityData !== undefined &&
          getSelectedActivityData.activitypatchdata !== undefined
        ) {
          getSelectedActivityData.activitypatchdata.forEach((x) => {
            if (element._id == x.activity_id) {
              element.isChecked = true;
            }
          });
        }
      });

      let pleasentArray = getActivityData.iconlistdata.filter(
        (x) => x.category == 'Pleasant activities',
      );
      let dailyArray = getActivityData.iconlistdata.filter(
        (x) => x.category == 'Daily activities',
      );
      let addNewActivityArray = getActivityData.iconlistdata.filter(
        (x) => x.category == 'Pleasant',
      );

      // pleasentArray.map((item) => {
      //   getActivityTrackerData.push(item);
      // });
      dailyArray.map((item) => {
        getDailtActivityData.push(item);
      });

      addNewActivityArray.map((item) => {
        getAddNewActivity.push(item);
        if (item.isChecked) {
          newSelectedActivity.push(item);
        }
        if (item.isPleasantActivity) {
          newPlasentActivity.push(item);
        }
      });

      pleasentActivityArray = pleasentArray.concat(newSelectedActivity);
      pleasentActivityArray = pleasentArray.concat(newPlasentActivity);
      console.log('pleasentActivityArray>>>>', pleasentActivityArray);

      pleasentActivityArray.map((item) => {
        getActivityTrackerData.push(item);
      });
    }

    if (
      getSelectedActivityData &&
      getSelectedActivityData.activitypatchdata &&
      getSelectedActivityData.activitypatchdata.length
    ) {
      getSelectedActivityData.activitypatchdata.map((element) => {
        getSelectedActivityArray.push(element);
      });
    }

    setAllSelectedActivityData([...getSelectedActivityArray]);
    setAllActivityData([...getAllActivityData]);
    setPlasentActivityArray([...getActivityTrackerData]);
    setDailyActivityArray([...getDailtActivityData]);
    setNewActivity([...getAddNewActivity]);
  }, [getActivityData]);

  const _setActiveAppointmentTab = (tabName) => {
    if (activeTab != tabName) {
      setActiveTab(tabName);
    }
  };

  let selectedListArray = [];
  if (allActivityData !== undefined) {
    allActivityData.forEach((element) => {
      if (element.isChecked !== undefined && element.isChecked) {
        selectedListArray.push(element);
      }
    });
  }

  const onProceedClick = () => {
    console.log('on process click 1');
    if (selectedListArray.length > 0) {
      let patientActivity = [];
      let id = '';
      if (
        allSelectedActivityData !== undefined &&
        allSelectedActivityData.length > 0
      ) {
        id = allSelectedActivityData[0]._id;
      }
      selectedListArray.forEach((element) => {
        let obj = {
          activity_id: element._id,
        };
        patientActivity.push(obj);
      });
      let postData = {
        patientDate: moment().format(STRINGS.DATE_FORMATE),
        timeZone: currentTimeZone,
        hospital_id: hospitalId,
        patient_id: userId,
        patientactivity: patientActivity,
        _id: id,
      };
      console.log('on process click 2');
      dispatch(AppActions.saveActivityTracker(postData));
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please perform your exercise',
      });
    }
  };

  // console.log('plasentActivityArray>>>>', plasentActivityArray)
  return (
    <MasterLayout>
      {/* <BackBtn title = {isFromCard ? 'Back to Card' : 'Back to Dashboard'} /> */}
      {isFromCard ? <BackBtn title="Back to Card " /> : <BackToDashboard />}
      <div style={styles.wrapper}>
        <ActivityTab
          tabList={tabsType}
          activeTab={activeTab}
          setActiveTabClick={_setActiveAppointmentTab}
        />

        <div>
          {activeTab == STRINGS.ACTIVITY ? (
            <div>
              <p style={styles.ques}>{'What have you been up to?'}</p>
              <FlatList
                data={[...plasentActivityArray, { plusImage: true }]}
                contentContainerStyle={styles.contentContainerStyle}
                // style={{border: '2px solid blue', width: '100%'}}
                numColumns={DEVICE_WIDTH > 767 ? 4 : 2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <ActivityView
                    item={item}
                    addNewActivity={addNewActivity}
                    setSelectedActivity={setSelectedActivity}
                    selectedTabArray={plasentActivityArray}
                    allActivityData={allActivityData}
                    allSelectedActivityData={allSelectedActivityData}
                  />
                )}
              />
            </div>
          ) : null}

          {activeTab == STRINGS.DAILY_ACTIVITY ? (
            <div>
              <p style={styles.ques}>{'What have you been up to?'}</p>
              <FlatList
                data={dailyActivityArray}
                contentContainerStyle={styles.contentContainerStyle}
                numColumns={DEVICE_WIDTH > 767 ? 4 : 2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <ActivityView
                    item={item}
                    setSelectedActivity={setSelectedActivity}
                    selectedTabArray={dailyActivityArray}
                  />
                )}
              />
            </div>
          ) : null}
          <div style={styles.saveButton} className="res-100">
            <button
              className="btn-solid"
              onClick={() => {
                onProceedClick();
              }}>
              {ts('SAVE')}
            </button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};
export default ActivityTracker;
const styles = {
  wrapper: {
    width: DEVICE_WIDTH > 767 ? '60%' : '100%',
    padding: DEVICE_WIDTH > 767 ? '0%' : '0 10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '4%',
  },
  saveButton: { width: '20%', marginTop: '50px', marginBottom: '50px' },
  ques: { fontWeight: 'bold', fontSize: '18px' },
  contentContainerStyle: { width: '100%' },
  activityTitle: {
    color: '#747878',
    paddingTop: '10px',
    textAlign: 'center',
    fontSize: '16px',
  },
  activityImage: {
    maxWidth: '90%',
  },
  activityBox: {
    padding: '2%',
    width: DEVICE_WIDTH > 767 ? '25%' : '50%',
    // border: '1px solid pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
