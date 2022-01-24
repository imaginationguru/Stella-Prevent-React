import React, {useState, useEffect} from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import ExerciseBox from '../../../components/ExerciseBox';
import {useDispatch, useSelector} from 'react-redux';
import right from '../../../assets/images/right.svg';
import {getItem} from '../../../utils/AsyncUtils';
import * as AppActions from '../../../actions';
import {translate as ts} from '../../../i18n/translate';
import commonStyles from '../commonStyles';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {GREEN_TEXT, YELLOW, CIRCLE_GRAY, BUTTON_ORANGE} = COLORS;
const generateDynamicColor = (order) => {
  if (order === 1) {
    return GREEN_TEXT;
  }
  if (order === 2) {
    return BUTTON_ORANGE;
  }
  if (order === 3) {
    return YELLOW;
  }
  if (order === 4) {
    return CIRCLE_GRAY;
  }
};
const TwentySix = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    showExercises,
    week,
    assessment_id,
  } = props.card;
  const [optionsData, setOptionsData] = useState([]);
  const [headersData, setHeadersData] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [positiveMessage, setPositiveMessage] = useState([]);
  const [negativeMessage, setNegativeMessage] = useState([]);
  const [differenceMessage, setDifferenceMessage] = useState([]);
  const [slugData, setSlugData] = useState([]);
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (assessmentData) {
      if (assessmentData.content && assessmentData.content.length) {
        let contentData = [];
        assessmentData.content.map((item) => contentData.push(item));
        setOptionsData(contentData);
      }
      if (assessmentData.headers && assessmentData.headers.length) {
        let headers = [];
        assessmentData.headers.map((item) => headers.push(item));
        setHeadersData(headers);
      }
      if (assessmentData.content && assessmentData.content.length) {
        let slugDataCheck = assessmentData.content[0].slug;
        setSlugData(slugDataCheck);
      }
    }
  }, [assessmentData]);
  console.log('slugData', slugData);
  useEffect(() => {
    const onlyCardData = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        onlyCardData.push(...item.cards);
      });
    }
    setAssessment(
      onlyCardData.map((ele) => {
        return {
          assessment_header_id: ele.assessment_header_id,
          content: [
            {
              assessment_content_id: ele.assessment_content_id,
              content: ele.content,
            },
          ],
        };
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);
  useEffect(() => {
    if (props.submit_messages.length) {
      let positive = props.submit_messages
        .filter((item) => item.condition === 'positive')
        .map((ele) => ele.message);
      setPositiveMessage(positive);
      let negative = props.submit_messages
        .filter((item) => item.condition === 'negative')
        .map((ele) => ele.message);
      setNegativeMessage(negative);
      let difference = props.submit_messages
        .filter((item) => item.condition === 'difference')
        .map((ele) => ele.message);
      setDifferenceMessage(difference);
    }
  }, [props.submit_messages]);
  const onSubmit = (e) => {
    e.preventDefault();
    let params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: assessment,
    };
    let a = [];
    let b = [];
    let c = [];
    if (userAssessmentData && userAssessmentData.length) {
      if (assessment.length) {
        let onlyContentData = [];
        assessment.forEach((item) => {
          onlyContentData.push(...item.content);
        });
        let contentMessage = onlyContentData.map((item) => item.content);
        if (slugData === 'different,similiar,i_do_not_know') {
          if (contentMessage.length) {
            let difference = contentMessage.filter(
              (item) => item === 'Different',
            );
            a.push(difference);
            let similar = contentMessage.filter((item) => item === 'Similiar');
            b.push(similar);
            let notKnow = contentMessage.filter(
              (item) => item === 'I do not know',
            );
            c.push(notKnow);
          }
          let sum = [a[0].length + c[0].length, ...differenceMessage];
          dispatch(AppActions.rearrangeAssessments(params, sum));
        } else if (slugData === 'never,sometimes,oftentimes') {
          dispatch(AppActions.rearrangeAssessments(params, differenceMessage));
        } else {
          if (contentMessage.length) {
            let agreeMessage = contentMessage.filter(
              (item) => item === 'completely agree' || item === 'agree',
            );
            if (agreeMessage.length === 0) {
              dispatch(
                AppActions.rearrangeAssessments(params, negativeMessage),
              );
            } else {
              dispatch(
                AppActions.rearrangeAssessments(params, positiveMessage),
              );
            }
          }
        }
      }
    } else {
      if (assessment && assessment.length) {
        if (assessment.length) {
          let onlyContentData = [];
          assessment.forEach((item) => {
            onlyContentData.push(...item.content);
          });
          let contentMessage = onlyContentData.map(
            (item) => item.assessment_content_id,
          );
          if (slugData === 'different,similiar,i_do_not_know') {
            if (contentMessage.length) {
              let difference = contentMessage.filter(
                (item) => item === 'Different',
              );
              a.push(difference);
              let similar = contentMessage.filter(
                (item) => item === 'Similiar',
              );
              b.push(similar);
              let notKnow = contentMessage.filter(
                (item) => item === 'I do not know',
              );
              c.push(notKnow);
            }
            let sum = [a[0].length + c[0].length, ...differenceMessage];
            dispatch(AppActions.saveUserAssessment(params, sum));
          } else if (slugData === 'never,sometimes,oftentimes') {
            dispatch(AppActions.saveUserAssessment(params, differenceMessage));
          } else {
            if (contentMessage.length) {
              let agreeMessage = contentMessage.filter(
                (item) => item === 'completely agree' || item === 'agree',
              );
              if (agreeMessage.length === 0) {
                dispatch(
                  AppActions.saveUserAssessment(params, negativeMessage),
                );
              } else {
                dispatch(
                  AppActions.saveUserAssessment(params, positiveMessage),
                );
              }
            }
          }
        }
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please perform your exercise',
        });
      }
    }
  };
  const onSelect = (val, item) => {
    if (assessment.length) {
      const isAlready = assessment.find(
        (element) => element.assessment_header_id === item._id,
      )
        ? true
        : false;

      if (isAlready) {
        const newData = assessment.map((ele) => {
          let newContent = {assessment_header_id: ele.assessment_header_id};
          if (ele.assessment_header_id === item._id) {
            newContent.content = [
              {
                assessment_content_id: val._id,
                content: val.content,
                slug: val.slug,
              },
            ];
          } else {
            newContent.content = ele.content;
          }
          return newContent;
        });
        setAssessment(newData);
      } else {
        setAssessment([
          ...assessment,
          {
            assessment_header_id: item._id,
            content: [
              {
                assessment_content_id: val._id,
                content: val.content,
                slug: val.slug,
              },
            ],
          },
        ]);
      }
    } else {
      setAssessment([
        ...assessment,
        {
          assessment_header_id: item._id,
          content: [
            {
              assessment_content_id: val._id,
              content: val.content,
              slug: val.slug,
            },
          ],
        },
      ]);
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
      {/*******************************ASSESSMENT DESCRIPTION*********************** */}
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

      <div className="row container" style={styles.wrapperOption}>
        <div className="col-md-7 sm-7 col-7"></div>
        {optionsData.length
          ? optionsData
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, index) => {
                //  console.log('item>>>>>>>>', item);
                return (
                  <div
                    className="col-md-1 sm-1 col-1"
                    style={{
                      ...styles.optionContent,
                      backgroundColor: generateDynamicColor(item.order),
                    }}>
                    <p style={styles.content}>
                      {ReactHtmlParser(item.content)}
                    </p>
                  </div>
                );
              })
          : null}
      </div>

      {headersData.length
        ? headersData
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item) => {
              return (
                <div className="row container" style={styles.wrapper}>
                  <div className="col-md-7 sm-7 col-7" style={styles.header}>
                    {ReactHtmlParser(item.header)}
                  </div>
                  {optionsData.length
                    ? optionsData
                        .sort((a, b) => (a.order > b.order && 1) || -1)
                        .map((val) => {
                          let prevContent = '';
                          let currentContent = val.content;

                          if (assessment.length) {
                            const headerId = assessment.find((ele) => {
                              return ele.assessment_header_id === item._id;
                            });
                            if (headerId && headerId.assessment_header_id) {
                              prevContent = headerId.content[0].content;
                            }
                          }

                          const isSelected = prevContent === currentContent;
                          return (
                            <div
                              className="col-md-1 sm-1 col-1"
                              style={{
                                ...styles.selectedDiv,
                                borderColor: generateDynamicColor(val.order),
                                backgroundColor: isSelected
                                  ? generateDynamicColor(val.order)
                                  : '#0000',
                              }}
                              onClick={() => onSelect(val, item)}>
                              <p style={styles.selectedWrapper}>
                                {isSelected ? (
                                  <img src={right} style={styles.selectedBox} />
                                ) : (
                                  ''
                                )}
                              </p>
                            </div>
                          );
                        })
                    : null}
                </div>
              );
            })
        : null}
      {headersData.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSubmit(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {/*************Content************ */}
      <div style={{marginTop: '55px'}}>
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
  );
};
export default TwentySix;
const styles = {
  selectedBox: {
    width: '30px',
    height: '30px',
    marginTop: '15px',
  },
  selectedWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  header: {
    border: '2px solid #D8D8D8',
    borderRadius: '3px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  content: {
    color: COLORS.WHITE,
    paddingTop: '10px',
    fontSize: '12px',
    textAlign: 'center',
  },
  wrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '20px',
    marginBottom: '20px',
  },
  optionContent: {
    borderRadius: '3px',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  wrapperOption: {
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '60px',
  },
  selectedDiv: {
    border: '2px solid',
    borderRadius: '3px',
  },
};
