import { useEffect, useState } from 'react';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import ReactHtmlParser from 'react-html-parser';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { translate as ts } from '@i18n/translate';
import * as AppActions from '@actions';
import GLOBALS from '@constants';
import ExerciseBox from '@components/ExerciseBox';
import { getItem } from '@utils/AsyncUtils';
const { IMAGE_BASE_URL, ACTION_TYPE } = GLOBALS;

const FourEight = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    showExercises,
    assessment_id,
    week,
    onSubmitMessage,
  } = props.card;
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const { assessmentData, userAssessmentData = [] } = useSelector(
    (state) => state.moduleOne,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const { headers, content } = assessmentData;
    let data =
      headers && headers.length
        ? headers.map((item) => {
          return {
            _id: item._id,
            header: item.header,
            order: item.order,
            contents: content.filter((val) => val.order === item.order),
          };
        })
        : [];
    setQuestions(data);
  }, [assessmentData]);

  useEffect(() => {
    let y = [];
    userAssessmentData.length
      ? userAssessmentData.forEach((item) => y.push(...item.cards))
      : [];
    setUserAnswers(
      y
        .sort((a, b) => (a.order > b.order && 1) || -1)
        .map((item) => {
          return {
            assessment_header_id: item.assessment_header_id,
            content: [
              {
                assessment_content_id: item.assessment_content_id,
                content: item.content,
                order: item.order,
              },
            ],
          };
        }),
    );
  }, [userAssessmentData]);
  const selectContent = (item, val) => {
    const isAlready = userAnswers.some(
      (ele) => ele.assessment_header_id === item._id,
    );
    if (isAlready) {
      const isSameContent = userAnswers.some(
        (ele) =>
          ele.assessment_header_id === item._id &&
          ele.content[0].assessment_content_id === val._id,
      );

      if (isSameContent) {
        setUserAnswers(
          userAnswers.filter((ele) => ele.assessment_header_id !== item._id),
        );
      } else {
        setUserAnswers(
          userAnswers.map((ele) => {
            return {
              assessment_header_id:
                ele.assessment_header_id === item._id
                  ? item._id
                  : ele.assessment_header_id,
              content: [
                {
                  assessment_content_id:
                    ele.assessment_header_id === item._id
                      ? val._id
                      : ele.content[0].assessment_content_id,
                  content:
                    ele.assessment_header_id === item._id
                      ? val.content
                      : ele.content[0].content,
                  order:
                    ele.assessment_header_id === item._id
                      ? val.order
                      : ele.content[0].order,
                },
              ],
            };
          }),
        );
      }
    } else {
      setUserAnswers([
        ...userAnswers,
        {
          assessment_header_id: item._id,
          content: [
            {
              assessment_content_id: val._id,
              content: val.content,
              order: val.order,
            },
          ],
        },
      ]);
    }
  };
  const onSave = (e) => {
    e.preventDefault();

    if (userAnswers.length) {
      const params = {
        user_id: getItem('userId'),
        user_card_id: props._id,
        assessment_id: assessment_id,
        assessment: userAnswers,
      };
      if (userAnswers.length === questions.length) {
        if (userAssessmentData && userAssessmentData.length) {
          dispatch(AppActions.rearrangeAssessments(params, onSubmitMessage));
        } else {
          dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
        }
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please attempt all questions',
        });
      }
    } else {
      dispatch({
        type: ACTION_TYPE.ERROR,
        payload: ts('PERFORM_EXERCISE'),
      });
    }
  };
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

      {/**********************Images************** */}

      {images && images.length
        ? images.map((item) => {
          return (
            <CustomImage
              src={`${IMAGE_BASE_URL}${item.image}`}
              style={{ display: item.image !== '' ? 'flex' : 'none' }}
              isVisible={true}
              animationIn={'fadeInUp'}
            />
          );
        })
        : null}

      {questions.length
        ? questions.map((item) => (
          <div>
            <p
              style={{
                border: `1px solid #b0c4de`,
                backgroundColor: '#b0c4de',
                paddingLeft: '10px',
                paddingTop: '13px',
                borderRadius: '5px',
                marginTop: '40px',
                marginBottom: '30px',
                fontWeight: 'bold',
              }}>
              {ReactHtmlParser(item.header)}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {item.contents && item.contents.length
                ? item.contents.map((val) => (
                  <p
                    onClick={() => selectContent(item, val)}
                    style={{
                      border: `3px solid #436b95`,
                      paddingTop: '5px',
                      paddingBottom: '5px',
                      width: '45%',
                      textAlign: 'center',
                      borderRadius: '5px',
                      backgroundColor: userAnswers.find(
                        (ele) =>
                          ele.content[0].assessment_content_id === val._id,
                      )
                        ? '#b0c4de'
                        : '#ffffff',
                    }}>
                    {val.content}
                  </p>
                ))
                : []}
            </div>
          </div>
        ))
        : null}
      <div style={commonStyles.buttonWrapper}>
        <button className="btn-orange" onClick={(e) => onSave(e)}>
          {ts('SAVE')}
        </button>
      </div>
      {/**********************content************** */}
      <div style={commonStyles.contentLeftBorder}>
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
      </div>

      {showExercises && <ExerciseBox week={week} />}
    </div>
  );
};

export default FourEight;
