import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, FlatList, TextInput} from 'react-native';
import MasterLayout from '../../../components/MasterLayout';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../actions';
import menu from '../../../assets/images/menu.svg';
import header from '../../../assets/images/header.png';
import checked from '../../../assets/images/checkedSquare@3x.png';
import unChecked from '../../../assets/images/uncheckedSquare@3x.png';
import Menu from '../../../components/Menu';
import GLOBALS from '../../../constants';
import BackBtn from '../../../components/common/backbtn';
import {getItem} from '../../../utils/AsyncUtils';
import {translate as ts} from '../../../i18n/translate';
const {STRINGS, COLORS} = GLOBALS;

const AddActivityTracker = (props) => {
  const dispatch = useDispatch();
  const {saveActivityData} = useSelector((state) => state.tracker);
  const [addPlasentActivity, setPlasentActivityArray] = useState(
    props.location.state.AddPlesantActivityArray,
  );
  const [newSortedList, setNewSortedList] = useState([], '');
  const [isSearchList, setisSearchList] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refresh, setRefresh] = useState(false);
  let hospitalId = getItem('hospitalId');
  let userId = getItem('userId');
  const excludeColumns = [
    '_id',
    'category',
    'createdAt',
    'hospital_id',
    'image',
    'isCheck',
    'is_deleted',
    'updatedAt',
    '__v',
  ];
  let checkedArray = [];
  let selectedListArray = props.location.state.selectedListArray;
  let updatedId = props.location.state.updateId;

  // useEffect(() => {
  //   if (saveActivityData) {
  //     if (loginData !== null) {
  //       let postData = {
  //         hospital_id: loginData.user.hospital_id,
  //         patient_id: loginData.user._id,
  //       };
  //       dispatch(AppActions.getActivityTracker(postData));
  //       dispatch(AppActions.getSelectedActivityTracker(postData));
  //       // go to previous screen
  //     }
  //   }
  // }, saveActivityData);

  const searchUpdated = (text) => {
    if (text != '') {
      filterData(text);
      setSearchText(text);
      setisSearchList(true);
      setRefresh(!refresh);
    } else {
      newSortedList.forEach((element) => {
        element.isCheck = false;
      });
      setSearchText('');
      setisSearchList(false);
      setNewSortedList([]);
      setRefresh(!refresh);
    }
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setNewSortedList(addPlasentActivity);
    else {
      const filteredData = addPlasentActivity.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue),
        );
      });
      setNewSortedList(filteredData);
    }
  };

  const _onCheckActivity = (id) => {
    newSortedList.map((e) => {
      if (e._id == id) {
        e.isCheck = e.isCheck !== undefined ? !e.isCheck : true;
      }
    });
    setRefresh(!refresh);
  };

  const onSaveClick = () => {
    let patientActivityArray = [];
    selectedListArray.forEach((x) => {
      let obj = {
        activity_id: x._id,
      };
      patientActivityArray.push(obj);
    });

    checkedArray.forEach((element) => {
      let obj = {
        activity_id: element._id,
      };
      patientActivityArray.push(obj);
    });
    let postData = {
      hospital_id: hospitalId,
      patient_id: userId,
      patientactivity: patientActivityArray,
      _id: updatedId,
    };
    dispatch(AppActions.saveActivityTracker(postData));
  };

  if (newSortedList.length > 0) {
    newSortedList.forEach((element) => {
      if (element.isCheck) {
        checkedArray.push(element);
      }
    });
  }

  console.log('newSortedList', newSortedList);
  return (
    <MasterLayout>
      <BackBtn title = "Back to Activities" />
      <div style={styles.wrapper}>
        <p style={styles.ques}>Search Pleasant Activity</p>
        <TextInput
          style={styles.searchedTextInput}
          placeholder={
            !isSearchList ? 'Search activity by name (ex: Sport)' : null
          }
          placeholderTextColor={'greay'}
          underlineColorAndroid="transparent"
          maxLength={50}
          onChangeText={(term) => {
            searchUpdated(term);
          }}
        />
        <div>
          <FlatList
            data={isSearchList ? newSortedList : []}
            contentContainerStyle={{
              // paddingBottom: '2%',
              marginTop: '3%',
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            extraData={refresh}
            keyExtractor={(item) => item._id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.activityTitle}
                onPress={() => _onCheckActivity(item._id)}>
                {item.isCheck ? (
                  <img src={checked} style={styles.activityImage} />
                ) : null}

                {!item.isCheck ? (
                  <img src={unChecked} style={styles.activityImage} />
                ) : null}

                <p style={styles.searchTitle}>{item.title}</p>
              </TouchableOpacity>
            )}
          />

          {checkedArray.length > 0 ? (
            <button
              className="btn-solid"
              style={styles.saveButton}
              onClick={() => {
                onSaveClick();
              }}>
              {ts('SAVE')}
            </button>
          ) : null}
        </div>
      </div>
    </MasterLayout>
  );
};
export default AddActivityTracker;
const styles = {
  wrapper: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '4%',
  },
  ques: {fontSize: '18px', fontWeight: 'bold'},
  saveButton: {width: '20%', marginTop: '50px', marginBottom: '50px'},
  searchTitle: {
    fontSize: '16px',
    color: '#747878',
    paddingLeft: '20px',
    // border: '1px solid blue',
    paddingTop: '5px',
  },
  searchedTextInput: {
    width: '30%',
    marginTop: 10,
    height: 50,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderColor: COLORS.DARK_GREEN,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 14,
  },
  activityImage: {
    //padding: '1%',
    //  width: '5%',
    width: '35px',
    height: '35px',
    //border: '1px solid pink',
  },
  activityTitle: {
    flexDirection: 'row',
    alignContent: 'center',
    display: 'flex',
    //margin: '1%',
    //border: '1px solid red',
    marginTop: '10px',
  },
};
