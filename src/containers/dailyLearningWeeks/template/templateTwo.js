import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import { getItem } from '@utils/AsyncUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';
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

const { IMAGE_BASE_URL } = GLOBALS;
const TemplateTwo = (props) => {
  const [inputBoxId, setInputBoxId] = useState('');
  const [experience, setExperience] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [inputCardData, setInputCardData] = useState([]);
  const [experienceError, setExperienceError] = useState('');
  const {
    card_time,
    card_title,
    descriptions,
    content,
    images,
    quotes,
    assessment_id,
    showExercises,
    week,
  } = props.card;
  const { userAssessmentData = [] } = useSelector((state) => state.moduleOne);
  const { inputs } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cardsData = [];
    if (userAssessmentData.length) {
      userAssessmentData.forEach((item) => cardsData.push(...item.cards));
    }
    setInputCardData(cardsData);
  }, [userAssessmentData]);

  /*****************************function for fetch input value, id and set   */

  useEffect(() => {
    inputCardData.length &&
      inputCardData.map((item) => {
        return setExperience(item.input_content);
      });
    inputCardData.length &&
      inputCardData.map((item) => {
        return setUpdateId(item._id);
      });
  }, [inputCardData]);

  /***********************set input value function************* */

  const onHandleChange = (e, item) => {
    const { name, value } = e.target;
    if (name === 'experience') {
      setInputBoxId(item._id);
      setExperience(value);
      setExperienceError('');
    }
  };

  /**************************On submit and update API hit ************ */

  const onSaveExperience = (e) => {
    e.preventDefault();
    if (userAssessmentData && userAssessmentData.length) {
      const params = {
        data: [
          {
            id: updateId,
            input_content: experience,
          },
        ],
      };

      if (experience.length === 0) {
        setExperienceError('Please complete the exercise!');
      } else if (experience !== '') {
        dispatch(AppActions.updateUserAssessment(params));
      }
    } else {
      const params = {
        user_id: getItem('userId'),
        user_card_id: props._id,
        assessment_id: assessment_id,
        input_assessment: [
          {
            input_box_id: inputBoxId,
            data: experience,
          },
        ],
      };
      if (experience.length === 0) {
        setExperienceError('Please complete the exercise!');
      } else if (experience !== '') {
        dispatch(AppActions.saveUserAssessment(params));
      }
    }
  };
  return (
    <>
      {/********************************quotes************* */}
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
      {/********************************Card Tilte and time************ */}
      <CardTitle title={ReactHtmlParser(card_title)} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} ${ts('MIN')}` : `${card_time} ${ts('MINS')}`
        }
      />
      {/***************************description*************** */}
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

      {/****************************center Image************** */}
      {/* <div className="dash-icon" style={styles.centerImage}> */}
      {images && images.length
        ? images
          .filter((item) => {
            return item.image_type === 'first';
          })
          .map((item, index) => {
            return (
              <CustomImage
                imageSize={item.imageSize}
                src={
                  item.image !== '' ? `${IMAGE_BASE_URL}${item.image}` : null
                }
                style={{
                  display: item.image !== '' ? 'flex' : 'none',
                }}
                isVisible={true}
                animationIn={'fadeInUp'}
              />
            );
          })
        : []}
      {/* </div> */}

      {/**********************first type content************ */}
      <div style={commonStyles.contentLeftBorder}>
        {content && content.length
          ? content
            .filter((item) => {
              return item.type === 'first';
            })
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
      {/*************************three middle image************** */}
      <div style={styles.threeImageWrapper}>
        {images && images.length
          ? images
            .filter((item) => {
              return item.image_type === 'second';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CustomImage
                  imageSize={item.imageSize}
                  key={index}
                  src={
                    item.image !== ''
                      ? `${IMAGE_BASE_URL}${item.image}`
                      : null
                  }
                  style={{
                    display: item.image !== '' ? 'flex' : 'none',
                  }}
                  title={item.description}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
          : []}
      </div>

      {/***************input box****************** */}
      {inputs && inputs.length
        ? inputs.map((item, i) => {
          return (
            <>
              <div
                key={i}
                style={{
                  marginTop: '-65px',
                  display: item.placeholder !== '' ? 'block' : 'none',
                }}>
                <form noValidate style={{ marginTop: '50px' }}>
                  <div className="formRow">
                    <div className="w100">
                      <div className="formField has-icon">
                        <textarea
                          type="textarea"
                          className="f-field"
                          value={experience}
                          name="experience"
                          onChange={(e) => onHandleChange(e, item)}
                          required
                          placeholder={item.placeholder}
                          style={commonStyles.inputFieldStyle}
                        />
                      </div>
                    </div>
                    <span style={commonStyles.error}>{experienceError}</span>
                  </div>
                </form>
              </div>
              <div
                style={{
                  ...commonStyles.buttonWrapper,
                  display: item.placeholder !== '' ? 'block' : 'none',
                }}>
                <button
                  className="btn-orange"
                  onClick={(e) => onSaveExperience(e)}>
                  {ts('SAVE')}
                </button>
              </div>
            </>
          );
        })
        : []}
      {/************************bottom second content****************** */}
      <div style={commonStyles.contentLeftBorder}>
        {content && content.length
          ? content
            .filter((item) => {
              return item.type === 'second';
            })
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
    </>
  );
};

export default TemplateTwo;
const styles = {
  threeImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '30px',
    marginBottom: '60px',
    width: '100%',
    flexWrap: 'wrap',
  },
  centerImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
