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
import {Dimensions} from 'react-native';
import GreenCheck from '../../../assets/images/tick.svg';
import cancel from '../../../assets/images/cancel.svg';

const {IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const DEVICE_WIDTH = Dimensions.get('window').width;
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
      temp.push({assessment_header_id: item, content: q});
    });
    return temp;
  }
};
const ThirtyFive = (props) => {
  const [optionDataContent, setOptionDataContent] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const [dragCardData, setDragCardData] = useState([]);
  const [correctAns, setCorrectAns] = useState('false');
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
  const {headers} = assessmentData;

  useEffect(() => {
    let optionData =
      assessmentData && assessmentData.content && assessmentData.content.length
        ? assessmentData.content
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
    console.log('option data content assessment data', optionData);

    setOptionDataContent(optionData);
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData]);
  useEffect(() => {
    setCorrectAns(false);
  }, []);
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
        console.log('zz?????????', zz);
        tempHeaderParams.push(...zz);
        setHeaderParams(onlySingleId(tempHeaderParams));
        return;
      });
      setDragCardData(temp);
      let x = [...optionDataContent, ...temp];

      // /************ UNIQUE FILTERATION FOR ARRAY ************* */

      const uniqueOptionDataContent = x.length
        ? unique(x, ['content', 'assessment_header_id' !== null])
        : [];
      setOptionDataContent(uniqueOptionDataContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  /*
   * on drag item  we used ev.dataTransfer.setData method for drag item with id
   */

  const onDragStart = (ev, id, correctId) => {
    console.log('dragstart:', id, correctId);
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
    console.log('correct id', correctId, 'header params', headerParams);
    let x = headerParams.map((item) => {
      console.log('item drpop', item);
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
    console.log('x?????????', x, y);
    setHeaderParams(onlySingleId(y));
    let tasks = optionDataContent.filter((task) => {
      if (task.content === id) {
        return (task.assessment_header_id = header_id);
      }
      return task;
    });
    setOptionDataContent([...optionDataContent, tasks]);
  };
  console.log('header params ??????? option content data', optionDataContent);
  const onSave = (e) => {
    e.preventDefault();
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: headerParams,
    };

    console.log('header params?????', JSON.stringify(headerParams));
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

  /*
    five buckets for drag and drop item
    */

  const dragCardDataContent = dragCardData.length
    ? dragCardData.map((item) => item.content)
    : [];
  console.log('correct ans???????', correctAns);

  /************************************** */
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
      {assessments &&
      assessments.length &&
      assessments[0].description !== '' ? (
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
      ) : null}
      {/******************Droppable div************************* */}
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
                              <div style={{position: 'relative'}}>
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
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: boxBackgroundColor(order),
                                    // borderColor:
                                    //   item.correct_assessment_header_id ===
                                    //   header_id
                                    //     ? 'green'
                                    //     : 'red',
                                  }}
                                  onDragStart={(e) =>
                                    onDragStart(e, item.content)
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
      {headers && headers.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSave(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
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
export default ThirtyFive;

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
    //  border: '1px solid red',
  },
  wrapper: {marginTop: '40px'},
  droppableDiv: {
    width: '48%',
    paddingBottom: '15px',
  },
  droppableDivDrag: {
    width: DEVICE_WIDTH > 767 ? '23%' : '48%',
    paddingBottom: DEVICE_WIDTH > 767 ? '60px' : '30px',
    //  display: 'flex',
  },
  iconWrapper: {
    display: 'flex',
    position: 'absolute',
    right: -5,
    top: -15,
    flexDirection: 'row-reverse',
    marginLeft: '20px',
    marginBottom: '-10px',
  },
  icon: {
    width: '22px',
    height: '22px',
  },
};
