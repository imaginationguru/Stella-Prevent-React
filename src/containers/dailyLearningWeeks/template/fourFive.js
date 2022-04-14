/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import commonStyles from '../commonStyles';
import GLOBALS from '../../../constants';
import {TextInput, View, Text} from 'react-native';
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
import {customAlert} from '../../../helpers/commonAlerts.web';
const {COLORS, IMAGE_BASE_URL} = GLOBALS;
const {BOX_GRAY, GREEN_TEXT, WHITE, GRAY, RED} = COLORS;

const emptyTextInputMapper = (type, order = 0) => {
  // TODO : FOR NEW empty data
  let temp = {
    type: type,
    content: '',
    order: order + 1,
    is_last: true,
  };
  return temp;
};

const FourFive = (props) => {
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
  const [userInputs, setUserInputs] = useState([]);

  const [inputs, setInputs] = useState([]);

  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );

  const dispatch = useDispatch();
  let userId = getItem('userId');

  useEffect(() => {
    console.log('Again call.....');
    dispatch(AppActions.getAssessmentData(assessment_id, props._id));
  }, [assessment_id, dispatch, props._id]);

  useEffect(() => {
    let header_input = inputs.map((item) => {
      return {
        ...item,
        content: userAssessmentData.filter(
          (ele) => ele._id.assessment_header_id == item._id,
        ),
      };
    });
    header_input = header_input.map((item) => {
      return {
        ...item,
        content: item.content.length > 0 ? item.content[0].cards : [],
      };
    });
    header_input = header_input.map((item) => {
      return {
        ...item,
        content: item.content.map((item) => {
          return {
            content: item.content,
            order: item.order,
            type: item.type,
            assessment_content_id: item.assessment_header_id,
            content_id: item._id,
          };
        }),
      };
    });
    console.log(header_input, 'header_input.........');
    /**Add saved value in array */
    if (inputs.length > 0) {
      let new_modInput = header_input.map((item) => {
        if (item.content.length == 0) {
          let newItem = [];
          newItem.push(emptyTextInputMapper('first'));
          newItem.push(emptyTextInputMapper('second'));
          return {
            ...item,
            content: newItem,
          };
        } else {
          let newItem = [];
          let leftOrder = 0;
          let rightOrder = 0;
          let leftItem = item.content.filter((item) => item.type == 'first');
          let rightItem = item.content.filter((item) => item.type == 'second');
          if (leftItem.length > 0)
            leftOrder = Math.max.apply(
              Math,
              leftItem.map(function (o) {
                return o.order;
              }),
            );
          if (rightItem.length > 0)
            rightOrder = Math.max.apply(
              Math,
              rightItem.map(function (o) {
                return o.order;
              }),
            );

          newItem.push(...item.content);
          newItem.push(emptyTextInputMapper('first', leftOrder));
          newItem.push(emptyTextInputMapper('second', rightOrder));
          return {
            ...item,
            content: newItem,
          };
        }
      });
      setInputs(new_modInput);
    }
  }, [userAssessmentData, inputs]);

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
            content: [],
            name: item.header,
            placeholder: item.description,
            order: item.order,
            value: '',
            _id: item._id,
          };
        }),
      );
  }, [assessmentData]);

  const onTextChange = (outer_index, text, val) => {
    let inner_index = inputs[outer_index].content.findIndex(
      (x) => x.order == val.order && x.type == val.type,
    );
    console.log(outer_index, inner_index, text, inputs, val);

    let all_heading = inputs;
    let currentHeading = inputs[outer_index];
    let currect_heading_option = inputs[outer_index].content;

    currect_heading_option = currect_heading_option.map((item, inner_ind) => {
      return {
        ...item,
        content: inner_ind == inner_index ? text : item.content,
      };
    });
    /**Assign updated option to given heading */
    currentHeading = Object.assign({}, currentHeading, {
      content: currect_heading_option,
    });
    /**Assign updated heading to list of heading */
    all_heading = Object.assign([], all_heading, {
      [outer_index]: currentHeading,
    });
    setInputs(all_heading);
  };
  /**********************FIRST ASSESSMENT****************** */
  const onSaveFirstAssessment = (e) => {
    console.log(inputs);
    let modifyData = inputs
      .map((item) => {
        return {
          assessment_header_id: item._id,
          content: item.content.filter(
            (elem) => elem.content != '' && !elem.is_last,
          ),
        };
      })
      .filter((e) => e.content.length > 0);

    let firstParams = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: modifyData,
    };
    console.log(modifyData, 'modifyData.', firstParams, userAssessmentData);
    //  return
    if (modifyData.length == 0) {
      customAlert('Please perform your exercise', 'error');
    } else {
      console.log(userAssessmentData, 'll');
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(firstParams, onSubmitMessage));
      } else {
        dispatch(AppActions.saveUserAssessment(firstParams, onSubmitMessage));
      }
    }
  };

  const checkRowFilled = (outer_index, inner) => {
    let all_filled = false;
    let curr_row = inputs[outer_index].content.filter(
      (item) => item.order == inner.order,
    );
    all_filled = curr_row.every((val) => val.content != '');
    return all_filled;
  };
  const onPlusBtnClick = (outer_index, inner) => {
    if (checkRowFilled(outer_index, inner)) {
      let all_heading = inputs;
      let currentHeading = inputs[outer_index];
      let currect_heading_option = inputs[outer_index].content;
      currect_heading_option = currect_heading_option.map((item, inner_ind) => {
        return {
          ...item,
          is_last: false,
          assessment_content_id: inputs[outer_index]._id,
        };
      });

      currect_heading_option.push(emptyTextInputMapper('first', inner.order));
      currect_heading_option.push(emptyTextInputMapper('second', inner.order));
      /**Assign updated option to given heading */
      currentHeading = Object.assign({}, currentHeading, {
        content: currect_heading_option,
      });

      /**Assign updated heading to list of heading */
      all_heading = Object.assign([], all_heading, {
        [outer_index]: currentHeading,
      });

      setInputs(all_heading);
    }
  };

  const onCrossBtnClick = (outer_index, val) => {
    console.log(outer_index, val, 'outer_index,val..');
    /**Row locally added and then deleting */
    if (!val.content_id) {
      let all_heading = inputs;
      let currentHeading = inputs[outer_index];
      let currect_heading_option = inputs[outer_index].content;
      currect_heading_option = currect_heading_option.filter(
        (item) => item.order != val.order,
      );

      /**Assign updated option to given heading */
      currentHeading = Object.assign({}, currentHeading, {
        content: currect_heading_option,
      });
      /**Assign updated heading to list of heading */
      all_heading = Object.assign([], all_heading, {
        [outer_index]: currentHeading,
      });
      setInputs(all_heading);
    } else {
      let currect_heading_option = inputs[outer_index].content.filter(
        (item) => item.order == val.order,
      );

      let contentIds = currect_heading_option.map((item) => {
        return item.content_id !== undefined ? item.content_id : {};
      });
      console.log(contentIds, 'contentIds..', props._id, assessment_id);
      //return;
      dispatch(
        AppActions.deleteUserAssessmentData(
          contentIds[0],
          props._id,
          assessment_id,
          contentIds,
        ),
      );
    }
  };

  const setInputValue = (val, type) => {
    console.log(val, 'val.....');
    let filterValue;
    if (val !== undefined) {
      if (type === 'first') {
        filterValue = val.filter((e) => e.type === 'first');
      } else if (type === 'second') {
        filterValue = val.filter((e) => e.type === 'second');
      }
      let input =
        filterValue && filterValue.length
          ? filterValue.map((e) => {
              return e.content;
            })
          : null;
      return input;
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

      {/***************************ASSESSMENTS DESCRIPTION ONE ************* */}
      <div style={{...commonStyles.assessmentWrapper, marginBottom: '50px'}}>
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

      {/* assessment heading */}
      {assessmentData.heading && assessmentData.heading.length
        ? assessmentData.heading.map((element) => {
            return (
              <View
                style={{
                  padding: 20,
                  backgroundColor: COLORS.DARK_GREEN,
                  marginBottom: 10,
                }}>
                <Text style={{color: COLORS.WHITE}}>{element.heading}</Text>
              </View>
            );
          })
        : null}
      {console.log(inputs, 'match...', userInputs)}
      {inputs.length
        ? inputs.map((item, index) => {
            return (
              <div>
                <div style={{backgroundColor: COLORS.CIRCLE_GRAY}}>
                  <p style={{padding: '15px', color: WHITE}}>
                    {ReactHtmlParser(item.name)}
                  </p>
                </div>

                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '49%'}}>
                    {item.content
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .map((val, inner) => {
                        return (
                          <>
                            {val.type == 'first' && (
                              <div style={styles.crossIconWrapper}>
                                <TextInput
                                  style={[
                                    styles.selectedText,
                                    {
                                      height: '50px',
                                      paddingLeft: 10,
                                      paddingTop: 10,
                                    },
                                  ]}
                                  editable={val.is_last ? true : false}
                                  placeholder={'Name'}
                                  underlineColorAndroid="transparent"
                                  multiline={true}
                                  value={val.content}
                                  onChangeText={(term) =>
                                    onTextChange(index, term, val)
                                  }
                                />
                              </div>
                            )}
                          </>
                        );
                      })}
                  </View>
                  <View style={{marginLeft: '2%', width: '47%'}}>
                    {item.content
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .map((val, ind) => {
                        return (
                          <>
                            {val.type == 'second' && (
                              <div style={styles.crossIconWrapper}>
                                <TextInput
                                  style={[
                                    styles.selectedText,
                                    {
                                      height: '50px',
                                      paddingLeft: 10,
                                      paddingTop: 10,
                                    },
                                  ]}
                                  keyboardType={'numeric'}
                                  editable={val.is_last ? true : false}
                                  placeholder={'Contact'}
                                  underlineColorAndroid="transparent"
                                  multiline={true}
                                  value={val.content}
                                  onChangeText={(term) =>
                                    onTextChange(index, term, val)
                                  }
                                />
                                {val.is_last ? (
                                  <div
                                    style={{
                                      ...styles.circleDiv,

                                      backgroundColor: checkRowFilled(
                                        index,
                                        val,
                                      )
                                        ? GREEN_TEXT
                                        : GRAY,
                                    }}
                                    onClick={() => {
                                      onPlusBtnClick(index, val);
                                      // userName !== '' && userContact !== ''
                                      //   ? onPlusBtnClick(item)
                                      //   : null;
                                    }}>
                                    <span style={styles.plusIcon}>+</span>
                                  </div>
                                ) : (
                                  <div
                                    style={styles.circleCrossDiv}
                                    onClick={() => onCrossBtnClick(index, val)}>
                                    <span
                                      style={{
                                        ...styles.plusIcon,
                                        fontSize: '15px',
                                      }}>
                                      x
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })}
                  </View>
                </View>
              </div>
            );
          })
        : null}
      {inputs.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button
            className="btn-orange"
            onClick={(e) => onSaveFirstAssessment(e)}
            disable={false}>
            {ts('SAVE CONTACTS')}
          </button>
        </div>
      ) : null}

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

export default FourFive;
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
  },
  circleDiv: {
    backgroundColor: GRAY,
    width: '35px',
    height: '35px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-12px',
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
    display: 'flex',
    marginBottom: '15px',
    position: 'relative',
    flexWrap: 'wrap',
  },
  plusIconWrapper: {
    display: 'flex',
    marginBottom: '3%',
    position: 'relative',
  },
};
