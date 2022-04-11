import React, {useState, useEffect} from 'react';
import GLOBALS from '@constants';
import ReactHtmlParser from 'react-html-parser';
import {getItem} from '@utils/AsyncUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import commonStyles from '../commonStyles';
import {translate as ts} from '@i18n/translate';
import ExerciseBox from '@components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
import moment from 'moment';

import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const {IMAGE_BASE_URL, COLORS} = GLOBALS;
const {YELLOW} = COLORS;
const TemplateNine = (props) => {
  const [inputBoxId, setInputBoxId] = useState('');
  const [experience, setExperience] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [inputCardData, setInputCardData] = useState([]);
  const [experienceError, setExperienceError] = useState('');
  const {
    card_title,
    card_time,
    descriptions,
    content,
    quotes,
    images,
    assessment_id,
    onSubmitMessage,
    showExercises,
    week,
    buttonText = ts('SAVE_GOOD_EXPERIENCE'),
  } = props.card;
  const {userAssessmentData = []} = useSelector((state) => state.moduleOne);
  const {inputs, assessments} = props;
  const dispatch = useDispatch();

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
        setInputBoxId(inputCardData[0]._id);
        return setExperience(inputCardData[0].input_content);
      });

    inputCardData.length &&
      inputCardData.map((item) => {
        return setUpdateId(item._id);
      });
  }, [inputCardData]);

  /***********************set input value function************* */

  const onHandleChange = (e, item) => {
    const {name, value} = e.target;
    if (name === 'experience') {
      setInputBoxId(item._id);
      setExperience(value);
      setExperienceError('');
    }
  };

  /**************************On submit and update API hit ************ */

  const onSaveExperience = (e) => {
    e.preventDefault();
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

    if (experience !== '' && experience !== null) {
      dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
    } else {
      setExperienceError('Please complete the exercise!');
    }
  };
  const dateJSX = inputCardData.length
    ? inputCardData
        .sort((a, b) => (a.updatedAt < b.updatedAt && 1) || -1)
        .map((item) => {
          return (
            <p style={styles.leftDate}>
              {moment(item.updatedAt).format('YYYY - MM - DD')}
            </p>
          );
        })
    : null;
  const goodExperienceText = inputCardData.length
    ? inputCardData.map((item) => {
        return (
          <p
            style={{
              ...styles.rightText,
              border: `1px solid ${YELLOW}`,
              paddingLeft: '10px',
            }}>
            {item.input_content}
          </p>
        );
      })
    : null;
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
      {/************************GRAY BOX WITH CONTENT AND IMAGE************** */}
      <div
        style={{...commonStyles.assessmentWrapper, justifyContent: 'center'}}
        className="wrap-2line">
        {images && images.length
          ? images
              .filter((item) => {
                return item.image_type === 'second';
              })
              .map((item, index) => {
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

        {assessments && assessments.length
          ? assessments.map((item, i) => {
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
      {/*****************************INPUT BOX*********************** */}
      <div style={styles.imageWithInput}>
        {images && images.length
          ? images
              .filter((item) => {
                return item.image_type === 'first';
              })
              .map((item, index) => {
                return (
                  <CustomImage
                    key={index}
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
      </div>
      {inputs && inputs.length
        ? inputs.map((item, i) => {
            return (
              <>
                <div
                  key={i}
                  style={{
                    marginTop: '-63px',
                  }}>
                  <form noValidate style={{marginTop: '50px'}}>
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
                <div style={commonStyles.buttonWrapper}>
                  <button
                    className="btn-orange"
                    onClick={(e) => onSaveExperience(e)}>
                    {buttonText}
                    {/* {ts('SAVE_GOOD_EXPERIENCE')} */}
                  </button>
                </div>
              </>
            );
          })
        : []}
      {/***********Exercise Part************* */}
      {false ? (
        <div style={styles.boxWrapper}>
          <div style={{width: DEVICE_WIDTH > 767 ? '20%' : '30%'}}>
            <p style={styles.leftDate}>Date</p>
            {dateJSX}
          </div>

          <div style={{width: DEVICE_WIDTH > 767 ? '78%' : '68%'}}>
            <p
              style={{
                ...styles.rightText,
                backgroundColor: YELLOW,
                textAlign: 'center',
              }}>
              Good Experience
            </p>
            {goodExperienceText}
          </div>
        </div>
      ) : null}

      {/****************************CONTENT********************** */}
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

export default TemplateNine;

const styles = {
  imageWithInput: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '50px',
  },
  leftDate: {
    textAlign: 'center',
    backgroundColor: YELLOW,
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
  },
  rightText: {
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
  },
  boxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
