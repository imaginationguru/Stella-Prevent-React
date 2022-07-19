import React, { useState, useEffect } from 'react';
import right from '@assets/images/right.svg';
import cross from '@assets/images/cross.svg';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import GLOBALS from '@constants';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';
import { getItem } from '@utils/AsyncUtils';
import { translate as ts } from '@i18n/translate';
import ExerciseBox from '@components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
const { COLORS, IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;
const { BOX_GRAY, GRAY2, BUTTON_ORANGE } = COLORS;

const TemplateEleven = (props) => {
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
  const [positiveMessage, setPositiveMessage] = useState([]);
  const [negativeMessage, setNegativeMessage] = useState([]);
  const { assessmentData = {}, userAssessmentData = [] } = useSelector(
    (state) => state.moduleOne,
  );
  const { headers } = assessmentData;
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
      return { _id: item.assessment_header_id, content: item.content };
    });
    setSelected(selectedFormat);
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
  useEffect(() => {
    if (props.submit_messages.length) {
      let positive = props.submit_messages
        .filter((item) => item.condition === 'Atleast 1  is Yes')
        .map((ele) => ele.message);
      setPositiveMessage(positive);
      let negative = props.submit_messages
        .filter((item) => item.condition === 'All are No')
        .map((ele) => ele.message);
      setNegativeMessage(negative);
    }
  }, [props.submit_messages]);

  const onSaveMyths = (e) => {
    e.preventDefault();
    let userAssessment = selected.map((item) => {
      return {
        assessment_header_id: item._id,
        content: [{ content: item.content }],
      };
    });
    let temp = [];
    let isValid = '';
    if (userAssessment.length) {
      userAssessment.forEach((item) => {
        temp.push(item.content[0] && item.content[0].content);
      });
    }

    if (temp.length) {
      isValid = temp.some((item) => item === 'YES');
    }

    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: userAssessment,
    };

    if (userAssessment.length) {
      if (userAssessmentData && userAssessmentData.length) {
        if (isValid) {
          dispatch(AppActions.rearrangeAssessments(params, positiveMessage));
        } else {
          dispatch(AppActions.rearrangeAssessments(params, negativeMessage));
        }
      } else {
        if (isValid) {
          dispatch(AppActions.saveUserAssessment(params, positiveMessage));
        } else {
          dispatch(AppActions.saveUserAssessment(params, negativeMessage));
        }
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: ts('PERFORM_EXERCISE'),
      });
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
      {/***************************ASSESSMENTS DESCRIPTION************* */}
      <div style={{ ...commonStyles.assessmentWrapper, marginBottom: '60px' }}>
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
              <div key={i} style={commonStyles.question}>
                <p>{ReactHtmlParser(item.header)}</p>
                <div style={styles.optionWrapper}>
                  <div
                    onClick={() => {
                      updateYESNO({ _id: item._id, content: 'YES' }, selected);
                    }}
                    style={{
                      ...styles.rightBox,
                      backgroundColor: isYES ? BUTTON_ORANGE : GRAY2,
                    }}>
                    <img src={right} />
                  </div>
                  <div
                    onClick={() => {
                      updateYESNO({ _id: item._id, content: 'NO' }, selected);
                    }}
                    style={{
                      ...styles.crossBox,
                      backgroundColor: isNO ? BUTTON_ORANGE : GRAY2,
                    }}>
                    <img src={cross} />
                  </div>
                </div>
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
    </>
  );
};

export default TemplateEleven;
const styles = {
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
};
