import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '@actions';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import { translate as ts } from '@i18n/translate';
import tickBox from '@assets/images/tickBox.png';
import { getItem } from '@utils/AsyncUtils';
import ExerciseBox from '@components/ExerciseBox';
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
const DEVICE_HEIGHT = Dimensions.get('window').height;
const { IMAGE_BASE_URL, COLORS, ACTION_TYPE } = GLOBALS;
const { BUTTON_ORANGE } = COLORS;
const userId = getItem('userId');
const TwentyOne = (props) => {
  const [headerData, setHeaderData] = useState([]);
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    assessment_id,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const dispatch = useDispatch();
  const [paramAssessment, setParamAssessment] = useState([]);
  const { assessmentData = {}, userAssessmentData = [] } = useSelector(
    (state) => state.moduleOne,
  );

  useEffect(() => {
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment_id]);

  useEffect(() => {
    let headers =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers
        : [];
    setHeaderData(headers);
  }, [assessmentData]);

  useEffect(() => {
    const cardData = [];
    console.log(userAssessmentData, 'userAssessmentData.....');
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        cardData.push(...item.cards);
      });
    }
    let modifyCardData = cardData.map((item) => {
      return {
        assessment_header_id: item.assessment_header_id,
        content: [{ content: item.content }],
      };
    });
    setParamAssessment([...modifyCardData]);
    console.log(modifyCardData, 'modifyCardData....');
  }, [userAssessmentData]);
  const clickOnCheck = (item) => {
    if (paramAssessment && paramAssessment.length) {
      let ids = paramAssessment.map((val) => val.assessment_header_id);
      const isAlready = ids.length
        ? ids.some((val) => val === item._id)
        : false;
      if (isAlready) {
        let y = paramAssessment.map((val) => {
          return {
            ...val,
            content:
              val.assessment_header_id === item._id
                ? [
                  {
                    content: !val.content[0].content,
                    order: item.order,
                    assessment_content_id: item._id,
                  },
                ]
                : val.content,
          };
        });
        setParamAssessment(y);
      } else {
        setParamAssessment([
          ...paramAssessment,
          {
            assessment_header_id: item._id,
            content: [
              {
                content: true,
                order: item.order,
                assessment_content_id: item._id,
              },
            ],
          },
        ]);
      }
    } else {
      setParamAssessment([
        {
          assessment_header_id: item._id,
          content: [
            { content: true, order: item.order, assessment_content_id: item._id },
          ],
        },
      ]);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    let params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: paramAssessment,
    };
    let temp = [];
    let isValid = '';
    if (paramAssessment.length) {
      paramAssessment.forEach((item) => {
        temp.push(item.content[0] && item.content[0].content);
      });
    }
    if (temp.length) {
      isValid = temp.some((item) => item === true || item === 'true');
    }
    console.log('temp???', temp, isValid);
    if (paramAssessment && paramAssessment.length && isValid) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
      } else {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
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
        ? images.map((item) => {
          return (
            <CustomImage
              src={`${IMAGE_BASE_URL}${item.image}`}
              style={{ display: item.image !== '' ? 'flex' : 'none' }}
            />
          );
        })
        : null}
      <div style={commonStyles.contentLeftBorder}>
        {/**********Assessment descriptions**************** */}
        {props.assessments && props.assessments.length
          ? props.assessments.map((item, index) => {
            return (
              <CardDescription
                key={index}
                style={styles.assessmentDescription}
                description={ReactHtmlParser(item.description)}
              />
            );
          })
          : []}

        <div style={{ marginTop: '30px' }}>
          {headerData && headerData.length
            ? headerData
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item) => {
                let data = false;

                const checkData =
                  paramAssessment.length &&
                  paramAssessment.find(
                    (val) => val.assessment_header_id === item._id,
                  );
                if (checkData) {
                  if (checkData.content && checkData.content.length) {
                    data = checkData.content[0].content;
                  }
                }
                console.log(data, 'datadatadatadatadata');
                return (
                  <div
                    onClick={() => clickOnCheck(item)}
                    style={styles.checkWithQues}>
                    {data == 'true' || data == true ? (
                      <img
                        src={tickBox}
                        style={{
                          width: '18px',
                          height: '18px',
                          position: 'relative',
                          top: '3px',
                          left: '-2px',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          ...styles.checkBox,
                        }}
                      />
                    )}
                    <p style={{ paddingLeft: '20px' }}>
                      {ReactHtmlParser(item.header)}
                    </p>
                  </div>
                );
              })
            : []}
        </div>
      </div>
      {headerData && headerData.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSave(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {/**********************content************** */}
      {content && content.length
        ? content
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, index) => {
            return (
              <CardContent
                key={index}
                content={ReactHtmlParser(item.content)}
                style={{ paddingTop: '10px' }}
              />
            );
          })
        : []}
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TwentyOne;
const styles = {
  assessmentDescription: {
    paddingLeft: DEVICE_WIDTH > 767 ? '40px' : '0',
  },
  assessmentDiv: {
    border: `2px solid ${BUTTON_ORANGE}`,
    borderLeftWidth: `2px solid ${BUTTON_ORANGE}`,
    borderRightWidth: '0px',
    borderBottomWidth: '0px',
    borderTopWidth: '0px',
    marginTop: '40px',
  },
  checkWithQues: {
    display: 'flex',
    justifyContent: 'row',
    alignItems: 'flex-start',
  },
  checkBox: {
    border: '2px solid black',
    height: '14px',
    width: '14px',
    flex: '0 0 auto',
    marginRight: '4px',
    marginTop: '5px',
  },
};
