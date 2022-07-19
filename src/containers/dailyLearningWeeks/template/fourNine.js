import { useState, useEffect } from 'react';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '@utils/AsyncUtils';
import * as AppActions from '@actions';
import { translate as ts } from '@i18n/translate';
import ExerciseBox from '@components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const { IMAGE_BASE_URL, ACTION_TYPE, COLORS } = GLOBALS;
const { BOX_GRAY, WHITE } = COLORS;
const unique = (arr, keyProps) => {
  const kvArray = arr
    .sort((a, b) => (a.order > b.order && 1) || -1)
    .map((entry) => {
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
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? BOX_GRAY : BOX_GRAY,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? WHITE : WHITE,
});

const FourNine = (props) => {
  const [optionDataContent, setOptionDataContent] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const { assessmentData = {}, userAssessmentData = [] } = useSelector(
    (state) => state.moduleOne,
  );
  const [dragCardData, setDragCardData] = useState([]);
  const [submitData, setSubmitData] = useState([]);
  const onDragEnd = (result) => {
    // dropped outside the list
    setSaved(false);
    if (!result.destination) {
      return;
    }
    const item = reorder(
      optionDataContent,
      result.source.index,
      result.destination.index,
    );
    const matchData = item.length
      ? item.filter((val, index) => {
        return val.order === index;
      })
      : [];
    const formatData = matchData.length
      ? matchData.map((val) => {
        return {
          assessment_header_id: val.assessment_header_id,
          content: [
            {
              assessment_content_id: val._id,
              content: val.content,
              order: val.order,
            },
          ],
        };
      })
      : [];
    setSubmitData(formatData);
    setOptionDataContent(item);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
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
  const { headers = [] } = assessmentData;
  const [isSave, setSaved] = useState(false);

  useEffect(() => {
    let optionData =
      assessmentData && assessmentData.content && assessmentData.content.length
        ? assessmentData.content.map((item) => {
          return { ...item, content: item.data };
        })
        : [];

    setOptionDataContent(optionData.reverse());
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
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
                content: item.content,
                order: item.order,
              },
            ],
          };
        });
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
  }, [userAssessmentData]);

  const onSave = (e) => {
    e.preventDefault();
    setSaved(true);
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: submitData,
    };

    if (submitData.length === optionDataContent.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
      } else {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please match the correct answer',
      });
    }
  };

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
                    width: '100%',
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
                  style={{
                    ...commonStyles.assessDesc,
                  }}
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
              return (
                <div key={index}>
                  <p
                    className="task-header"
                    style={{
                      ...styles.dropTitle,
                      backgroundColor: BOX_GRAY,
                    }}>
                    {ReactHtmlParser(item.header)}
                  </p>
                </div>
              );
            })
            : []}
        </div>

        {/****************************OPTIONS CONTAINER with gray box******************** */}
        <div style={{ width: '50%' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {optionDataContent.map((item, index) => {
                    const rightOrder = index;
                    const idForLeft = item.assessment_header_id;
                    let isMatched = false;
                    if (headers.length) {
                      const data = headers.find((val) => val._id === idForLeft);
                      if (data && data._id) {
                        isMatched = data.order === rightOrder;
                      }
                    }

                    return (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              ),
                              border: `1px solid ${isSave
                                  ? isMatched
                                    ? BOX_GRAY
                                    : 'red'
                                  : BOX_GRAY
                                }`,
                              borderRadius: '5px',
                            }}>
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
export default FourNine;

const styles = {
  fourBoxContainer: {
    width: '30%',
  },
  optionsDiv: {
    width: '55%',
    justifyContent: 'space-between',
  },
  draggableContent: {
    marginTop: '10px',
    marginBottom: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#F1F3FA',
  },
  wrapper: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropTitle: {
    color: '#000000',
    textAlign: 'center',
    margin: `0 0 8px 0`,
    padding: '9px',
    borderRadius: '5px',
  },
  dragItem: {
    marginTop: '20px',
    textAlign: 'center',
    border: '1px solid',
  },
};
