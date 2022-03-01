import React, {useState, useEffect} from 'react';
import right from '../../../assets/images/right.svg';
import cross from '../../../assets/images/cross.svg';
import commonStyles from '../commonStyles';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import {translate as ts} from '../../../i18n/translate';
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
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {BOX_GRAY, YELLOW, GREEN_TEXT, CIRCLE_GRAY, WHITE, GRAY, RED} = COLORS;

const ThirtyThree = (props) => {
  const {
    card_title,
    card_time,
    quotes,
    descriptions,
    images,
    assessment_id,
    content,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const [selected, setSelected] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [inputs, setInputs] = useState([]);

  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const {headers} = assessmentData;
  const dispatch = useDispatch();
  let userId = getItem('userId');

  useEffect(() => {
    const assessmentCards = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        assessmentCards.push(...item.cards);
      });
    }
    let selectedFormat = assessmentCards.map((item) => {
      return {_id: item.assessment_header_id, content: item.content};
    });
    let selectUserInputs = assessmentCards.map((item) => {
      return {
        assessment_header_id: item.assessment_header_id,
        content: item.content,
        content_id: item._id,
        order: item.order,
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
    setUserInputs(firstAssessmentContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);
  useEffect(() => {
    // let headers =
    //   assessmentData.headers && assessmentData.headers.length
    //     ? assessmentData.headers
    //     : [];
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
            // order: idx,
          };
        }),
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers]);
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

  /**********************FIRST ASSESSMENT****************** */
  const onSaveFirstAssessment = (e) => {
    e.preventDefault();
    let modifyData = userInputs.length
      ? userInputs.map((item) => {
          return {
            assessment_header_id: item.assessment_header_id,
            content: [{content: item.content, order: item.order}],
          };
        })
      : [];
    let firstParams = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: modifyData,
    };

    if (userInputs.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(firstParams, onSubmitMessage));
      } else {
        dispatch(AppActions.saveUserAssessment(firstParams, onSubmitMessage));
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: 'Please perform your exercise',
      });
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
      {/***************************ASSESSMENTS DESCRIPTION ONE ************* */}
      <div style={{...commonStyles.assessmentWrapper, marginBottom: '50px'}}>
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
        ? inputs.map((item) => {
            return (
              <div>
                <div
                  style={{
                    backgroundColor: generateDynamicColor(item.order),
                  }}>
                  <p
                    style={{
                      color: WHITE,
                      padding: '10px',
                    }}>
                    {ReactHtmlParser(item.name)}
                  </p>
                </div>
                {userInputs && userInputs.length
                  ? userInputs
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .filter((ele) => {
                        return ele.assessment_header_id === item._id;
                      })
                      .map((val) => {
                        return (
                          <div style={styles.crossIconWrapper}>
                            <input
                              type="text"
                              className="f-field"
                              name={name}
                              disabled={'true'}
                              style={styles.selectedText}
                              value={val.content}
                            />
                            <div
                              style={styles.circleCrossDiv}
                              onClick={() => {
                                setUserInputs(
                                  userInputs.filter((ele) => {
                                    return ele.content !== val.content;
                                  }),
                                );
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
                          </div>
                        );
                      })
                  : null}
                <div style={styles.plusIconWrapper} className="v-p-field">
                  <input
                    type="text"
                    className="f-field"
                    name={item.name}
                    placeholder={item.placeholder}
                    style={styles.selectedText}
                    value={item.value}
                    onChange={(e) => onHandleChange(e, item)}
                  />
                  <div
                    style={{
                      ...styles.circleDiv,
                      backgroundColor: item.value.length ? GREEN_TEXT : GRAY,
                    }}
                    onClick={() => {
                      const userInputsOrder =
                        userInputs && userInputs.length
                          ? userInputs
                              .filter(
                                (ele) => ele.assessment_header_id === item._id,
                              )
                              .map((val) => val.order)
                          : 0;
                      let maxOrder = userInputsOrder.length
                        ? Math.max(...userInputsOrder)
                        : 0;

                      if (item.value.length) {
                        setUserInputs([
                          ...userInputs,
                          {
                            assessment_header_id: item._id,
                            content: item.value,
                            order: maxOrder + 1,
                          },
                        ]);
                      }
                      headers &&
                        headers.length &&
                        setInputs(
                          headers.map((val) => {
                            return {
                              content: [],
                              name: val.header,
                              placeholder: val.description,
                              order: val.order,
                              value: '',
                              _id: val._id,
                            };
                          }),
                        );
                    }}>
                    <span style={styles.plusIcon}>+</span>
                  </div>
                </div>
              </div>
            );
          })
        : null}
      <div style={commonStyles.buttonWrapper}>
        <button
          className="btn-orange"
          onClick={(e) => onSaveFirstAssessment(e)}>
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

export default ThirtyThree;
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
  button: {width: '20%', marginTop: '30px'},
  image: {width: '100%', height: '100%'},
  imageWrapper: {
    width: '120px',
    height: '100px',
  },
  selectedText: {
    backgroundColor: '#F1F3FA',
    width: '100%',
    // marginBottom: '3%',
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
    //  border: '1px solid red',
    display: 'flex',
    marginBottom: '15px',
    position: 'relative',
  },
  plusIconWrapper: {
    display: 'flex',
    marginBottom: '13%',
    position: 'relative',
  },
};
