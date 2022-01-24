import React, {useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import ExerciseBox from '../../../components/ExerciseBox';
import commonStyles from '../commonStyles';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import {translate as ts} from '../../../i18n/translate';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
} from '../../../components/Cards';
import {Dimensions} from 'react-native';
const {COLORS, ACTION_TYPE} = GLOBALS;
const {LIGHT_GRAY, GREEN_TEXT, BUTTON_ORANGE, YELLOW, CIRCLE_GRAY} = COLORS;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const extractSelectQ = (x = []) => {
  const selectedQuesArr = [];
  if (x.length) {
    x.forEach((ele) => {
      if (ele.options && ele.options.length) {
        let ans = ele.options.find((item) => item.status === true)
          ? true
          : false;
        selectedQuesArr.push(ans);
      } else {
        selectedQuesArr.push(false);
      }
    });
    const selectedQues = selectedQuesArr.length
      ? selectedQuesArr.filter((val) => val === true).length
      : 0;
    return selectedQues;
  }
};
const TwentySeven = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    quotes,
    showExercises,
    week,
    choosenAssessment,
    _id
  } = props.card;
  const {submit_messages} = props;
  const [assessmentQues, setAssessmentQues] = useState([]);
  const [resultText, setResultText] = useState('');
  const [globalAPICall, setGlobalAPICall] = useState(true);
  const dispatch = useDispatch();
  const {userQuestion = []} = useSelector((state) => state.moduleOne);
  const [totalQ, setTotalQ] = useState(0);
  const [selectQ, setSelectQ] = useState(0);
  //const isNotUpdate = totalQ === selectQ && selectQ === 10; //TODO true==save will not call
  const isNotUpdate = totalQ === selectQ;
  useEffect(() => {
    let params = {
      assessment_id: choosenAssessment,
      user_id: getItem('userId'),
      stellaPrevent: true,
      card_id: _id
    };
    dispatch(AppActions.getUserQuestionInfo(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  useEffect(() => {
    if (userQuestion.length) {
      let x = userQuestion.map((item,index) => {
        if(index==0 && item.totalPointEarned){
          let firstCondition = '0-9';
          let secondCondition = '10-16';
          let thirdCondition = '17-21';
          let fourthCondition = '>21';
          if (item.totalPointEarned >= 0 && item.totalPointEarned <= 9) {
            let conditionOne =
              submit_messages && submit_messages.length
                ? submit_messages.filter(
                    (ele) => ele.condition === firstCondition,
                  )
                : [];
            let messageOne = conditionOne.length && conditionOne[0].message;
            setResultText(messageOne)

          } else if (item.totalPointEarned >= 10 && item.totalPointEarned <= 16) {
            let conditionSecond =
              submit_messages && submit_messages.length
                ? submit_messages.filter(
                    (ele) => ele.condition === secondCondition,
                  )
                : [];
            let messageSecond =
              conditionSecond.length && conditionSecond[0].message;
              setResultText(messageSecond)

          } else if (item.totalPointEarned >= 17 && item.totalPointEarned <= 21) {
            let conditionThird =
              submit_messages && submit_messages.length
                ? submit_messages.filter(
                    (ele) => ele.condition === thirdCondition,
                  )
                : [];
            let messageThird = conditionThird.length && conditionThird[0].message;
            setResultText(messageThird)

          } else if (item.totalPointEarned >= 21) {
            let conditionFour =
              submit_messages && submit_messages.length
                ? submit_messages.filter(
                    (ele) => ele.condition === fourthCondition,
                  )
                : [];
            let messageFour = conditionFour.length && conditionFour[0].message;
          setResultText(messageFour)
        }
      }
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
      setTotalQ(x.length);
      setAssessmentQues(x);
      setSelectQ(extractSelectQ(x));
    }
  }, [userQuestion]);

  const generateDynamicColor = (order) => {
    if (order === 0) {
      return GREEN_TEXT;
    }
    if (order === 1) {
      return BUTTON_ORANGE;
    }
    if (order === 2) {
      return YELLOW;
    }
    if (order === 3) {
      return CIRCLE_GRAY;
    }
  };
  const onSaveHandler = (quesId, optionId) => {
    if (assessmentQues.length) {
      let y = assessmentQues.map((item) => {
        if (item.question_id === quesId) {
          if (item.options.length) {
            return {
              ...item,
              options: item.options.map((val) => {
                if (val._id === optionId) {
                  return {...val, status: true, selected: true};
                }
                return {...val, status: false, selected: false};
              }),
            };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
      setAssessmentQues(y);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    let answer = extractSelectQ(assessmentQues);
    setSelectQ(answer);
    let sum = 0;
    let firstCondition = '0-9';
    let secondCondition = '10-16';
    let thirdCondition = '17-21';
    let fourthCondition = '>21';

    let modifyData = assessmentQues.length
      ? assessmentQues.map((item) => {
          return {
            ...item,
            card_id: _id,
            options: item.options.length
              ? item.options.filter((val) => val.status === true)
              : [],
          };
        })
      : [];

    let onlyOptionPoint =
      modifyData &&
      modifyData.length &&
      modifyData.map((item) => {
        let points = 0;
        item.options.forEach((option) => {
          points = option !== undefined && option.optionPoint;
        });
        return points;
      });
    if (onlyOptionPoint.length) {
      onlyOptionPoint.forEach((item) => {
        sum = sum + item;
      });
    }

    if (modifyData && modifyData.length) {
      console.log('modify dtaa on submit>>>>>', modifyData);

      //const isAPICall = totalQ === answer && answer === 10;
      const isAPICall = totalQ === answer;
      if (isAPICall) {
        setGlobalAPICall(false);
        if (sum >= 0 && sum <= 9) {
          let conditionOne =
            submit_messages && submit_messages.length
              ? submit_messages.filter(
                  (ele) => ele.condition === firstCondition,
                )
              : [];
          let messageOne = conditionOne.length && conditionOne[0].message;
          dispatch(
            AppActions.savePatientAssessment(
              modifyData,
              messageOne,
              choosenAssessment,
            ),
          );
        } else if (sum >= 10 && sum <= 16) {
          let conditionSecond =
            submit_messages && submit_messages.length
              ? submit_messages.filter(
                  (ele) => ele.condition === secondCondition,
                )
              : [];
          let messageSecond =
            conditionSecond.length && conditionSecond[0].message;
            setResultText(messageSecond)
          dispatch(
            AppActions.savePatientAssessment(
              modifyData,
              messageSecond,
              choosenAssessment,
            ),
          );
        } else if (sum >= 17 && sum <= 21) {
          let conditionThird =
            submit_messages && submit_messages.length
              ? submit_messages.filter(
                  (ele) => ele.condition === thirdCondition,
                )
              : [];
          let messageThird = conditionThird.length && conditionThird[0].message;
          setResultText(messageThird)
          dispatch(
            AppActions.savePatientAssessment(
              modifyData,
              messageThird,
              choosenAssessment,
            ),
          );
        } else if (sum >= 21) {
          let conditionFour =
            submit_messages && submit_messages.length
              ? submit_messages.filter(
                  (ele) => ele.condition === fourthCondition,
                )
              : [];
          let messageFour = conditionFour.length && conditionFour[0].message;
          setResultText(messageFour)
          dispatch(
            AppActions.savePatientAssessment(
              modifyData,
              messageFour,
              choosenAssessment,
            ),
          );
        }
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please answer to all questions',
        });
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please perform your exercise',
      });
    }
  };
  return (
    <>
      {/**********************quotes************** */}
      {quotes && quotes.length
        ? quotes
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardQuote
                  key={index}
                  quote={item.quote.length ? ReactHtmlParser(item.quote) : []}
                />
              );
            })
        : []}
      <CardTitle title={ReactHtmlParser(card_title)} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} Minute` : `${card_time} Minutes`
        }
      />

      {/**********************description************** */}
      {descriptions && descriptions.length
        ? descriptions
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  description={ReactHtmlParser(item.desc)}
                />
              );
            })
        : []}
      {assessmentQues.length
        ? assessmentQues.map((item, index) => {
            return (
              <div key={index} style={{marginBottom: '20px'}}>
                <p style={styles.ques}>{item.question}</p>
                <div style={styles.quesOption}>
                  {item.options.length
                    ? item.options.map((val, index) => {
                        const isSelected = val.status === true;
                        return (
                          <p
                            //onClick={() => onSelectOption(item, val)}
                            onClick={() => {
                              onSaveHandler(item.question_id, val._id);
                            }}
                            key={index}
                            style={{
                              ...styles.optionStyle,
                              backgroundColor: isSelected
                                ? generateDynamicColor(index)
                                : '#fff',
                              border: `1px solid ${generateDynamicColor(
                                index,
                              )}`,
                            }}>
                            {val.optionValue}
                          </p>
                        );
                      })
                    : null}
                </div>
              </div>
            );
          })
        : null}
      {assessmentQues.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSave(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}

      {/**********************content************** */}
      <div style={commonStyles.contentLeftBorder}>
        {resultText && resultText != ''
          ?               
                  <CardContent
                    key={''}
                    content={ReactHtmlParser(resultText)}
                  />
    
             
          : null}
      </div>

      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TwentySeven;
const styles = {
  contentText: {
    marginTop: '20px',
  },
  imageWrapper: {
    width: '180px',
    height: '180px',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginBottom: '30px',
  },
  imageTag: {width: '100%', height: '100%'},
  audioDiv: {
    marginBottom: '40px',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    // border: '1px solid red',
  },
  button: {width: '20%', marginBottom: '50px'},
  optionStyle: {
    textAlign: 'center',
    width: DEVICE_WIDTH > 767 ? '20%' : '48%',
    paddingTop: '7px',
    paddingBottom: '7px',
    marginTop: '12px ',
  },
  quesOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  ques: {
    textAlign: 'center',
    paddingTop: '7px',
    paddingBottom: '7px',
    backgroundColor: LIGHT_GRAY,
  },
};
