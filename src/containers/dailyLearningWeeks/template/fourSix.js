/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {TextInput, View, Text, FlatList, Dimensions} from 'react-native';
import commonStyles from '../commonStyles';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import {translate as ts} from '../../../i18n/translate';
import ExerciseBox from '../../../components/ExerciseBox';
import {customAlert} from '../../../helpers/commonAlerts.web';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import {wrap} from 'lodash';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {BOX_GRAY, GREEN_TEXT, CIRCLE_GRAY, WHITE, GRAY, RED} = COLORS;

const FourSix = (props) => {
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
  const [refresh, setRefresh] = useState(false);

  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const {headers} = assessmentData;
  const dispatch = useDispatch();
  let userId = getItem('userId');

  useEffect(() => {
    let headers =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers
        : [];
    // console.log('headers', headers);

    const assessmentCards = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        assessmentCards.push(...item.cards);
      });
    }
    console.log('assessmentCards', assessmentCards);
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

    selectUserInputs.map((element) => {
      headers && headers.length
        ? headers.map((item) => {
            if (element.assessment_header_id === item._id) {
              element.placeholder = item.description;
              element.name = item.header;
            }
          })
        : null;
    });
    let sortedOrderArray = selectUserInputs.sort((a, b) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0,
    );
    let lastOrderObj =
      sortedOrderArray.length && sortedOrderArray[sortedOrderArray.length - 1];
    let lastOrder;
    if (lastOrderObj !== undefined && lastOrderObj.order !== undefined) {
      lastOrder = lastOrderObj.order;
    } else {
      lastOrder = 0;
    }

    let firstAssessmentContent =
      sortedOrderArray && sortedOrderArray.length
        ? sortedOrderArray.filter(
            (ele) =>
              ele.assessment_id.length &&
              ele.assessment_id[0] === assessment_id,
          )
        : [];
    setSelected(selectedFormat);
    if (firstAssessmentContent.length == 0) {
      let headerInputs = [];
      if (headers && headers.length) {
        headerInputs = headers.map((item, index) => {
          let indexUpdate = index + 1;
          return {
            assessment_header_id: item._id,
            content: '',
            content_id: null,
            name: item.header,
            order: lastOrder + indexUpdate,
            assessment_id: null,
            placeholder: item.description,
            value: '',
          };
        });
      }
      Array.prototype.push.apply(firstAssessmentContent, headerInputs);
    }

    setUserInputs(firstAssessmentContent);
    console.log(firstAssessmentContent, 'firstAssessmentContent..');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  /**********************SAVE ASSESSMENT****************** */
  const onSaveFirstAssessment = (e) => {
    e.preventDefault();
    console.log(userInputs, 'userInputs...', headers);
    let emptyRowCount = userInputs.filter((item) => item.content == '').length;

    /**If any of the row is empty */
    if (emptyRowCount == 1) {
      customAlert('Please perform your exercise', 'error');
      return;
    }
    let contentArray = [];
    headers.forEach((element) => {
      let filterValue = userInputs
        .filter((ele) => ele.assessment_header_id === element._id)
        .filter((ele) => ele.content !== '');
      contentArray.push(filterValue);
    });
    console.log(contentArray, 'contentArray....');
    let modifyArray = contentArray.map((element, index) => {
      return {
        // assessment_header_id: element[0].assessment_header_id,
        assessment_header_id: headers[index]._id,
        content: element,
      };
    });
    console.log('modifyArray1', modifyArray);

    let firstParams = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: modifyArray,
    };
    console.log('firstParams', firstParams);
    // return;
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

  const onTextChange = (text, item) => {
    userInputs.length
      ? userInputs.map((val) => {
          if (val.order === item.order) {
            val.content = text;
          }
        })
      : [];
  };

  const onClickPlusBtn = (item) => {
    let findBlanckContent = userInputs.find((ele) => ele.content === '');
    if (findBlanckContent === undefined) {
      let lastOrderObj = userInputs[userInputs.length - 1];
      let lastOrder;
      if (lastOrderObj !== undefined && lastOrderObj.order !== undefined) {
        lastOrder = lastOrderObj.order;
      } else {
        lastOrder = 0;
      }

      //set userInput
      let headerInputs;
      if (headers && headers.length) {
        headerInputs = headers.map((item, index) => {
          let indexUpdate = index + 1;
          return {
            assessment_header_id: item._id,
            content: '',
            content_id: null,
            name: item.header,
            order: lastOrder + indexUpdate,
            assessment_id: null,
            placeholder: item.description,
            value: '',
            // order: idx,
          };
        });
      }
      let oldArray = userInputs;
      Array.prototype.push.apply(oldArray, headerInputs);
      setUserInputs(oldArray);
      setRefresh(!refresh);
    } else {
      alert('Please add content.');
    }
  };

  const onCrossBtnClick = (val) => {
    console.log(val);
    // debugger;
    let order = val.order;
    let secondContentId = [val.content_id];
    // let findValue = secondContentId.push(
    //   userInputs.find((ele) => ele.order === order + 1).content_id,
    // );
    console.log(
      userInputs.filter(
        (ele) => ele.content !== val.content && ele.order !== order + 1,
      ),
    );
    console.log(
      userInputs.filter(
        (ele) => ele.content !== val.content && ele.order !== order + 1,
      ),
      'filelee',
    );

    let updatedUserInput = userInputs.filter(
      (ele) => ele.content !== val.content && ele.order !== order + 1,
    );

    if (updatedUserInput.length > 0) {
      setUserInputs(
        userInputs.filter(
          (ele) => ele.content !== val.content && ele.order !== order + 1,
        ),
      );
    } else {
      let lastOrder = 0;
      let headerInputs = [];
      if (headers && headers.length) {
        headerInputs = headers.map((item, index) => {
          let indexUpdate = index + 1;
          return {
            assessment_header_id: item._id,
            content: '',
            content_id: null,
            name: item.header,
            order: lastOrder + indexUpdate,
            assessment_id: null,
            placeholder: item.description,
            value: '',
          };
        });
      }

      console.log(headerInputs, 'headerInputs...');
      setUserInputs(headerInputs);
    }

    // if (val.content_id) {
    //   dispatch(
    //     AppActions.deleteUserAssessmentData(
    //       // val.content_id,
    //       secondContentId[0],
    //       props._id,
    //       assessment_id,
    //       secondContentId,
    //       //findValue.content_id,
    //     ),
    //   );
    // }
  };
  console.log('user inputs????????', userInputs);
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
      {userInputs && userInputs.length ? (
        <FlatList
          data={userInputs}
          contentContainerStyle={{padding: '4%'}}
          extraData={refresh}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginBottom: 10,
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  flex: DEVICE_WIDTH > 767 ? '0.2' : '0 0 100%',
                  backgroundColor: index % 2 === 0 ? CIRCLE_GRAY : GREEN_TEXT,
                  height: '150px',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{padding: '15px', color: WHITE, textAlign: 'center'}}>
                  {' '}
                  {ReactHtmlParser(item.name)}
                </Text>
              </View>
              <View style={styles.crossIconWrapper}>
                <View style={{height: '150px'}}>
                  {item.content !== '' ? (
                    <input
                      type="text"
                      className="f-field"
                      disabled={'true'}
                      style={styles.selectedText}
                      value={item.content}
                    />
                  ) : (
                    <textarea
                      //value={item.content}
                      style={styles.selectedText}
                      placeholder={item.placeholder}
                      underlineColorAndroid="transparent"
                      onChange={(term) => {
                        onTextChange(term.target.value, item);
                      }}
                    />
                  )}

                  {index % 2 === 0 && item.content !== '' ? (
                    <div
                      style={styles.circleCrossDiv}
                      onClick={() => {
                        onCrossBtnClick(item);
                      }}>
                      <span style={{...styles.plusIcon, fontSize: '15px'}}>
                        x
                      </span>
                    </div>
                  ) : null}
                  {index % 2 !== 0 && userInputs.length - 1 == index ? (
                    <div
                      style={{
                        ...styles.circleDiv,
                        backgroundColor: item?.value?.length
                          ? GREEN_TEXT
                          : GRAY,
                      }}
                      onClick={() => onClickPlusBtn(item)}>
                      <span style={styles.plusIcon}>+</span>
                    </div>
                  ) : null}
                </View>
                {/* {item.content !== '' ? (
                  <View style={{height: '150px'}}>
                    <input
                      type="text"
                      className="f-field"
                      disabled={'true'}
                      style={styles.selectedText}
                      value={item.content}
                    />
                    {index % 2 === 0 ? (
                      <div
                        style={styles.circleCrossDiv}
                        onClick={() => {
                          onCrossBtnClick(item);
                        }}>
                        <span style={{...styles.plusIcon, fontSize: '15px'}}>
                          x
                        </span>
                      </div>
                    ) : null}
                  </View>
                ) : (
                  <View style={{height: '150px'}}>
                    <textarea
                      style={styles.selectedText}
                      placeholder={item.placeholder}
                      underlineColorAndroid="transparent"
                      onChange={(term) => {
                        onTextChange(term.target.value, item);
                      }}
                    />
                    {index % 2 !== 0 ? (
                      <div
                        style={{
                          ...styles.circleDiv,
                          backgroundColor: item?.value?.length
                            ? GREEN_TEXT
                            : GRAY,
                        }}
                        onClick={() => onClickPlusBtn(item)}>
                        <span style={styles.plusIcon}>+</span>
                      </div>
                    ) : null}
                  </View>
                )} */}
              </View>
            </View>
          )}
        />
      ) : null}
      {userInputs && userInputs.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button
            className="btn-orange"
            onClick={(e) => onSaveFirstAssessment(e)}>
            {ts('SAVE')}
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

export default FourSix;
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
    height: '100%',
    paddingLeft: 5,
    color: CIRCLE_GRAY,
    // marginBottom: '3%',
  },
  circleDiv: {
    backgroundColor: GRAY,
    width: '35px',
    height: '35px',
    position: 'absolute',
    borderRadius: '100%',
    right: '-15px',
    top: '90px',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    flex: DEVICE_WIDTH > 767 ? '0.8' : '0 0 100%',
    marginLeft: DEVICE_WIDTH > 767 ? '10px' : '0',
    display: 'flex',
    marginBottom: '15px',
    position: 'relative',
  },
  plusIconWrapper: {
    flex: 0.8,
    // display: 'flex',
    // marginBottom: '3%',
    position: 'relative',
    marginLeft: 10,
  },
};
