import React, { useState, useEffect } from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '../../../actions';
import { getItem } from '../../../utils/AsyncUtils';
import ExerciseBox from '../../../components/ExerciseBox';
import { translate as ts } from '../../../i18n/translate';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import commonStyles from '../commonStyles';
import { Dimensions } from 'react-native';
import GreenCheck from '../../../assets/images/tick.svg';
import cancel from '../../../assets/images/cancel.svg';
import tickWhite from '../../../assets/images/right.svg';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const { COLORS, IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;
const { YELLOW, WHITE, CIRCLE_GRAY } = COLORS;
let userId = getItem('userId');
const dataMapperAss = (arr = []) => {
  let temp = [];
  if (arr.length) {
    temp = arr.map((item) => {
      return {
        assessment_header_id: item._id,
        content: [{ content: item.value, order: item.order }],
      };
    });
  }
  return temp;
};

const InputBoxWithContent = (props) => {
  const { title, placeholder, value, onChange, style, name, disable } = props;
  return (
    <div style={styles.inputBoxWrapper}>
      <div style={style}>
        <p style={styles.header}>{title}</p>
      </div>
      <div style={styles.inputBox}>
        <form noValidate>
          <textarea
            type="description"
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
/********DRAG N DROP FUNCTIONALITY****** */
const unique = (arr, keyProps) => {
  const kvArray = arr.map((entry) => {
    const key = keyProps.map((k) => entry[k]).join('|');
    return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
};
const onlySingleId = (arr = []) => {
  let temp = [];
  if (arr.length) {
    const assIds = [...new Set(arr.map((item) => item.assessment_header_id))];
    assIds.forEach((item) => {
      let p = arr
        .filter((val) => val.assessment_header_id === item)
        .map((cn) => {
          return cn.content;
        });
      let q = [];
      if (p.length) {
        p.forEach((cn) => {
          q.push(...cn);
        });
      }
      temp.push({ assessment_header_id: item, content: q });
    });
    return temp;
  }
};
const FourTwo = (props) => {
  const [inputs, setInputs] = useState([]);
  const [optionDataContent, setOptionDataContent] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const [dragCardData, setDragCardData] = useState([]);
  const [correctAns, setCorrectAns] = useState('false');
  const [activeId, setActiveId] = useState('');
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
    assessmentData = { heading: [] },
    assessmentData2 = {},
    userAssessmentData = [],
  } = useSelector((state) => state.moduleOne);
  useEffect(() => {
    setCorrectAns(false);
  }, []);
  useEffect(() => {
    dispatch(AppActions.getAssessmentData(assessment_id));
    dispatch(AppActions.getAssessmentDataSecond(assessment_id2));
  }, [assessment_id2]);
  useEffect(() => {
    let optionData =
      assessmentData2 &&
        assessmentData2.content &&
        assessmentData2.content.length
        ? assessmentData2.content
          .filter((item) => {
            return item.assessment_header_id === null;
          })
          .map((item) => {
            return {
              ...item,
              content: item.data,
              correct_assessment_header_id: item.correct_assessment_header_id,
            };
          })
        : [];
    setOptionDataContent(optionData);
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData2]);
  useEffect(() => {
    if (userAssessmentData && userAssessmentData.length) {
      let temp = [];
      let tempHeaderParams = [];
      userAssessmentData.forEach((item, i) => {
        temp.push(...item.cards);
        let zz = item.cards.map((item) => {
          return {
            assessment_header_id: item.assessment_header_id,
            content: [
              {
                assessment_header_id: item.assessment_header_id,
                content: item.content,
                correct_assessment_header_id: item.correct_assessment_header_id,
              },
            ],
          };
        });
        console.log('zz??????170', zz);
        tempHeaderParams.push(...zz);
        setHeaderParams(
          onlySingleId(
            tempHeaderParams.filter(
              (item) => item.assessment_header_id != undefined,
            ),
          ),
        );
        return;
      });
      setDragCardData(temp);
      let x = [...optionDataContent, ...temp];
      // /************ UNIQUE FILTERATION FOR ARRAY ************* */

      const uniqueOptionDataContent = x.length
        ? unique(x, ['content', 'assessment_header_id' !== null])
        : [];
      if (uniqueOptionDataContent.length) {
        const data = uniqueOptionDataContent.map((item, i) => {
          if (item.assessment_header_id !== null) {
            return {
              ...item,
              headerOrder:
                item.assessment_header &&
                item.assessment_header.length &&
                item.assessment_header[0].order,
            };
          } else {
            return { ...item };
          }
        });
        const data1 = data.filter((item) => item.content !== null);
        setOptionDataContent(data1);
      }
    }
  }, [userAssessmentData]);

  /*
   * on drag item  we used ev.dataTransfer.setData method for drag item with id
   */

  const onDragStart = (ev, id, correctId) => {
    console.log('dragstart:', id);
    setCorrectAns(false);
    ev.dataTransfer.setData('id', id);
    ev.dataTransfer.setData('correctId', correctId);
  };

  /*
  on drag over not refresh the page so we used ev.preventDefault() method
  */

  const onDragOver = (ev, id) => {
    ev.preventDefault();
  };

  /*
  on drop item we used ev.dataTransfer.getData method is used for item list
  fetch with id and filter the item with respect to category and set in tasks array
  */

  const onDrop = (ev, header_id, order) => {
    let id = ev.dataTransfer.getData('id');
    let correctId = ev.dataTransfer.getData('correctId');
    let x = headerParams.map((item) => {
      return {
        ...item,
        content: item.content.filter((val) => val.content !== id),
      };
    });
    let y = [
      ...x,
      {
        assessment_header_id: header_id,
        content: [
          {
            assessment_header_id: header_id,
            content: id,
            correct_assessment_header_id: correctId,
          },
        ],
      },
    ];
    setHeaderParams(onlySingleId(y));
    let tasks = optionDataContent.filter((task) => {
      if (task.content === id) {
        return (task.assessment_header_id = header_id);
      }
      return task;
    });
    setOptionDataContent([...optionDataContent, tasks]);
  };
  const onSave = (e) => {
    e.preventDefault();
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: headerParams,
    };

    if (headerParams.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
        setCorrectAns(true);
      } else {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
        setCorrectAns(true);
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please perform your exercise',
      });
    }
  };

  const boxBackgroundColor = (order) => {
    if (order === 0) {
      return '#5DBDA9';
    }
    if (order === 1) {
      return '#F2C842';
    }
    if (order === 2) {
      return '#F08B22';
    }
    if (order === 3) {
      return '#57576D';
    }
  };
  const optionBackgroundColor = (order) => {
    if (order === 0) {
      return 'green-bg';
    }
    if (order === 1) {
      return 'yellow-bg';
    }
    if (order === 2) {
      return 'orange-bg';
    }
    if (order === 3) {
      return 'grey-bg';
    }
  };

  const selectedBorderColor = (order) => {
    if (order === 0) {
      return 'selected-green';
    }
    if (order === 1) {
      return 'selected-yellow';
    }
    if (order === 2) {
      return 'selected-orange';
    }
    if (order === 3) {
      return 'selected-grey';
    }
  };

  /****************************Assessment One *********** */
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
            name: item.header,
            placeholder: item.description,
            order: item.order,
            value: '',
            _id: item._id,
          };
        }),
      );
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
  }, [assessmentData, assessment_id]);
  useEffect(() => {
    const getDataMapper = (arr = []) => {
      let temp = [];
      if (arr.length) {
        let pTemp = [];
        arr.forEach((item) => {
          pTemp.push(...item.cards);
        });
        temp = pTemp.length
          ? pTemp.map((item) => {
            return {
              placeholder: item.content ? item.content : 'enter value',
              value: item.content,
              _id: item.assessment_header_id,
            };
          })
          : [];
      }
      return temp;
    };
    if (userAssessmentData.length) {
      let y = getDataMapper(userAssessmentData);
      if (inputs.length) {
        setInputs(
          inputs.map((item) => {
            let val = '';
            if (y.length) {
              let data = y.find((cn) => cn._id === item._id);
              if (data && data.value) {
                val = data.value;
              }
            }
            return { ...item, value: val };
          }),
        );
      }
    }
  }, [userAssessmentData]);
  const onSaveMyths = (e) => {
    e.preventDefault();
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: dataMapperAss(inputs),
    };

    if (userAssessmentData && userAssessmentData.length) {
      dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
    } else {
      let isValid = false;
      if (inputs && inputs.length) {
        let temp = [];
        inputs.forEach((item) => {
          temp.push(item.value);
        });
        if (temp.length) {
          isValid = temp.find((item) => item !== 0) ? true : false;
        }
      }
      if (isValid) {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please perform your exercise',
        });
      }
    }
  };

  const onHandleChange = (e, item) => {
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
  const headingOne =
    assessmentData.heading &&
      assessmentData.heading.length &&
      assessmentData.heading[0]
      ? assessmentData.heading[0].heading
      : null;

  const dragCardDataContent = dragCardData.length
    ? dragCardData.map((item) => item.content)
    : [];

  /*****************MOBILE VIEW*********** */
  const onSetActiveMenu = (index) => {
    setActiveId(index);
    setCorrectAns(false);
    if (activeId === index) {
      setActiveId('');
    }
  };
  const overRideOptionContentDataHandler = (
    headerId = '',
    contentId = '',
    headerOrder = null,
    correctHeaderId = '',
    headerName,
  ) => {
    if (optionDataContent.length) {
      const data = optionDataContent.map((item, i) => {
        if (item._id === contentId) {
          console.log('item._id');
          return {
            ...item,
            assessment_header_id: headerId,
            headerOrder,
            correct_assessment_header_id: correctHeaderId,
            assessment_header: [{ header: headerName }],
          };
        } else {
          return { ...item };
        }
      });
      setOptionDataContent(data);
    }
  };

  const onSaveMobileView = (e) => {
    e.preventDefault();

    let assessment =
      optionDataContent &&
      optionDataContent.length &&
      optionDataContent
        .filter((val) => val.assessment_header_id !== null)
        .map((item) => {
          return {
            assessment_header_id: item.assessment_header_id,
            content: [
              {
                assessment_header_id: item.assessment_header_id,
                content: item.content,
                correct_assessment_header_id: item.correct_assessment_header_id,
              },
            ],
          };
        });
    let y = onlySingleId(assessment);
    console.log('y??????', y);
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: y,
    };

    if (y.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
        setCorrectAns(true);
      } else {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
        setCorrectAns(true);
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please perform your exercise',
      });
    }
  };
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
      {/**********************Images************** */}

      {images && images.length
        ? images
          .filter((item) => item.image_type === 'first')
          .map((item) => {
            return (
              <CustomImage
                src={`${IMAGE_BASE_URL}${item.image}`}
                style={{
                  display: item.image !== '' ? 'flex' : 'none',
                }}
              />
            );
          })
        : null}

      {assessmentData.heading && assessmentData.heading.length ? (
        <div style={styles.inputBoxWrapper}>
          <p style={{ ...styles.heading, width: '100%' }}>
            {ReactHtmlParser(headingOne)}
          </p>
        </div>
      ) : null}
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
                  backgroundColor:
                    assessmentData.heading && assessmentData.heading.length
                      ? CIRCLE_GRAY
                      : YELLOW,
                  width: '33%',
                  marginBottom: '35px',
                }}
                disable={true}
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
      {/*******************************ASSESSMENT DESCRIPTION*********************** */}
      <div style={commonStyles.assessmentWrapper}>
        {images && images.length
          ? images
            .filter((item) => item.image_type === 'second')
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

        {assessmentData2.assessment && assessmentData2.assessment.length
          ? assessmentData2.assessment.map((item, index) => {
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
      {/*******************DRAG AND DROP ************************ */}

      {/******************Droppable div************************* */}
      <div className="web-vw">
        <div style={styles.wrapper}>
          <div style={styles.fourBoxContainer}>
            {assessmentData2.headers && assessmentData2.headers.length
              ? assessmentData2.headers.map((item, index) => {
                const header_id = item._id;
                const order = item.order;
                return (
                  <div
                    key={index}
                    style={{
                      ...styles.droppableDiv,
                    }}
                    className="wip"
                    onDragOver={(e) => onDragOver(e, item._id)}
                    onDrop={(e) => {
                      onDrop(e, item._id, item.order);
                    }}>
                    <p
                      className="task-header"
                      style={{
                        ...commonStyles.dropTitle,
                        backgroundColor: boxBackgroundColor(item.order),
                      }}>
                      {ReactHtmlParser(item.header)}
                    </p>
                    {optionDataContent && optionDataContent.length
                      ? optionDataContent
                        .filter((item) => {
                          return item.assessment_header_id === header_id;
                        })
                        .map((item) => {
                          return (
                            <div style={{ position: 'relative' }}>
                              {correctAns ? (
                                <div style={styles.iconWrapper}>
                                  {item.correct_assessment_header_id ===
                                    header_id ? (
                                    <img
                                      src={GreenCheck}
                                      style={styles.icon}
                                    />
                                  ) : (
                                    <img src={cancel} style={styles.icon} />
                                  )}
                                </div>
                              ) : (
                                ''
                              )}

                              <p
                                style={{
                                  ...commonStyles.dragItem,
                                  borderColor: boxBackgroundColor(order),
                                }}
                                onDragStart={(e) =>
                                  onDragStart(
                                    e,
                                    item.content,
                                    item.correct_assessment_header_id,
                                  )
                                }
                                draggable
                                className="draggable">
                                {item.content}
                              </p>
                            </div>
                          );
                        })
                      : []}
                  </div>
                );
              })
              : []}
          </div>
          {/****************************OPTIONS CONTAINER with gray box******************** */}

          <div style={styles.optionsDiv}>
            {optionDataContent && optionDataContent.length
              ? optionDataContent
                .filter((item, i) => {
                  const exist = dragCardDataContent.find(
                    (val) => val === item.content,
                  )
                    ? true
                    : false;
                  return item.assessment_header_id === null && !exist;
                })
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      onDragStart={(e) =>
                        onDragStart(
                          e,
                          item.content,
                          item.correct_assessment_header_id,
                        )
                      }
                      draggable
                      className="draggable"
                      style={styles.draggableContent}>
                      {item.content}
                    </div>
                  );
                })
              : []}
          </div>
        </div>
        {assessmentData2.headers && assessmentData2.headers.length ? (
          <div style={commonStyles.buttonWrapper}>
            <button className="btn-orange" onClick={(e) => onSave(e)}>
              {ts('SAVE')}
            </button>
          </div>
        ) : null}
        {/******************DRAG N DROP ******************/}
        {content && content.length
          ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                />
              );
            })
          : []}
        {showExercises && <ExerciseBox week={week} />}
      </div>
      <div className="res-vw">
        <div className="colored-headers">
          {assessmentData2.headers &&
            assessmentData2.headers.length &&
            assessmentData2.headers.map((item, index) => {
              return (
                <div
                  key={index}
                  className="colored-header"
                  style={{
                    backgroundColor: boxBackgroundColor(item.order),
                  }}>
                  <h5>{ReactHtmlParser(item.header)}</h5>
                </div>
              );
            })}
        </div>
        <div className="colored-questions">
          {optionDataContent &&
            optionDataContent.length &&
            optionDataContent.map((item, index) => {
              let checkAssessmentHeaderId = item.assessment_header_id !== null;
              let showTick = false;
              if (
                item.assessment_header_id !== null &&
                typeof item['assessment_header'] !== 'undefined'
              ) {
                if (assessmentData2.headers && assessmentData2.headers.length) {
                  showTick = assessmentData2.headers.some(
                    (val) =>
                      item.correct_assessment_header_id === val._id &&
                      item.assessment_header.length &&
                      item.assessment_header[0].header === val.header,
                  );
                }
              }
              return (
                <div
                  className={`colored-question  ${activeId === index ? 'active-menu1' : ''
                    }  ${item.headerOrder !== null && item.headerOrder !== undefined
                      ? selectedBorderColor(item.headerOrder)
                      : '#ffff'
                    }`}
                  onClick={() => {
                    onSetActiveMenu(index);
                  }}>
                  {checkAssessmentHeaderId ? (
                    correctAns ? (
                      <div style={styles.iconWrapper1}>
                        {showTick ? (
                          <img src={GreenCheck} style={styles.icon} />
                        ) : (
                          <img src={cancel} style={styles.icon} />
                        )}
                      </div>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}

                  <p>{ReactHtmlParser(item.content)}</p>
                  <button className="btn-select">
                    <span>+</span>
                  </button>
                  <ul className="colored-options-list">
                    {assessmentData2.headers.length &&
                      assessmentData2.headers.map((val) => {
                        return (
                          <>
                            <li
                              onClick={() => {
                                setTimeout(() => {
                                  setActiveId('');
                                }, overRideOptionContentDataHandler(val._id, item._id, val.order, item.correct_assessment_header_id, val.header));
                              }}>
                              <label
                                className={optionBackgroundColor(val.order)}
                                htmlFor={val.id}>
                                <input
                                  type="radio"
                                  id={val._id}
                                  checked={
                                    item.assessment_header_id === val._id
                                      ? item.content
                                      : ''
                                  }
                                />

                                <span>
                                  <img
                                    src={tickWhite}
                                    style={{
                                      width: '15px',
                                      height: '15px',
                                    }}
                                  />
                                </span>
                              </label>
                            </li>
                          </>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
        </div>

        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSaveMobileView(e)}>
            {ts('SAVE')}
          </button>
        </div>
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
      </div>
    </div>
  );
};
export default FourTwo;
const styles = {
  inputBoxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30px',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingTop: '30px',
  },
  inputBox: { width: '65%' },
  inputStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    width: '100%',
    paddingTop: '5px',
    paddingLeft: '5px',
  },
  heading: {
    backgroundColor: YELLOW,
    color: WHITE,
    padding: '10px',
    borderRadius: '5px',
  },
  fourBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionsDiv: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: DEVICE_WIDTH > 767 ? '60px' : '15px',
    justifyContent: 'space-between',
  },
  draggableContent: {
    width: '48%',
    marginTop: '10px',
    marginBottom: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#F1F3FA',
    paddingLeft: '20px',
  },
  wrapper: { marginTop: '40px' },
  droppableDiv: { width: '48%', paddingBottom: '15px' },
  iconWrapper: {
    display: 'flex',
    position: 'absolute',
    right: -5,
    top: -15,
    flexDirection: 'row-reverse',
    marginLeft: '20px',
    marginBottom: '-10px',
  },
  iconWrapper1: {
    display: 'flex',
    position: 'absolute',
    right: -2,
    top: -13,
    flexDirection: 'row-reverse',
    marginLeft: '20px',
    marginBottom: '-10px',
    zIndex: 999,
  },
  icon: {
    width: '24px',
    height: '24px',
  },
};
