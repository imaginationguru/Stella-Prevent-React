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
} from 'react-native';
import GLOBALS from '@constants';
import {navigatorPush, navigatorPop} from '@config/navigationOptions.web';
import Footer from '@components/Footer';
import checkBlack from '@assets/images/subscription/check_b.png';
import checkWhite from '@assets/images/subscription/check_w.png';
import Button from '@components/common/button';

import BackBtn from '@components/common/backbtn';
import ProfileHeader from '@components/common/profileHeader';
const {COLORS, FONTS} = GLOBALS;
const {LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;
import Header from '@components/Header';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '@actions';
import back from '@assets/images/subscription/back.png';
import {Dimensions} from 'react-native-web';
const DEVICE_WIDTH = Dimensions.get('window').width;
const {IMAGE_BASE_URL} = GLOBALS;
const Subscription = (props) => {
  const [current_numericPrice, setPrice] = useState(0);
  const dispatch = useDispatch();
  const {plansData = []} = useSelector((state) => state.moduleOne);

  const backButtonTitle = props.location.state?.fromScreenDailyLearing
    ? 'Back to Card'
    : 'Back to Profile';
  useEffect(() => {
    dispatch(AppActions.getPlans());
    if (props.location && props.location.state) {
      setPrice(props.location.state.currentPlan.price);
    }
  }, []);

  const getPlanbg = (index) => {
    if (index % 2 == 0) {
      return WHITE;
    } else {
      return DARK_GREEN;
    }
  };
  const getSubTitleColor = (index) => {
    if (index % 2 == 0) {
      return COLORS.PLAN_GRAY;
    } else {
      return WHITE;
    }
  };
  const getTextColor = (index) => {
    if (index % 2 == 0) {
      return LIGHT_BLACK;
    } else {
      return WHITE;
    }
  };
  const getCheckboxImage = (index) => {
    if (index % 2 == 0) {
      return checkBlack;
    } else {
      return checkWhite;
    }
  };
  const getBtnColor = (index) => {
    if (index % 2 == 0) {
      return DARK_GREEN;
    } else {
      return WHITE;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ProfileHeader
          onProfileClick={() => navigatorPush({screenName: 'Profile'})}
          showProfileBtn={true}
          showEditIcon={false}
        />
        <BackBtn title={backButtonTitle} />
        <View style={{alignItems: 'center'}}>
          <View style={styles.middleContainer}>
            {plansData.length != 0 &&
              plansData.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.planContainer,
                      {
                        justifyContent: 'space-between',
                        backgroundColor: getPlanbg(index),
                      },
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={`${IMAGE_BASE_URL}${item.image}`}
                        style={{width: 30, height: 30}}
                      />
                      <Text
                        style={[styles.planText, {color: getTextColor(index)}]}>
                        {item.title}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.getText,
                        {color: getSubTitleColor(index)},
                      ]}>
                      {item.subtitle}
                    </Text>
                    {item.add_contents.map((content) => {
                      return (
                        <View style={styles.listView}>
                          <Image
                            source={getCheckboxImage(index)}
                            style={{width: 18, height: 18}}
                          />
                          <Text
                            style={[
                              styles.itemText,
                              {color: getTextColor(index)},
                            ]}>
                            {content.content}
                          </Text>
                        </View>
                      );
                    })}
                    <View style={styles.borderLine} />
                    <View>
                      <Text
                        style={[
                          styles.planText,
                          {marginLeft: 0, marginTop: '30px', fontSize: '28px'},
                          {color: getTextColor(index)},
                        ]}>
                        ${item.price}{' '}
                        <Text style={styles.planInnerText}>
                          {item.planDuration}
                        </Text>
                      </Text>
                      {item.price > 0 && (
                        <Button
                          isDisabled={
                            current_numericPrice == item.price ? true : false
                          }
                          btnStyle={{
                            height: 40,
                            width: '100%',
                            marginTop: '1.1vw',
                            alignSelf: 'center',
                            fontSize: '18px',
                            opacity:
                              current_numericPrice == item.price ? 0.3 : 1,
                          }}
                          onVerifyPress={() =>
                            navigatorPush({
                              screenName: 'Payment',
                              passProps: item,
                            })
                          }
                          title="Choose"
                          bgColor={getBtnColor(index)}
                          textColor={getPlanbg(index)}
                          textStyle={{fontSize: 20}}
                        />
                      )}
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default Subscription;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '15px',
    justifyContent: 'center',
  },
  middleInnerLeft: {
    flex: 0.5,
    flexDirection: 'column',
    marginTop: '4vw',
    paddingHorizontal: '3%',
  },
  middleInnerRight: {
    flex: 0.5,
    paddingHorizontal: '3%',
    paddingTop: '3%',
    flexDirection: 'column',
    backgroundColor: DARK_GREEN,
    borderRadius: 10,
  },
  planText: {
    fontFamily: 'Inter',
    fontSize: DEVICE_WIDTH > 1000 ? '1.7vw' : '18px',
    color: '#0B0914',
    marginLeft: DEVICE_WIDTH > 1000 ? '1vw' : '15px',
    fontFamily: FONTS.SEMI_BOLD,
  },
  planInnerText: {
    fontFamily: FONTS.NEW_REGULAR,
    fontSize: DEVICE_WIDTH > 1000 ? '1.5vw' : '21px',
  },
  getText: {
    fontFamily: 'Inter',
    fontSize: DEVICE_WIDTH > 1000 ? '1.1vw' : '14px',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#A9A9AA',
    marginVertical: '10px',
    fontFamily: FONTS.REGULAR,
  },
  itemText: {
    fontFamily: 'Inter',
    fontSize: DEVICE_WIDTH > 1000 ? '1.2vw' : '16px',
    fontWeight: 'normal',
    color: '#35353F',
    marginLeft: DEVICE_WIDTH > 1000 ? '0.7vw' : '15px',
    fontFamily: FONTS.REGULAR,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1vw',
  },
  borderLine: {
    height: 1,
    backgroundColor: '#A9A9AA',
    marginHorizontal: 3,
  },
  checkbox: {
    borderRadius: 10,
    color: 'black',
  },

  planContainer: {
    borderRadius: DEVICE_WIDTH > 1000 ? '0.5vw' : '12px',
    padding: DEVICE_WIDTH > 1000 ? '1vw' : '15px',

    elevation: 15,
    marginTop: DEVICE_WIDTH > 1000 ? '3vw' : '20px',
    marginBottom: DEVICE_WIDTH > 1000 ? '3vw' : '20px',
    marginLeft: DEVICE_WIDTH > 1000 ? '0.5vw' : '0',
    marginRight: DEVICE_WIDTH > 1000 ? '0.5vw' : '0',

    shadowColor: COLORS.PLAN_GRAY,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: '3vw',
    maxWidth: DEVICE_WIDTH > 1000 ? '47%' : '100%',
  },
  backBtn: {
    alignItems: 'flex-start',
    padding: '2vw',
  },
  bigText: {
    fontSize: '32px',
  },
});
