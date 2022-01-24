import React, {useState, useEffect} from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import ExerciseBox from '../../../components/ExerciseBox';
import {translate as ts} from '../../../i18n/translate';

import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import commonStyles from '../commonStyles';
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {YELLOW, WHITE, CIRCLE_GRAY, LIGHT_GRAY, GREEN_TEXT} = COLORS;
let userId = getItem('userId');
const dataMapperAss = (arr = []) => {
  let temp = [];
  if (arr.length) {
    temp = arr.map((item) => {
      return {
        assessment_header_id: item._id,
        content: [{content: item.value, order: item.order}],
      };
    });
  }
  return temp;
};

const InputBoxWithContent = (props) => {
  const {title, placeholder, value, onChange, style, name} = props;
  return (
    <div style={styles.inputBoxWrapper}>
      <div style={style}>
        <p style={styles.header}>{title}</p>
      </div>
      <div style={styles.inputBox}>
        <form noValidate>
          <textarea
            type="description"
            // className="f-field"
            value={value}
            name={name}
            onChange={onChange}
            required
            placeholder={placeholder}
            style={styles.inputStyle}
            rows={3}
          />
        </form>
      </div>
    </div>
  );
};

const Seventeen = (props) => {
  const [inputs, setInputs] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [getCardsData, setGetCardsData] = useState([]);
  const [displayContent, setDisplayContent] = useState('false');
  const [show, setShow] = useState([]);
  const {
    card_title,
    descriptions,
    card_time,
    images,
    quotes,
    content,
    assessment_id,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const dispatch = useDispatch();
  const {assessmentData = {heading: []}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );

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
    //dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData, assessment_id]);
  useEffect(() => {
    const getDataMapper = (arr = []) => {
      let temp = [];
      if (arr.length) {
        let pTemp = [];
        let cardsData = [];
        arr.forEach((item) => {
          cardsData.push(...item.cards);
        });
        setAllCards(cardsData);
        arr.forEach((item, i) => {
          const onlyOneCard = item.cards.length
            ? item.cards.sort(
                (a, b) => (a.createdAt < b.createdAt && 1) || -1,
              )[0]
            : [];
          return pTemp.push(onlyOneCard);
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
            return {...item, value: val};
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);
  const showHandler = (time = '') => {
    if (show.length) {
      const isAlready = show.some((val) => val === time);
      if (isAlready) {
        setShow(show.filter((val) => val !== time));
      } else {
        setShow([...show, time]);
      }
    } else {
      setShow([time]);
    }
  };
  useEffect(() => {
    let uniqueTime = [];
    let temp = [];
    if (allCards.length) {
      uniqueTime = new Set(allCards.map((val) => val.updatedAt));
      uniqueTime.forEach((val) =>
        temp.push({
          updatedAt: val,
          data: allCards
            .sort((a, b) => (a.createdAt < b.createdAt && 1) || -1)
            .filter((item) => val === item.updatedAt),
        }),
      );
      setGetCardsData(temp);
    }
  }, [allCards]);

  const onSaveMyths = (e) => {
    e.preventDefault();
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: dataMapperAss(inputs),
    };

    if (userAssessmentData && userAssessmentData.length) {
      //dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
      dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
    } else {
      let isValid = false;
      if (inputs && inputs.length) {
        let temp = [];
        inputs.forEach((item) => {
          temp.push(item.value);
        });
        if (temp.length) {
          isValid = temp.filter((item) => item === '').length === 0;
          // isValid = temp.find((item) => item !== 0) ? true : false;
        }
      }
      if (isValid) {
        console.log('gjhfjhf');
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please complete the exercise!',
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
  const headerColor = (order) => {
    if (order === 0 || order <= 2) {
      return YELLOW;
    }
    if (order === 3 || order === 5) {
      return GREEN_TEXT;
    }
    if (order === 4 || order === 6) {
      return CIRCLE_GRAY;
    } else {
      return YELLOW;
    }
  };
  const headingOne =
    assessmentData.heading &&
    assessmentData.heading.length &&
    assessmentData.heading[0]
      ? assessmentData.heading[0].heading
      : null;
  const headingSecond =
    assessmentData.heading &&
    assessmentData.heading.length &&
    assessmentData.heading[1]
      ? assessmentData.heading[1].heading
      : null;

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
      {/**********************Images************** */}
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '30px',
        }}>
        {images && images.length
          ? images
              .filter((item) => item.image_type === 'first')
              .map((item, i) => {
                return (
                  <CustomImage
                    key={i}
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                  />
                );
              })
          : null}
      </div>
      {/**********************description************** */}
      {descriptions && descriptions.length
        ? descriptions
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  description={ReactHtmlParser(item.desc)}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : []}
      {/*******************************ASSESSMENT DESCRIPTION*********************** */}
      {props.assessments &&
      props.assessments.length &&
      props.assessments[0].description !== '' ? (
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
      ) : null}

      {assessmentData.heading && assessmentData.heading.length ? (
        <div style={styles.inputBoxWrapper}>
          {headingOne !== '' ? (
            <p
              style={{
                ...styles.heading,
                width: '20%',
                backgroundColor: headingOne !== '' ? YELLOW : WHITE,
              }}>
              {ReactHtmlParser(headingOne)}
            </p>
          ) : null}
          {headingSecond !== '' ? (
            <p
              style={{
                ...styles.heading,
                width: '78%',
                backgroundColor: headingOne !== '' ? YELLOW : WHITE,
              }}>
              {ReactHtmlParser(headingSecond)}
            </p>
          ) : null}
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
                        ? headerColor(item.order)
                        : YELLOW,
                    width: '20%',
                  }}
                />
              );
            })
        : null}
      {inputs.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {/*******************exercise uncomment after******** */}
      {/* 
      {getCardsData.length
        ? getCardsData.map((item) => {
            return (
              <div style={{marginBottom: '50px'}}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                    position: 'relative',
                  }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '40px',
                      position: 'absolute',
                      right: 0,
                      top: '-20px',
                      backgroundColor: YELLOW,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                    onClick={() => showHandler(item.updatedAt)}>
                    {show.some((ele) => ele === item.updatedAt) ? (
                      <img
                        src={upArrow}
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    ) : (
                      <img
                        src={arrowDown}
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    )}
                  </div>
                </div>
                {item.data
                  .sort((a, b) => (a.order > b.order && 1) || -1)
                  .filter((e, index) => {
                    console.log('e.length???????', index);
                    if (show.length) {
                      let isShow = false;
                      isShow = show.some((ele) => ele === item.updatedAt);
                      return isShow ? index === 0 || index : index < 2;
                    } else {
                      return index < 2;
                    }
                  })
                  .map((val) => {
                    return (
                      <div>
                        <div style={styles.cardsDataWrapper}>
                          <div
                            style={{
                              width: '20%',
                            }}>
                            <p
                              style={{
                                ...styles.valHeader,
                                backgroundColor: headerColor(val.order),
                              }}>
                              {ReactHtmlParser(
                                val.assessment_header.length &&
                                  val.assessment_header[0].header,
                              )}
                            </p>
                          </div>
                          <div style={{width: '78%'}}>
                            <p style={styles.valContent}>{val.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })
        : null} */}

      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : []}
      {showExercises && <ExerciseBox week={week} />}
    </div>
  );
};
export default Seventeen;
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
  inputBox: {width: '78%'},
  inputStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    width: '100%',
    paddingTop: '5px',
    paddingLeft: '5px',
  },
  heading: {
    color: WHITE,
    textAlign: 'center',
    paddingTop: '10px',
    borderRadius: '5px',
  },
  valHeader: {
    textAlign: 'center',
    backgroundColor: YELLOW,
    paddingTop: '8px',
    paddingBottom: '1px',
    borderRadius: '5px',
  },
  valContent: {
    paddingTop: '10px',
    paddingBottom: '15px',
    borderRadius: '5px',
    paddingLeft: '15px',
    backgroundColor: LIGHT_GRAY,
  },
  cardsDataWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // border: '2px solid blue',
  },
};
