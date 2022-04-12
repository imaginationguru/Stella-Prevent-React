import React, {useEffect, useState} from 'react';
import balance0 from '@assets/images/balance/balance0.svg';
import balanceR1 from '@assets/images/balance/balanceR1.svg';
import balanceR2 from '@assets/images/balance/balanceR2.svg';
import balanceR3 from '@assets/images/balance/balanceR3.svg';
import balanceR4 from '@assets/images/balance/balanceR4.svg';
import balanceR5 from '@assets/images/balance/balanceR5.svg';
import balanceR6 from '@assets/images/balance/balanceR6.svg';
import balanceR7 from '@assets/images/balance/balanceR7.svg';
import balanceL1 from '@assets/images/balance/balanceL1.svg';
import balanceL2 from '@assets/images/balance/balanceL2.svg';
import balanceL3 from '@assets/images/balance/balanceL3.svg';
import balanceL4 from '@assets/images/balance/balanceL4.svg';
import balanceL5 from '@assets/images/balance/balanceL5.svg';
import balanceL6 from '@assets/images/balance/balanceL6.svg';
import balanceL7 from '@assets/images/balance/balanceL7.svg';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import {getItem} from '@utils/AsyncUtils';
import {translate as ts} from '@i18n/translate';
import ExerciseBox from '@components/ExerciseBox';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';

import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const TemplateSix = (props) => {
  const [initial, setDefault] = useState(1);
  const [isLeftBalance, setIsLeftBalance] = useState(false);
  const [changes, setChanges] = useState([]);
  const {
    card_title,
    card_time,
    descriptions,
    quotes,
    images,
    assessment_id,
    content,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const [leftInputChanges, setLeftInputChanges] = useState('');
  const [rightInputChanges, setRightInputChanges] = useState('');
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );

  const {headers} = assessmentData;
  const userId = getItem('userId');

  const dispatch = useDispatch();
  useEffect(() => {
    const leftLength = changes.length
      ? changes.filter(
          (item) =>
            item.assessment_header_id ===
            (headers && headers.length && headers[0]._id),
        ).length
      : 0;

    const rightLength = changes.length
      ? changes.filter(
          (item) =>
            item.assessment_header_id ===
            (headers && headers.length && headers[1]._id),
        ).length
      : 0;

    if (leftLength === rightLength) {
      setIsLeftBalance(false);
      setDefault(1);
    }
    if (leftLength > rightLength) {
      setDefault(leftLength - rightLength + 1);
      setIsLeftBalance(true);
    }
    if (leftLength < rightLength) {
      setDefault(rightLength - leftLength + 1);
      setIsLeftBalance(false);
    }
  }, [changes, initial]);

  useEffect(() => {
    const onlyCardData = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        onlyCardData.push(...item.cards);
      });
    }
    setChanges([...onlyCardData]);
  }, [userAssessmentData]);

  const imageRenderHandler = () => {
    if (initial === 1) {
      return balance0;
    } else {
      if (isLeftBalance) {
        if (initial === 2) {
          return balanceL1;
        }
        if (initial === 3) {
          return balanceL2;
        }
        if (initial === 4) {
          return balanceL3;
        }
        if (initial === 5) {
          return balanceL4;
        }
        if (initial === 6) {
          return balanceL5;
        }
        if (initial === 7) {
          return balanceL6;
        }
        if (initial === 8 || initial > 8) {
          return balanceL7;
        }
      } else {
        if (initial === 2) {
          return balanceR1;
        }
        if (initial === 3) {
          return balanceR2;
        }
        if (initial === 4) {
          return balanceR3;
        }
        if (initial === 5) {
          return balanceR4;
        }
        if (initial === 6) {
          return balanceR5;
        }
        if (initial === 7) {
          return balanceR6;
        }
        if (initial === 8 || initial > 8) {
          return balanceR7;
        }
      }
    }
  };

  const onBalance = (e) => {
    e.preventDefault();
    const contentDataLeft = changes
      .filter((item) => item.assessment_header_id === headers[0]._id)
      .map((item, i) => {
        return item;
      });

    const contentDataRight = changes
      .filter((item) => item.assessment_header_id === headers[1]._id)
      .map((item, i) => {
        return item;
      });
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: [
        {
          assessment_header_id: headers[0]._id,
          content: contentDataLeft,
        },
        {
          assessment_header_id: headers[1]._id,
          content: contentDataRight,
        },
      ],
    };

    if (userAssessmentData && userAssessmentData.length) {
      dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
    } else {
      if (contentDataLeft.length || contentDataRight.length) {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please perform your exercise',
        });
      }
    }
  };

  const leftContentOrder =
    changes && changes.length && headers && headers.length
      ? changes.filter(
          (item) =>
            item.assessment_header_id ===
            (headers && headers.length && headers[0]._id),
        ).length
      : 0;
  const rightContentOrder =
    changes && changes.length && headers && headers.length
      ? changes.filter(
          (item) =>
            item.assessment_header_id ===
            (headers && headers.length && headers[1]._id),
        ).length
      : 0;

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
      {/*******************************ASSESSMENT DESCRIPTION*********************** */}
      <div
        style={{...commonStyles.assessmentWrapper, justifyContent: 'center'}}
        className="wrap-2line">
        {images && images.length
          ? images.map((item, i) => {
              return (
                <CustomImage
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  style={{
                    display: item.image !== '' ? 'flex' : 'none',
                    width: '120px',
                    flex: '0 0 auto',
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
      {/*****************  ANSWER/QUERY PUSHED****************** */}

      {changes.length ? (
        <div style={styles.addedContentWrapper}>
          <div style={styles.innerWrapper}>
            {changes
              .filter(
                (item) =>
                  item.assessment_header_id ===
                  (headers && headers.length && headers[0]._id),
              )
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                return (
                  <div style={{position: 'relative'}} key={i}>
                    <textarea
                      type="text"
                      className="f-field height-auto"
                      name="leftInput"
                      disabled={true}
                      style={styles.selectedText}
                      value={item.content}
                    />
                    <span
                      style={styles.crossIcon}
                      onClick={() => {
                        setChanges(
                          changes.filter((val) => val.content !== item.content),
                        );
                      }}>
                      x
                    </span>
                  </div>
                );
              })}
          </div>

          <div style={styles.innerWrapper}>
            {changes
              .filter(
                (item) =>
                  item.assessment_header_id ===
                  (headers && headers.length && headers[1]._id),
              )
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                return (
                  <div key={i} style={{position: 'relative'}}>
                    <textarea
                      type="text"
                      className="f-field height-auto"
                      name="leftInput"
                      disabled={true}
                      style={styles.selectedText}
                      value={item.content}
                    />

                    <span
                      style={styles.crossIcon}
                      onClick={() => {
                        setChanges(
                          changes.filter((val) => val.content !== item.content),
                        );
                      }}>
                      x
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}

      {/* *******************END OF QUEERY************** */}
      <div style={styles.balanceWrapper}>
        <div
          style={{
            width: '48%',
            marginTop: isLeftBalance ? '1%' : 0,
          }}>
          <div
            style={{
              ...styles.inputStyles,
              backgroundColor: leftInputChanges.length
                ? COLORS.DARK_GREEN
                : COLORS.CIRCLE_GRAY,
            }}
            onClick={() => {
              if (leftInputChanges.length) {
                setChanges([
                  ...changes,
                  {
                    assessment_header_id: headers[0]._id,
                    content: leftInputChanges,
                    order: leftContentOrder + 1,
                  },
                ]);
                setLeftInputChanges('');
              }
            }}>
            <span style={styles.leftPlusIcon}>+</span>
          </div>
          <textarea
            className="f-field height-auto"
            name="leftInput"
            placeholder={headers && headers.length ? headers[0].header : ''}
            style={{
              backgroundColor: '#F1F3FA',
              width: '100%',
            }}
            value={leftInputChanges}
            onChange={(e) => {
              setLeftInputChanges(e.target.value);
            }}
          />
        </div>

        <div
          style={{
            width: '48%',
            marginTop: !isLeftBalance && initial !== 1 ? '1%' : 0,
          }}>
          <div
            style={{
              ...styles.inputStyles,
              backgroundColor: rightInputChanges
                ? COLORS.DARK_GREEN
                : COLORS.CIRCLE_GRAY,
            }}
            onClick={() => {
              if (rightInputChanges.length) {
                setChanges([
                  ...changes,
                  {
                    assessment_header_id: headers[1]._id,
                    content: rightInputChanges,
                    order: rightContentOrder + 1,
                  },
                ]);
                setRightInputChanges('');
              }
            }}>
            <span style={styles.plusIcon}>+</span>
          </div>
          <textarea
            className="f-field height-auto"
            placeholder={headers && headers.length ? headers[1].header : ''}
            style={{
              backgroundColor: '#F1F3FA',
              width: '100%',
            }}
            value={rightInputChanges}
            onChange={(e) => {
              setRightInputChanges(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="dash-icon text-center">
        <img className="nav-hover" src={imageRenderHandler()} />
      </div>
      <div style={styles.buttonStyle}>
        <button className="btn-orange" onClick={(e) => onBalance(e)}>
          {ts('SAVE')}
        </button>
      </div>
      {/*************Content************ */}
      <div style={{...commonStyles.contentLeftBorder, marginTop: '50px'}}>
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

export default TemplateSix;
const styles = {
  quotes: {
    textAlign: 'center',
  },
  assessmentDiv: {
    backgroundColor: '#D7E7ED',
    display: 'flex',
    padding: '20px',
  },
  image: {width: '100%', height: '100%'},
  assessmentDescription: {
    paddingLeft: DEVICE_WIDTH > 767 ? '40px' : '0',
    fontSize: 14,
  },
  addedContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '50px',
    marginBottom: '50px',
  },
  innerWrapper: {
    width: '48%',
    paddingRight: '10px',
  },
  selectedText: {
    backgroundColor: '#F1F3FA',
    width: '100%',
    marginBottom: '3%',
  },
  crossIcon: {
    position: 'absolute',
    right: '-10px',
    width: '22px',
    height: '22px',
    lineHeight: '20px',
    borderRadius: '22px',
    background: COLORS.BG_RED,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  balanceWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '50px',
    marginBottom: '50px',
  },
  inputStyles: {
    width: 30,
    height: 30,
    borderRadius: 30,
    position: 'relative',
    top: '84%',
    left: '48%',
    display: 'flex',
  },
  leftPlusIcon: {
    alignItems: 'center',
    display: 'flex',
    color: COLORS.WHITE,
    fontSize: 27,
    paddingLeft: '18%',
  },
  plusIcon: {
    alignItems: 'center',
    display: 'flex',
    color: COLORS.WHITE,
    fontSize: 27,
    paddingLeft: '27%',
  },

  buttonStyle: {
    width: '20%',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
