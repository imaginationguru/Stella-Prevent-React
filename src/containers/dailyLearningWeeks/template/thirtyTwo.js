import React, { useState, useEffect } from 'react';
import right from '../../../assets/images/right.svg';
import cross from '../../../assets/images/cross.svg';
import commonStyles from '../commonStyles';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../../actions';
import { getItem } from '../../../utils/AsyncUtils';
import { translate as ts } from '../../../i18n/translate';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CardAudio,
  CustomImage,
} from '../../../components/Cards';
import { customAlert } from '../../../helpers/commonAlerts.web';
import { inputClasses } from '@mui/material';
const { COLORS, IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;
const {
  BOX_GRAY,
  GRAY2,
  BUTTON_ORANGE,
  YELLOW,
  GREEN_TEXT,
  CIRCLE_GRAY,
  WHITE,
  GRAY,
  RED,
} = COLORS;

const ThirtyTwo = (props) => {
  const {
    card_title,
    card_time,
    quotes,
    descriptions,
    images,
    assessment_id,
    assessment_id2,
    content,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const [selected, setSelected] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [positiveMessage, setPositiveMessage] = useState([]);
  const [negativeMessage, setNegativeMessage] = useState([]);
  const {
    assessmentData = {},
    assessmentData2 = {},
    userAssessmentData = [],
  } = useSelector((state) => state.moduleOne);
  const { headers } = assessmentData;
  const dispatch = useDispatch();
  let userId = getItem('userId');

  useEffect(() => {
    dispatch(AppActions.getAssessmentDataSecond(assessment_id2));
  }, [assessment_id2]);
  useEffect(() => {
    if (props.submit_messages.length) {
      let positive = props.submit_messages
        .filter((item) => item.condition === 'Yes to all')
        .map((ele) => ele.message);
      setPositiveMessage(positive);
      let negative = props.submit_messages
        .filter((item) => item.condition === 'Atleast 1 is no')
        .map((ele) => ele.message);
      setNegativeMessage(negative);
    }
  }, [props.submit_messages]);
  useEffect(() => {
    const assessmentCards = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        assessmentCards.push(...item.cards);
      });
    }
    let selectedFormat = assessmentCards.map((item) => {
      return { _id: item.assessment_header_id, content: item.content };
    });
    let selectUserInputs = assessmentCards.map((item) => {
      return {
        assessment_header_id: item.assessment_header_id,
        content: item.content,
        content_id: item._id,
        order: item.order,
        is_added: true,
        assessment_id: item.assessment_header.length
          ? item.assessment_header.map((val) => {
            return val.assessment_id;
          })
          : null,
      };
    });
    let firstAssessmentContent = selectUserInputs.length
      ? selectUserInputs.filter((ele) => ele.assessment_id[0] === assessment_id)
      : [];
    setSelected(selectedFormat);
    console.log(assessmentData, "assessmentData");
    let dummyInput = []
    dummyInput = assessmentData?.headers?.map(header => {
      let arrayToSearchIn = firstAssessmentContent.filter((e) => e.assessment_header_id === header._id).sort((a, b) => (a.order > b.order ? 1 : -1));
      let maxOrder = Math.max(...arrayToSearchIn.map(o => o.order), 0);
      return {
        assessment_header_id: header._id,
        content: "",
        order: maxOrder + 1,
        is_added: false
      }
    })
    console.log(dummyInput, "dummyInput")
    if (dummyInput) {
      setUserInputs([...firstAssessmentContent, ...dummyInput]);
    }


  }, [userAssessmentData]);
  useEffect(() => {
    let headers =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers
        : [];
    headers &&
      headers.length &&
      setInputs(
        headers.map((item) => {
          return {
            content: [],
            name: item.header,
            placeholder: item.description,
            order: item.order,
            value: '',
            _id: item._id,
          };
        }),
      );

  }, [assessmentData]);
  const onHandleChange = (e, item, inner) => {


    const temp = userInputs.map((val) => {
      return {
        ...val,
        content: (val.assessment_header_id === item._id && val.order === inner.order) ? e.target.value : val.content,
      };
    }
    );
    setUserInputs(temp);

  };

  const addHandler = (header, innnerItem) => {
    const temp = userInputs.map((val) => {
      return {
        ...val,
        is_added: ((val.assessment_header_id === innnerItem.assessment_header_id && val.order === innnerItem.order)) ? true : val.is_added,
      };
    }
    );
    let dummyInput = {
      assessment_header_id: header._id,
      content: "",
      order: innnerItem.order + 1,
      is_added: false

    }
    setUserInputs([...temp, dummyInput]);
  };

  /**********************FIRST ASSESSMENT****************** */
  const onSaveFirstAssessment = (e) => {
    // e.preventDefault();
    let indexArray = [];
    let contexIndex;
    inputs.map((item, i) => {
      indexArray.push({ index: i, id: item?._id });
    });
    let modifyData = userInputs.length
      ? userInputs.filter(m => (m.content != '' && m.is_added == true)).map((item) => {
        indexArray.map((data, index) => {
          if (data.id == item.assessment_header_id) {
            contexIndex = index;
          }
        });
        return {
          assessment_header_id: item.assessment_header_id,
          content: [
            {
              content: item.content,
              order: item.order,
              contentIndex: contexIndex + 1,
              type: 'supportNeeds',
            },
          ],
        };
      })
      : [];

    return modifyData;
    return;
    let firstParams = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: modifyData,
    };
    if (modifyData.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(firstParams, onSubmitMessage));
      } else {
        dispatch(AppActions.saveUserAssessment(firstParams, onSubmitMessage));
      }
    } else {
      customAlert("Please perform your exercise", 'error');
    }
  };
  const updateYESNO = (data = {}, arr = []) => {
    if (arr.length) {
      const isAlready = arr.find((item) => item._id === data._id)
        ? true
        : false;
      if (isAlready) {
        const isSameContent = arr.find(
          (item) => item._id === data._id && item.content === data.content,
        )
          ? true
          : false;
        console.log(isSameContent, "isSameContent....")
        if (isSameContent) {
          //  setSelected(arr.filter((item) => item._id !== data._id));
        } else {
          setSelected(
            arr.map((item) => {
              return {
                ...item,
                content: item._id === data._id ? data.content : item.content,
              };
            }),
          );
        }
      } else {
        setSelected([...arr, data]);
      }
    } else {
      setSelected([data]);
    }
  };


  /**********************SECOND ASSESSMENT****************** */
  const onSaveMyths = (e) => {
    /**Get first assesmet content....  */
    let first_assessment = onSaveFirstAssessment();
    /**Check second assement content and handle its validation starts.....*/
    let selectedYesNO = selected.filter(i => assessmentData2.headers.some(e => e._id == i._id)).map((item) => {
      return {
        assessment_header_id: item._id,
        content: [{ content: item.content }],
      };
    });;
    if (selectedYesNO.length != assessmentData2.headers.length || first_assessment.length == 0) {
      customAlert("Please perform your exercise", 'error');
      return;
    }
    let final_data = [...first_assessment, ...selectedYesNO];
    // return;
    /**Check second assement content and handle its validation ends.....*/
    e.preventDefault();
    let temp = [];
    let isValid = '';
    if (final_data.length) {
      final_data.forEach((item) => {
        temp.push(item.content[0] && item.content[0].content);
      });
    }
    if (temp.length) {
      isValid = temp.some((item) => item === 'NO');
    }
    console.log(isValid, positiveMessage, "lllll")
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id2,
      assessment: final_data,
    };
    if (final_data.length) {
      if (final_data && final_data.length) {
        if (isValid) {
          dispatch(AppActions.rearrangeAssessments(params, negativeMessage));
        } else {
          dispatch(AppActions.rearrangeAssessments(params, positiveMessage));
        }
      } else {
        if (isValid) {
          dispatch(AppActions.saveUserAssessment(params, negativeMessage));
        } else {
          dispatch(AppActions.saveUserAssessment(params, positiveMessage));
        }
      }
    } else {
      customAlert("Please perform your exercise", 'error');
    }
  };
  const generateDynamicColor = (order) => {
    if (order === 0) {
      return GREEN_TEXT;
    }
    if (order === 1) {
      return YELLOW;
    }
    if (order === 2) {
      return CIRCLE_GRAY;
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
      {/***************************ASSESSMENTS DESCRIPTION ONE ************* */}
      <div style={{ ...commonStyles.assessmentWrapper, marginBottom: '50px' }}>
        {images && images.length
          ? images
            .filter((img) => img.image_type === 'first')
            .map((item, i) => {
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

        {props.assessments && props.assessments.length
          ? props.assessments.map((item, i) => {
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
      {/******************************************************************* */}

      {inputs.length
        ? inputs.map((item, index) => {
          return (
            <div style={{ marginBottom: 15 }}>
              <div
                style={{ backgroundColor: generateDynamicColor(item.order) }}>
                <p style={{ padding: '15px', color: WHITE }}>
                  {ReactHtmlParser(item.name)}
                </p>
              </div>
              {userInputs && userInputs.length
                ? userInputs
                  .sort((a, b) => (a.order > b.order && 1) || -1)
                  .filter((ele) => {
                    return ele.assessment_header_id === item._id;
                  })
                  .map((val, i) => {
                    const showPlus =
                      i == userInputs
                        .sort((a, b) => (a.order > b.order && 1) || -1)
                        .filter((ele) => {
                          return ele.assessment_header_id === item._id;
                        }).length - 1;
                    const isDelete =
                      i < userInputs
                        .sort((a, b) => (a.order > b.order && 1) || -1)
                        .filter((ele) => {
                          return ele.assessment_header_id === item._id;
                        }).length - 1;
                    const isDisabled = i < userInputs
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .filter((ele) => {
                        return ele.assessment_header_id === item._id;
                      }).length - 1;
                    return (
                      <div style={styles.crossIconWrapper} className={'mr20'}>
                        <input
                          disabled={isDisabled ? true : false}
                          type="text"
                          className="f-field"
                          name={name}
                          onChange={(e) => {
                            onHandleChange(e, item, val);
                          }}
                          style={styles.selectedText}
                          value={val.content}
                        />
                        {isDelete ? (
                          <div
                            style={styles.circleCrossDiv}
                            onClick={() => {
                              let filter_data = userInputs.filter(
                                (ele) => (ele.assessment_header_id == val.assessment_header_id && val.order != ele.order),
                              ).sort((a, b) => (a.order > b.order && 1) || -1);

                              let other_header = userInputs.filter(
                                (ele) => (ele.assessment_header_id != val.assessment_header_id),
                              ).sort((a, b) => (a.order > b.order && 1) || -1);

                              filter_data = filter_data.map((item, index) => {
                                return {
                                  ...item,
                                  order: index + 1
                                }
                              });
                              console.log([...other_header, ...filter_data])
                              setUserInputs([...other_header, ...filter_data]);
                              if (val.content_id) {
                                dispatch(
                                  AppActions.deleteUserAssessmentData(
                                    val.content_id,
                                    props._id,
                                    assessment_id,
                                  ),
                                );
                              }
                            }}>
                            <span
                              style={{
                                ...styles.plusIcon,
                                fontSize: '15px',
                              }}>
                              x
                            </span>
                          </div>
                        ) : null}
                        {showPlus ? (
                          <div
                            style={{
                              ...styles.circleDiv,
                              backgroundColor: val.content.length ? GREEN_TEXT : GRAY,
                            }}
                            onClick={() => {
                              if (val.content != "") {
                                addHandler(item, val)
                              }


                            }}>
                            <span style={styles.plusIcon}>+</span>
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
      {/* <div style={commonStyles.buttonWrapper}>
        <button
          className="btn-orange"
          onClick={(e) => onSaveFirstAssessment(e)}>
          {ts('SAVE')}
        </button>
      </div> */}

      {/***************************ASSESSMENTS DESCRIPTION SECOND************* */}
      <div style={{ ...commonStyles.assessmentWrapper, marginBottom: '70px' }}>
        {images && images.length
          ? images
            .filter((img) => img.image_type === 'second')
            .map((item, i) => {
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
        {assessmentData2.assessment && assessmentData2.assessment.length
          ? assessmentData2.assessment.map((item, i) => {
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
      {/***************************ASSESSMENTS second HEADERS************* */}
      {assessmentData2.headers && assessmentData2.headers.length
        ? assessmentData2.headers
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, i) => {
            const isYES =
              selected && selected.length
                ? selected.find((val) => {
                  return val._id === item._id && val.content === 'YES';
                })
                  ? true
                  : false
                : false;
            const isNO =
              selected && selected.length
                ? selected.find(
                  (val) => val._id === item._id && val.content === 'NO',
                )
                  ? true
                  : false
                : false;
            return (
              <div key={i} style={commonStyles.question}>
                <p>{ReactHtmlParser(item.header)}</p>
                <div style={styles.optionWrapper}>
                  <div
                    onClick={() => {
                      updateYESNO({ _id: item._id, content: 'YES' }, selected);
                    }}
                    style={{
                      ...styles.rightBox,
                      backgroundColor: isYES ? BUTTON_ORANGE : GRAY2,
                    }}>
                    <img src={right} />
                  </div>
                  <div
                    onClick={() => {
                      updateYESNO({ _id: item._id, content: 'NO' }, selected);
                    }}
                    style={{
                      ...styles.crossBox,
                      backgroundColor: isNO ? BUTTON_ORANGE : GRAY2,
                    }}>
                    <img src={cross} />
                  </div>
                </div>
              </div>
            );
          })
        : []}
      <div style={commonStyles.buttonWrapper}>
        <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
          {ts('SAVE')}
        </button>
      </div>

      {/*************Content************ */}

      {content && content.length
        ? content
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, i) => {
            return (
              <CardContent key={i} content={ReactHtmlParser(item.content)} />
            );
          })
        : []}

      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default ThirtyTwo;
const styles = {
  grayOuterWrapper: {
    backgroundColor: BOX_GRAY,
    display: 'flex',
    padding: '20px',
    marginBottom: '30px',
  },
  grayDescription: {
    paddingLeft: '40px',
    fontSize: 14,
    alignSelf: 'center',
  },
  optionWrapper: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightBox: {
    padding: '10px',
    width: '35px',
    height: '35px',
    boxSizing: 'border-box',
    borderRadius: '50%',
    minWidth: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossBox: {
    padding: '10px',
    width: '35px',
    height: '35px',
    boxSizing: 'border-box',
    borderRadius: '50%',
    minWidth: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '25px',
  },
  button: { width: '20%', marginTop: '30px' },
  image: { width: '100%', height: '100%' },
  imageWrapper: {
    width: '120px',
    height: '100px',
  },
  selectedText: {
    backgroundColor: '#F1F3FA',
    width: '100%',
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
  crossIconWrapper: {
    display: 'flex',
    marginBottom: '15px',
    position: 'relative',
  },
  plusIconWrapper: {
    display: 'flex',
    marginBottom: '3%',
    position: 'relative',
  },
};
