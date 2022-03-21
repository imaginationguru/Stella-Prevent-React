/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import commonStyles from '../commonStyles';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../../utils/AsyncUtils';
import * as AppActions from '../../../actions';
import { translate as ts } from '../../../i18n/translate';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import moment from 'moment';
import { Dimensions } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const { IMAGE_BASE_URL, ACTION_TYPE, COLORS } = GLOBALS;
const { YELLOW, WHITE, CIRCLE_GRAY, RED, GREEN_TEXT, GRAY } = COLORS;
const userId = getItem('userId');
const saveDateValidator = (arr = []) => {
  let temp = [];
  if (arr.length) {
    temp = arr.map((item) => {
      const { content = [] } = item;
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

      return { ...item, content: modContent };
    });
  }
  return temp;
};
// TODO : NEW WAY

const userAssMapper = (arr = []) => {
  let temp = [];
  if (arr.length) {
    let onlyCardsData = [];
    arr.forEach((item) => {
      onlyCardsData.push(...item.cards);
    });
    temp = onlyCardsData.length
      ? onlyCardsData.map((item) => {
        return {
          assessment_content_id: item.assessment_content_id,
          assessment_heading_id: item.assessment_heading_id,
          content: item.content,
          order: item.order,
          type: item.type,
          createdAt: item.createdAt
            ? new Date(item.createdAt).getTime()
            : Date.now(),
          inputId: item._id,
        };
      })
      : [];
  }
  return temp;
};

const emptyTextInputMapper = (hId, cId, order = 0) => {
  // TODO : FOR NEW empty data
  let temp = {
    assessment_content_id: cId,
    assessment_heading_id: hId,
    content: '',
    order: order + 1,
    type: '',
    createdAt: Date.now(),
    inputId: '', //
  };
  return temp;
};

const ThirtyFour = (props) => {
  const { assessmentData: { heading = [] } = {}, userAssessmentData = [] } =
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
  const { assessments } = props;

  const initialHeadingSetup = useCallback(() => {
    heading.length &&
      setInputs(
        heading.map((item) => {
          const { sub_heading = [] } = item;
          const finalSubHeading = sub_heading.length
            ? sub_heading.map((ele) => {
              return {
                ...ele,
                textInput: [],
              };
            })
            : [];
          return {
            ...item,
            sub_heading: finalSubHeading.length
              ? finalSubHeading.sort((a, b) => (a.order > b.order && 1) || -1)
              : [],
          };
        }),
      );
  }, [heading]);

  useEffect(() => {
    initialHeadingSetup();
  }, [initialHeadingSetup]);

  useEffect(() => {
    const data = userAssMapper(userAssessmentData);
    console.log(data, 'data.....');
    console.log('inputes===>', inputs);
    // return;
    const inputData = inputs.length
      ? inputs.map((item) => {
        return {
          ...item,
          sub_heading: item.sub_heading.length
            ? item.sub_heading.map((val) => {
              const inputsArr = data.length
                ? data.filter((e) => e.assessment_content_id === val._id)
                : [];
              // debugger;
              console.log(inputsArr, data, 'lll');
              const extractOrder =
                inputsArr.length > 0
                  ? data.length
                    ? data[data.length - 1].order
                    : 0
                  : 0;

              const dummyInput = emptyTextInputMapper(
                item._id,
                val._id,
                extractOrder,
              );
              const finalInput = inputsArr.length
                ? [...inputsArr, dummyInput]
                : [dummyInput, dummyInput];
              // const finalInput = [...inputsArr, dummyInput]
              return {
                ...val,
                textInput: data.length
                  ? finalInput.length
                    ? finalInput.sort(
                      (a, b) => (a.order > b.order && 1) || -1,
                    )
                    : [] // TODO : Existing ( Add NEW OBJECT FOR END)
                  : [dummyInput], // TODO : NEW USER
              };
            })
            : [],
        };
      })
      : [];
    console.log(inputData, 'inputData.....');
    setInputs(inputData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  const onChangeHandler = (hId, sId, i, e) => {
    if (inputs.length) {
      const temp = inputs.map((item) => {
        return {
          ...item,
          sub_heading: item.sub_heading.map((ele) => {
            if (ele._id === sId && item._id === hId) {
              return {
                ...ele,
                textInput: ele.textInput.map((val, index) => {
                  if (index === i) {
                    return {
                      ...val,
                      content: e.target.value,
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
  const addHandler = (hId, sId, order = 0, type) => {
    if (inputs.length) {
      const temp = inputs.map((item) => {
        return {
          ...item,
          sub_heading: item.sub_heading.map((ele) => {
            if (item._id === hId) {
              return {
                ...ele,
                textInput: [
                  ...ele.textInput,
                  emptyTextInputMapper(hId, sId, order),
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

  const deleteHandler = (hId, i, item, val, isAPICall = false) => {
    let temp = [];
    if (inputs.length) {
      temp = inputs.map((details) => {
        if (details._id === hId) {
          return {
            ...details,
            sub_heading: details.sub_heading.length
              ? details.sub_heading.map((e) => {
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
          return details;
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
    let contentIdsArray = selectedArray.map((ele) => ele.inputId);
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
    console.log(inputs, 'inputs');
    //return;
    const modifiedAssessment = inputs.length
      ? inputs.map((item) => {
        const temp = { assessment_heading_id: item._id, content: [] };
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
            return {
              ...val,
              content: val.content,
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
      //console.log('empty check>>>>.', isAPICall);
    }

    if (modifiedAssessment.length && isAPICall) {
      if (userAssessmentData && userAssessmentData.length) {
        //  console.log('update item params>>>>>>>>', params);
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
      } else {
        // console.log('save item params>>>>>>>>', JSON.stringify(params));
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
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
                      flexWrap: 'wrap',
                    }}>
                    {item.sub_heading.length
                      ? item.sub_heading.map((ele, idx) => {
                        return (
                          <div
                            style={{
                              width:
                                ele.order === 1
                                  ? DEVICE_WIDTH > 767
                                    ? '30%'
                                    : '100%'
                                  : DEVICE_WIDTH > 767
                                    ? '70%'
                                    : '100%',
                              paddingLeft:
                                ele.order === 1
                                  ? DEVICE_WIDTH > 767
                                    ? '0'
                                    : '0'
                                  : DEVICE_WIDTH > 767
                                    ? '15px'
                                    : '0',
                            }}
                          // className={ele.order === 1 ? 'mr0' : 'mr20'}
                          >
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
                              ? ele.textInput.map((val, i, arr) => {
                                const showPlus =
                                  idx === 1 && i === arr.length - 1;
                                const isDelete =
                                  idx === 1 && i < arr.length - 1;
                                return (
                                  <div
                                    style={styles.plusIconWrapper}
                                    className={
                                      ele.order === 1 ? 'mr0' : 'mr20'
                                    }>
                                    <input
                                      type="text"
                                      className="f-field"
                                      name={ele.name}
                                      // placeholder={`${ele.name}`}
                                      style={styles.selectedText}
                                      value={val.content}
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
                                          if (val.content) {
                                            addHandler(
                                              item._id,
                                              ele._id,
                                              val.order,
                                              val.type,
                                            );
                                          }
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
                                            val.inputId !== '', // TODO : if "" = local delete
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
      <div style={{ ...commonStyles.contentLeftBorder, marginBottom: '20px' }}>
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
  wrapper: { marginTop: '40px' },
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
