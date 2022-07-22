import React, { useState, useEffect } from 'react';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '@utils/AsyncUtils';
import * as AppActions from '@actions';
import { translate as ts } from '@i18n/translate';
import ExerciseBox from '@components/ExerciseBox';
import { customAlert } from '@helpers/commonAlerts.web';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
import tickWhite from '@assets/images/right.svg';
const { IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;

const unique = (arr, keyProps) => {
  const kvArray = arr.map((entry) => {
    const key = keyProps.map((k) => {
      console.log(k, "kkkkkk.....", entry, entry[k])
      return k == "content" ? entry[k]["en"] : entry[k]

    }).join('|');
    return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
};
const onlySingleId = (arr = []) => {
  let temp = [];
  console.log(arr, "errrrrrrrrr")
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
const TemplateFive = (props) => {
  const [optionDataContent, setOptionDataContent] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const { assessmentData = {}, userAssessmentData = [] } = useSelector(
    (state) => state.moduleOne,
  );
  const [dragCardData, setDragCardData] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
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
  const { headers } = assessmentData;

  useEffect(() => {
    let optionData =
      assessmentData && assessmentData.content && assessmentData.content.length
        ? assessmentData.content
          .filter((item) => {
            return item.assessment_header_id === null;
          })
          .map((item) => {
            return { ...item, content: item.data };
          })
        : [];

    setOptionDataContent(optionData);
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData]);

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
                //content: item.content,
                content: item.content ? item.content : item.prefilled_content,
              },
            ],
          };
        });
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

      temp = temp.map(item => {
        return {
          ...item, content: item.content ? item.content : item.prefilled_content,
        }
      })
      let x = [...optionDataContent, ...temp];

      // /************ UNIQUE FILTERATION FOR ARRAY ************* */
      const uniqueOptionDataContent = x.length
        ? unique(x, ["content", "assessment_header_id" != null])
        : [];
      // console.log(uniqueOptionDataContent, "uniqueOptionDataContent1////dd");

      if (uniqueOptionDataContent.length) {
        const data = uniqueOptionDataContent.map((item, i) => {
          if (item.assessment_header_id !== null) {
            return {
              ...item,
              content: item.content ? item.content : item.prefilled_content,
              headerOrder:
                item.assessment_header &&
                item.assessment_header.length &&
                item.assessment_header[0].order
            };
          } else {
            return { ...item };
          }
        });
        const data1 = data.filter((item) => (item.content !== null));
        console.log(data1, "data1111q", data)
        setOptionDataContent(data1);
        // console.log(data1, "cc.....", optionDataContent);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  /*
   * on drag item  we used ev.dataTransfer.setData method for drag item with id
   */

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id);
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
    let x = headerParams.map((item) => {
      return {
        ...item,
        content: item.content.filter((val) => val.content[getItem('language')] !== id),
      };
    });
    let y = [
      ...x,
      {
        assessment_header_id: header_id,
        content: [{ assessment_header_id: header_id, content: { [getItem('language')]: id } }],
      },
    ];
    setHeaderParams(onlySingleId(y));
    let tasks = optionDataContent.filter((task) => {
      console.log(task.content, id)
      if (task.content[getItem('language')] === id) {
        return (task.assessment_header_id = header_id);
      }
      return task;
    });
    console.log([...optionDataContent, tasks], "mmmm", optionDataContent)
    //setOptionDataContent([...optionDataContent, tasks]);
    // setOptionDataContent([...optionDataContent, tasks]);
    setOptionDataContent([...optionDataContent]);
  };
  let customMsg = '';

  const onSave = (e) => {
    e.preventDefault();
    console.log(headerParams, "lllll")
    let updatedHeader = headerParams.map(m => {
      return {
        ...m,
        content: m.content.map(i => {
          return {
            ...i,
            prefilled_content: i.content
          }
        })
      }
    })
    updatedHeader = updatedHeader.filter(item => item.content.length > 0)
    console.log(updatedHeader, "updatedHeader.....")
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      //  assessment: headerParams,
      assessment: updatedHeader,
    };
    if (props.card.week == 1 && props.card.day == 2) {
      let selectedIntemsofHeader = [];
      if (headerParams.length > 0 && assessmentData.headers.length == 4) {
        assessmentData.headers.map((head, index) => {
          selectedIntemsofHeader[index] = headerParams.filter(
            (e) => e.assessment_header_id === head._id,
          );
        });
        let greenCount =
          selectedIntemsofHeader[0] && selectedIntemsofHeader[0].length == 0
            ? 0
            : selectedIntemsofHeader[0][0].content.length;
        let yellowCount =
          selectedIntemsofHeader[1] && selectedIntemsofHeader[1].length == 0
            ? 0
            : selectedIntemsofHeader[1][0].content.length;
        let orangeCount =
          selectedIntemsofHeader[2] && selectedIntemsofHeader[2].length == 0
            ? 0
            : selectedIntemsofHeader[2][0].content.length;
        let purpleCount =
          selectedIntemsofHeader[3] && selectedIntemsofHeader[3].length == 0
            ? 0
            : selectedIntemsofHeader[3][0].content.length;
        let X1 = yellowCount + orangeCount + purpleCount;
        let X2 = yellowCount + orangeCount;
        customMsg = `${ts('CUSTOM_MSG1')}${X1}${ts('CUSTOM_MSG2')}${X2} ${ts('CUSTOM_MSG3')}​`;
      }
    }
    /** Check if drag and drop down card is there*/

    if (headerParams && headerParams.length) {
      console.log(params, "params...")
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(
          AppActions.rearrangeAssessments(params, onSubmitMessage[getItem('language')], customMsg),
        );
      } else {
        dispatch(
          AppActions.saveUserAssessment(params, onSubmitMessage[getItem('language')], customMsg),
        );
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: ts('PERFORM_EXERCISE'),
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
  /*
    five buckets for drag and drop item
    */

  const dragCardDataContent = dragCardData.length
    ? dragCardData.map((item) => item.content)
    : [];

  /************************************** */

  const onSetActiveMenu = (index) => {
    setActiveId(index);
    if (activeId === index) {
      setActiveId('');
    }
  };

  const overRideOptionContentDataHandler = (
    headerId = '',
    contentId = '',
    headerOrder = null,
  ) => {
    console.log("overridue")
    if (optionDataContent.length) {
      const data = optionDataContent.map((item, i) => {
        if (item._id === contentId) {
          return { ...item, assessment_header_id: headerId, headerOrder };
        } else {
          return { ...item };
        }
      });
      setOptionDataContent(data);
    }
  };

  const onSaveMobileView = (e) => {
    console.log(assessmentData, "assessmentData....", optionDataContent);
    if (optionDataContent.every((val) => val.assessment_header_id == null)) {
      // setExperienceError(ts('COMPLETE_ERROR'));
      customAlert(ts('COMPLETE_ERROR'), 'error');
    } else {
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
                },
              ],
            };
          });
      let y = onlySingleId(assessment);
      if (props.card.week == 1 && props.card.day == 2) {
        let selectedIntemsofHeader = [];
        if (y.length > 0 && assessmentData.headers.length == 4) {
          assessmentData.headers.map((head, index) => {
            selectedIntemsofHeader[index] = y.filter(
              (e) => e.assessment_header_id === head._id,
            );
          });
          let greenCount =
            selectedIntemsofHeader[0] && selectedIntemsofHeader[0].length == 0
              ? 0
              : selectedIntemsofHeader[0][0].content.length;
          let yellowCount =
            selectedIntemsofHeader[1] && selectedIntemsofHeader[1].length == 0
              ? 0
              : selectedIntemsofHeader[1][0].content.length;
          let orangeCount =
            selectedIntemsofHeader[2] && selectedIntemsofHeader[2].length == 0
              ? 0
              : selectedIntemsofHeader[2][0].content.length;
          let purpleCount =
            selectedIntemsofHeader[3] && selectedIntemsofHeader[3].length == 0
              ? 0
              : selectedIntemsofHeader[3][0].content.length;
          let X1 = yellowCount + orangeCount + purpleCount;
          let X2 = yellowCount + orangeCount;
          customMsg = `${ts('CUSTOM_MSG1')} ${X1}${ts('CUSTOM_MSG2')}${X2} ${ts('CUSTOM_MSG3')}​`;
        }
      }
      let updated_arr = y.map(m => {
        return {
          ...m,
          content: m.content.map(i => {
            return {
              ...i,
              prefilled_content: i.content
            }
          })
        }
      })
      const params = {
        user_id: getItem('userId'),
        user_card_id: props._id,
        assessment_id: assessment_id,
        assessment: updated_arr,
      };
      console.log(params)
      if (y.length) {
        if (userAssessmentData && userAssessmentData.length) {
          dispatch(
            AppActions.rearrangeAssessments(params, onSubmitMessage[getItem('language')], customMsg),
          );
        } else {
          dispatch(
            AppActions.saveUserAssessment(params, onSubmitMessage[getItem('language')], customMsg),
          );
        }
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: ts('PERFORM_EXERCISE'),
        });
      }
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
      <CardTitle title={ReactHtmlParser(card_title[getItem('language')])} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} ${ts('MIN')}` : `${card_time} ${ts('MINS')}`
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
                description={ReactHtmlParser(item.desc[getItem('language')])}
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
                description={ReactHtmlParser(item.description[getItem('language')])}
              />
            );
          })
          : []}
      </div>

      {/******************Droppable div************************* */}
      <div className="web-vw">
        <div style={styles.wrapper}>
          <div style={styles.fourBoxContainer}>
            {headers && headers.length
              ? headers.map((item, index) => {
                const header_id = item._id;
                const order = item.order;
                return (
                  <div
                    key={index}
                    style={{
                      ...commonStyles.droppableDivDrag,
                      display: 'block',
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
                      {ReactHtmlParser(item.header[getItem('language')])}
                    </p>
                    {optionDataContent && optionDataContent.length
                      ? optionDataContent
                        .filter((item) => {
                          return item.assessment_header_id === header_id;
                        })
                        .map((item) => {
                          return (
                            <p
                              style={{
                                ...commonStyles.dragItem,
                                borderColor: boxBackgroundColor(order),
                              }}
                              onDragStart={(e) =>
                                onDragStart(e, item.content[getItem('language')])
                              }
                              draggable
                              className="draggable p-draggable">
                              {item.content[getItem('language')]}
                            </p>
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
                    (val) => val === item.content[getItem('language')],
                  )
                    ? true
                    : false;
                  return item.assessment_header_id === null && !exist;
                })
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      onDragStart={(e) => {
                        onDragStart(e, item.content[getItem('language')])
                      }
                      }
                      draggable
                      className="draggable"
                      style={styles.draggableContent}>
                      {item.content[getItem('language')]}
                    </div>
                  );
                })
              : []}
          </div>
        </div>
        {headers && headers.length ? (
          <div style={commonStyles.buttonWrapper}>
            <button className="btn-orange" onClick={(e) => onSave(e)}>
              {ts('SAVE')}
            </button>
          </div>
        ) : null}
        {/*************Content************ */}
        <div style={{ ...commonStyles.contentLeftBorder, marginBottom: '20px' }}>
          {content && content.length
            ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                return (
                  <CardContent
                    key={i}
                    content={ReactHtmlParser(item.content[getItem('language')])}
                  />
                );
              })
            : []}
        </div>
        {showExercises && <ExerciseBox week={week} />}
      </div>
      <div className="res-vw">
        <div className="colored-headers">
          {headers &&
            headers.length &&
            headers.map((item, index) => {
              return (
                <div
                  key={index}
                  className="colored-header"
                  style={{
                    backgroundColor: boxBackgroundColor(item.order),
                  }}>
                  <h5>{ReactHtmlParser(item.header[getItem('language')])}</h5>
                </div>
              );
            })}
        </div>

        <div className="colored-questions">
          {optionDataContent &&
            optionDataContent.length &&
            optionDataContent.map((item, index) => {
              return (
                <div
                  className={`colored-question  ${activeId === index ? 'active-menu' : ''
                    }  ${item.headerOrder !== null && item.headerOrder !== undefined
                      ? selectedBorderColor(item.headerOrder)
                      : '#ffff'
                    }`}
                  onClick={() => {
                    onSetActiveMenu(index);
                  }}>
                  <p>{ReactHtmlParser(item.content[getItem('language')])}</p>
                  <button className="btn-select">
                    <span>+</span>
                  </button>
                  <ul className="colored-options-list">
                    {headers &&
                      headers.length &&
                      headers.map((val) => {
                        return (
                          <li
                            onClick={() => {
                              setTimeout(() => {
                                setActiveId('');
                              }, overRideOptionContentDataHandler(val._id, item._id, val.order));
                            }}>
                            <label
                              className={optionBackgroundColor(val.order)}
                              htmlFor={val.id}>
                              <input
                                type="radio"
                                id={val._id}
                                checked={
                                  item.assessment_header_id === val._id
                                    ? item.content[getItem('language')]
                                    : ''
                                }
                              />

                              <span>
                                <img
                                  src={tickWhite}
                                  style={{ width: '15px', height: '15px' }}
                                />
                              </span>
                            </label>
                          </li>
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
                    content={ReactHtmlParser(item.content[getItem('language')])}
                  />
                );
              })
            : []}
        </div>
        {showExercises && <ExerciseBox week={week} />}
      </div>
    </>
  );
};
export default TemplateFive;

const styles = {
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
    marginTop: '0px',
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
};
