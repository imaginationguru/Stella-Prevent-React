import React, {useState, useEffect} from 'react';
import commonStyles from '../commonStyles';
import GLOBALS from '@constants';
import Thermometer from './Thermometer';
import ReactHtmlParser from 'react-html-parser';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '@actions';
import {getItem} from '@utils/AsyncUtils';
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
const {COLORS, IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;

const TemplateThermometer = (props) => {
  const {
    card_title,
    card_time,
    quotes,
    descriptions,
    assessment_id,
    images,
    content,
    onSubmitMessage,
    week,
    showExercises,
  } = props.card;
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const [headerData, setHeaderData] = useState([]);
  const {headers} = assessmentData;
  const dispatch = useDispatch();
  const staticData = [
    {
      id: 1,
      title: ts('EMOTION_VERY'),
      color: COLORS.DARK_RED,
    },
    {
      id: 1,
      title: ts('EMOTION_MODERATE'),
      color: COLORS.BUTTON_ORANGE,
    },
    {
      id: 1,
      title: ts('EMOTION_LITTLE'),
      color: COLORS.DARK_GREEN,
    },
  ];
  /*****API HIT for get assessment data and user assessment ********* */

  /************header set in state********* */
  useEffect(() => {
    let x =
      assessmentData &&
      assessmentData.headers &&
      assessmentData.headers.map((item) => {
        return {...item, content: '', assessment_header_id: item._id};
      });
    setHeaderData(x);
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
  }, [assessmentData]);

  /***********user assessment data set in header content***** */
  useEffect(() => {
    if (userAssessmentData && userAssessmentData.length) {
      let temp = [];
      userAssessmentData.forEach((item, i) => {
        const onlyOneCard = item.cards.length
          ? item.cards.sort((a, b) => (a.createdAt < b.createdAt && 1) || -1)[0]
          : [];
        return temp.push(onlyOneCard);
      });
      setHeaderData(temp);
    }
  }, [userAssessmentData]);

  /********function for increase the thermometer value */
  const plusHandler = (item) => {
    if (headerData.length) {
      const isAlready = headerData.find((value) => {
        return value._id === item._id;
      });
      let thermometerValue = 0;
      if (isAlready) {
        thermometerValue = isAlready.content ? isAlready.content : 0;
        let nArray = headerData.map((val) => {
          if (val._id === item._id && thermometerValue < 10) {
            return {
              ...val,
              content:
                parseInt(thermometerValue) + 1
                  ? parseInt(thermometerValue) + 1
                  : thermometerValue,
            };
          } else {
            return val;
          }
        });
        setHeaderData(nArray);
      } else {
        setHeaderData([
          ...headerData,
          {
            assessment_header_id: item._id,
            content: 0,
          },
        ]);
      }
    } else {
      setHeaderData([
        {
          assessment_header_id: item._id,
          content: 0,
        },
      ]);
    }
  };
  /***********function for decrease the thermometer value******* */
  const minusHandler = (item) => {
    if (headerData.length) {
      const isAlready = headerData.find((value) => {
        return value._id === item._id;
      });
      let thermometerValue = 0;
      if (isAlready) {
        thermometerValue = isAlready.content ? isAlready.content : 0;

        let nArray = headerData.map((val) => {
          if (val._id === item._id && thermometerValue > 0) {
            return {...val, content: parseInt(thermometerValue) - 1};
          } else {
            return val;
          }
        });
        setHeaderData(nArray);
      } else {
        setHeaderData([
          ...headerData,
          {
            assessment_header_id: item._id,
            content: 0,
          },
        ]);
      }
    } else {
      setHeaderData([
        {
          assessment_header_id: item._id,
          content: 0,
        },
      ]);
    }
  };
  /*******function for save the thermometer value and save from api *** */
  const onSubmit = (e) => {
    e.preventDefault();
    const modifyHeaderData = headerData.length
      ? headerData.map((item) => {
          return {
            assessment_header_id: item.assessment_header_id,
            content: [{content: item.content || 0, order: item.order}],
          };
        })
      : [];

    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: modifyHeaderData,
    };

    if (userAssessmentData && userAssessmentData.length) {
      dispatch(AppActions.saveUserAssessment(params, onSubmitMessage));
    } else {
      let isValid = false;
      if (modifyHeaderData.length) {
        let temp = [];
        modifyHeaderData.forEach((item) => {
          if (item.content.length) {
            item.content.forEach((val) => {
              temp.push(val.content);
            });
          }
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
      {/**************************ASSESSMENT****DESCRIPTION*************** */}
      <div
        style={{...commonStyles.assessmentWrapper, justifyContent: 'center'}}
        className="wrap-2line">
        {images && images.length
          ? images.map((item) => {
              return (
                <CustomImage
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
          ? props.assessments.map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  description={ReactHtmlParser(item.description)}
                  style={commonStyles.assessDesc}
                />
              );
            })
          : []}
      </div>
      {/******************************HEADER*************** */}
      <div style={styles.thermometerHeader}>
        {headers && headers.length
          ? headers
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item) => {
                return (
                  <div style={commonStyles.col4}>
                    <p
                      style={commonStyles.thermoTitle}
                      className="therma-title">
                      {ReactHtmlParser(item.header)}
                    </p>
                  </div>
                );
              })
          : []}
      </div>
      {/******************************THERMOMETER FUNTIONALITY*************** */}
      <div style={styles.thermometerImage}>
        {headerData && headerData.length
          ? headerData
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item) => {
                return (
                  <Thermometer
                    current={item.content ? item.content : 0}
                    plusHandler={() => plusHandler(item)}
                    minusHandler={() => minusHandler(item)}
                  />
                );
              })
          : []}
      </div>

      <div style={styles.colorIndication}>
        {staticData && staticData.length
          ? staticData.map((item) => {
              return (
                <div style={styles.row}>
                  <div style={{...styles.color, backgroundColor: item.color}} />
                  <p style={{...styles.title, color: item.color}}>
                    {item.title}
                  </p>
                </div>
              );
            })
          : null}
      </div>
      {headerData && headerData.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSubmit(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {/******************************CONTENTS*************** */}
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
    </>
  );
};

export default TemplateThermometer;
const styles = {
  thermometerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '40px',
  },
  thermometerImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorIndication: {marginTop: '50px'},
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  color: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
  },
  title: {color: COLORS.DARK_RED, paddingLeft: '20px'},
};
