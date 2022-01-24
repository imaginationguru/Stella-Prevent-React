/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {TextInput, FlatList, View} from 'react-native';
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
  CustomImage,
} from '../../../components/Cards';
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {BOX_GRAY, GRAY2, BUTTON_ORANGE} = COLORS;

const FourOne = (props) => {
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
  const [isInputVisible, setInputVisible] = useState(false);

  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const {inputs, assessments} = props;
  const {headers} = assessmentData;
  const dispatch = useDispatch();
  let userId = getItem('userId');

  // useEffect(() => {
  //   dispatch(AppActions.getUserAssessment(props._id, assessment_id));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [assessment_id]);

  useEffect(() => {
    console.log('userAssessmentData', userAssessmentData);
    const assessmentCards = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        assessmentCards.push(...item.cards);
      });
    }
    let selectedFormat = assessmentCards.map((item) => {
      return {_id: item.assessment_header_id, content: item.content};
    });
    console.log('assessmentCards', assessmentCards);
    console.log('props.inputs>>>>>', props.inputs);
    assessmentCards.map((item) => {
      props.inputs.map((ele) => {
        if (item.order === ele.order) {
          ele.inputAnswer = item.input_content;
          ele.update_id = item._id;
        }
      });
    });

    setSelected(selectedFormat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  const updateYESNO = (data = {}, arr = []) => {
    if (arr.length) {
      const isAlready = arr.find((item) => item._id === data._id)
        ? true
        : false;
      if (isAlready) {
        const isSameContent = arr.find(
          (item) => item._id === data._id && item.content === data.content,
        )
          ? true
          : false;
        if (isSameContent) {
          setSelected(arr.filter((item) => item._id !== data._id));
        } else {
          setSelected(
            arr.map((item) => {
              return {
                ...item,
                content: item._id === data._id ? data.content : item.content,
              };
            }),
          );
        }
      } else {
        setSelected([...arr, data]);
      }
    } else {
      setSelected([data]);
    }
  };

  const onSaveMyths = (e) => {
    let userAssessment, userInputsUpdate, userInputsSave;
    if (userAssessmentData && userAssessmentData.length) {
      //update
      userAssessment = selected.map((item) => {
        if (item._id !== undefined) {
          return {
            assessment_header_id: item._id,
            content: [{content: item.content}],
          };
        } else {
          return [];
        }
      });

      userInputsUpdate = selected.map((item) => {
        if (item.update_id !== undefined) {
          return {
            id: item.update_id,
            input_content: item.inputText,
            order: item.order,
          };
        } else {
          return {
            order: item.order,
            input_content: item.inputText,
            user_id: userId,
            user_card_id: props._id,
            assessment_id: assessment_id,
            assessment_header_id: item._id,
            input_box_id: item.input_id,
          };
        }
      });
    } else {
      //save
      userAssessment = selected.map((item) => {
        return {
          assessment_header_id: item._id,
          content: [{content: item.content}],
        };
      });

      userInputsSave = selected.map((item) => {
        if (item.input_id !== undefined) {
          return {
            input_box_id: item.input_id,
            data: item.inputText,
            order: item.order,
          };
        } else {
          return [];
        }
      });
    }
    let filterUserInputSave =
      userInputsSave !== undefined
        ? userInputsSave.filter((fil) => fil.input_box_id)
        : [];
    let filterUserAssessment =
      userAssessment !== undefined
        ? userAssessment.filter((fil) => fil.assessment_header_id)
        : [];
    e.preventDefault();
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: filterUserAssessment,
      input_assessment: filterUserInputSave,
    };

    let filterUserInputsUpdtae =
      userInputsUpdate !== undefined
        ? userInputsUpdate.filter((fil) => fil.order !== undefined)
        : [];
    let paramsUpdateInput = {
      data: filterUserInputsUpdtae,
    };

    console.log('userInputsUpdate>>>>>', userInputsUpdate);
    console.log('paramsUpdateInput>>>>>', paramsUpdateInput);
    console.log('params>>>>>', params);
    if (userAssessment.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
        dispatch(
          AppActions.updateUserAssessment(paramsUpdateInput, onSubmitMessage),
        ); // input update
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

  const onChangeInput = (text, item, id) => {
    setInputVisible(true);
    selected.map((element) => {
      if (element._id === id) {
        element.order = item.order;
        element.input_id = item._id;
        element.inputText = text;
        element.update_id = item.update_id;
      }
    });
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
      {/***************************ASSESSMENTS DESCRIPTION************* */}
      <div style={{...commonStyles.assessmentWrapper, marginBottom: '60px'}}>
        {images && images.length
          ? images.map((item, index) => {
              return (
                <CustomImage
                  key={index}
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

      {/***************************ASSESSMENTS HEADERS************* */}
      {headers && headers.length
        ? headers
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, i) => {
              const isYES =
                selected && selected.length
                  ? selected.find((val) => {
                      return val._id === item._id && val.content === 'YES';
                    })
                    ? true
                    : false
                  : false;

              const isNO =
                selected && selected.length
                  ? selected.find(
                      (val) => val._id === item._id && val.content === 'NO',
                    )
                    ? true
                    : false
                  : false;

              return (
                <div>
                  <div key={i} style={commonStyles.question}>
                    <p style={{width: '85%'}}>{ReactHtmlParser(item.header)}</p>
                    <div style={styles.optionWrapper}>
                      <div
                        onClick={() => {
                          updateYESNO(
                            {_id: item._id, content: 'YES'},
                            selected,
                          );
                        }}
                        style={{
                          ...styles.rightBox,
                          backgroundColor: isYES ? BUTTON_ORANGE : GRAY2,
                        }}>
                        <img src={right} />
                      </div>
                      <div
                        onClick={() => {
                          updateYESNO({_id: item._id, content: 'NO'}, selected);
                        }}
                        style={{
                          ...styles.crossBox,
                          backgroundColor: isNO ? BUTTON_ORANGE : GRAY2,
                        }}>
                        <img src={cross} />
                      </div>
                    </div>
                  </div>
                  {props.inputs.map((element) => {
                    if (i === element.order) {
                      return (
                        <div style={{marginBottom: '5%'}}>
                          <TextInput
                            style={[
                              styles.textInputStyle,
                              {
                                borderColor: isYES
                                  ? COLORS.LIGHT_GRAY
                                  : COLORS.GRAY2,
                                backgroundColor: isYES
                                  ? COLORS.LIGHT_GRAY
                                  : COLORS.GRAY2,
                              },
                            ]}
                            placeholder={element.placeholder}
                            underlineColorAndroid="transparent"
                            editable={isYES ? true : false}
                            multiline={true}
                            value={
                              !isInputVisible
                                ? element.inputAnswer !== undefined
                                  ? element.inputAnswer
                                  : ''
                                : null
                            }
                            onChangeText={(term) => {
                              onChangeInput(term, element, item._id);
                            }}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })
        : []}
      {headers && headers.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
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
    </>
  );
};

export default FourOne;
const styles = {
  optionWrapper: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  textInputStyle: {
    width: '100%',
    marginTop: 10,
    height: '150px',
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
};
