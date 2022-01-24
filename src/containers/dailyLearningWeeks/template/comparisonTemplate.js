import React, {useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import {useDispatch, useSelector} from 'react-redux';
import GLOBALS from '../../../constants';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import commonStyles from '../commonStyles';
import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const {IMAGE_BASE_URL, COLORS, ACTION_TYPE} = GLOBALS;
const {DARK_GREEN, YELLOW, WHITE} = COLORS;

const onlySingleId = (arr = []) => {
  let temp = [];
  if (arr.length) {
    const assIds = [...new Set(arr.map((item) => item.assessment_header_id))];
    assIds.forEach((item) => {
      let p = arr.filter((val) => val.assessment_header_id === item);
      temp.push({assessment_header_id: item, content: p});
    });
    return temp;
  }
};
const dataMapper = (arr = [], id = '') => {
  let temp = [];
  if (arr.length && id) {
    const data = arr.find((item) => item._id.assessment_header_id === id);
    if (data && data.cards && data.cards.length) {
      temp = data.cards.map((item) => {
        return {
          assessment_header_id: item.assessment_header_id,
          assessment_id: item.assessment_id,
          content: item.content,
          data: item.content,
          order: 6,
          __v: item.__v,
          _id: item._id,
        };
      });
    }
  }
  return temp;
};

const ComparisonTemplate = (props) => {
  const dispatch = useDispatch();
  const [duringPregnancy, setDuringPregnancy] = useState([]);
  const [afterPregnancy, setAfterPregnancy] = useState([]);
  const [activeState, setActiveState] = useState(1);
  const [isDuplicates, isSetDuplicates] = useState([]);
  const [paramsAssessment, setParamsAssessment] = useState([]);
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const {headers = [], content = []} = assessmentData;
  const headerIdDuringPregnancy = headers.length ? headers[0]._id : null;
  const headerIdAfterPregnancy = headers.length ? headers[1]._id : null;
  const {
    card_title,
    card_time,
    quotes,
    images,
    assessment_id,
    descriptions,
    onSubmitMessage,
    week,
    showExercises,
  } = props.card;

  useEffect(() => {
    dispatch(AppActions.getAssessmentData(assessment_id, props._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment_id]);

  useEffect(() => {
    if (userAssessmentData.length) {
      const duringPData = dataMapper(
        userAssessmentData,
        headerIdDuringPregnancy,
      );
      const afterPData = dataMapper(userAssessmentData, headerIdAfterPregnancy);
      const finalPData = [...duringPData, ...afterPData]; //2 bar
      setParamsAssessment(onlySingleId(finalPData));
      localDataManage(afterPData, duringPData, finalPData);
      duplicatesHandler(finalPData);
      userAssessmentData.length && setActiveState(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  useEffect(() => {
    duplicatesHandler([...duringPregnancy, ...afterPregnancy]);
    setParamsAssessment([...duringPregnancy, ...afterPregnancy]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeState]);

  const localDataManage = (after = [], during = [], final = []) => {
    setDuringPregnancy(during);
    setAfterPregnancy(after);
    setParamsAssessment(final);
  };

  const duplicatesHandler = (arr = [], isClear = false) => {
    if (arr.length) {
      const contentOnly = arr.map((item) => item.data);
      const uniqueContentOnly = contentOnly.length
        ? [...new Set(contentOnly)]
        : [];
      let duplicates = contentOnly;
      if (uniqueContentOnly.length) {
        uniqueContentOnly.forEach((item) => {
          const i = duplicates.indexOf(item);
          duplicates = duplicates
            .slice(0, i)
            .concat(duplicates.slice(i + 1, duplicates.length));
        });
        isSetDuplicates(duplicates);
      }
    }
    if (isClear) {
      isSetDuplicates([]);
      setDuringPregnancy([]);
      setAfterPregnancy([]);
    }
  };

  const selectDuringPregnancy = (val) => {
    if (duringPregnancy.length) {
      const isAlready = duringPregnancy.find((item) => {
        return item.data === val.data;
      })
        ? true
        : false;
      if (isAlready) {
        setDuringPregnancy(
          duringPregnancy.filter((item) => item.data !== val.data),
        );
      } else {
        setDuringPregnancy([...duringPregnancy, val]);
      }
    } else {
      setDuringPregnancy([val]);
    }
  };

  const selectAfterPregnancy = (val) => {
    if (afterPregnancy.length) {
      const isAlready = afterPregnancy.find((item) => item.data === val.data)
        ? true
        : false;
      if (isAlready) {
        setAfterPregnancy(
          afterPregnancy.filter((item) => item.data !== val.data),
        );
      } else {
        setAfterPregnancy([...afterPregnancy, val]);
      }
    } else {
      setAfterPregnancy([val]);
    }
  };
  const onSave = (e) => {
    e.preventDefault();
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: onlySingleId(paramsAssessment),
    };

    if (onlySingleId(paramsAssessment) !== undefined) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
      } else {
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
      <CardTitle title={ReactHtmlParser(card_title)} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} Minute` : `${card_time} Minutes`
        }
      />
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
      {/*************************ASSESSMENT DESCRIPTION******************* */}
      <div style={commonStyles.assessmentWrapper}>
        {images && images.length
          ? images.map((item, index) => {
              return (
                <CustomImage
                  key={index}
                  src={
                    item.image !== '' ? `${IMAGE_BASE_URL}${item.image}` : null
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
          ? props.assessments
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
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
      {/*********************Comparison During and after pregnancy******** */}
      <div style={styles.exerciseDiv}>
        {activeState === 3 ? (
          <>
            <p>Comparison</p>
            <div style={styles.compareTitleDiv}>
              <div style={{display: 'flex'}}>
                <div
                  style={{
                    ...styles.indicationColor,
                    background: DARK_GREEN,
                  }}></div>
                <p style={styles.compareTitle}> During the Pregnancy</p>
              </div>
              <div style={{display: 'flex'}}>
                <div
                  style={{
                    ...styles.indicationColor,
                    background: YELLOW,
                  }}></div>
                <p style={styles.compareTitle}> After Birth</p>
              </div>
              <div style={{display: 'flex'}}>
                <div
                  style={{
                    ...styles.indicationColor,
                    background: `linear-gradient(${DARK_GREEN}, ${YELLOW})`,
                  }}></div>
                <p style={styles.compareTitle}> Both</p>
              </div>
            </div>

            <div style={styles.contentDiv}>
              {content.length &&
                content.map((item) => {
                  const isBoth =
                    isDuplicates &&
                    isDuplicates.length &&
                    isDuplicates.find((val) => val === item.data);

                  const isDuringP =
                    duringPregnancy.length &&
                    duringPregnancy
                      .map((val) => val.data)
                      .find((val) => val === item.data);

                  const isAfterP =
                    afterPregnancy.length &&
                    afterPregnancy
                      .map((val) => val.data)
                      .find((val) => val === item.data);
                  let bgColor = WHITE;

                  if (isBoth === item.data) {
                    bgColor = `linear-gradient(${DARK_GREEN}, ${YELLOW})`;
                  } else {
                    if (isDuringP === item.data) {
                      bgColor = DARK_GREEN;
                    }
                    if (isAfterP === item.data) {
                      bgColor = YELLOW;
                    }
                  }
                  return (
                    <div
                      style={{
                        ...styles.contentTitle,
                        background: bgColor,
                      }}>
                      <p style={styles.titleText}>{item.data}</p>
                    </div>
                  );
                })}
            </div>
          </>
        ) : activeState === 1 ? (
          <>
            <p>
              {ReactHtmlParser(headers && headers.length && headers[0].header)}
            </p>
            <div style={styles.contentDiv}>
              {content.length &&
                content.map((item) => {
                  const isDuringSelected =
                    duringPregnancy &&
                    duringPregnancy.length &&
                    duringPregnancy.find((val) => {
                      return val.data === item.data;
                    });

                  return (
                    <div
                      onClick={() => {
                        selectDuringPregnancy({
                          ...item,
                          assessment_header_id: headerIdDuringPregnancy,
                        });
                      }}
                      style={{
                        ...styles.contentTitle,
                        background:
                          isDuringSelected &&
                          isDuringSelected.data === item.data
                            ? DARK_GREEN
                            : WHITE,
                      }}>
                      <p style={styles.titleText}>{item.data}</p>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <p>
              {headers &&
                headers.length &&
                headers[1] &&
                ReactHtmlParser(headers[1].header)}
            </p>
            <div style={styles.contentDiv}>
              {content.length &&
                content.map((item) => {
                  const isAfterSelected =
                    afterPregnancy && afterPregnancy.length
                      ? afterPregnancy.find((val) => {
                          return val.data === item.data;
                        })
                      : null;
                  return (
                    <div
                      onClick={() =>
                        selectAfterPregnancy({
                          ...item,
                          assessment_header_id: headerIdAfterPregnancy,
                        })
                      }
                      style={{
                        ...styles.contentTitle,
                        background:
                          isAfterSelected && isAfterSelected.data === item.data
                            ? YELLOW
                            : WHITE,
                      }}>
                      <p style={styles.titleText}>{item.data}</p>
                    </div>
                  );
                })}
            </div>
          </>
        )}
        <div style={styles.buttonDiv}>
          <button
            className="btn-solid"
            // onClick={(e) => setActiveState(activeState + 1)}
            onClick={(e) => {
              activeState === 3
                ? onSave(e)
                : activeState === 1
                ? setActiveState(activeState + 1)
                : setActiveState(activeState + 1);
            }}>
            {activeState === 3
              ? 'SAVE'
              : activeState === 1
              ? 'Next Step'
              : 'Compare'}
          </button>
        </div>
        {activeState === 3 ? (
          <p
            style={styles.againTitle}
            onClick={() => {
              setActiveState(1);
              duplicatesHandler([], true);
            }}>
            DO AGAIN
          </p>
        ) : null}
      </div>
      {/*************Content************ */}
      <div style={{marginTop: '35px'}}>
        {props.card.content && props.card.content.length
          ? props.card.content
              .filter((item) => {
                return item.type === 'first';
              })
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

export default ComparisonTemplate;

const styles = {
  exerciseDiv: {
    backgroundColor: '#F1F3FA',
    marginTop: '30px',
    padding: '20px',
  },
  compareTitleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '20px',
  },
  indicationColor: {
    height: '20px',
    width: '20px',
    // backgroundColor: DARK_GREEN,
    borderRadius: '2px',
  },
  compareTitle: {paddingLeft: '5px'},
  contentDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
  },
  contentTitle: {
    width: DEVICE_WIDTH > 767 ? '22%' : '43%',
    margin: '10px',
    borderRadius: '5px',
  },
  titleText: {
    textAlign: 'center',
    paddingTop: '11px',
  },
  buttonDiv: {
    width: DEVICE_WIDTH > 767 ? '20%' : '100%',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  againTitle: {
    textAlign: 'center',
    marginTop: '30px',
    color: YELLOW,
    fontWeight: 'bold',
  },
};
