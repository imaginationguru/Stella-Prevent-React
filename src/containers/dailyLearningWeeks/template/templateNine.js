import React, {useState, useEffect} from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {getItem} from '../../../utils/AsyncUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../actions';
import commonStyles from '../commonStyles';
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
import moment from 'moment';
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
  } = props.card;
  const {userAssessmentData = []} = useSelector((state) => state.moduleOne);
  const {inputs, assessments} = props;
  console.log("props template nine",props.card)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(AppActions.getUserAssessment(props._id, assessment_id));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  console.log(
    'userAssessmentData??????????',
    userAssessmentData,
    inputCardData,
  );
  useEffect(() => {
    let cardsData = [];
    if (userAssessmentData.length) {
      userAssessmentData.forEach((item) => cardsData.push(...item.cards));
    }
    setInputCardData(cardsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  /*****************************function for fetch input value, id and set   */

  useEffect(() => {
    inputCardData.length &&
      inputCardData.map((item) => {
        setInputBoxId(inputCardData[0]._id)
        return setExperience(inputCardData[0].input_content);
      });
      
    inputCardData.length &&
      inputCardData.map((item) => {
        return setUpdateId(item._id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (experience.length === 0) {
      setExperienceError('Please complete the exercise!');
    } else if (experience !== '') {
      dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
    }
    /* 
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
         setExperienceError('Please enter good experience');
       } else if (experience !== '') {
         dispatch(AppActions.updateUserAssessment(params, onSubmitMessage));
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
         setExperienceError('Please enter good experience');
       } else if (experience !== '') {
         dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
       }
     }
    */
   

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
      <div style={commonStyles.assessmentWrapper}>
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
                      width: '120px',
                      height: '80px',
                      display: item.image !== '' ? 'flex' : 'none',
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
                    {ts('SAVE_GOOD_EXPERIENCE')}
                  </button>
                </div>
              </>
            );
          })
        : []}
      {/***********Exercise Part************* */}
      {false ? (
        <div style={styles.boxWrapper}>
          <div style={{width: '20%'}}>
            <p style={styles.leftDate}>Date</p>
            {dateJSX}
          </div>

          <div style={{width: '78%'}}>
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
    //zIndex: '999',
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
