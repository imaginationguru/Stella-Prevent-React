import React, { useState, useEffect } from 'react';
import GLOBALS from '@constants';
import ReactHtmlParser from 'react-html-parser';
import ExerciseBox from '@components/ExerciseBox';
import { useDispatch, useSelector } from 'react-redux';
import right from '@assets/images/right.svg';
import { getItem } from '@utils/AsyncUtils';
import * as AppActions from '@actions';
import { translate as ts } from '@i18n/translate';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
import { Dimensions } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const { COLORS, IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;
const { GREEN_TEXT, YELLOW, CIRCLE_GRAY, BUTTON_ORANGE } = COLORS;
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
  const { assessmentData = {}, userAssessmentData = [] } = useSelector(
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
          order:
            ele.assessment_header &&
            ele.assessment_header.length &&
            ele.assessment_header[0].order,
          content: [
            {
              assessment_content_id: ele.assessment_content_id,
              content: ele.content,
            },
          ],
        };
      }),
    );
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
    let customMsg = '';
    if (slugData == 'different,similar,i_do_not_know') {
      let selectedIntemsofHeader = [];
      assessmentData.content.map((head, index) => {
        if (head.data == 'Different') {
          selectedIntemsofHeader[0] = assessment.filter((element) =>
            element.content.some(
              (subElement) => subElement.assessment_content_id === head._id,
            ),
          );
        }
        if (head.data == 'Similar') {
          selectedIntemsofHeader[1] = assessment.filter((element) =>
            element.content.some(
              (subElement) => subElement.assessment_content_id === head._id,
            ),
          );
        }
        if (head.data == 'I do not know') {
          selectedIntemsofHeader[2] = assessment.filter((element) =>
            element.content.some(
              (subElement) => subElement.assessment_content_id === head._id,
            ),
          );
        }
      });
      const key = 'assessment_header_id';
      let X1 =
        [
          ...new Map(
            selectedIntemsofHeader[0].map((item) => [item[key], item]),
          ).values(),
        ].length +
        [
          ...new Map(
            selectedIntemsofHeader[2].map((item) => [item[key], item]),
          ).values(),
        ].length;

      customMsg = `You identified ${X1} topics where your experiences and your partner's experiences may have been different or, at least, where you do not know if your experiences were similar or not.

      It is possible that both your different experiences influence your idea of what it is like to "be a good mother" and "to be a good father". This means that in addition to creating an idea of you as a mother (the mother you want to be) you have also created an idea of your partner as a father/mother you want them to be, and your partner did the same. These ideas seem “natural” and “the absolute truth” because that is the reality you have always known - but your partner has lived another reality and, therefore, their ideas may be different​`;
    }
    let a = [];
    let b = [];
    let c = [];
    let customMsg1 = '';
    let customMsg2 = '';
    let z = '';
    let q = '';
    if (slugData === 'never,sometimes,quite often') {
      customMsg1 =
        'Your answers suggest that, in general, you can be assertive when you communicate with others. Assertive communication is essential to express your needs while showing respect and consideration for others. Keep it up! ';
      customMsg2 =
        "Your answers suggest that it is not always easy for you to be assertive  when communicate with others. Sometimes, you can use strategies that are more passive (choosing not to express your opinion, even if it makes you frustrated, or not asking for help) or more aggressive (choosing to respond more harshly or impulsively) to deal with the other's opinions. These strategies are not useful and end up generating conflict and dissatisfaction in your relationship with others. Try to communicate your needs more assertively!";
      let onlyContentData = [];

      assessment
        .sort((a, b) => (a.order > b.order && 1) || -1)
        .forEach((item) => {
          onlyContentData.push(...item.content);
        });
      let contentMessage = onlyContentData.map((item) => item.content);

      let y = contentMessage.filter((item, i) => i === 0 || i === 3);
      z = !y.includes('Never');

      let p = contentMessage.filter((item, i) => i === 1 || i === 2 || i === 4);

      q = !p.includes('Quite often');
    }
    if (slugData === 'never,sometimes,oftentimes') {
      let onlyContentData = [];

      assessment
        .sort((a, b) => (a.order > b.order && 1) || -1)
        .forEach((item) => {
          onlyContentData.push(...item.content);
        });
      let contentMessage = onlyContentData.map((item) => item.content);
      z = contentMessage.every((val) => val == 'Never');
    }
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
          //  never,sometimes,oftentimes
        } else if (slugData === 'never,sometimes,oftentimes') {
          if (z) {
            dispatch(AppActions.rearrangeAssessments(params, negativeMessage));
          } else {
            dispatch(AppActions.rearrangeAssessments(params, positiveMessage));
          }
        } else if (slugData === 'never,sometimes,quite often') {
          if (props.card.week == 3 && props.card.day == 4) {
            if (z && q) {
              dispatch(
                AppActions.rearrangeAssessments(
                  params,
                  negativeMessage,
                  customMsg1,
                ),
              );
            } else {
              dispatch(
                AppActions.rearrangeAssessments(
                  params,
                  positiveMessage,
                  customMsg2,
                ),
              );
            }
          } else {
            dispatch(
              AppActions.rearrangeAssessments(params, differenceMessage),
            );
          }
        } else {
          if (contentMessage.length) {
            let agreeMessage = contentMessage.filter(
              (item) =>
                item === 'completely agree' ||
                item === 'agree' ||
                item === 'Completely Agree' ||
                item === 'Agree',
            );
            if (agreeMessage.length === 0) {
              dispatch(
                AppActions.rearrangeAssessments(
                  params,
                  negativeMessage,
                  customMsg,
                ),
              );
            } else {
              dispatch(
                AppActions.rearrangeAssessments(
                  params,
                  positiveMessage,
                  customMsg,
                ),
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

          let contentMessage = onlyContentData.map((item) => item.content);

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
            dispatch(AppActions.saveUserAssessment(params, sum, customMsg));
            // answer SOMETIMES or QUITE OFTEN to questions 1 and 4 and NEVER or SOMETIMES to questions 2, 3 and 5]
          } else if (slugData === 'never,sometimes,quite often') {
            if (contentMessage.length) {
              if (z || q) {
                dispatch(
                  AppActions.saveUserAssessment(
                    params,
                    negativeMessage,
                    customMsg1,
                  ),
                );
              } else {
                dispatch(
                  AppActions.saveUserAssessment(
                    params,
                    positiveMessage,
                    customMsg2,
                  ),
                );
              }
            }
          } else {
            if (contentMessage.length) {
              let agreeMessage = contentMessage.filter(
                (item) =>
                  item === 'completely agree' ||
                  item === 'agree' ||
                  item === 'Completely Agree' ||
                  item === 'Agree',
              );
              if (agreeMessage.length === 0) {
                dispatch(
                  AppActions.saveUserAssessment(
                    params,

                    negativeMessage,
                    customMsg,
                  ),
                );
              } else {
                dispatch(
                  AppActions.saveUserAssessment(
                    params,
                    positiveMessage,
                    customMsg,
                  ),
                );
              }
            }
          }
        }
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: ts('PERFORM_EXERCISE'),
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
          let newContent = {
            assessment_header_id: ele.assessment_header_id,
            order: ele.order,
          };
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
            order: item.order,
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
          order: item.order,
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
      <div className="container">
        <div className="row" style={styles.wrapperOption}>
          <div className="col-md-7 sm-7 col-12"></div>
          <div className="col-md-5 sm-5 col-12">
            <div className="row">
              {optionsData.length
                ? optionsData
                  .sort((a, b) => (a.order > b.order && 1) || -1)
                  .map((item, index) => {
                    return (
                      <div
                        className="col-md-3 sm-3 col-6"
                        style={{ marginBottom: '15px', display: 'flex' }}>
                        <div
                          style={{
                            ...styles.optionContent,
                            backgroundColor: generateDynamicColor(item.order),
                            flex: '1 1 100%',
                          }}>
                          <p style={styles.content}>
                            {ReactHtmlParser(item.content)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      {headersData.length
        ? headersData
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item) => {
            return (
              <div className="container">
                <div className="row" style={styles.wrapper}>
                  <div className="col-md-7 sm-7 col-12" style={styles.header}>
                    {ReactHtmlParser(item.header)}
                  </div>
                  <div
                    className="col-md-5 sm-5 col-12"
                    style={{ display: 'flex', marginBottom: '20px' }}>
                    <div className="row" style={{ flex: '1 1 100%' }}>
                      {optionsData.length
                        ? optionsData
                          .sort((a, b) => (a.order > b.order && 1) || -1)
                          .map((val) => {
                            let prevContent = '';
                            let currentContent = val.content;

                            if (assessment.length) {
                              const headerId = assessment.find((ele) => {
                                return (
                                  ele.assessment_header_id === item._id
                                );
                              });
                              if (
                                headerId &&
                                headerId.assessment_header_id
                              ) {
                                prevContent = headerId.content[0].content;
                              }
                            }

                            const isSelected =
                              prevContent === currentContent;
                            return (
                              <div
                                className="col-md-3 sm-3 col-3"
                                style={{
                                  flex: '1 1 100%',
                                  display: 'flex',
                                }}>
                                <div
                                  style={{
                                    ...styles.selectedDiv,
                                    borderColor: generateDynamicColor(
                                      val.order,
                                    ),
                                    backgroundColor: isSelected
                                      ? generateDynamicColor(val.order)
                                      : '#0000',
                                    flex: '1 1 100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height:
                                      DEVICE_WIDTH > 767 ? '80px' : '45px',
                                  }}
                                  onClick={() => onSelect(val, item)}>
                                  <p style={styles.selectedWrapper}>
                                    {isSelected ? (
                                      <img
                                        src={right}
                                        style={styles.selectedBox}
                                      />
                                    ) : (
                                      ''
                                    )}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
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
      <div style={{ marginTop: '55px' }}>
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
    marginBottom: '20px',
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
