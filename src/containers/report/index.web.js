/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, FlatList, Dimensions} from 'react-native';
import MasterLayout from '../../components/MasterLayout';
import BackBtn from '../../components/common/backbtn';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import GLOBALS from '../../constants';
import * as AppActions from '../../actions';

import momentZone from 'moment-timezone';
import BackToDashboard from '../../components/common/backToDashboard';
import {Line} from 'react-chartjs-2';
const {STRINGS, COLORS, MOODS_ARRAY, IMAGE_BASE_URL} = GLOBALS;
import {getItem} from '../../utils/AsyncUtils';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
let currentTimeZone = momentZone.tz.guess();

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
            label: lable,
            data: yAxis,
            // backgroundColor: 'rgba(0, 128, 0, 0.5)',
            // backgroundColor: 'linear-gradient(to right, #20f08b, #07dfb1)',
            hoverBackgroundColor: COLORS.DARK_GREEN,
            borderColor: COLORS.GREEN_TEXT,
            fill: 'start',
          },
        ],
      }}
      // pointHoverBorderColor="red"
      // bezier,

      options={graphOptions}
      style={{marginBottom: 60, marginTop: 40}}
    />
  );
};
const Report = ({location}) => {
  let isFromCard = location?.state?.isFromCard;
  const {getWeeklySummaryReportData} = useSelector((state) => state.tracker);
  const dispatch = useDispatch();
  console.log('get weekly summary report data', getWeeklySummaryReportData);
  useEffect(() => {
    let postData = {
      user_id: getItem('userId'),
      patientDate: moment().format('YYYY - MM - DD'),
      timeZone: currentTimeZone,
    };
    console.log('post data?????', postData);
    dispatch(AppActions.getWeeklySummaryReport(postData));
  }, []);
  let moodYAxis = [];
  let moodXAxis = [];

  let activityYAxis = [];
  let activityXAxis = [];

  let pointsYAxis = [];
  let pointsXAxis = [];

  let moodData = MOODS_ARRAY;
  console.log('mood data?????????', moodData);
  const daysCheckWithSleep = (arr = []) => {
    let minDate = new Date();
    let temp = [];

    for (let i = 0; i < 7; i++) {
      temp.push(`${moment(minDate).subtract(i, 'day').format('YYYY-MM-DD')}`);
    }
    let finalArray = temp.map((item, i) => {
      return (
        arr.find(
          (data) =>
            momentZone.tz(data.date, currentTimeZone).format('YYYY-MM-DD') ===
            item,
        ) || {
          _id: i,
          total_hours: 0,
          total_minutes: 0,
          date: item,
        }
      );
    });
    return finalArray;
  };

  const daysCheckWithMood = (arr = []) => {
    let minDate = new Date();
    let temp = [];

    for (let i = 0; i < 7; i++) {
      temp.push(`${moment(minDate).subtract(i, 'day').format('YYYY-MM-DD')}`);
    }

    let finalArray = temp.map((item, i) => {
      return (
        arr.find(
          (data) =>
            momentZone.tz(data._id, currentTimeZone).format('YYYY-MM-DD') ===
            item,
        ) || {
          _id: item,
          avgAmount: 0,
        }
      );
    });
    return finalArray;
  };

  const daysCheckWithActivity = (arr = []) => {
    let minDate = new Date();
    let temp = [];

    for (let i = 0; i < 7; i++) {
      temp.push(`${moment(minDate).subtract(i, 'days').format('YYYY-MM-DD')}`);
    }

    let finalArray = temp.map((item, i) => {
      return (
        arr.find((data) => {
          return (
            momentZone
              .tz(data.createdAt, currentTimeZone)
              .format('YYYY-MM-DD') === item
          );
        }) || {
          _id: i,
          activitiescount: 0,
          createdAt: item,
        }
      );
    });
    return finalArray;
  };

  const daysCheckWithPoints = (arr = []) => {
    let minDate = new Date();
    let temp = [];

    for (let i = 0; i < 7; i++) {
      temp.push(`${moment(minDate).subtract(i, 'days').format('YYYY-MM-DD')}`);
    }

    let finalArray = temp.map((item, i) => {
      return (
        arr.find((data) => {
          return (
            momentZone.tz(data.date, currentTimeZone).format('YYYY-MM-DD') ===
            item
          );
        }) || {
          _id: i,
          totalPoints: 0,
          date: item,
        }
      );
    });
    return finalArray;
  };

  //sleep
  let sleepData =
    getWeeklySummaryReportData !== undefined &&
    getWeeklySummaryReportData?.newSleepTrackerData &&
    getWeeklySummaryReportData?.newSleepTrackerData?.length
      ? daysCheckWithSleep(getWeeklySummaryReportData?.newSleepTrackerData)
      : [];

  let sleepHoursArray = sleepData?.length
    ? sleepData?.map((item) => {
        //  if(item.total_hours){
        return item.total_hours + item.total_minutes / 60;
        // }
        // else{
        //   return 0;
        // }
      })
    : [];

  let sleepXAxis = sleepData?.length
    ? sleepData?.map((item) => {
        return moment(item.date).format('MM/DD');
      })
    : [];

  if (getWeeklySummaryReportData !== undefined) {
    //mood count
    getWeeklySummaryReportData?.moodcount?.forEach((element) => {
      moodData.forEach((e) => {
        if (e.id === element._id) {
          e.moodCountValue = element?.moodcount;
        }
      });
    });

    //mood graph
    let res =
      getWeeklySummaryReportData?.newMooddataavg &&
      getWeeklySummaryReportData?.newMooddataavg.length
        ? daysCheckWithMood(getWeeklySummaryReportData?.newMooddataavg)
        : [];

    res.forEach((element) => {
      moodYAxis.push(Number(element.avgAmount));
      moodXAxis.push(moment(element._id).format('MM/DD'));
    });

    //activity
    let activityData =
      getWeeklySummaryReportData?.newactivitytackercount &&
      getWeeklySummaryReportData?.newactivitytackercount.length
        ? daysCheckWithActivity(
            getWeeklySummaryReportData?.newactivitytackercount,
          )
        : [];

    activityData.forEach((element) => {
      activityYAxis.push(Number(element.activitiescount));
      activityXAxis.push(moment(element.createdAt).format('MM/DD'));
    });

    //points

    let pointsData =
      getWeeklySummaryReportData?.newPointsdata &&
      getWeeklySummaryReportData?.newPointsdata.length
        ? daysCheckWithPoints(getWeeklySummaryReportData.newPointsdata)
        : [];
    pointsData.forEach((element) => {
      pointsYAxis.push(Number(element.totalPoints));
      pointsXAxis.push(moment(element.date).format('MM/DD'));
    });
  }
  let activityData =
    getWeeklySummaryReportData !== undefined &&
    getWeeklySummaryReportData.newGetactvityresponselistdata &&
    getWeeklySummaryReportData.newGetactvityresponselistdata.length
      ? getWeeklySummaryReportData.newGetactvityresponselistdata
          .filter((item) => item.activityName && item.image && item.totalcount)
          .map((item) => {
            return {
              activityName: item.activityName || '',
              image: item.image,
              totalcount: item.totalcount,
            };
          })
      : null;

  return (
    <View>
      <MasterLayout>
        {/* <BackBtn title = {isFromCard ? 'Back to Card' : 'Back to Dashboard'} /> */}
        {isFromCard ? <BackBtn title="Back to Card" /> : <BackToDashboard />}
        <View
          style={{
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '40%',
          }}>
          {sleepXAxis &&
          sleepXAxis.length &&
          sleepHoursArray &&
          sleepHoursArray.length ? (
            <LineGraphUI
              xAxis={sleepXAxis.reverse()}
              yAxis={sleepHoursArray.reverse()}
              lable={'Daily Sleep Tracker: hours/day'}
            />
          ) : (
            <LineGraphUI lable={'Daily Sleep Tracker: hours/day'} />
          )}

          {moodXAxis && moodXAxis.length && moodYAxis && moodYAxis.length ? (
            <LineGraphUI
              xAxis={moodXAxis.reverse()}
              yAxis={moodYAxis.reverse()}
              lable={'Average Daily Mood  Report'}
            />
          ) : (
            <LineGraphUI lable={'Average Daily Mood  Report'} />
          )}
          <Text>Weekly Mood Report</Text>
          {getWeeklySummaryReportData !== undefined &&
          getWeeklySummaryReportData.newMooddataavg &&
          getWeeklySummaryReportData.newMooddataavg.length ? (
            <FlatList
              contentContainerStyle={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
              horizontal={true}
              data={moodData}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item._id}`}
              renderItem={({item, index}) => {
                console.log('item??????', item.activeImage);
                return (
                  <View
                    key={index}
                    style={{
                      padding: 10,
                    }}>
                    {item.moodCountValue ? (
                      <div style={{display: 'flex'}}>
                        <img
                          style={{
                            height: 40,
                            width: 40,
                            // marginLeft: 10,
                            // marginRight: 10,
                          }}
                          src={item.activeImage}
                        />
                        <Text>{item.moodCountValue}</Text>
                      </div>
                    ) : null}
                  </View>
                );
              }}
            />
          ) : (
            <Text>'No Record Found'</Text>
          )}

          {activityXAxis &&
          activityXAxis.length &&
          activityYAxis &&
          activityYAxis.length ? (
            <LineGraphUI
              xAxis={activityXAxis.reverse()}
              yAxis={activityYAxis.reverse()}
              lable={'Average Activity Report: Number of Activities'}
            />
          ) : (
            <LineGraphUI lable={'Weekly Activity Quality Report'} />
          )}
          <Text>Weekly Activity Report</Text>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: 10,
            }}
            data={activityData}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item._id}`}
            ListEmptyComponent={<Text>No record for this Week</Text>}
            numColumns={8}
            renderItem={({item, index}) => (
              <View
                style={{
                  alignItems: 'center',
                  margin: 15,
                  marginTop: 15,
                  width: '8%',
                  // border: '1px solid red',
                }}
                key={index}>
                <img src={IMAGE_BASE_URL + `${item.image}`} />
                <Text
                  style={[
                    {
                      fontSize: 12,
                      marginTop: 10,
                      // fontWeight: '600',
                    },
                  ]}>
                  {item.activityName}
                </Text>
              </View>
            )}
          />
          {pointsXAxis &&
          pointsXAxis.length &&
          pointsYAxis &&
          pointsYAxis.length ? (
            <LineGraphUI
              xAxis={pointsXAxis.reverse()}
              yAxis={pointsYAxis.reverse()}
              lable={'Your total Points for the week'}
            />
          ) : (
            <LineGraphUI lable={'Your total Points for the week'} />
          )}
        </View>
      </MasterLayout>
    </View>
  );
};
export default Report;
