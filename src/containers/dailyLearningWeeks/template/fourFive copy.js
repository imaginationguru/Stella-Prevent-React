/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import commonStyles from '../commonStyles';
import GLOBALS from '../../../constants';
import { TextInput, View, Text } from 'react-native';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../../actions';
import { getItem } from '../../../utils/AsyncUtils';
import { translate as ts } from '@i18n/translate';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
const { COLORS, IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;
const { BOX_GRAY, GREEN_TEXT, WHITE, GRAY, RED } = COLORS;

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
  const [modifyUserInputs, setModifyUserInputs] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [firstValue, setFirstValue] = useState({
    content: '',
    type: '',
    assessment_content_id: '',
    order: '',
  });
  const [secondValue, setSecondValue] = useState({
    content: '',
    type: '',
    assessment_content_id: '',
    order: '',
  });
  const [isInputVisible, setInputVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');

  const { assessmentData = {}, userAssessmentData = [] } = useSelector(
    (state) => state.moduleOne,
  );
  const { headers } = assessmentData;
  const dispatch = useDispatch();
  let userId = getItem('userId');

  useEffect(() => {
    const assessmentCards = [];
    const assessmentCardsCopy = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        assessmentCards.push(...item.cards);
        assessmentCardsCopy.push(...item.cards);
      });
    }

    let sortedArray = assessmentCards.map((element) => {
      let selectedFormat = [];
      let header_id, assessmentId, orderValue;

      assessmentCardsCopy.forEach((item) => {
        if (
          element.assessment_header_id === item.assessment_header_id &&
          element.order === item.order
        ) {
          orderValue = item.order;
          header_id = item.assessment_header_id;
          assessmentId = item.assessment_header.length
            ? item.assessment_header.map((val) => {
              return val.assessment_id;
            })
            : null;

          selectedFormat.push({
            content: item.content,
            order: item.order,
            type: item.type,
            assessment_content_id: item.assessment_header_id,
            content_id: item._id,
          });
        }
      });

      let finalValue = {
        content: selectedFormat,
        assessment_header_id: header_id,
        assessment_id: assessmentId,
        order: orderValue,
      };
      return finalValue;
    });

    let jsonObject = sortedArray.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    let firstAssessmentContent = uniqueArray.length
      ? uniqueArray.filter((ele) =>
        ele.assessment_id !== undefined && ele.assessment_id !== null
          ? ele.assessment_id[0] === assessment_id
          : null,
      )
      : [];
    setUserInputs(firstAssessmentContent);
  }, [userAssessmentData]);

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

  const onTextChange = (text, item, type) => {
    if (type === 'first') {
      setUserName(text);
    } else if (type === 'second') {
      setUserContact(text);
    }
    setInputVisible(false);
    const updatedInputs = inputs.length
      ? inputs.map((val) => {
        if (val.name === item.name) {
          if (type === 'first') {
            setFirstValue({
              content:
                val.name === item.name
                  ? text
                  : val.value !== ''
                    ? val.value
                    : null,
              type: type,
            });
          } else if (type === 'second') {
            setSecondValue({
              content:
                val.name === item.name
                  ? text
                  : val.value !== ''
                    ? val.value
                    : null,
              type: type,
            });
          }
          return {
            ...val,
            content: [
              type === 'second' ? firstValue : secondValue,
              {
                content: val.name === item.name ? text : val.value,
                type: type,
                assessment_content_id: '',
                order: '',
              },
            ],
          };
        } else {
          return { ...val };
        }
      })
      : [];
    setInputs(updatedInputs);
  };
  /**********************FIRST ASSESSMENT****************** */
  const onSaveFirstAssessment = (e) => {
    e.preventDefault();
    let modifyData = modifyUserInputs.length
      ? modifyUserInputs.map((item) => {
        return {
          assessment_header_id: item.assessment_header_id,
          content: item.content,
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
        payload: ts('PERFORM_EXERCISE'),
      });
    }
  };

  const onPlusBtnClick = (item) => {
    setInputVisible(true);
    if (userName !== '' && userContact !== '') {
      setUserContact('');
      setUserName('');
      const userInputsOrder =
        userInputs && userInputs.length
          ? userInputs
            .filter((ele) => ele.assessment_header_id === item._id)
            .map((val) => val.order)
          : 0;
      let maxOrder = userInputsOrder.length ? Math.max(...userInputsOrder) : 0;

      item.content.map((e) => {
        e.order = maxOrder + 1;
        e.assessment_content_id = item._id;
      });

      if (modifyUserInputs && modifyUserInputs.length) {
        let filterById = modifyUserInputs.filter(
          (element) => element.assessment_header_id === item._id,
        );
        if (filterById.length > 0) {
          let concatArray = filterById[0].content.concat(item.content);
          let findIndex = modifyUserInputs.findIndex(
            (i) =>
              i.assessment_header_id === filterById[0].assessment_header_id,
          );
          if (findIndex !== -1) {
            modifyUserInputs[findIndex].content = concatArray;
          }
        } else {
          setModifyUserInputs([
            ...modifyUserInputs,
            {
              assessment_header_id: item._id,
              content: item.content,
              order: maxOrder + 1,
            },
          ]);
        }
      } else {
        setModifyUserInputs([
          ...userInputs,
          {
            assessment_header_id: item._id,
            content: item.content,
            order: maxOrder + 1,
          },
        ]);
      }

      setUserInputs([
        ...userInputs,
        {
          assessment_header_id: item._id,
          content: item.content,
          order: maxOrder + 1,
        },
      ]);
      headers &&
        headers.length &&
        setInputs(
          headers.map((item) => {
            return {
              content: [
                {
                  type: '',
                  value: '',
                },
              ],
              name: item.header,
              placeholder: item.description,
              order: item.order,
              value: '',
              _id: item._id,
            };
          }),
        );
    }
  };

  const onCrossBtnClick = (val) => {
    setUserInputs(userInputs.filter((ele) => ele.content !== val.content));
    let contentIds =
      val.content && val.content.length
        ? val.content.map((item) => {
          return item.content_id !== undefined ? item.content_id : {};
        })
        : null;
    var emptyObjectCheck = contentIds.filter(
      (value) => Object.keys(value).length !== 0,
    );
    if (emptyObjectCheck.length) {
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

      {/***************************ASSESSMENTS DESCRIPTION ONE ************* */}
      <div style={{ ...commonStyles.assessmentWrapper, marginBottom: '50px' }}>
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
              <Text style={{ color: COLORS.WHITE }}>{element.heading}</Text>
            </View>
          );
        })
        : null}

      {inputs.length
        ? inputs.map((item) => {
          return (
            <div>
              <div style={{ backgroundColor: COLORS.CIRCLE_GRAY }}>
                <p style={{ padding: '15px', color: WHITE }}>
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
                        <View style={{ width: '49%' }}>
                          <TextInput
                            style={[
                              styles.selectedText,
                              {
                                height: '50px',
                                paddingLeft: 10,
                                paddingTop: 10,
                              },
                            ]}
                            placeholder={'Name'}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            onChangeText={(term) =>
                              onTextChange(term, item, 'second')
                            }
                            value={
                              val.content && val.content.length
                                ? setInputValue(val.content, 'first')
                                : null
                            }
                          />
                        </View>
                        <View style={{ marginLeft: '2%', width: '49%' }}>
                          <TextInput
                            style={[
                              styles.selectedText,
                              {
                                height: '50px',
                                paddingLeft: 10,
                                paddingTop: 10,
                              },
                            ]}
                            placeholder={'Contact'}
                            underlineColorAndroid="transparent"
                            maxLength={10}
                            onChangeText={(term) =>
                              onTextChange(term, item, 'second')
                            }
                            value={
                              val.content && val.content.length
                                ? setInputValue(val.content, 'second')
                                : null
                            }
                            keyboardType="numeric"
                          />
                        </View>
                        <div
                          style={styles.circleCrossDiv}
                          onClick={() => onCrossBtnClick(val)}>
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
                <View style={{ width: '49%' }}>
                  <TextInput
                    style={[
                      styles.selectedText,
                      { height: '50px', paddingLeft: 10, paddingTop: 10 },
                    ]}
                    placeholder={'Name'}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    onChangeText={(term) => onTextChange(term, item, 'first')}
                    value={isInputVisible ? '' : null}
                  />
                </View>
                <View style={{ width: '49%', marginLeft: '2%' }}>
                  <TextInput
                    style={[
                      styles.selectedText,
                      { height: '50px', paddingLeft: 10, paddingTop: 10 },
                    ]}
                    placeholder={'Contact'}
                    maxLength={10}
                    underlineColorAndroid="transparent"
                    onChangeText={(term) =>
                      onTextChange(term, item, 'second')
                    }
                    value={isInputVisible ? '' : null}
                    type="numeric"
                  />
                </View>
                <div
                  style={{
                    ...styles.circleDiv,
                    backgroundColor:
                      userName !== '' && userContact !== ''
                        ? GREEN_TEXT
                        : GRAY,
                  }}
                  onClick={() => {
                    userName !== '' && userContact !== ''
                      ? onPlusBtnClick(item)
                      : null;
                  }}>
                  <span style={styles.plusIcon}>+</span>
                </div>
              </div>
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
            {ts('SAVECONTACTS')}
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
  button: { width: '20%', marginTop: '30px' },
  image: { width: '100%', height: '100%' },
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
    display: 'flex',
    marginBottom: '15px',
    position: 'relative',
  },
  plusIconWrapper: {
    display: 'flex',
    marginBottom: '3%',
    position: 'relative',
  },
};
