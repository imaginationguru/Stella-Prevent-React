import React, {useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import ExerciseBox from '../../../components/ExerciseBox';
import commonStyles from '../commonStyles';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {translate as ts} from '../../../i18n/translate';
import {getItem} from '../../../utils/AsyncUtils';
const {IMAGE_BASE_URL, COLORS, ACTION_TYPE} = GLOBALS;
const {YELLOW, GRAY, GREEN_TEXT, BG_RED, RED} = COLORS;
const Template44 = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    assessment_id,
    showExercises,
    onSubmitMessage,
    week,
  } = props.card;
  const {assessments} = props;
  const dispatch = useDispatch();
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const [inputs, setInputs] = useState([]);
  const userId = getItem('userId');
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
            content: [{id: '', content: '', order: ''}],
            name: item.header,
            placeholder: item.description,
            order: item.order,
            _id: item._id,
          };
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData]);

  useEffect(() => {
    const cardsData = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        return cardsData.push(...item.cards);
      });
    }

    let uniqueHeadingId = cardsData.length
      ? [...new Set(cardsData.map((item) => item.assessment_header_id))]
      : [];
    let x = [];
    if (cardsData.length) {
      x = cardsData.map((val) => {
        let assessmentHeaderData = val.assessment_header.length
          ? val.assessment_header[0]
          : '';
        return {
          content: [{id: val._id, content: val.content, order: val.order}],
          name: assessmentHeaderData.header,
          placeholder: assessmentHeaderData.description,
          order: assessmentHeaderData.order,
          _id: val.assessment_header_id,
        };
      });
    } else {
      x = inputs.length ? inputs : [];
    }

    let tempOne = [];
    if (uniqueHeadingId.length) {
      uniqueHeadingId.forEach((val) => {
        tempOne.push({_id: val});
      });
    }
    let tempTwo = [];
    if (tempOne.length) {
      tempTwo = tempOne.map((ele) => {
        let contentArray = [];
        if (x.length) {
          x.forEach((e) => {
            if (e._id === ele._id) {
              contentArray.push(...e.content);
            }
          });
        }
        const data = x.length ? x.find((e) => e._id === ele._id) : {};
        return {
          ...ele,
          name: data.name || '',
          order: data.order || 0,
          content: contentArray,
        };
      });
    }
    let tempThree = tempTwo.length
      ? tempTwo.map((item) => {
          return {
            ...item,
            content: item.content.length
              ? item.content.sort((a, b) => (a.order > b.order && 1) || -1)
              : [],
          };
        })
      : [];

    let tempFour = tempThree.length
      ? tempThree.map((item) => {
          return {
            ...item,
            content: item.content.length ? item.content : [],
          };
        })
      : [];
    if (cardsData.length) {
      setInputs(tempFour);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  const onHandleChange = (e, id, idx) => {
    setInputs(
      inputs.length
        ? inputs.map((val) => {
            if (val._id === id && val.name === e.target.name) {
              return {
                ...val,
                content: val.content.length
                  ? val.content.map((ele, index) => {
                      if (index === idx) {
                        return {
                          ...ele,
                          content: e.target.value,
                          id: idx,
                          order: idx,
                        };
                      } else {
                        return ele;
                      }
                    })
                  : [],
              };
            } else {
              return val;
            }
          })
        : [],
    );
  };
  const addHandler = () => {
    const initial = {content: '', order: ''};
    console.log('is API call>in add');
    const temp = inputs.length
      ? inputs.map((item) => {
          return {
            ...item,
            content: item.content.length ? [...item.content, initial] : [],
          };
        })
      : [];
    setInputs(temp);
  };

  const deleteHandler = (index) => {
    const deleteDataTemp = [];
    const temp = inputs.length
      ? inputs.map((item) => {
          const deleteData1 = item.content
            .filter((e, i) => i === index)
            .map((val) => {
              console.log('delete cal', val);
              return val.id;
            });
          if (deleteData1.length) {
            deleteDataTemp.push(...deleteData1);
          }
          return {
            ...item,
            content: item.content.filter((e, i) => i !== index),
          };
        })
      : [];

    let isAPICall = false;
    console.log('data delete datatemp', deleteDataTemp, deleteDataTemp.length);
    if (deleteDataTemp.length) {
      const tempCall = deleteDataTemp.find(
        (item) => item !== undefined || item !== 0 || item !== '',
      );
      console.log('tempcall>>>>>', tempCall, tempCall ? true : false);
      isAPICall = tempCall ? true : false;
    }
    if (deleteDataTemp.length && isAPICall) {
      dispatch(
        AppActions.deleteUserAssessmentData(
          deleteDataTemp[0],
          props._id,
          assessment_id,
          deleteDataTemp,
        ),
      );
    }
    setInputs(temp);
  };
  const onSaveAssessment = (val) => {
    val.preventDefault();
    let modifyData = inputs.length
      ? inputs.map((item) => {
          return {
            assessment_header_id: item._id,
            content: item.content.length
              ? item.content
                  .map((el, i, arr) => {
                    const tempOrder = arr[i - 1] ? arr[i - 1].order + 1 : 0;
                    return {
                      ...el,
                      id: el.id || 0,
                      order: el.order || tempOrder,
                    };
                  })
                  .filter((e) =>
                    e.id === 0 || e.id || e.id === '' ? true : false,
                  )
              : [],
          };
        })
      : [];
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: modifyData,
    };
    console.log('params modif data', modifyData);
    let isAPICall = false;
    if (modifyData.length) {
      let index = 0;
      modifyData.forEach((item) => {
        if (item.content.length === 1) {
          index = 0;
        } else {
          index = item.content.length - 2;
        }
      });
      let temp = [];
      let tempOne = [];
      let tempTwo = [];
      temp = modifyData.map((item) => item.content);
      if (temp.length) {
        temp.forEach((ele) => {
          tempOne.push(...ele.filter((e, i) => i === index));
        });
      }
      if (tempOne.length) {
        tempOne.forEach((ele) => {
          tempTwo.push(ele.content.length ? true : false);
        });
      }
      if (tempTwo.length) {
        isAPICall =
          tempTwo.filter((e) => e === false).length === 3 ? false : true;
      }
    }

    if (userAssessmentData && userAssessmentData.length && isAPICall) {
      console.log('PArams>> update>>>', JSON.stringify(params));
      dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
    } else {
      if (isAPICall) {
        console.log('PArams>>>>>', JSON.stringify(params));
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please perform your exercise',
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
                  style={{display: item.image !== '' ? 'flex' : 'none'}}
                />
              );
            })
        : null}

      {/**********************content************** */}
      <div style={commonStyles.contentLeftBorder}>
        {content && content.length
          ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .filter((item) => item.type === 'first')
              .map((item, index) => {
                return (
                  <CardContent
                    key={index}
                    content={ReactHtmlParser(item.content)}
                  />
                );
              })
          : []}
      </div>
      {/*****************assessment description***************** */}
      <div style={{...commonStyles.assessmentWrapper, marginTop: '40px'}}>
        {images && images.length
          ? images
              .filter((item) => item.image_type === 'second')
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

      <div className="row">
        {inputs.length
          ? inputs
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                let isAdd = false;
                if (item.content.length) {
                  isAdd = item.content.find((e) => {
                    return e.content.length;
                  })
                    ? true
                    : false;
                }

                return (
                  <div
                    className="col-4"
                    style={{marginTop: '30px', marginBottom: '60px'}}>
                    <div
                      style={{
                        padding: '1px',
                        borderRadius: '5px',
                        backgroundColor: YELLOW,
                      }}>
                      <CardContent content={ReactHtmlParser(item.name)} />
                    </div>

                    {item.content.length
                      ? item.content.map((val, idx, arr) => {
                          const showPlus = i === 2 && idx === arr.length - 1;
                          const isDelete = i === 2 && idx < arr.length - 1;
                          return (
                            <div style={styles.plusIconWrapper} className="v-p-field">
                              <div
                                style={{
                                  flexDirection: 'column',
                                  width: '100%',
                                }}>
                                <input
                                  type="text"
                                  className="f-field"
                                  name={item.name}
                                  placeholder={item.placeholder}
                                  style={styles.selectedText}
                                  value={val.content}
                                  onChange={(e) =>
                                    onHandleChange(e, item._id, idx)
                                  }
                                />
                                {showPlus ? (
                                  <div
                                    onClick={() => {
                                      addHandler();
                                    }}
                                    style={{
                                      ...styles.circleDiv,
                                      backgroundColor: val.content.length
                                        ? GREEN_TEXT
                                        : GRAY,
                                    }}>
                                    <span style={styles.plusIcon}>+</span>
                                  </div>
                                ) : null}
                                {isDelete ? (
                                  <div
                                    onClick={() => deleteHandler(idx)}
                                    style={{
                                      ...styles.circleCrossDiv,
                                      backgroundColor: BG_RED,
                                    }}>
                                    <span style={styles.plusIcon}>x</span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                );
              })
          : null}
        {inputs.length ? (
          <div style={commonStyles.buttonWrapper}>
            <button
              className="btn-orange"
              onClick={(e) => {
                onSaveAssessment(e);
              }}>
              {ts('SAVE')}
            </button>
          </div>
        ) : null}
      </div>
      {/**********************content************** */}
      <div style={commonStyles.contentLeftBorder}>
        {content && content.length
          ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .filter((item) => item.type === 'second')
              .map((item, index) => {
                return (
                  <CardContent
                    key={index}
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

export default Template44;

const styles = {
  selectedText: {
    backgroundColor: '#F1F3FA',
    width: '100%',
    marginTop: '3%',
  },
  circleDiv: {
    backgroundColor: GRAY,
    width: '35px',
    height: '35px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-20px',
    top: '17px',
  },
  plusIconWrapper: {
    display: 'flex',
    marginBottom: '2%',
    position: 'relative',
  },
  plusIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    color: 'WHITE',
    fontSize: '25px',
  },
  circleCrossDiv: {
    backgroundColor: RED,
    width: '25px',
    height: '25px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-12px',
    top: '0px',
  },
};
