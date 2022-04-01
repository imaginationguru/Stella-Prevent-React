/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {TextInput, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import ExerciseBox from '../../../components/ExerciseBox';
import {translate as ts} from '../../../i18n/translate';
import Calendar from 'react-calendar';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import commonStyles from '../commonStyles';
import moment from 'moment';
import arrowDown from '../../../assets/images/arrowDown.png';
import upArrow from '../../../assets/images/upArrow.png';
import {Dimensions, Modal, TouchableOpacity} from 'react-native';
import {navigatorPush} from '../../../config/navigationOptions';
import leftArrow from '../../../assets/images/leftArrow.svg';
import header1 from '../../../assets/images/BANNER-1.gif';
import menu from '../../../assets/images/menu.svg';
import Menu from '../../../components/Menu';
import week1 from '../../../assets/images/Week1.svg';
import _ from 'lodash';
import {customAlert} from '../../../helpers/commonAlerts.web';
const DEVICE_WIDTH = Dimensions.get('window').width;

const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {YELLOW, WHITE, CIRCLE_GRAY, LIGHT_GRAY, GRAY, RED, GREEN_TEXT} = COLORS;
let userId = getItem('userId');

const InputBoxWithContent = (props) => {
  const {
    title,
    placeholder,
    value,
    onChange,
    style,
    name,
    boxWrapper,
    disable,
  } = props;
  return (
    <div style={{...styles.inputBoxWrapper, ...boxWrapper}}>
      <div style={style}>
        <p style={styles.header}>{title}</p>
      </div>
      <div style={styles.inputBox}>
        <form noValidate>
          <textarea
            type="description"
            // className="f-field"
            value={value}
            name={name}
            onChange={onChange}
            required
            placeholder={placeholder}
            style={styles.inputStyle}
            rows={3}
            disabled={disable}
          />
        </form>
      </div>
    </div>
  );
};
const Thirty = (props, componentId) => {
  const [inputs, setInputs] = useState([]);
  const [firstHeaderId, setFirstHeaderId] = useState([]);
  const [firstHeaderContent, setFirstHeaderContent] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueSecond, setSelectedValueSecond] = useState('');
  const [assessmentSecond, setAssessmentSecond] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [newUserInputs, setNewUserInputs] = useState([]);
  const [userDate, setUserDate] = useState([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [secondAssemssmentArray, setSecondAssessmentArray] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [value, onChange] = useState(new Date());
  const [allCards, setAllCards] = useState([]);
  const [getCardsData, setGetCardsData] = useState([]);
  const [getCardsInputs, setGetCardsInputs] = useState([]);
  const [allCardsData, setAllCardsData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [updateInputData, setUpdateInputData] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  // const [secondIdFilledData, setSecondIdFilledData] = useState([]);
  const [secondIdAllCards, setSecondIdAllCards] = useState([]);
  const [getSecondAssessment, setGetSecondAssessment] = useState([]);
  const [secondAssessmentData, setSecondAssessmentData] = useState([]);
  const [finalUpdateData, setFinalUpdateData] = useState([]);
  const [getInputCardsIndex, setGetInputCardsIndex] = useState('');
  const [objContentIndex, setObjContentIndex] = useState('');
  const {
    card_title,
    descriptions,
    card_time,
    images,
    quotes,
    content,
    assessment_id,
    assessment_id2,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const dispatch = useDispatch();
  const {
    assessmentData = {},
    assessmentData2 = {},
    //  userAssessmentData = [],
    multiAssessmentData = [],
  } = useSelector((state) => state.moduleOne);
  // console.log(
  //   'user assessmnet????????? template 30',

  //   'getUserMultiAssessment',
  //   JSON.stringify(multiAssessmentData),
  // );

  const dataMapperAss = (arr = []) => {
    let contentLength = multiAssessmentData && multiAssessmentData.length;
    let temp = [];
    if (arr.length) {
      temp = arr.map((item) => {
        return {
          assessment_header_id: item._id,
          content: [
            {
              content: item.value,
              order: item.order,
              contentIndex: contentLength,
            },
          ],
        };
      });
    }
    return temp;
  };
  useEffect(() => {
    dispatch(AppActions.getAssessmentDataSecond(assessment_id2));
    dispatch(AppActions.getUserMultiAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment_id2]);

  useEffect(() => {
    dispatch(AppActions.getUserMultiAssessment(props._id, assessment_id));
  }, []);
  const {isDashboardModal} = useSelector((state) => state.common);
  useEffect(() => {
    let headers =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers
        : [];
    let headerId =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers[0]._id
        : [];
    setFirstHeaderId(headerId);
    headers &&
      headers.length &&
      setInputs(
        headers.map((item) => {
          return {
            name: item.header,
            placeholder: item.description,
            order: item.order,
            //  value: '',
            value: item.value,
            _id: item._id,
          };
        }),
      );
    // dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData, assessment_id]);
  useEffect(() => {
    let cardsInputs = [];
    getCardsData &&
      getCardsData.length &&
      getCardsData.forEach((item) =>
        cardsInputs.push(
          item.data.map((val) => {
            return {
              name: val.assessment_header && val.assessment_header[0].header,
              placeholder: val.description ? val.description : '',
              order: val.order,
              value: val.content,
              _id: val._id,
              assessment_header_id: val.assessment_header_id,
              assessment_id: val.assessment_id,
            };
          }),
        ),
      );
    setGetCardsInputs(cardsInputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCardsData]);

  useEffect(() => {
    let firstAssessmentCards = [];
    let secondAssessmentCards = [];
    multiAssessmentData &&
      multiAssessmentData.length &&
      multiAssessmentData.forEach((item) =>
        firstAssessmentCards.push(
          item.cards
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((item) => item.assessment_id === assessment_id)
            .map((val) => {
              //  console.log('val??????get cards inputs', val);
              return {
                name: val.assessment_header && val.assessment_header[0].header,
                placeholder: val.description ? val.description : '',
                order: val.order,
                value: val.content,
                _id: val._id,
                assessment_header_id: val.assessment_header_id,
                assessment_id: val.assessment_id,
                contentIndex: val.contentIndex,
              };
            }),
        ),
      );
    setFirstHeaderContent(firstAssessmentCards);
    multiAssessmentData &&
      multiAssessmentData.length &&
      multiAssessmentData.forEach((item, i) =>
        secondAssessmentCards.push(
          item.cards
            //  .sort((a, b) => (a.order > b.order && 1) || -1)
            // .filter((item) => item.assessment_id === assessment_id)
            .map((val) => {
              //  console.log('val??????get cards inputs', val);
              if (val.assessment_id === assessment_id) {
                return {
                  name:
                    val.assessment_header && val.assessment_header[0].header,
                  placeholder: val.description ? val.description : '',
                  order: val.order,
                  value: val.content,
                  _id: val._id,
                  assessment_header_id: val.assessment_header_id,
                  assessment_id: val.assessment_id,
                  contentIndex: val.contentIndex,
                };
              } else {
                return {
                  secondAssessment: {
                    name:
                      val.assessment_header && val.assessment_header[0].header,
                    placeholder: val.description ? val.description : '',
                    order: val.order,
                    value: val.content,
                    _id: val._id,
                    assessment_header_id: val.assessment_header_id,
                    assessment_id: val.assessment_id,
                    assessment_header_order:
                      val.assessment_header[0] &&
                      val.assessment_header[0].order,
                    contentIndex: val.contentIndex,
                    content: [],
                  },
                };
              }
            }),
        ),
      );
    let secondIdData = [];
    let y =
      secondAssessmentCards &&
      secondAssessmentCards.length &&
      secondAssessmentCards.map((val) => {
        console.log('val??', val.secondAssessment);
        return val.filter((item) => item.secondAssessment !== undefined);
      });
    y.length &&
      y.forEach((item) =>
        secondIdData.push(
          item
            .sort(
              (a, b) =>
                (a.assessment_header_order > b.assessment_header_order && 1) ||
                -1,
            )
            .map((val) => {
              return {...val.secondAssessment};
            }),
        ),
      );

    setSecondAssessmentData(secondIdData);

    let modifyArray = [];
    if (secondAssessmentData.length) {
      secondAssessmentData.forEach((item) => {
        modifyArray.push(...item);
      });
    }
    console.log(
      'modify aarray',
      modifyArray,
      'objContentIndex',
      objContentIndex,
    );
    let hash = Object.create(null),
      result = secondAssessmentData.map((item) =>
        item.reduce(function (r, o) {
          if (!hash[o.assessment_header_id]) {
            hash[o.assessment_header_id] = {
              assessment_header_id: o.assessment_header_id,
              content: [],
              name: o.name,
              placeholder: o.description,
              order: o.order,
              value: o.value,
              _id: o._id,
              assessment_id: o.assessment_id,
              assessment_header_order: o.assessment_header_order,
              contentIndex: o.contentIndex,
            };
            r.push(hash[o.assessment_header_id]);
          }
          hash[o.assessment_header_id].content.push({
            content: o.value,
            contentIndex: o.contentIndex,
          });
          return r;
        }, []),
      );

    console.log('result', result);

    let newArray = firstAssessmentCards.map((obj, index) => ({
      obj,
      secondAssessment: [result[index]],
    }));

    let newArray1 = firstAssessmentCards.map((obj, index) => ({
      obj,
      secondAssessment: result,
    }));
    console.log('new array', newArray1, newArray);
    setGetCardsInputs(newArray1);
    console.log('new array', getCardsInputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiAssessmentData]);

  useEffect(() => {
    let temp = [];
    getCardsInputs &&
      getCardsInputs.length &&
      getCardsInputs.forEach((item) => temp.push(item));
    setAllCardsData(temp);
  }, [getCardsInputs]);

  useEffect(() => {
    let uniqueTime = [];
    let temp = [];
    if (allCards.length) {
      uniqueTime = new Set(allCards.map((val) => val.updatedAt));
      uniqueTime.forEach((val) =>
        temp.push({
          updatedAt: val,
          data: allCards
            .sort((a, b) => (a.createdAt < b.createdAt && 1) || -1)
            .filter((item) => val === item.updatedAt),
        }),
      );
      setGetCardsData(temp);
    }
  }, [allCards]);
  // console.log(
  //   'get cards data filtered by unique update time ',
  //   getCardsData,
  //   'all cards data array',
  //   allCards,
  //   'get Cards data input',
  //   getCardsInputs,
  // );
  // useEffect(() => {
  //   let cardData = [];
  //   let cardsData = [];
  //   let secondCardsData = [];
  //   const assessmentCards = [];
  //   const assessmentCardsCopy = [];
  //   // console.log('user assessment data', JSON.stringify(userAssessmentData));
  //   if (userAssessmentData.length) {

  //     userAssessmentData
  //       .filter((item) => item._id.assessment_header_id === firstHeaderId)
  //       .forEach((val) => cardData.push(...val.cards));
  //     setFirstHeaderContent(cardData);

  /*cards data */
  //userAssessmentData.forEach((val) => cardsData.push(...val.cards));
  // userAssessmentData.forEach((val) =>
  //   val.cards
  //     .filter((item) => item.assessment_id === assessment_id)
  //     .map((ele) => cardsData.push(ele)),
  // );
  // setAllCards(cardsData);

  // userAssessmentData.forEach((val) =>
  //   val.cards
  //     .filter((item) => item.assessment_id === assessment_id2)
  //     .map((ele) => secondCardsData.push(ele)),
  // );
  // setSecondIdAllCards(secondCardsData);

  // // {second assessment logic}
  // let secondAssmentData = userAssessmentData.map((item) => {
  //   return item.cards.filter((fil) => fil.assessment_id === assessment_id2);
  // });

  // var assessmentTwoArray = secondAssmentData.filter(
  //   (value) => Object.keys(value).length !== 0,
  // );

  // assessmentTwoArray.forEach((item) => {
  //   assessmentCards.push(...item);
  //   assessmentCardsCopy.push(...item);
  // });
  // setSecondAssessmentArray(assessmentCards);

  // let sortedArray = assessmentCards.map((element) => {
  //   let selectedFormat = [];
  //   let header_id, assessmentId, orderValue;

  //   assessmentCardsCopy.forEach((item) => {
  //     if (
  //       element.assessment_header_id === item.assessment_header_id &&
  //       element.order === item.order
  //     ) {
  //       orderValue = item.order;
  //       header_id = item.assessment_header_id;
  //       assessmentId =
  //         item.assessment_header !== undefined &&
  //         item.assessment_header.length
  //           ? item.assessment_header.map((val) => {
  //               return val.assessment_id;
  //             })
  //           : null;

  //       selectedFormat.push({
  //         content: item.content,
  //         order: item.order,
  //         type: item.type,
  //         assessment_content_id: item.assessment_header_id,
  //         content_id: item._id,
  //       });
  //     }
  //   });

  //   let finalValue = {
  //     content: selectedFormat,
  //     assessment_header_id: header_id,
  //     assessment_id: assessmentId,
  //     order: orderValue,
  //   };
  //   return finalValue;
  // });

  // let jsonObject = sortedArray.map(JSON.stringify);
  // let uniqueSet = new Set(jsonObject);
  // let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  // setUserInputs(uniqueArray);
  //   } else {
  //     console.log('else ');
  //   }
  // }, [userAssessmentData]);
  /******************First assessment data save************** */

  const onSaveMyths = () => {
    //e.preventDefault();
    console.log('inputs??????', inputs);
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: dataMapperAss(inputs),
    };

    let isValid = false;
    if (inputs && inputs.length) {
      let temp = [];
      inputs.forEach((item) => {
        temp.push(item.value);
      });
      console.log('temp??????', temp);
      if (temp.length) {
        isValid = temp.filter((item) => item === '').length === 0;
        // isValid = temp.some((item) => item !== '') ? true : false;
      }
    }
    console.log('inputs???? first assessment???', JSON.stringify(params));
    if (isValid) {
      console.log('is valid', isValid);
      //  dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      assessmentData.headers &&
        assessmentData.headers.length &&
        setInputs(
          assessmentData.headers.map((item) => {
            return {
              name: item.header,
              placeholder: item.description,
              order: item.order,
              //  value: '',
              value: item.value,
              _id: item._id,
            };
          }),
        );
    } else {
      customAlert('Please fill all fields', 'error');
    }
  };
  /******************Second assessment data save************** */
  const onSaveSecondAssessment = (e) => {
    e.preventDefault();
    //  onSaveMyths();
    let contentArray = [];

    let modifyUserInput = userInputs.map((item) => {
      let dummyArray = item.content.map((ele) => {
        return {
          content: ele.content,
          order: ele.order,
          assessment_header_id: ele.assessment_content_id,
          assessment_content_id: ele.content_id,
        };
      });
      return {
        assessment_header_id: item.assessment_header_id,
        content: dummyArray[0],
      };
    });

    assessmentSecond.forEach((element) => {
      let filterValue = modifyUserInput
        .filter((ele) => ele.assessment_header_id === element._id)
        .filter((ele) => ele.content !== '');
      contentArray.push(filterValue);
    });
    console.log('content array ', contentArray.length, userInputs);
    let isValid = false;
    if (inputs && inputs.length) {
      let temp = [];
      inputs.forEach((item) => {
        temp.push(item.value);
      });
      console.log('temp??????', temp);
      if (temp.length) {
        isValid = temp.filter((item) => item === '').length === 0;
        // isValid = temp.some((item) => item !== '') ? true : false;
      }
    }
    if (userInputs.length && isValid) {
      let contentLength = multiAssessmentData && multiAssessmentData.length;
      let modifyArray = contentArray.map((element, index) => {
        let dummyArray = element.map((ele) => {
          return {...ele.content, contentIndex: contentLength};
        });
        return {
          assessment_header_id: element[0].assessment_header_id,
          content: dummyArray,
        };
      });
      let firstParams = {
        user_id: userId,
        user_card_id: props._id,
        assessment_id: assessment_id2,
        assessment: modifyArray,
      };
      let params = {
        user_id: userId,
        firstAssessment: {
          user_card_id: props._id,
          assessment_id: assessment_id,
          assessment: dataMapperAss(inputs),
        },
        secondAssessment: {
          user_card_id: props._id,
          assessment_id: assessment_id2,
          assessment: modifyArray,
        },
      };
      console.log('modify array?????????', modifyArray);
      console.log('second params', JSON.stringify(firstParams));
      console.log('final params?????', JSON.stringify(params));
      dispatch(AppActions.saveMultiAssessment(params, onSubmitMessage));
      setUserInputs([]);
      setInputs(
        assessmentData.headers.map((item) => {
          return {
            name: item.header,
            placeholder: item.description,
            order: item.order,
            //  value: '',
            value: item.value,
            _id: item._id,
          };
        }),
      );
    } else {
      customAlert('Please perform your exercise', 'error');
    }
  };

  const setInputValue = (val) => {
    if (val !== undefined) {
      let input = val.map((e) => {
        return e.content;
      });
      return input;
    }
  };

  const onHandleChange = (e, item) => {
    console.log('inputs???????', inputs);
    const updateInputs = inputs.length
      ? inputs.map((val) => {
          return {
            ...val,
            value: val.name === e.target.name ? e.target.value : val.value,
          };
        })
      : [];

    setInputs(updateInputs);
  };
  /****************Second assessment data fetch*********** */
  useEffect(() => {
    if (assessmentData2.headers && assessmentData2.headers.length) {
      const x = assessmentData2.headers.map((item) => {
        return {
          header: item.header,
          _id: item._id,
          order: item.order,
          content: item.content.length
            ? item.content.map((ele) => {
                return {
                  content: ele.content,
                  order: ele.order,
                  assessment_header_id: ele.assessment_header_id,
                  _id: ele._id,
                };
              })
            : [],
        };
      });
      setAssessmentSecond(x);
    }
  }, [assessmentData2]);
  /**********************Drop down***************** */
  const onChangeDropDown = (e, id, item) => {
    let lastOrderObj = userInputs[userInputs.length - 1];
    let lastOrder;
    if (lastOrderObj !== undefined && lastOrderObj.order !== undefined) {
      lastOrder = lastOrderObj.order;
    } else {
      lastOrder = 0;
    }
    if (item.order === 0) {
      setSelectedValue(e.target.value);
    }
    if (item.order === 1) {
      setSelectedValueSecond(e.target.value);
    }

    let selectedValueArray = [];
    item.content.map((element) => {
      if (element._id === e.target.value) {
        selectedValueArray.push(element);
      }
    });
    if (newUserInputs.length) {
      let filterInput = newUserInputs.filter(
        (element) => element.assessment_header_id === id,
      );
      if (filterInput && filterInput.length) {
        filterInput[0].content[0].content = selectedValueArray[0].content;
        filterInput[0].content[0].content_id = selectedValueArray[0]._id;
      } else {
        let newArray = selectedValueArray.map((element) => {
          return {
            content: [
              {
                assessment_content_id: element.assessment_header_id,
                content: element.content,
                content_id: element._id,
                order: lastOrder + 1,
              },
            ],
            new_user_input: true,
            order: lastOrder + 1,
            assessment_header_id: element.assessment_header_id,
            assessment_id: assessment_id2,
          };
        });
        let concatArray = newUserInputs;
        Array.prototype.push.apply(concatArray, newArray);
        setNewUserInputs(concatArray);
      }
    } else {
      let newArray = selectedValueArray.map((element) => {
        return {
          content: [
            {
              assessment_content_id: element.assessment_header_id,
              content: element.content,
              content_id: element._id,
              order: lastOrder + 1,
            },
          ],
          new_user_input: true,
          order: lastOrder + 1,
          assessment_header_id: element.assessment_header_id,
          assessment_id: assessment_id2,
        };
      });
      let concatArray = newUserInputs;
      Array.prototype.push.apply(concatArray, newArray);
      setNewUserInputs(concatArray);
    }
  };

  const onDayChange = (date, item, index) => {
    let lastOrderObj = userInputs[userInputs.length - 1];
    let lastOrder;
    if (lastOrderObj !== undefined && lastOrderObj.order !== undefined) {
      lastOrder = lastOrderObj.order;
    } else {
      lastOrder = 0;
    }

    setInputVisible(false);
    let newArray = [];
    let obj = {
      content: [
        {
          assessment_content_id: item._id,
          content: moment(date).format('YYYY-MM-DD'),
          content_id: item.content.length ? item.content.content_id : null,
          order: lastOrder + 1,
          // contentIndex: index,
        },
      ],
      new_user_input: true,
      order: lastOrder + 1,
      assessment_header_id: item._id,
      assessment_id: assessment_id2,
    };
    newArray.push(obj);
    setUserDate(newArray);
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const headingOne =
    assessmentData.heading &&
    assessmentData.heading.length &&
    assessmentData.heading[0]
      ? assessmentData.heading[0].heading
      : null;
  const headingSecond =
    assessmentData.heading &&
    assessmentData.heading.length &&
    assessmentData.heading[1]
      ? assessmentData.heading[1].heading
      : null;

  const onCrossBtnClick = (val) => {
    let contentIdArray = userInputs.filter(
      (element) => element.order === val.order,
    );
    let contentIDS = contentIdArray.map((item) => {
      if (item.content.length) {
        return item.content[0].content_id;
      } else {
        return null;
      }
    });

    if (contentIdArray[0].new_user_input === true) {
      let filterData = userInputs.filter((ele) => ele.order !== val.order);
      setUserInputs(filterData);
    } else if (contentIDS.length && contentIDS[0] !== null) {
      setUserInputs(userInputs.filter((ele) => ele.content !== contentIDS[0]));
      setUserInputs(userInputs.filter((ele) => ele.content !== contentIDS[1]));
      setUserInputs(userInputs.filter((ele) => ele.content !== contentIDS[2]));
      dispatch(
        AppActions.deleteUserAssessmentDataNew(
          contentIDS[0],
          props._id,
          assessment_id,
          contentIDS[1],
          contentIDS[2],
        ),
      );
    }
  };
  const onPlusBtnClick = (item, i) => {
    console.log('new user inputs?????', newUserInputs, userDate, i);
    if (userDate.length && newUserInputs.length) {
      Array.prototype.push.apply(newUserInputs, userDate);
      let concatArray = userInputs;
      Array.prototype.push.apply(concatArray, newUserInputs);
      setUserInputs(concatArray);

      setUserDate([]);
      setNewUserInputs([]);
      setInputVisible(true);
      setSelectedValue('');
      setSelectedValueSecond('');
      setSelectedDate('');
    } else {
      customAlert('Please select value.', 'error');
    }
  };

  const headerColor = (order) => {
    if (order === 0) {
      return CIRCLE_GRAY;
    } else {
      return GREEN_TEXT;
    }
  };

  const onHandleChangeData = (e, ele, itemIndex, eleIndex) => {
    console.log('ee????????', ele, eleIndex, itemIndex, e.target.value);

    let x =
      getCardsInputs &&
      getCardsInputs.length &&
      getCardsInputs.map((item, i) => {
        console.log('item index 0', itemIndex, i, eleIndex);
        if (itemIndex === i) {
          console.log('item index');
          let y = item.obj.map((val, index) => {
            console.log('val 1067', val);
            if (eleIndex === index) {
              console.log('1071', e.target.value, val);
              return {
                ...val,
                value: e.target.value,
              };
            } else {
              return {...val};
            }
          });
          let xx = item.secondAssessment.map((item) => {
            return item;
          });
          let combineArray = {obj: y, secondAssessment: xx};
          setFinalUpdateData(combineArray);
          console.log('y???', y, xx, combineArray);
          return combineArray;
        } else {
          return item;
        }
      });

    console.log(
      'on handel change',
      getCardsInputs,
      'x????',
      x,
      'update input data',
      updateInputData,
    );
    setGetCardsInputs(x);
  };
  const onUpdateData = () => {
    let firstAssessment =
      finalUpdateData.obj &&
      finalUpdateData.obj.map((item) => {
        return {
          assessment_header_id: item.assessment_header_id,
          content: [
            {
              content: item.value,
              _id: item._id,
              order: item.order,
              contentIndex: item.contentIndex,
            },
          ],
        };
      });

    let updateSecondAssessment =
      userInputs.length &&
      userInputs.map((item) => {
        return {
          assessment_header_id: item.assessment_header_id,
          content: [
            {
              content: item.content[0].content,
              assessment_content_id: item.content[0].content_id,
              order: item.content[0].order,
              assessment_header_id: item.assessment_header_id,
              contentIndex: objContentIndex,
            },
          ],
        };
      });

    if (
      updateSecondAssessment.length &&
      updateSecondAssessment !== undefined &&
      firstAssessment === undefined
    ) {
      let updateParams = {
        user_id: userId,
        firstAssessment: {},
        secondAssessment: {
          user_card_id: props._id,
          assessment_id: assessment_id2,
          assessment: updateSecondAssessment,
        },
      };

      dispatch(
        AppActions.rearrangeMultiAssessments(
          updateParams,
          onSubmitMessage,
          props._id,
          assessment_id2,
        ),
      );
      setShowData('');
      setCommentModal(false);
      setUserInputs([]);
    } else if (
      firstAssessment.length !== 0 &&
      updateSecondAssessment.length !== 0 &&
      updateSecondAssessment !== undefined &&
      firstAssessment !== undefined &&
      userInputs.length
    ) {
      let updateParams = {
        user_id: userId,
        firstAssessment: {
          user_card_id: props._id,
          assessment_id: assessment_id,
          assessment: firstAssessment,
        },
        secondAssessment: {
          user_card_id: props._id,
          assessment_id: assessment_id2,
          assessment: updateSecondAssessment,
        },
      };

      dispatch(
        AppActions.rearrangeMultiAssessments(
          updateParams,
          onSubmitMessage,
          props._id,
          assessment_id,
        ),
      );
      setUserInputs([]);
      setShowData('');
      setCommentModal(false);
    } else if (firstAssessment.length && firstAssessment !== undefined) {
      console.log('only first assessment');
      let updateParams = {
        user_id: userId,
        firstAssessment: {
          user_card_id: props._id,
          assessment_id: assessment_id,
          assessment: firstAssessment,
        },
      };
      console.log('first params???', updateParams);
      dispatch(
        AppActions.rearrangeMultiAssessments(
          updateParams,
          onSubmitMessage,
          props._id,
          assessment_id,
        ),
      );
      setShowData('');
      setCommentModal(false);
    } else {
      console.log('else');
    }
  };

  const onCrossGetData = (ele) => {
    console.log('ele>>>>', ele);
    let x =
      ele.length &&
      ele.map((item) => {
        return item._id;
      });
    console.log('x delete', x[0], x[1], x[2]);
    dispatch(
      AppActions.deleteUserAssessmentDataNew(
        x[0],
        props._id,
        assessment_id2,
        x[1],
        x[2],
        true,
      ),
    );
    setShowData('');
    setCommentModal(false);
  };
  const openModal = () => {
    setCommentModal(true);
    setShowData('');
    dispatch(AppActions.getUserMultiAssessment(props._id, assessment_id));
  };
  console.log('getInput cards Index', getInputCardsIndex);
  console.log('userInputs', userInputs);
  return (
    <div>
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
      {/*******************************ASSESSMENT DESCRIPTION*********************** */}
      <div style={commonStyles.assessmentWrapper}>
        {images && images.length
          ? images
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                return (
                  <CustomImage
                    key={i}
                    src={
                      item.image !== ''
                        ? `${IMAGE_BASE_URL}${item.image}`
                        : null
                    }
                    style={{
                      ...commonStyles.assessImage,
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                  />
                );
              })
          : []}

        {props.assessments && props.assessments.length
          ? props.assessments.map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  style={commonStyles.assessDesc}
                  description={ReactHtmlParser(item.description)}
                />
              );
            })
          : []}
      </div>
      {inputs.length
        ? inputs
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, idx) => {
              return (
                <InputBoxWithContent
                  key={idx}
                  title={ReactHtmlParser(item.name)}
                  name={item.name}
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={(e) => onHandleChange(e, item)}
                  style={{
                    backgroundColor: headerColor(item.order),
                    width: DEVICE_WIDTH > 767 ? '20%' : '30%',
                  }}
                />
              );
            })
        : null}
      {/* {inputs.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null} */}
      {headingOne && headingOne.length ? (
        <CardContent
          content={ReactHtmlParser(headingOne)}
          style={{
            ...styles.contentHeading,
            backgroundColor: CIRCLE_GRAY,
            paddingBottom: '3px',
            marginTop: '50px',
          }}
        />
      ) : null}
      {/* <div onClick={() => updateData()}>updat</div> */}
      <div style={styles.secondAssessment}>
        {assessmentSecond.length
          ? assessmentSecond.map((item, i) => {
              return (
                <div
                  style={{
                    width: '33%',
                  }}>
                  <CardContent
                    key={i}
                    content={ReactHtmlParser(item.header)}
                    style={{
                      ...styles.contentHeading,
                      minHeight: DEVICE_WIDTH < 750 ? '70px' : '100px',
                    }}
                  />
                  {item.content && item.content.length ? (
                    <View style={{}}>
                      {userInputs && userInputs.length
                        ? userInputs
                            .sort((a, b) => (a.order > b.order && 1) || -1)
                            .filter((ele) => {
                              return ele.assessment_header_id === item._id;
                            })
                            .map((val, index) => {
                              return (
                                <div style={styles.crossIconWrapper}>
                                  <View style={{margin: 0, width: '100%'}}>
                                    <TextInput
                                      style={[
                                        styles.selectedText,
                                        {
                                          height: '50px',
                                          paddingLeft: 10,
                                          paddingTop: 10,
                                          // border: '1px solid red',
                                        },
                                      ]}
                                      underlineColorAndroid="transparent"
                                      multiline={true}
                                      disable={true}
                                      value={
                                        val.content && val.content.length
                                          ? setInputValue(val.content)
                                          : null
                                      }
                                      // value={setInputValue(val.content)}
                                    />
                                  </View>
                                </div>
                              );
                            })
                        : null}
                      <select
                        style={{
                          width: '100%',
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          paddingLeft: '10px',
                          backgroundColor: '#F1F3FA',
                          borderRadius: '5px',
                          border: `1px solid ${LIGHT_GRAY}`,
                        }}
                        value={
                          item.order === 0
                            ? selectedValue
                            : item.order === 1
                            ? selectedValueSecond
                            : ''
                        }
                        onChange={(e) => onChangeDropDown(e, item._id, item)}
                        onSelect={(e) => onChangeDropDown(e, item._id, item)}>
                        <option>select</option>
                        {item.content &&
                          item.content.length &&
                          item.content.map((option, idx) => {
                            return (
                              <option value={option._id}>
                                {`${option.content}`}
                              </option>
                            );
                          })}
                      </select>
                    </View>
                  ) : (
                    <View style={{marginTop: 0}}>
                      {userInputs && userInputs.length
                        ? userInputs
                            .sort((a, b) => (a.order > b.order && 1) || -1)
                            .filter((ele) => {
                              return ele.assessment_header_id === item._id;
                            })
                            .map((val, index) => {
                              return (
                                <div style={styles.crossIconWrapper}>
                                  <View style={{margin: 0, width: '100%'}}>
                                    <TextInput
                                      style={[
                                        styles.selectedText,
                                        {
                                          height: '50px',
                                          paddingLeft: 10,
                                          paddingTop: 10,
                                        },
                                      ]}
                                      underlineColorAndroid="transparent"
                                      multiline={true}
                                      disable={true}
                                      value={
                                        val.content && val.content.length
                                          ? setInputValue(val.content)
                                          : null
                                      }
                                    />
                                  </View>
                                  <div
                                    style={styles.circleCrossDiv}
                                    onClick={() => onCrossBtnClick(val)}>
                                    <span
                                      style={{
                                        ...styles.plusIcon,
                                        fontSize: '15px',
                                      }}>
                                      x
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                        : null}

                      {item.order === 2 ? (
                        <div
                          style={{
                            marginBottom: '2%',
                            position: 'relative',
                          }}>
                          <TextInput
                            style={{
                              backgroundColor: '#F1F3FA',
                              width: '100%',
                              height: 50,
                              paddingLeft: 5,
                            }}
                            placeholder={'yyyy-mm-dd'}
                            underlineColorAndroid="transparent"
                            value={
                              selectedDate !== ''
                                ? moment(selectedDate).format('YYYY-MM-DD')
                                : 'YYYY-MM-DD'
                            }
                            type="number"
                            editable={false}
                            onClick={() => {
                              setShowCalendar(true);
                            }}
                          />
                          {showCalendar ? (
                            <Calendar
                              onChange={onChange}
                              value={value}
                              maxDate={new Date()}
                              onClickDay={(date) => {
                                onDayChange(date, item, i);
                              }}
                            />
                          ) : null}
                          <div
                            onClick={() => onPlusBtnClick(item)}
                            style={{
                              ...styles.circleDiv,
                              backgroundColor:
                                selectedDate !== '' ? GREEN_TEXT : GRAY,
                            }}>
                            <span style={styles.plusIcon}>+</span>
                          </div>
                        </div>
                      ) : null}
                    </View>
                  )}
                </div>
              );
            })
          : []}
      </div>
      <div style={commonStyles.buttonWrapper}>
        <button
          className="btn-orange"
          onClick={(e) => onSaveSecondAssessment(e)}>
          {ts('SAVE')}
        </button>
      </div>
      {headingSecond && headingSecond.length ? (
        <CardContent
          content={ReactHtmlParser(headingSecond)}
          style={{
            ...styles.contentHeading,
            backgroundColor: YELLOW,
            paddingBottom: '3px',
          }}
        />
      ) : null}
      {/* {firstHeaderContent && firstHeaderContent.length
        ? firstHeaderContent.map((ele) =>
            ele
              .sort((a, b) => (a.i > b.i && 1) || -1)
              .map((item, index) => {
                return (
                  <CardContent
                    key={index}
                    content={ReactHtmlParser(item.content)}
                    style={{
                      padding: '10px',
                      backgroundColor: LIGHT_GRAY,
                    }}
                  />
                );
              }),
          )
        : []} */}

      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  onClick={() => {
                    openModal();
                  }}
                  key={index}
                  style={{marginTop: '20px', cursor: 'pointer'}}
                  content={ReactHtmlParser(item.content)}
                />
              );
            })
        : []}
      {/* <div onClick={() => openModal()}>
        <p>Click here..</p>
      </div> */}

      {/*//commentModal*/}
      {commentModal && (
        <Modal
          animationType="slide"
          visible={commentModal}
          onRequestClose={() => {
            setCommentModal(false);
          }}
          style={{
            backgroundColor: 'white',
          }}>
          <div style={{position: 'relative'}}>
            <img src={week1} style={{width: '100%'}} />
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => {
                dispatch(AppActions.dashboardModalAction(true));
                setCommentModal(false);
              }}>
              <img src={menu} />
            </TouchableOpacity>
          </div>
          <div
            style={{
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={() => {
              setCommentModal(false);
              setShowData('');
              setUserInputs([]);
              setSelectedValue('');
              setSelectedValueSecond('');
              setSelectedDate('');
            }}>
            <img src={leftArrow} style={styles.backButton} />
            Back
          </div>
          <div
            style={{
              overflowY: 'scroll',
              paddingBottom: '500%',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            {getCardsInputs && getCardsInputs.length ? (
              getCardsInputs.map((item, i) => {
                let visibleData = showData === i;
                return (
                  <div
                    style={{
                      width: '80%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}>
                    {visibleData ? (
                      <div onClick={() => setShowData(i)}>
                        {item.obj.length &&
                          item.obj.map((val, idx) => {
                            return (
                              <div>
                                {idx === 0 && (
                                  <div style={{position: 'relative'}}>
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (i === showData) {
                                          setShowData('');
                                        } else {
                                          setShowData(i);
                                        }
                                      }}
                                      style={styles.iconDiv}>
                                      <div style={styles.circleWrapper}>
                                        <img
                                          src={
                                            visibleData ? upArrow : arrowDown
                                          }
                                          color={'#fff'}
                                          style={styles.img}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <InputBoxWithContent
                                  key={idx}
                                  title={ReactHtmlParser(val.name)}
                                  name={val.name}
                                  placeholder={val.placeholder}
                                  value={val.value}
                                  onChange={(e) => {
                                    onHandleChangeData(e, val, i, idx);
                                  }}
                                  style={{
                                    backgroundColor: headerColor(val.order),
                                    width: DEVICE_WIDTH > 767 ? '20%' : '30%',
                                  }}
                                  disable={val.order === 0 ? true : false}
                                />
                              </div>
                            );
                          })}

                        <div>
                          {headingOne && headingOne.length ? (
                            <CardContent
                              content={ReactHtmlParser(headingOne)}
                              style={{
                                ...styles.contentHeading,
                                backgroundColor: CIRCLE_GRAY,
                                paddingBottom: '3px',
                                marginTop: '50px',
                              }}
                            />
                          ) : null}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            {item.secondAssessment.length &&
                              item.secondAssessment.map((ele) => {
                                console.log('second ele', ele);
                                return ele
                                  .sort(
                                    (a, b) =>
                                      (a.assessment_header_order >
                                        b.assessment_header_order &&
                                        1) ||
                                      -1,
                                  )
                                  .map((element, secondIndex) => {
                                    console.log('element ', element);
                                    return (
                                      <div style={{width: '33%'}}>
                                        <CardContent
                                          //  key={i}
                                          content={ReactHtmlParser(
                                            element.name,
                                          )}
                                          style={{
                                            ...styles.contentHeading,
                                            minHeight:
                                              DEVICE_WIDTH < 750
                                                ? '70px'
                                                : '100px',
                                          }}
                                        />

                                        {element.content &&
                                        element.content.length
                                          ? element.content
                                              .filter(
                                                (conIndex) =>
                                                  conIndex.contentIndex ===
                                                  objContentIndex,
                                              )
                                              .map((con, conI) => {
                                                return (
                                                  <div>
                                                    {secondIndex === 2 && (
                                                      <div
                                                        style={{
                                                          display: 'flex',
                                                          alignItems: 'end',
                                                          justifyContent: 'end',
                                                          position: 'relative',
                                                        }}
                                                        onClick={() =>
                                                          onCrossGetData(ele)
                                                        }>
                                                        <div
                                                          style={{
                                                            backgroundColor:
                                                              RED,
                                                            width: '25px',
                                                            height: '25px',
                                                            position:
                                                              'absolute',
                                                            borderRadius:
                                                              '100%',
                                                            top:
                                                              conI === 0
                                                                ? 0
                                                                : 0,
                                                            right: -11,
                                                          }}>
                                                          <p
                                                            style={{
                                                              alignItems:
                                                                'center',
                                                              justifyContent:
                                                                'center',
                                                              display: 'flex',
                                                              color: '#ffff',
                                                            }}>
                                                            x
                                                          </p>
                                                        </div>
                                                      </div>
                                                    )}
                                                    <TextInput
                                                      style={[
                                                        styles.selectedText,
                                                        {
                                                          height: '50px',
                                                          paddingLeft: 10,
                                                          paddingTop: 10,
                                                          // border: '1px solid red',
                                                          marginTop:
                                                            secondIndex === 2 &&
                                                            conI === 0
                                                              ? 0
                                                              : 0,
                                                        },
                                                      ]}
                                                      underlineColorAndroid="transparent"
                                                      multiline={true}
                                                      disable={true}
                                                      value={con.content}
                                                      // value={setInputValue(val.content)}
                                                    />
                                                  </div>
                                                );
                                              })
                                          : null}
                                      </div>
                                    );
                                  });
                              })}
                          </div>
                          <div style={styles.secondAssessment}>
                            {assessmentSecond.length
                              ? assessmentSecond.map((item) => {
                                  // console.log('item i', i);
                                  return (
                                    <div
                                      style={{
                                        width: '33%',
                                      }}>
                                      {item.content && item.content.length ? (
                                        <View>
                                          {userInputs && userInputs.length
                                            ? userInputs
                                                .sort(
                                                  (a, b) =>
                                                    (a.order > b.order && 1) ||
                                                    -1,
                                                )
                                                .filter((ele) => {
                                                  return (
                                                    ele.assessment_header_id ===
                                                    item._id
                                                  );
                                                })
                                                .map((val, index) => {
                                                  return (
                                                    <div
                                                      style={
                                                        styles.crossIconWrapper
                                                      }>
                                                      <View
                                                        style={{
                                                          margin: 0,
                                                          width: '100%',
                                                        }}>
                                                        <TextInput
                                                          style={[
                                                            styles.selectedText,
                                                            {
                                                              height: '50px',
                                                              paddingLeft: 10,
                                                              paddingTop: 10,
                                                              // border: '1px solid red',
                                                            },
                                                          ]}
                                                          underlineColorAndroid="transparent"
                                                          multiline={true}
                                                          disable={true}
                                                          value={
                                                            val.content &&
                                                            val.content.length
                                                              ? setInputValue(
                                                                  val.content,
                                                                )
                                                              : null
                                                          }
                                                          // value={setInputValue(val.content)}
                                                        />
                                                      </View>
                                                    </div>
                                                  );
                                                })
                                            : null}
                                          <select
                                            style={{
                                              width: '100%',
                                              paddingTop: '12px',
                                              paddingBottom: '12px',
                                              paddingLeft: '10px',
                                              backgroundColor: '#F1F3FA',
                                              borderRadius: '5px',
                                              border: `1px solid ${LIGHT_GRAY}`,
                                            }}
                                            value={
                                              item.order === 0
                                                ? selectedValue
                                                : item.order === 1
                                                ? selectedValueSecond
                                                : ''
                                            }
                                            onChange={(e) =>
                                              onChangeDropDown(
                                                e,
                                                item._id,
                                                item,
                                              )
                                            }
                                            onSelect={(e) =>
                                              onChangeDropDown(
                                                e,
                                                item._id,
                                                item,
                                              )
                                            }>
                                            <option>select</option>
                                            {item.content &&
                                              item.content.length &&
                                              item.content.map(
                                                (option, idx) => {
                                                  return (
                                                    <option value={option._id}>
                                                      {`${option.content}`}
                                                    </option>
                                                  );
                                                },
                                              )}
                                          </select>
                                        </View>
                                      ) : (
                                        <View>
                                          {userInputs && userInputs.length
                                            ? userInputs
                                                .sort(
                                                  (a, b) =>
                                                    (a.order > b.order && 1) ||
                                                    -1,
                                                )
                                                .filter((ele) => {
                                                  return (
                                                    ele.assessment_header_id ===
                                                    item._id
                                                  );
                                                })
                                                .map((val, index) => {
                                                  return (
                                                    <div
                                                      style={
                                                        styles.crossIconWrapper
                                                      }>
                                                      <View
                                                        style={{
                                                          margin: 0,
                                                          width: '100%',
                                                        }}>
                                                        <TextInput
                                                          style={[
                                                            styles.selectedText,
                                                            {
                                                              height: '50px',
                                                              paddingLeft: 10,
                                                              paddingTop: 10,
                                                            },
                                                          ]}
                                                          underlineColorAndroid="transparent"
                                                          multiline={true}
                                                          disable={true}
                                                          value={
                                                            val.content &&
                                                            val.content.length
                                                              ? setInputValue(
                                                                  val.content,
                                                                )
                                                              : null
                                                          }
                                                        />
                                                      </View>
                                                      <div
                                                        style={
                                                          styles.circleCrossDiv
                                                        }
                                                        onClick={() =>
                                                          onCrossBtnClick(val)
                                                        }>
                                                        <span
                                                          style={{
                                                            ...styles.plusIcon,
                                                            fontSize: '15px',
                                                          }}>
                                                          x
                                                        </span>
                                                      </div>
                                                    </div>
                                                  );
                                                })
                                            : null}

                                          {item.order === 2 ? (
                                            <div
                                              style={{
                                                marginBottom: '2%',
                                                position: 'relative',
                                              }}>
                                              <TextInput
                                                style={{
                                                  backgroundColor: '#F1F3FA',
                                                  width: '100%',
                                                  height: 50,
                                                  paddingLeft: 5,
                                                }}
                                                placeholder={'yyyy-mm-dd'}
                                                underlineColorAndroid="transparent"
                                                value={
                                                  selectedDate !== ''
                                                    ? moment(
                                                        selectedDate,
                                                      ).format('YYYY-MM-DD')
                                                    : 'YYYY-MM-DD'
                                                }
                                                type="number"
                                                editable={false}
                                                onClick={() => {
                                                  setShowCalendar(true);
                                                }}
                                              />
                                              {showCalendar ? (
                                                <Calendar
                                                  onChange={onChange}
                                                  value={value}
                                                  maxDate={new Date()}
                                                  onClickDay={(date) => {
                                                    onDayChange(date, item, i);
                                                  }}
                                                />
                                              ) : null}
                                              <div
                                                onClick={() =>
                                                  onPlusBtnClick(item, i)
                                                }
                                                style={{
                                                  ...styles.circleDiv,
                                                  backgroundColor:
                                                    selectedDate !== ''
                                                      ? GREEN_TEXT
                                                      : GRAY,
                                                }}>
                                                <span style={styles.plusIcon}>
                                                  +
                                                </span>
                                              </div>
                                            </div>
                                          ) : null}
                                        </View>
                                      )}
                                    </div>
                                  );
                                })
                              : []}
                          </div>

                          <div style={commonStyles.buttonWrapper}>
                            <button
                              className="btn-orange"
                              onClick={(e) => onUpdateData(e)}>
                              {ts('SAVE')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      item.obj &&
                      item.obj.length &&
                      item.obj.map((val, idx) => {
                        console.log('idx', idx, objContentIndex);
                        return (
                          <div
                            onClick={() =>
                              setObjContentIndex(val.contentIndex)
                            }>
                            {idx === 0 && (
                              <div style={{position: 'relative'}}>
                                <div
                                  onClick={() => {
                                    setShowData(i);
                                  }}
                                  style={styles.iconDiv}>
                                  <div style={styles.circleWrapper}>
                                    <img
                                      src={visibleData ? upArrow : arrowDown}
                                      color={'#fff'}
                                      style={styles.img}
                                    />
                                  </div>
                                </div>

                                <InputBoxWithContent
                                  key={idx}
                                  title={ReactHtmlParser(val.name)}
                                  name={val.name}
                                  placeholder={val.placeholder}
                                  value={val.value}
                                  onChange={(e) => {
                                    onHandleChangeData(e, val, idx, i);
                                  }}
                                  style={{
                                    backgroundColor: headerColor(val.order),
                                    width: DEVICE_WIDTH > 767 ? '20%' : '30%',
                                  }}
                                  disable={val.order === 0 ? true : false}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <p
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    fontSize: '22px',
                  }}>
                  No result found
                </p>
              </div>
            )}
          </div>

          {/*********************************MODAL POPUP FOR MENU START*************** */}
          {isDashboardModal && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isDashboardModal}
              onRequestClose={() => {
                dispatch(AppActions.dashboardModalAction(false));
              }}>
              <Menu
                modalVisible={() =>
                  dispatch(AppActions.dashboardModalAction(false))
                }
              />
            </Modal>
          )}
        </Modal>
      )}
      {showExercises && <ExerciseBox week={week} />}
    </div>
  );
};
export default Thirty;
const styles = {
  inputBoxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30px',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  secondAssessment: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '50px',
    // border: '1px solid blue',
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: WHITE,
    paddingTop: '30px',
  },
  inputBox: {width: DEVICE_WIDTH > 767 ? '78%' : '68%'},
  inputStyle: {
    backgroundColor: LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    width: '100%',
    paddingTop: '5px',
    paddingLeft: '5px',
  },
  contentHeading: {
    backgroundColor: YELLOW,
    color: WHITE,
    textAlign: 'center',
    padding: '10px',
    // paddingTop: '10px',
    // paddingBottom: '10px',
    borderRadius: '5px',
    // marginTop: '10px',
  },

  circleDiv: {
    backgroundColor: GRAY,
    width: '35px',
    height: '35px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-20px',
    top: '8px',
  },
  plusIconWrapper: {
    display: 'flex',
    marginBottom: '2%',
    position: 'relative',
  },
  plusIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: 'WHITE',
    fontSize: '25px',
  },
  circleCrossDiv: {
    backgroundColor: RED,
    width: '25px',
    height: '25px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-12px',
    top: '0px',
  },
  crossIconWrapper: {
    //  border: '1px solid red',
    display: 'flex',
    marginBottom: '15px',
    position: 'relative',
  },
  selectedText: {
    backgroundColor: '#F1F3FA',
    width: '100%',
    // marginBottom: '3%',
  },
  iconDiv: {
    display: 'flex',
    justifyContent: 'end',
    // marginTop: '20px',
    //  border: '1px solid red',
    position: 'absolute',
    right: 10,
    top: -15,
  },
  circleWrapper: {
    // border: '1px solid red',
    width: '30px',
    height: '30px',
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BUTTON_ORANGE,
  },
  img: {
    width: '20px',
    height: '20px',
    alignItems: 'center',
  },
  menuIcon: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },
  backButton: {
    padding: '20px',
  },
};
