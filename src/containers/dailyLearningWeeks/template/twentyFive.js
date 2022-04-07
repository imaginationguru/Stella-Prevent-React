import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import ExerciseBox from '../../../components/ExerciseBox';
import commonStyles from '../commonStyles';
import { translate as ts } from '../../../i18n/translate';
import { getItem } from '../../../utils/AsyncUtils';
import { useSelector, useDispatch } from 'react-redux';
import * as AppActions from '../../../actions';
import slide from '../../../assets/images/slide.png';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
} from '../../../components/Cards';
import { Dimensions } from 'react-native-web';
import { customAlert } from '../../../helpers/commonAlerts.web';
const DEVICE_WIDTH = Dimensions.get('window').width;
const { COLORS } = GLOBALS;
const { WHITE } = COLORS;
const TwentyFive = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    quotes,
    showExercises,
    week,
    assessment_id,
  } = props.card;
  const { inputs } = props;
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [thirdInput, setThirdInput] = useState('');
  const [fourthInput, setFourthInput] = useState('');
  const [firstInputError, setFirstInputError] = useState('');
  const [secondInputError, setSecondInputError] = useState('');
  const [thirdInputError, setThirdInputError] = useState('');
  const [fourthInputError, setFourthInputError] = useState('');
  const [firstInputId, setFirstInputId] = useState('');
  const [secondInputId, setSecondInputId] = useState('');
  const [thirdInputId, setThirdInputId] = useState('');
  const [fourthInputId, setFourthInputId] = useState('');
  const [firstUpdateId, setFirstUpdateId] = useState('');
  const [secondUpdateId, setSecondUpdateId] = useState('');
  const [thirdUpdateId, setThirdUpdateId] = useState('');
  const [fourthUpdateId, setFourthUpdateId] = useState('');
  const { userAssessmentData = [] } = useSelector((state) => state.moduleOne);
  const dispatch = useDispatch();
  const onHandleChange = (e, item) => {
    const { name, value } = e.target;
    if (name === 'firstInput') {
      setFirstInput(value);
      setFirstInputError('');
      setFirstInputId(item._id);
    }
    if (name === 'secondInput') {
      setSecondInput(value);
      setSecondInputError('');
      setSecondInputId(item._id);
    }
    if (name === 'thirdInput') {
      setThirdInput(value);
      setThirdInputError('');
      setThirdInputId(item._id);
    }
    if (name === 'fourthInput') {
      setFourthInput(value);
      setFourthInputError('');
      setFourthInputId(item._id);
    }
  };
  useEffect(() => {
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
  }, []);

  /****************Set input value************** */
  useEffect(() => {
    let cardsData = [];
    if (userAssessmentData.length) {
      userAssessmentData.forEach((item) => cardsData.push(...item.cards));
    }
    let firstInput = cardsData.length
      ? cardsData
        .filter((item) => {
          return item.input_box_id === firstInputId;
        })
        .map((val) => {
          return { _id: val._id, content: val.input_content, order: val.order };
        })
      : [];
    if (firstInput.length) {
      setFirstInput(firstInput[0].content || '');
      setFirstUpdateId(firstInput[0]._id || '');
    }

    let secondInput = cardsData.length
      ? cardsData
        .filter((item) => {
          return item.input_box_id === secondInputId;
        })
        .map((val) => {
          return { _id: val._id, content: val.input_content, order: val.order };
        })
      : [];
    if (secondInput.length) {
      setSecondInput(secondInput[0].content || '');
      setSecondUpdateId(secondInput[0]._id || '');
    }
    let thirdInput = cardsData.length
      ? cardsData
        .filter((item) => {
          return item.input_box_id === thirdInputId;
        })
        .map((val) => {
          return { _id: val._id, content: val.input_content, order: val.order };
        })
      : [];
    if (thirdInput.length) {
      setThirdInput(thirdInput[0].content || '');
      setThirdUpdateId(thirdInput[0]._id || '');
    }
    let fourthInput = cardsData.length
      ? cardsData
        .filter((item) => {
          return item.input_box_id === fourthInputId;
        })
        .map((val) => {
          return { _id: val._id, content: val.input_content, order: val.order };
        })
      : [];
    if (fourthInput.length) {
      setFourthInput(fourthInput[0].content || '');
      setFourthUpdateId(fourthInput[0]._id || '');
    }
  }, [userAssessmentData]);
  useEffect(() => {
    const firstInputId = inputs.length
      ? inputs.filter((item) => item.order === 0).map((val) => val._id)
      : null;
    setFirstInputId(...firstInputId);
    const secondInputId = inputs.length
      ? inputs.filter((item) => item.order === 1).map((val) => val._id)
      : null;
    setSecondInputId(...secondInputId);
    const thirdInputId = inputs.length
      ? inputs.filter((item) => item.order === 2).map((val) => val._id)
      : null;
    setThirdInputId(...thirdInputId);
    const fourthInputId = inputs.length
      ? inputs.filter((item) => item.order === 3).map((val) => val._id)
      : null;
    setFourthInputId(...fourthInputId);
  }, [inputs]);
  const onSave = (e) => {
    e.preventDefault();
    if (userAssessmentData && userAssessmentData.length) {
      if (firstInput.length === 0) {
        setFirstInputError('Please enter your thinking');
      } else if (secondInput.length === 0) {
        setSecondInputError('Please enter situation');
      } else if (thirdInput.length === 0) {
        setThirdInputError('Please enter how you behaved?');
      } else if (fourthInput.length === 0) {
        setFourthInputError('Please enter how you felt?');
      } else {
        const params = {
          data: [
            {
              id: firstUpdateId,
              input_content: firstInput,
            },
            {
              id: secondUpdateId,
              input_content: secondInput,
            },
            {
              id: thirdUpdateId,
              input_content: thirdInput,
            },
            {
              id: fourthUpdateId,
              input_content: fourthInput,
            },
          ],
        };
        dispatch(AppActions.updateUserAssessment(params));
      }
    } else {
      const params = {
        user_id: getItem('userId'),
        user_card_id: props._id,
        input_assessment: [
          {
            input_box_id: firstInputId,
            data: firstInput,
          },
          {
            input_box_id: secondInputId,
            data: secondInput,
          },
          {
            input_box_id: thirdInputId,
            data: thirdInput,
          },
          {
            input_box_id: fourthInputId,
            data: fourthInput,
          },
        ],
      };
      if (firstInput.length === 0) {
        setFirstInputError('Please enter your thinking');
      }
      if (secondInput.length === 0) {
        setSecondInputError('Please enter situation');
      }
      if (thirdInput.length === 0) {
        setThirdInputError('Please enter how you behaved?');
      }
      if (fourthInput.length === 0) {
        setFourthInputError('Please enter how you felt?');
      }
      if (
        firstInput !== '' &&
        secondInput !== '' &&
        thirdInput !== '' &&
        fourthInput !== ''
      ) {
        dispatch(AppActions.saveUserAssessment(params));
      }
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
      <div
        className="v-scroll"
        style={{
          width: '100%',
          height: DEVICE_WIDTH > 767 ? '700px' : 'auto',
          overflow: 'auto',
        }}>
        <div
          style={{
            width: DEVICE_WIDTH > 767 ? '888px' : '100%',
            height: DEVICE_WIDTH > 767 ? '700px' : 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
          }}>
          <img src={slide} style={{ width: '100%', height: '100%' }} />
          <div
            style={{ position: 'absolute', right: '80px', top: '20px' }}
            className="t-area1">
            {inputs.length
              ? inputs
                .filter((item) => item.order === 0)
                .map((item) => {
                  return (
                    <div className="formRow">
                      <div className="w100">
                        <div className="formField has-icon">
                          <textarea
                            type="textarea"
                            className="f-field t-area"
                            value={firstInput}
                            name="firstInput"
                            onChange={(e) => onHandleChange(e, item)}
                            required
                            placeholder={item.placeholder}
                            style={styles.inputField}
                          />
                        </div>
                      </div>
                      <span style={commonStyles.error}>
                        {firstInputError}
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '460px',
              left: '340px',
            }}
            className="t-area2">
            {inputs.length
              ? inputs
                .filter((item) => item.order === 1)
                .map((item) => {
                  return (
                    <div className="formRow">
                      <div className="w100">
                        <div className="formField has-icon">
                          <textarea
                            type="textarea"
                            className="f-field t-area"
                            value={secondInput}
                            name="secondInput"
                            onChange={(e) => onHandleChange(e, item)}
                            required
                            placeholder={item.placeholder}
                            style={styles.inputField}
                          />
                        </div>
                      </div>
                      <span style={commonStyles.error}>
                        {secondInputError}
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
          <div
            style={{ position: 'absolute', left: '40px', bottom: '10px' }}
            className="t-area3">
            {inputs.length
              ? inputs
                .filter((item) => item.order === 2)
                .map((item) => {
                  return (
                    <div className="formRow">
                      <div className="w100">
                        <div className="formField has-icon">
                          <textarea
                            type="textarea"
                            className="f-field t-area"
                            value={thirdInput}
                            name="thirdInput"
                            onChange={(e) => onHandleChange(e, item)}
                            required
                            placeholder={item.placeholder}
                            style={styles.inputField}
                          />
                        </div>
                      </div>
                      <span style={commonStyles.error}>
                        {thirdInputError}
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
          <div
            style={{ position: 'absolute', right: '10px', bottom: '10px' }}
            className="t-area4">
            {inputs.length
              ? inputs
                .filter((item) => item.order === 3)
                .map((item) => {
                  return (
                    <div>
                      <div className="w100">
                        <div className="formField has-icon">
                          <textarea
                            type="textarea"
                            className="f-field t-area"
                            value={fourthInput}
                            name="fourthInput"
                            onChange={(e) => onHandleChange(e, item)}
                            required
                            placeholder={item.placeholder}
                            style={styles.inputField}
                          />
                        </div>
                      </div>
                      <span style={commonStyles.error}>
                        {fourthInputError}
                      </span>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {inputs.length ? (
        <div style={styles.button} className="res-100">
          <button className="btn-orange" onClick={(e) => onSave(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {/**********************content************** */}
      <div style={{ ...commonStyles.contentLeftBorder }}>
        {content && content.length
          ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
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

export default TwentyFive;
const styles = {
  inputField: {
    backgroundColor: WHITE,
    fontStyle: 'italic',
    resize: 'none',
    height: '80px',
  },
  button: {
    width: '20%',
    marginBottom: '50px',
    marginTop: '5px',
  },
};
