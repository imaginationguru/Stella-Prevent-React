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
import GLOBALS from '../../constants';
import {screenHeight, screenWidth} from '../../utils/dimension';
import reloadImg from '../../assets/images/screener/restart.png';
import leftArrow from '../../assets/images/leftArrow.svg';
import cancel from '../../assets/images/cancel.png';
const {COLORS, FONTS, ACTION_TYPE} = GLOBALS;
const {BLUR, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;
import Button from './button';
import RadioButton from '../RadioButton';
import {useSelector, useDispatch} from 'react-redux';
import {getItem} from '../../utils/AsyncUtils';
import * as AppActions from '../../actions';
const EpdsScreener = (props) => {
  let {saveEPDSAssememt, onClose, startIndex} = props;
  const [currentQus, setCurrentQus] = useState(1);
  const [selectedQues, setSelectedQues] = useState([]);
  const [assessmentId, setAssessmentId] = useState();
  const {userQuestion = []} = useSelector((state) => state.moduleOne);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [allQuestions, updateQuestion] = useState(userQuestion);
  const [hover, setHover] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (userQuestion.length) {
      let x = userQuestion.map((item) => {
        return {
          user_id: getItem('userId'),
          assessment_id: item.assessment_id,
          question: item.question,
          question_id: item._id,
          options: item.options.length
            ? item.options.map((val) => {
                let obj2 = {...val};
                if (val.status) {
                  obj2.status = val.status;
                } else {
                  obj2.status = false;
                }
                return obj2;
              })
            : [],
        };
      });

      updateQuestion(x);
      setCurrentIndex(-1);
    }
  }, [userQuestion, onClose, dispatch]);

  const resetQuestion = () => {
    if (userQuestion.length) {
      let x = userQuestion.map((item) => {
        return {
          user_id: getItem('userId'),
          assessment_id: item.assessment_id,
          question: item.question,
          question_id: item._id,
          options: item.options.length
            ? item.options.map((val) => {
                let obj2 = {...val};
                if (val.status) {
                  obj2.status = val.status;
                } else {
                  obj2.status = false;
                }
                return obj2;
              })
            : [],
        };
      });
      updateQuestion(x);
    }
  };
  const onItemSelected = (itemAns, item, ques, optionIndex) => {
    let all_question = allQuestions;
    let currentQuestion = allQuestions[currentIndex];
    let currentQuestionOptions = allQuestions[currentIndex].options;
    /**Modify the option of selected question to status tru which is checked */
    currentQuestionOptions = currentQuestionOptions.map((option) => {
      option._id == item._id ? (option.status = true) : (option.status = false);
      return option;
    });
    /**Assign updated option to given question */
    currentQuestion = Object.assign({}, currentQuestion, {
      options: currentQuestionOptions,
    });
    /**Assign updated question to list of question */
    all_question = Object.assign([], all_question, {
      [currentIndex]: currentQuestion,
    });
    updateQuestion(all_question);

    if (allQuestions.length - 1 == currentIndex) {
      saveAssement();
    } else {
      /** Move to next question */
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 400);
    }
  };
  const saveAssement = () => {
    let all_question = allQuestions;
    /**Keep only option with status true*/
    all_question = all_question.map((element) => {
      return {
        ...element,
        options: element.options.filter((option) => option.status === true),
      };
    });
    saveEPDSAssememt(all_question);
  };
  /**On back question press */
  const handlePrevQus = () => {
    if (currentQus > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  /**Reset question options and start from start  */
  const handleReload = () => {
    setCurrentIndex(0);
    resetQuestion();
  };

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };


  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.closeContainer} onPress={() => onClose()}>
        <Image source={cancel} style={styles.cancelIcon} />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          {currentIndex == -1 ? (
            <Text style={styles.titleText}>
              Motherhood isn’t easy, but you don’t have to do it alone! Stella
              is here is guide you along your journey. {'\n \n'} Everyone is
              unique. Help us customize your experience by answering a few quick
              questions.{' '}
            </Text>
          ) : (
            <View style={{flexDirection: 'row', flex: 1}}>
              {currentIndex > 0 ? (
                <TouchableOpacity 
                  onPress={handlePrevQus}
                  style={styles.backStyling}>
                  <Image source={leftArrow} style={styles.back} />
                </TouchableOpacity>
              ) : null}
              <Text style={styles.qusText}>
                {allQuestions[currentIndex] &&
                  allQuestions[currentIndex].question}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.optionContainer}>
            {currentIndex > -1 && allQuestions[currentIndex] !== undefined
              ? allQuestions[currentIndex].options.map((item, index) => {
                  return (
                    <View style={styles.optionInnerContainer}>
                      <RadioButton
                        selectedOption={item.status}
                        outerStyle={styles.outerCheckbox}
                        innerStyle={[
                          styles.outerCheckbox,
                          {borderWidth: 17, borderRadius: '4vw'},
                        ]}
                        label={item.optionValue}
                        onPress={() =>
                          onItemSelected(
                            item.optionValue,
                            item,
                            userQuestion[currentQus],
                            index,
                          )
                        }
                      />
                    </View>
                  );
                })
              : null}
          </View>
          {currentIndex == -1 ? (
            <Button
              btnStyle={{width: '15%', alignSelf: 'center'}}
              //  onVerifyPress={()=>setCurrentIndex(0)}
              onVerifyPress={() => setCurrentIndex(0)}
              title="Get Started"
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
          ) : (
            <View
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              style={{
                marginTop: '5vw',
                marginLeft: '2.5vw',
                // paddingHorizontal: '6vw',
                width: '4vw',
                height: '3vw',
                // backgroundColor:"red"
              }}>
              {hover ? (
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 50,
                    top: -20,
                    width: '8vw',
                    height: '2vw',
                    borderRadius:5,
                    backgroundColor: COLORS.CIRCLE_GRAY,
                  }}>
                  <Text
                    style={{
                      fontStyle: FONTS.NEW_REGULAR,
                      fontSize: '1vw',
                      color: COLORS.WHITE,
                      alignSelf:"center"
                    }}>
                    Reset answers
                  </Text>
                </View>
              ) : (
                ''
              )}
              <TouchableOpacity
                onPress={handleReload}
                style={{
                  width: '4vw',
                  height: '3vw',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={reloadImg}
                  style={styles.reloadImg}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* {showWelcome === true ? (
            <Text style={styles.titleText}>
              Motherhood isn’t easy, but you don’t have to do it alone! Stella
              is here is guide you along your journey. {'\n \n'} Everyone is
              unique. Help us customize your experience by answering a few quick
              questions.{' '}
            </Text>
          ) : (
            <View style={{flexDirection: 'row', flex: 1}}>
              {currentQus !== 1 ? (
                <TouchableOpacity
                  onPress={handlePrevQus}
                  style={{
                   justifyContent:"flex-start",
                    flex: 0.1,
                    alignSelf: 'center',
                    marginTop: '-1vw',
                    marginLeft: '0vw',
                  }}>
                  <Image source={leftArrow} style={styles.back} />
                </TouchableOpacity>
              ) : null}
              <Text style={styles.qusText}>
                {userQuestion[currentQus] && userQuestion[currentQus].question}
              </Text>
            </View>
          )} */}

        {/* <View style={styles.bottomContainer}>
          <View style={styles.optionContainer}>
            {showWelcome === false && userQuestion[currentQus] !== undefined
              ? userQuestion[currentQus].options.map((item, index) => {
                  let selectedAns = selectedQues.some(
                    (val) =>
                      (val.question_id === userQuestion[currentQus]._id &&
                        val.options[0]._id) === item._id,
                  );
                 return (
                    <View style={styles.optionInnerContainer}>
                      <RadioButton
                     
                        selectedOption={selectedAns ? true : false}
                        outerStyle={styles.outerCheckbox}
                        innerStyle={[
                          styles.outerCheckbox,
                          {borderWidth: 17, borderRadius: '4vw'},
                        ]}
                        label={item.optionValue}
                        onPress={() =>
                          checkAnswer(
                            item.optionValue,
                            item,
                            userQuestion[currentQus],
                          )
                        }
                      />
                    </View>
                  );
                })
              : null}
          </View>
          {showWelcome === true ? (
            <Button
              btnStyle={{width: '15%', alignSelf: 'center'}}
              onVerifyPress={handleStartQus}
              title="Get Started"
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent:"center",
                marginTop: 30,
                paddingHorizontal:"6vw"
              }}>
              <TouchableOpacity
                onPress={handleReload}
                style={{
                  width: '3vw',
                  height: '3vw',
                  alignItems: 'center',
                  
                }}>
                <Image source={reloadImg} style={styles.reloadImg} />
              </TouchableOpacity>
              <Button
                btnStyle={{
                  width: '15%',
                  borderWidth: 2,
                  borderColor: DARK_GREEN,
                }}
                onVerifyPress={handleAnsSubmit}
                title={
                  currentQus + 1 !== userQuestion.length ? 'Next' : 'Submit'
                }
                bgColor={currentQus <= selectedQues.length ? DARK_GREEN : WHITE}
                textColor={
                  currentQus <= selectedQues.length ? WHITE : DARK_GREEN
                }></Button>
            </View>
          )}
        </View> */}
      </View>
    </View>
  );
};

export default EpdsScreener;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: BLUR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: screenWidth / 1.5,
    height: '70%',
    borderRadius: '4.2vw',
    borderWidth: 5,
    borderColor: '#0F725A',
  },
  topContainer: {
    flex: 0.55,
    backgroundColor: DARK_GREEN,
    borderTopRightRadius: '4vw',
    borderTopLeftRadius: '4vw',
    paddingHorizontal: '10vw',
    justifyContent: 'center',
  },
  back: {
    height: '1.5vw',
    width: '1.5vw',
    tintColor: WHITE,
  },
  titleText: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '1.8vw',
    color: WHITE,
    paddingBottom: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '2vw',
  },
  qusText: {
    flex: 0.99,
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '1.8vw',
    color: WHITE,
    paddingBottom: 12,
    // marginLeft: '4vw',
    alignSelf: 'center',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '2vw',
  },
  bottomContainer: {
    flex: 0.45,
    backgroundColor: WHITE,
    borderBottomRightRadius: '4vw',
    borderBottomLeftRadius: '4vw',
  },
  optionContainer: {
    height: '7.5vw',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15vw',
    marginTop: -25,
  },
  optionInnerContainer: {
    alignItems: 'center',
    maxWidth: '7vw',
  },
  optionText: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '0.9vw',
    color: DARK_GREEN,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 7,
  },
  itemStyle: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: 14,
    color: BLACK,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  outerCheckbox: {
    borderRadius: '4vw',
  },
  reloadImg: {
    height: '2vw',
    width: '2vw',
    tintColor: DARK_GREEN,
  },
  closeContainer: {
    position: 'absolute',
    left: '2vw',
    top: '2vw',
  },
  cancelIcon: {
    width: '2vw',
    height: '2vw',
    tintColor: WHITE,
  },
  backStyling: {
    justifyContent: 'flex-start',
    flex: 0.1,
    alignSelf: 'center',
    marginTop: '-1vw',
    marginLeft: '0vw',
  },
});
