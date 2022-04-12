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
  Image,
  StyleSheet,
} from 'react-native';
import MasterLayout from '@components/MasterLayout';
import BackBtn from '@components/common/backbtn';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import GLOBALS from '@constants';
import * as AppActions from '@actions';
import momentZone from 'moment-timezone';
import BackToDashboard from '@components/common/backToDashboard';
import {Line} from 'react-chartjs-2';
const {STRINGS, FONTS, COLORS, MOODS_ARRAY, IMAGE_BASE_URL} = GLOBALS;

const {LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;

import {getItem} from '@utils/AsyncUtils';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
let currentTimeZone = momentZone.tz.guess();

const LineGraphUI = ({xAxis, yAxis, lable}) => {
  console.log('here====>' + lable, xAxis);
  console.log('hereYY====>' + lable, yAxis);
  const graphOptions = {
    scales: {
      x: {
        ticks: {
          color: COLORS.WHITE,
        },
      },
      y: {
        ticks: {
          color: COLORS.WHITE,
        },
      },
    },
    plugins: {
      legend: {
        // position: 'left',
        align: 'start',
        labels: {
          fontSize: 10,
          color: COLORS.WHITE,
        },
      },
    },
  };
  const graphOptionsForMood = {
    scales: {
      maintainAspectRatio: false,
      x: {
        ticks: {
          color: COLORS.WHITE,
        },
      },
      y: {
        ticks: {
          color: COLORS.WHITE,
          precision: 0,
          callback: function (label, index, labels) {
            if (label == 1) {
              return label + ' (Terrible)';
            } else if (label >= 2 && label < 3) {
              return label + ' (Bad)';
            } else if (label >= 3 && label < 4) {
              return label + ' (Ok)';
            } else if (label >= 4 && label < 5) {
              return label + ' (Good)';
            } else if (label >= 5) {
              return label + ' (Awesome)';
            } else {
              return label;
            }
          },
        },
      },
    },

    plugins: {
      legend: {
        // position: 'left',
        align: 'start',
        labels: {
          fontSize: 10,
          color: COLORS.WHITE,
        },
      },
    },
  };

  return (
    <Line
      data={{
        labels: xAxis,
        datasets: [
          {
            label: lable,
            lineTension: 0.2,
            radius: 5,
            data: yAxis,

            hoverBackgroundColor: COLORS.WHITE,
            borderColor: COLORS.WHITE,
          },
        ],
      }}
      options={
        lable == 'Average Daily Mood Report'
          ? graphOptionsForMood
          : graphOptions
      }
      style={{
        marginBottom: '2vw',
        marginTop: 0,
        borderRadius: 5,
        background:
          'linear-gradient(40deg, rgba(69,136,198,0.9) 30%, #49A694 70%)',
        backgroundColor: '#49A694',
      }}
    />
  );
};
const Report = ({location}) => {
  let isFromCard = location?.state?.isFromCard;
  const {getWeeklySummaryReportData} = useSelector((state) => state.tracker);
  const dispatch = useDispatch();
  useEffect(() => {
    let postData = {
      user_id: getItem('userId'),
      patientDate: moment().format('YYYY - MM - DD'),
      timeZone: currentTimeZone,
    };
    dispatch(AppActions.getWeeklySummaryReport(postData));
  }, []);
  let moodYAxis = [];
  let moodXAxis = [];

  let activityYAxis = [];
  let activityXAxis = [];

  let pointsYAxis = [];
  let pointsXAxis = [];

  let moodData = MOODS_ARRAY;
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
        return (
          parseFloat(item.total_hours) + parseFloat(item.total_minutes) / 60
        );
      })
    : [];
  let sleepXAxis = sleepData?.length
    ? sleepData?.map((item) => {
        return moment(item.date).format('MM/DD');
      })
    : [];

  if (getWeeklySummaryReportData !== undefined) {
    //mood count
    let newArrayList = [];
    moodData.forEach((element, i) => {
      newArrayList.push({...element});
    });
    getWeeklySummaryReportData?.moodcount?.forEach((element, index) => {
      newArrayList.forEach((e, i) => {
        if (e.id === element._id) {
          if (e?.moodCountValue) {
            e.moodCountValue = e.moodCountValue + element?.moodcount;
          } else {
            e.moodCountValue = element?.moodcount;
          }
        }
      });
      moodData = newArrayList;
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
            width: DEVICE_WIDTH < 500 ? '80%' : '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '40%',
          }}>
          <Text style={styles.headerStyle}>
            Report Date: {moment().format('MM/DD/YYYY')}
          </Text>
          <Text style={styles.labelText}>Daily Sleep Tracker: hours/day</Text>
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
          <Text style={styles.labelText}>Average Daily Mood Report</Text>
          {moodXAxis && moodXAxis.length && moodYAxis && moodYAxis.length ? (
            <LineGraphUI
              xAxis={moodXAxis.reverse()}
              yAxis={moodYAxis.reverse()}
              lable={'Average Daily Mood Report'}
            />
          ) : (
            <LineGraphUI
              yAxis={[0, 1, 2, 3, 4, 5]}
              lable={'Average Daily Mood Report'}
            />
          )}

          <Text style={styles.labelText}>Weekly Mood Report</Text>
          {getWeeklySummaryReportData !== undefined &&
          getWeeklySummaryReportData.newMooddataavg &&
          getWeeklySummaryReportData.newMooddataavg.length ? (
            <FlatList
              contentContainerStyle={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}
              horizontal={true}
              data={moodData}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `${item._id}`}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingBottom: 10,
                    }}>
                    {item.moodCountValue ? (
                      <div style={{display: 'flex', marginVertical: 10}}>
                        <img
                          style={{
                            height: 40,
                            width: 40,
                          }}
                          src={item.activeImage}
                        />
                        <View style={styles.badgeConatiner}>
                          <Text style={styles.badgeText}>
                            {item.moodCountValue}
                          </Text>
                        </View>
                      </div>
                    ) : null}
                  </View>
                );
              }}
            />
          ) : (
            <Text>No Record Found</Text>
          )}
          <Text style={styles.labelText}>
            Average Activity Report: Number of Activities
          </Text>

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
          <Text style={styles.labelText}>Weekly Activity Report</Text>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              marginBottom: 10,
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'space-between',
              padding: 5,
              overflow: 'hidden',
            }}
            data={activityData}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item._id}`}
            ListEmptyComponent={<Text>No record for this Week</Text>}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 5,
                  }}
                  key={index}>
                  <div style={{display: 'flex'}}>
                    <Image
                      style={[styles.imageContainer]}
                      source={`${item.image}`}
                    />
                    <View style={styles.badgeConatiner}>
                      <Text style={styles.badgeText}>{item.totalcount}</Text>
                    </View>
                  </div>
                  <Text numberOfLines={3} style={styles.activity_name}>
                    {item.activityName}
                  </Text>
                </View>
              );
            }}
          />
          <Text style={styles.labelText}>Your total Points for the week</Text>
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
const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: 'bold',
    color: DARK_GREEN,
    fontSize: 18,
    fontFamily: FONTS.SEMI_BOLD,
    fontWeight: '700',
    paddingVertical: 5,
  },
  labelText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.SOFT_GRAY,
    paddingVertical: 10,
  },
  badgeText: {
    fontFamily: FONTS.REGULAR,
    fontWeight: '200',
    fontSize: 12,
    color: COLORS.WHITE,
    paddingVertical: 10,
  },
  activity_name: {
    fontFamily: FONTS.REGULAR,
    fontWeight: '200',
    fontSize: 12,
    color: COLORS.SOFT_GRAY,
    paddingVertical: 5,
    width: 50,
  },
  badgeConatiner: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.DARK_GREEN,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: -10,
    bottom: 0,
    position: 'relative',
    zIndex: 12,
  },
  imageContainer: {
    height: 30,
    width: 30,
  },
});
