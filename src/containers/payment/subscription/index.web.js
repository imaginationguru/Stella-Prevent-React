import React, { useState, useRef, useEffect } from 'react';
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
import GLOBALS from '../../../constants';
import { navigatorPush, navigatorPop } from '../../../config/navigationOptions.web';
import Footer from '../../../components/Footer';
import checkBlack from '../../../assets/images/subscription/check_b.png';
import checkWhite from '../../../assets/images/subscription/check_w.png';
import Button from '../../../components/common/button';

import BackBtn from '../../../components/common/backbtn';
import ProfileHeader from '../../../components/common/profileHeader';
const { COLORS, FONTS } = GLOBALS;
const { LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN } = COLORS;
import Header from '../../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '../../../actions';
import back from '../../../assets/images/subscription/back.png';
const { IMAGE_BASE_URL } = GLOBALS;
const Subscription = (props) => {
  const [current_numericPrice, setPrice] = useState(0);
  const dispatch = useDispatch();
  const { plansData = [] } = useSelector((state) => state.moduleOne);
  console.log(plansData, "plans.......", props);

  const backButtonTitle = props.location.state?.fromScreenDailyLearing ? "Back to Card" : "Back to Profile"
  useEffect(() => {
    dispatch(AppActions.getPlans());
    console.log("setting",props.location)
    if(props.location &&props.location.state ){
      setPrice(props.location.state.currentPlan.numericPrice)
    }
    console.log(current_numericPrice,"numericPrice")
  }, [])

  const getPlanbg = (index) => {
    if (index % 2 == 0)
      return WHITE
    else
      return DARK_GREEN
  }
  const getSubTitleColor = (index) => {
    if (index % 2 == 0)
      return COLORS.PLAN_GRAY
    else
      return WHITE
  }
  const getTextColor = (index) => {
    if (index % 2 == 0)
      return LIGHT_BLACK
    else
      return WHITE
  }
  const getCheckboxImage = (index) => {
    if (index % 2 == 0)
      return checkBlack
    else
      return checkWhite
  }
  const getBtnColor = (index) => {
    if (index % 2 == 0)
      return DARK_GREEN
    else
     return WHITE
  }

  return (
    <>
      <View style={styles.container}>
      <ProfileHeader
        onProfileClick={()=> 
          navigatorPush({screenName: 'Profile'})}
        showProfileBtn={true}
        showEditIcon={false}
      />
        <BackBtn title={backButtonTitle}></BackBtn>
        <View style={{ alignItems: "center" }}>
          <View style={styles.middleContainer}>
            {plansData.length != 0 && plansData.map((item, index) => {
              return (
                <View style={[styles.planContainer, { justifyContent: 'space-between', backgroundColor: getPlanbg(index), }]}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={`${IMAGE_BASE_URL}${item.image}`} style={{ width: 30, height: 30 }} />
                    <Text style={[styles.planText, { color: getTextColor(index) }]}>{item.title}</Text>
                  </View>
                  <Text style={[styles.getText, { color: getSubTitleColor(index) }]}>{item.subtitle}</Text>
                  {item.add_contents.map((content) => {
                    return (
                      <View style={styles.listView}>
                        <Image
                          source={getCheckboxImage(index)}
                          style={{ width: 18, height: 18 }}
                        />
                        <Text style={[styles.itemText, { color: getTextColor(index) }]}>{content.content}</Text>
                      </View>
                    );
                  })
                  }
                  <View style={styles.borderLine} />
                  <View>
                    <Text
                      style={[styles.planText, { marginLeft: 0, marginTop: '6.4vw' }, { color: getTextColor(index) }]}>
                      {item.price}<Text style={styles.planInnerText}>{item.planDuration}</Text>
                    </Text>
                    {item.numericPrice >0 && 
                     <Button
                     isDisabled={current_numericPrice == item.numericPrice?true:false}
                     btnStyle={{
                       height: 40,
                       width: '100%',
                       marginTop: '1.1vw',
                       alignSelf: 'center',
                       opacity: current_numericPrice == item.numericPrice?0.3:1
                     }}
                     onVerifyPress={() =>
                       navigatorPush({
                         screenName: 'Payment',
                         passProps: item
                       })
                     }
                     title="Choose"
                     bgColor={getBtnColor(index)}
                     textColor={getPlanbg(index)}></Button>
                    }
                   
                  </View>
                </View>
              )
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
    // alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',

    // paddingHorizontal: '3%',
    // shadowColor: '#D1D2D3',
    // shadowOffset: {
    //   width: 200,
    //   height: 50,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 100,
    // elevation: 15,
    // marginTop: '3vw',
    // marginBottom: '8vw',
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
    fontSize: '1.7vw',
    /// fontWeight: '800',
    //  fontStyle: 'normal',
    color: '#0B0914',
    marginLeft: '1vw',
    fontFamily: FONTS.SEMI_BOLD
  },
  planInnerText:{
    fontFamily: FONTS.NEW_REGULAR,
    fontSize: '1.5vw',
  },
  getText: {
    fontFamily: 'Inter',
    fontSize: '1.1vw',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#A9A9AA',
    marginVertical: '1.2vw',
    fontFamily: FONTS.REGULAR
  },
  itemText: {
    fontFamily: 'Inter',
    fontSize: '1.2vw',
    fontWeight: 'normal',
    color: '#35353F',
    marginLeft: '0.7vw',
    fontFamily: FONTS.REGULAR
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
    color: "black"
  },

  planContainer: {
    // flex: 0.5,
    // flexDirection: 'column',
    // marginTop: '4vw',
    // paddingHorizontal: '3%',
    marginHorizontal: "0.5vw",
    borderRadius: "0.5vw",
    padding: "1vw",

    // shadowColor: '#D1D2D3',
    // shadowOffset: {
    //   width:"8vw",
    //   height: "0vw",
    // },
    // shadowOpacity: 1,
    // shadowRadius: 100,
    elevation: 15,
    marginTop: '3vw',
    marginBottom: '8vw',

    shadowColor: COLORS.PLAN_GRAY,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: "3vw",
    maxWidth: "25vw"

  },
  backBtn: {

    alignItems: "flex-start",
    padding: "2vw"
  }
});
