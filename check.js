/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import commonStyles from '../commonStyles';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getItem} from '../../../utils/AsyncUtils';
import * as AppActions from '../../../actions';
import {translate as ts} from '../../../i18n/translate';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
const {IMAGE_BASE_URL, ACTION_TYPE, COLORS} = GLOBALS;
const {YELLOW, WHITE, CIRCLE_GRAY, RED, GREEN_TEXT, GRAY} = COLORS;
const userId = getItem('userId');
const emptyTextInputsHandler = (arr = []) => {
  if (arr.length) {
    const x = arr.map((item) => {
      const {sub_heading = []} = item;
      let isAdd_One = false;
      let isAdd_Two = false;
      let isAdd = false;
      if (sub_heading.length) {
        sub_heading.forEach((e, i) => {
          const {textInput = []} = e;
          if (i === 0) {
            if (textInput.length) {
              textInput.forEach((v) => {
                isAdd_One = v.inputOne ? true : false;
              });
            }
          }
          if (i === 1) {
            if (textInput.length) {
              textInput.forEach((v) => {
                isAdd_Two = v.inputOne ? true : false;
              });
            }
          }
        });
      }
      isAdd = isAdd_One || isAdd_Two;
      return {
        ...item,
        sub_heading: sub_heading.length
          ? sub_heading.map((val, i) => {
              const {textInput = []} = val;
              if (isAdd) {
                return {
                  ...val,
                  textInput: [
                    ...textInput,
                    {
                      inputOne: '',
                      order: i + 1,
                      assessment_content_id: val._id,
                      type: val.order === 1 ? 'first' : 'second',
                    },
                  ],
                };
              } else {
                return val;
              }
            })
          : [],
      };
    });
    return x;
  }
};
const textInputsMapper = (arr = []) => {
  // console.log('arr>>>>>>>>>', arr);
  let temp = [];
  if (arr.length) {
    const unqHId = [...new Set(arr.map((item) => item._id))];
    let temp_one = [];
    if (unqHId.length) {
      unqHId.forEach((val) => {
        temp_one.push({
          _id: val,
          content: '',
          order: '',
          assessment_content_id: '',
          content_id: '',
        });
      });
    }
    if (temp_one.length) {
      temp_one = temp_one.map((item) => {
        // console.log('templa one >>>>>>>', item);
        const subHIData = arr.filter((e) => e._id === item._id);
        // console.log('subHI data>>>>>>>', subHIData);
        return {
          ...item,
          sub_heading: subHIData.length
            ? subHIData.map((data) => {
                //  console.log('data>>>>>>>subhi data', data);
                return {
                  _id: data.sub_heading_id,
                  assessment_content_id: data.sub_heading_id,
                  inputOne: data.inputOne,
                  order: data.order,
                  type: data.type,
                  content_id: data.content_id,
                };
              })
            : [],
        };
      });

      temp_one = temp_one.length
        ? temp_one.map((item) => {
            if (item.sub_heading.length) {
              const unqSID = [...new Set(item.sub_heading.map((e) => e._id))];
              //console.log('unisid>>>>>>>>', unqSID);
              let reSubHeading = [];
              unqSID.forEach((e) => {
                reSubHeading.push({_id: e});
              });
              reSubHeading = reSubHeading.map((e) => {
                // console.log('e>>>>>>>>subheading', e);
                return {
                  ...e,
                  textInput: item.sub_heading.filter((s) => s._id === e._id),
                };
              });
              // console.log('reSub heading', reSubHeading);
              return {...item, sub_heading: reSubHeading};
            } else {
              return [];
            }
          })
        : [];
      temp = temp_one;
    }
  }
  // console.log('temp one <<<<<<one<<', temp);
  return temp;
};
const extractInputs = (id, sId, arr) => {
  //console.log('arr>>>>>>>>>', arr, sId, id);
  const temp = [];
  if (arr.length) {
    arr.forEach((item) => {
      if (item._id === id) {
        if (item.sub_heading.length) {
          item.sub_heading.forEach((e) => {
            if (e._id === sId) {
              temp.push(...e.textInput);
            }
          });
        }
      }
    });
  }
  console.log('temp>>>>>>>>>', temp);
  return temp;
};
const saveDateValidator = (arr = []) => {
  let temp = [];
  if (arr.length) {
    temp = arr.map((item) => {
      const {content = []} = item;
      let orderArr = [];
      let modContent = [];
      if (content.length) {
        content.forEach((e) => {
          orderArr.push(e.order);
        });
        let unqOrder = [...new Set(orderArr)];
        unqOrder.forEach((v) => {
          let data = content.filter(
            (x) => x.order === v && content !== '' && x.order !== '',
          );
          const pushedLen = data.length
            ? data.filter((l) => l.content === '').length
            : 0;
          if (pushedLen === 0 || pushedLen === 1) {
            modContent.push(...data);
          }
        });
      }

      return {...item, content: modContent};
    });
  }
  return temp;
};
const ThirtyFour = (props) => {
  const {assessmentData: {heading = []} = {}, userAssessmentData = []} =
    useSelector((state) => state.moduleOne);
  const [inputs, setInputs] = useState([]);
  const dispatch = useDispatch();
  const {
    card_title,
    card_time,
    descriptions,
    quotes,
    images,
    assessment_id,
    content,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const {assessments} = props;
  console.log('iuser assessment data>>>>>>>>>', userAssessmentData, heading);
  useEffect(() => {
    heading.length &&
      setInputs(
        heading.map((item) => {
          const {sub_heading = []} = item;
          return {
            ...item,
            sub_heading: sub_heading.length
              ? sub_heading.map((ele) => {
                  return {
                    ...ele,
                    textInput: [
                      {
                        inputOne: '',
                        assessment_content_id: ele._id,
                        type: ele.order === 1 ? 'first' : 'second',
                      },
                    ],
                  };
                })
              : [],
          };
        }),
      );
  }, [heading]);
  useEffect(() => {
    let cardsData = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        cardsData.push(...item.cards);
      });
    }
    //console.log('cards data>>>>>>', cardsData.length);
    let cardsContent = cardsData.length
      ? cardsData.map((item) => {
          //  console.log('card content>>>>>>>>', item);
          return {
            _id: item.assessment_heading_id,
            assessment_content_id: item.assessment_content_id,
            sub_heading_id: item.assessment_content_id,
            inputOne: item.content,
            type: item.type,
            order: item.order,
            content_id: item._id,
          };
        })
      : [];
    //  console.log('cards data>>>>>>>>>>>cards', cardsContent);
    const mappedInputsData = textInputsMapper(cardsContent);
    // console.log('mapped', mappedInputsData);
    if (inputs.length) {
      let x = inputs.map((item) => {
        return {
          ...item,
          sub_heading: item.sub_heading.length
            ? item.sub_heading.map((e) => {
                const extract = extractInputs(
                  item._id,
                  e._id,
                  mappedInputsData,
                );
                return {
                  ...e,
                  textInput: mappedInputsData.length
                    ? extract.length
                      ? extract
                      : [
                          {
                            order: '',
                            content: '',
                            inputOne: '',
                            assessment_content_id: e._id,
                          },
                        ]
                    : [
                        {
                          order: '',
                          content: '',
                          inputOne: '',
                          assessment_content_id: e._id,
                        },
                      ],
                };
              })
            : [],
        };
      });
      // console.log('x>>>>>>>>>>>>', x);
      if (x.length) {
        setInputs(emptyTextInputsHandler(x));
      }
    }
  }, [userAssessmentData]);

  const onChangeHandler = (hId, sId, i, e) => {
    if (inputs.length) {
      const temp = inputs.map((item) => {
        // console.log('inputs?????on change handler', item);
        return {
          ...item,
          sub_heading: item.sub_heading.map((ele) => {
            if (ele._id === sId && item._id === hId) {
              return {
                ...ele,
                textInput: ele.textInput.map((val, index) => {
                  //   console.log('val>>>>>.on change handler', val);
                  if (index === i) {
                    return {
                      ...val,
                      inputOne: e.target.value,
                      order: val.order || index,
                      assessment_content_id: ele._id,
                      type: ele.order === 1 ? 'first' : 'second',
                    };
                  } else {
                    return val;
                  }
                }),
              };
            } else {
              return ele;
            }
          }),
        };
      });
      setInputs(temp);
    }
  };
  const addHandler = (hId, sId, i, type) => {
    // console.log('hid>>>>>>>add handler>>>', type);
    if (inputs.length) {
      const temp = inputs.map((item) => {
        return {
          ...item,
          sub_heading: item.sub_heading.map((ele) => {
            //  console.log('add handler >>>>>>', ele);

            if (item._id === hId) {
              return {
                ...ele,
                textInput: [
                  ...ele.textInput,
                  {
                    inputOne: '',
                    order: i + 1,
                    assessment_content_id: ele._id,
                    type: ele.order === 1 ? 'first' : 'second',
                  },
                ],
              };
            } else {
              return ele;
            }
          }),
        };
      });
      setInputs(temp);
    }
  };

  const deleteHandler = (hId, i, item, val) => {
    let temp = [];
    if (inputs.length) {
      temp = inputs.map((item) => {
        if (item._id === hId) {
          return {
            ...item,
            sub_heading: item.sub_heading.length
              ? item.sub_heading.map((e) => {
                  return {
                    ...e,
                    textInput: e.textInput.length
                      ? e.textInput.filter((_e, idx) => idx !== i)
                      : [],
                  };
                })
              : [],
          };
        } else {
          return item;
        }
      });
    }
    setInputs(temp);

    let selectedArray = [];
    item.sub_heading.map((ele) => {
      ele.textInput.map((element) => {
        if (element.order === val.order) {
          selectedArray.push(element);
        }
      });
    });
    let contentIdsArray = selectedArray.map((ele) => ele.content_id);
    let isAPICall = false;
    if (contentIdsArray.length) {
      const tempCall = contentIdsArray.find(
        (val) => val !== undefined || val !== 0 || val !== '',
      );
      console.log('tempcall>>>>>', tempCall, tempCall ? true : false);
      isAPICall = tempCall ? true : false;
    }
    if (contentIdsArray.length && isAPICall) {
      dispatch(
        AppActions.deleteUserAssessmentData(
          contentIdsArray[0],
          props._id,
          assessment_id,
          contentIdsArray,
        ),
      );
    }
  };

  const onSave = () => {
    const modifiedAssessment = inputs.length
      ? inputs.map((item) => {
          const temp = {assessment_heading_id: item._id, content: []};
          let x = [];
          if (item.sub_heading.length) {
            item.sub_heading.forEach((ele) => {
              if (ele.textInput.length) {
                x.push(...ele.textInput);
              }
            });
          }
          let y = x.length
            ? x.map((val) => {
                // console.log('val inpute>>>>>>', val);
                return {
                  ...val,
                  content: val.inputOne,
                };
              })
            : [];
          temp.content.push(...y);
          return temp;
        })
      : [];

    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: saveDateValidator(modifiedAssessment),
    };
    let content = [];
    let isAPICall = false;
    if (modifiedAssessment.length) {
      modifiedAssessment.forEach((item) => content.push(...item.content));
      isAPICall = content
        .map((item) => item.inputOne)
        .filter((val) => val !== '').length
        ? true
        : false;
      console.log('empty check>>>>.', isAPICall);
    }
    //  console.log('params>>>>>>>>>', JSON.stringify(params));
    if (modifiedAssessment.length && isAPICall) {
      if (userAssessmentData && userAssessmentData.length) {
        console.log('update item params>>>>>>>>', params);
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
      } else {
        console.log('save item params>>>>>>>>', JSON.stringify(params));
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please perform your exercise',
      });
    }
  };
  console.log('inputs>>>>>>>>>', inputs);
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
      {/*****************assessment description***************** */}
      <div style={commonStyles.assessmentWrapper}>
        {images && images.length
          ? images.map((item, i) => {
              return (
                <CustomImage
                  key={i}
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  style={{
                    ...commonStyles.assessImage,
                    display: item.image !== '' ? 'flex' : 'none',
                  }}
                />
              );
            })
          : []}
        {assessments && assessments.length
          ? assessments.map((item, i) => {
              return (
                <CardDescription
                  key={i}
                  style={commonStyles.assessDesc}
                  description={ReactHtmlParser(item.description)}
                />
              );
            })
          : []}
      </div>
      <div>
        {inputs.length
          ? inputs
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, index) => {
                return (
                  <div>
                    <CardContent
                      key={index}
                      content={ReactHtmlParser(item.heading)}
                      style={{
                        ...styles.contentHeading,
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                      {item.sub_heading.length
                        ? item.sub_heading
                            .sort((a, b) => (a.order > b.order && 1) || -1)
                            .map((ele, idx, subArr) => {
                              const sId1 = subArr.length
                                ? subArr[0]._id || null
                                : null;
                              const sId2 = subArr.length
                                ? subArr[1]._id || null
                                : null;
                              return (
                                <div
                                  style={{
                                    width: ele.order === 1 ? '30%' : '68%',
                                  }}>
                                  <div
                                    style={{
                                      backgroundColor: YELLOW,
                                      borderRadius: '5px',
                                      border: `1px solid ${YELLOW}`,
                                      paddingTop: '10px',
                                      marginBottom: '30px',
                                    }}>
                                    <p
                                      style={{
                                        color: WHITE,
                                        textAlign: 'center',
                                      }}>
                                      {ReactHtmlParser(ele.name)}
                                    </p>
                                  </div>
                                  {ele.textInput.length
                                    ? ele.textInput
                                        .sort(
                                          (a, b) =>
                                            (a.createdAt < b.createdAt && 1) ||
                                            -1,
                                        )
                                        .map((val, i, arr) => {
                                          const showPlus =
                                            idx === 1 && i === arr.length - 1;
                                          const isDelete =
                                            idx === 1 && i < arr.length - 1;
                                          return (
                                            <div style={styles.plusIconWrapper}>
                                              <input
                                                type="text"
                                                className="f-field"
                                                name={ele.name}
                                                // placeholder={`${ele.name}`}
                                                style={styles.selectedText}
                                                value={val.inputOne}
                                                onChange={(e) =>
                                                  onChangeHandler(
                                                    item._id,
                                                    ele._id,
                                                    i,
                                                    e,
                                                  )
                                                }
                                              />

                                              {showPlus ? (
                                                <div
                                                  style={{
                                                    ...styles.circleDiv,
                                                    // backgroundColor: item.value.length
                                                    //   ? GREEN_TEXT
                                                    //   : GRAY,
                                                  }}
                                                  onClick={() => {
                                                    addHandler(
                                                      item._id,
                                                      ele._id,
                                                      i,
                                                      val.type,
                                                    );
                                                  }}>
                                                  <span style={styles.plusIcon}>
                                                    +
                                                  </span>
                                                </div>
                                              ) : null}
                                              {isDelete ? (
                                                <div
                                                  style={{
                                                    ...styles.circleCrossDiv,
                                                    // backgroundColor: item.value.length
                                                    //   ? GREEN_TEXT
                                                    //   : GRAY,
                                                  }}
                                                  onClick={() => {
                                                    deleteHandler(
                                                      item._id,
                                                      i,
                                                      item,
                                                      val,
                                                    );
                                                  }}>
                                                  <span
                                                    style={{
                                                      ...styles.plusIcon,
                                                      fontSize: '20px',
                                                    }}>
                                                    x
                                                  </span>
                                                </div>
                                              ) : null}
                                            </div>
                                          );
                                        })
                                    : null}
                                </div>
                              );
                            })
                        : null}
                    </div>
                  </div>
                );
              })
          : null}
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={() => onSave()}>
            {ts('SAVE')}
          </button>
        </div>
      </div>
      {/*************Content************ */}
      <div style={{...commonStyles.contentLeftBorder, marginBottom: '20px'}}>
        {content && content.length
          ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                return (
                  <CardContent
                    key={i}
                    content={ReactHtmlParser(item.content)}
                  />
                );
              })
          : []}
      </div>
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};
export default ThirtyFour;

const styles = {
  contentHeading: {
    backgroundColor: CIRCLE_GRAY,
    color: WHITE,
    textAlign: 'center',
    paddingTop: '10px',
    paddingBottom: '2px',
    borderRadius: '5px',
  },
  circleDiv: {
    backgroundColor: GRAY,
    width: '35px',
    height: '35px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-20px',
    top: '5px',
  },
  plusIconWrapper: {
    display: 'flex',
    position: 'relative',
  },
  wrapper: {marginTop: '40px'},
  circleCrossDiv: {
    backgroundColor: RED,
    width: '25px',
    height: '25px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-12px',
    top: '-10px',
  },
  plusIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: 'WHITE',
    fontSize: '25px',
  },
  selectedText: {
    backgroundColor: '#F1F3FA',
    width: '100%',
    marginBottom: '30px',
    // marginTop: '3%',
  },
};
