import React, {useState, useEffect} from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {getItem} from '../../../utils/AsyncUtils';
import ExerciseBox from '../../../components/ExerciseBox';
import {translate as ts} from '../../../i18n/translate';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import commonStyles from '../commonStyles';
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const {YELLOW, WHITE, CIRCLE_GRAY, LIGHT_GRAY} = COLORS;
let userId = getItem('userId');
const dataMapperAss = (arr = []) => {
  let temp = [];
  if (arr.length) {
    temp = arr.map((item) => {
      return {
        assessment_header_id: item._id,
        content: [{content: item.value, order: item.order}],
      };
    });
  }
  return temp;
};

const InputBoxWithContent = (props) => {
  const {title, placeholder, value, onChange, style, name} = props;
  return (
    <div style={styles.inputBoxWrapper}>
      <div style={style}>
        <p style={styles.header}>{title}</p>
      </div>
      <div style={styles.inputBox}>
        <form noValidate>
          <textarea
            type="description"
            // className="f-field"
            value={value}
            name={name}
            onChange={onChange}
            required
            placeholder={placeholder}
            style={styles.inputStyle}
            rows={3}
          />
        </form>
      </div>
    </div>
  );
};
const FourThree = (props) => {
  const [inputs, setInputs] = useState([]);
  const [firstHeaderId, setFirstHeaderId] = useState([]);
  const [firstHeaderContent, setFirstHeaderContent] = useState([]);
  const {
    card_title,
    descriptions,
    card_time,
    images,
    quotes,
    content,
    assessment_id,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const dispatch = useDispatch();
  const {assessmentData = {heading: []}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );

  useEffect(() => {
    let headers =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers
        : [];
    let headerId =
      assessmentData.headers && assessmentData.headers.length
        ? assessmentData.headers[0]._id
        : [];
    setFirstHeaderId(headerId);

    headers &&
      headers.length &&
      setInputs(
        headers.map((item) => {
          return {
            name: item.header,
            placeholder: item.description,
            order: item.order,
            value: '',
            _id: item._id,
          };
        }),
      );
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData, assessment_id]);
  useEffect(() => {
    let cardData = [];
    if (userAssessmentData.length) {
      userAssessmentData
        .filter((item) => item._id.assessment_header_id === firstHeaderId)
        .forEach((val) => cardData.push(...val.cards));
    }
    setFirstHeaderContent(cardData);
  }, [userAssessmentData]);
  const onSaveMyths = (e) => {
    e.preventDefault();
    let params = {
      user_id: userId,
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: dataMapperAss(inputs),
    };

    if (userAssessmentData && userAssessmentData.length) {
      dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
    } else {
      let isValid = false;
      if (inputs && inputs.length) {
        let temp = [];
        inputs.forEach((item) => {
          temp.push(item.value);
        });
        if (temp.length) {
          isValid = temp.find((item) => item !== 0) ? true : false;
        }
      }
      if (isValid) {
        dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
      } else {
        dispatch({
          type: ACTION_TYPE.ERROR,
          payload: 'Please perform your exercise',
        });
      }
    }
  };

  const onHandleChange = (e, item) => {
    const updateInputs = inputs.length
      ? inputs.map((val) => {
          return {
            ...val,
            value: val.name === e.target.name ? e.target.value : val.value,
          };
        })
      : [];
    setInputs(updateInputs);
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
      {/**********************Images************** */}
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '30px',
        }}>
        {images && images.length
          ? images
              .filter((item) => item.image_type === 'first')
              .map((item) => {
                return (
                  <CustomImage
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                  />
                );
              })
          : null}
      </div>
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
      <div style={commonStyles.assessmentWrapper}>
        {images && images.length
          ? images
              .filter((item) => item.image_type === 'second')
              .map((item, i) => {
                return (
                  <CustomImage
                    key={i}
                    src={
                      item.image !== ''
                        ? `${IMAGE_BASE_URL}${item.image}`
                        : null
                    }
                    style={{
                      ...commonStyles.assessImage,
                      display: item.image !== '' ? 'flex' : 'none',
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
      {/* {assessmentData.heading && assessmentData.heading.length ? (
        <div style={styles.inputBoxWrapper}>
          <p style={{...styles.heading, width: '100%'}}>
            {ReactHtmlParser(headingSecond)}
          </p>
        </div>
      ) : null} */}
      {assessmentData.heading && assessmentData.heading.length
        ? assessmentData.heading
            .filter((item) => item.order === 1)
            .map((item) => {
              return (
                <div style={styles.inputBoxWrapper}>
                  <p style={{...styles.heading, width: '100%'}}>
                    {ReactHtmlParser(item.heading)}
                  </p>
                </div>
              );
            })
        : null}
      {inputs.length
        ? inputs
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, idx) => {
              return (
                <InputBoxWithContent
                  key={idx}
                  title={ReactHtmlParser(item.name)}
                  name={item.name}
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={(e) => onHandleChange(e, item)}
                  style={{
                    backgroundColor:
                      assessmentData.heading && assessmentData.heading.length
                        ? CIRCLE_GRAY
                        : YELLOW,
                    width: '33%',
                  }}
                />
              );
            })
        : null}
      {inputs.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {assessmentData.heading && assessmentData.heading.length
        ? assessmentData.heading
            .filter((item) => item.order === 2)
            .map((item) => {
              return (
                <div style={styles.inputBoxWrapper}>
                  <p style={{...styles.heading, width: '100%'}}>
                    {ReactHtmlParser(item.heading)}
                  </p>
                </div>
              );
            })
        : null}
      {firstHeaderContent && firstHeaderContent.length
        ? firstHeaderContent
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                  style={{
                    padding: '10px',
                    backgroundColor: LIGHT_GRAY,
                  }}
                />
              );
            })
        : []}
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
      {showExercises && <ExerciseBox week={week} />}
    </div>
  );
};
export default FourThree;
const styles = {
  inputBoxWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30px',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingTop: '30px',
  },
  inputBox: {width: '65%'},
  inputStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    width: '100%',
    paddingTop: '5px',
    paddingLeft: '5px',
  },
  heading: {
    backgroundColor: YELLOW,
    color: WHITE,
    padding: '10px',
    borderRadius: '5px',
  },
};
