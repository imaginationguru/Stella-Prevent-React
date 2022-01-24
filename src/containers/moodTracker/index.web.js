import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import MasterLayout from '../../components/MasterLayout';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import GLOBALS from '../../constants';
import * as AppActions from '../../actions';
import {translate as ts} from '../../i18n/translate';
import Happy from '../../assets/images/happy/happy@3x.png';
import HappyActive from '../../assets/images/happyActive/happyActive@3x.png';
import BackToDashboard from '../../components/common/backToDashboard';
import BackBtn from '../../components/common/backbtn';
import VeryHappy from '../../assets/images/veryHappy/veryHappy@3x.png';
import VeryHappyActive from '../../assets/images/veryHappyActive/veryHappyActive@3x.png';

import Confused from '../../assets/images/confused/confused@3x.png';
import ConfusedActive from '../../assets/images/confusedActive/confusedActive@3x.png';

import Sad from '../../assets/images/sad/sad@3x.png';
import SadActive from '../../assets/images/sadActive/sadActive@3x.png';

import Angry from '../../assets/images/angry/angry@3x.png';
import AngryActive from '../../assets/images/angryActive/angryActive@3x.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const {STRINGS, ACTION_TYPE} = GLOBALS;
const MoodTracker = ({location}) => {
  let isFromCard = location?.state?.isFromCard
  const dispatch = useDispatch();
  const {moodTrackerData} = useSelector((state) => state.tracker);
  const [moodId, setMoodId] = useState();
  const timeStamp = moment().format();
  const currentDate = moment(timeStamp).format(STRINGS.DATE_FORMATE);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [getMoodTracker, setMoodTracker] = useState([]);
  const moodListArray = [
    {
      id: 1,
      image: VeryHappy,
      activeImage: VeryHappyActive,
      isClickTrue: false,
      name: 'Awesome',
    },
    {
      id: 2,
      image: Happy,
      activeImage: HappyActive,
      isClickTrue: false,
      name: 'Good',
    },
    {
      id: 3,
      image: Confused,
      activeImage: ConfusedActive,
      isClickTrue: false,
      name: 'Ok',
    },
    {
      id: 4,
      image: Sad,
      activeImage: SadActive,
      isClickTrue: false,
      name: 'Bad',
    },
    {
      id: 5,
      image: Angry,
      activeImage: AngryActive,
      isClickTrue: false,
      name: 'Terrible',
    },
  ];
  const [moodList, setMoodList] = useState(moodListArray);

  useEffect(() => {
    dispatch(AppActions.getMoodData(moment().format(STRINGS.DATE_FORMATE)));
  }, []);

  useEffect(() => {
    //  const getMoodTrackerData = [];
    console.log('mood tracker data', moodTrackerData);
    if (
      moodTrackerData &&
      moodTrackerData.data &&
      moodTrackerData.data.length &&
      moodTrackerData.data.length > 0
    ) {
      let index = moodTrackerData.data[0].mood;
      console.log('index of get mood tracker', index);
      moodList.map((element) => {
        console.log('element ', element);
        if (element.id === index) {
          element.isClickTrue = true;
        } else {
          element.isClickTrue = false;
        }
      });
      setMoodList([...moodList]);
      console.log('moodListArrayasdhaasdbj', moodList);
    }
    // setMoodTracker([...getMoodTrackerData]);
    {
      /* 
  
   console.log("get mood tracker data for setting mood",getMoodTrackerData)
    if (getMoodTracker !== undefined && getMoodTracker.length > 0) {
      let index = getMoodTracker[0].mood;
      console.log('index of get mood tracker',index)
      moodList.map((element) => {
        console.log("element ",element);
        console.log("element ",element.id)
        if (element.id === index) {
          element.isClickTrue = true;
        } else {
          element.isClickTrue = false;
        }
      });
      setMoodList([...moodList]);
      console.log('moodListArrayasdhaasdbj', moodList);
    }
  */
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moodTrackerData]);

  const onMoodClick = (id) => {
    console.log('onMoodClick', id);
    setMoodId(id);
    moodList.map((element) => {
      if (element.id == id) {
        element.isClickTrue = true;
      } else {
        element.isClickTrue = false;
      }
    });
    setMoodList([...moodList]);
    console.log('moodListArray', moodList);
  };

  return (
    <MasterLayout>
      <BackBtn title = {isFromCard ? 'Back to Card' : 'Back to Dashboard'} />
      <div style={styles.wrapper}>
        <p style={styles.ques} className="res-100">
          How is your mood today?
        </p>
        {moodList.map((item, index) => {
          return (
            <div style={styles.itemWrapper}>
              <TouchableOpacity onPress={() => onMoodClick(item.id)}>
                {item.isClickTrue == true ? (
                  <img src={item.activeImage} style={styles.imageStyle} />
                ) : (
                  <img src={item.image} style={styles.imageStyle} />
                )}
              </TouchableOpacity>
              <p style={styles.name}>{item.name} </p>
            </div>
          );
        })}
        <div style={styles.saveButton} className="res-80">
          <button
            className="btn-solid"
            onClick={() => {
              console.log('moodIdSave', moodId);
              let selectedMoodId;
              if (moodId != undefined) {
                selectedMoodId = moodId;
              } else {
                moodList.forEach((element) => {
                  if (element.isClickTrue == true) {
                    console.log('idddddd', element.id);
                    selectedMoodId = element.id;
                  }
                });
              }
              console.log('selectedMoodId', selectedMoodId);
              if (selectedMoodId !== undefined) {
                let postData = {
                  date: selectedDate,
                  mood: selectedMoodId,
                };
                dispatch(AppActions.saveUserMood(postData));
              } else {
                dispatch({
                  type: ACTION_TYPE.ERROR,
                  payload: 'Please select your mood',
                });
              }
            }}>
            {ts('SAVE')}
          </button>
        </div>
      </div>
    </MasterLayout>
  );
};
export default MoodTracker;
const styles = {
  saveButton: {
    width: '20%',
    marginTop: '80px',
    marginBottom: '50px',
    marginLeft: '20px',
  },
  name: {
    fontSize: '16px',
    marginLeft: '40px',
    alignItems: 'flex-end',
    display: 'flex',
  },
  imageStyle: {width: '70px', height: '70px'},
  itemWrapper: {
    display: 'flex',
    marginBottom: '30px',
    // border: '1px solid red',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  wrapper: {
    width: DEVICE_WIDTH > 767 ? '50%' : '100%',
    padding: DEVICE_WIDTH > 767 ? '0%' : '0 10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    //  marginTop: '0%',
  },
  ques: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '50px',
    textAlign: 'center',
  },
};
