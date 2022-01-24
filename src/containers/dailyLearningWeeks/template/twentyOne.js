import React, {useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import commonStyles from '../commonStyles';
import {translate as ts} from '../../../i18n/translate';
import tickBox from '../../../assets/images/tickBox.png';
import {getItem} from '../../../utils/AsyncUtils';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
const {IMAGE_BASE_URL, COLORS, ACTION_TYPE} = GLOBALS;
const {BUTTON_ORANGE} = COLORS;
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
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData]);

  useEffect(() => {
    const cardData = [];
    if (userAssessmentData && userAssessmentData.length) {
      userAssessmentData.forEach((item) => {
        cardData.push(...item.cards);
      });
    }
    let modifyCardData = cardData.map((item) => {
      return {
        assessment_header_id: item.assessment_header_id,
        content: [{content: item.content}],
      };
    });
    setParamAssessment([...modifyCardData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);
  const clickOnCheck = (item) => {
    console.log('item>>>>>>>>', item, paramAssessment);
    if (paramAssessment && paramAssessment.length) {
      let ids = paramAssessment.map((val) => val.assessment_header_id);
      const isAlready = ids.length
        ? ids.some((val) => val === item._id)
        : false;
      if (isAlready) {
        let y = paramAssessment.map((val) => {
          console.log('val>>>>>>>', val, item.content);
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
        //console.log('y>>>>>>>>>>>', y);
        setParamAssessment(y);
        // setParamAssessment(
        //   paramAssessment.filter(
        //     (val) => val.assessment_header_id !== item._id,
        //   ),
        // );
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
            {content: true, order: item.order, assessment_content_id: item._id},
          ],
        },
      ]);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: paramAssessment,
    };
    //console.log('patrams>>>>>>>>', params);
    if (paramAssessment && paramAssessment.length) {
      if (userAssessmentData && userAssessmentData.length) {
        dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
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
                style={{display: item.image !== '' ? 'flex' : 'none'}}
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

        <div style={{marginTop: '30px'}}>
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

                  console.log('check data>>>>', checkData, paramAssessment);
                  return (
                    <div
                      onClick={() => clickOnCheck(item)}
                      style={styles.checkWithQues}>
                      {data ? (
                        <img
                          src={tickBox}
                          style={{width: '16px', height: '16px'}}
                        />
                      ) : (
                        <div
                          style={{
                            ...styles.checkBox,
                          }}
                        />
                      )}
                      <p style={{paddingLeft: '20px'}}>
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
                  style={{paddingTop: '10px'}}
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
    paddingLeft: '40px',
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
    alignItems: 'baseline',
  },
  checkBox: {
    border: '2px solid black',
    height: '13px',
    width: '13px',
  },
};
