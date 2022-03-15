import React, {useState, useEffect} from 'react';
import commonStyles from '../commonStyles';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getItem} from '../../../utils/AsyncUtils';
import * as AppActions from '../../../actions';
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
import {Dimensions} from 'react-native';
import GreenCheck from '../../../assets/images/greenCheck.png';
const {IMAGE_BASE_URL, ACTION_TYPE} = GLOBALS;
const DEVICE_WIDTH = Dimensions.get('window').width;
const unique = (arr, keyProps) => {
  const kvArray = arr.map((entry) => {
    const key = keyProps.map((k) => entry[k]).join('|');
    return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
};
const onlySingleId = (arr = []) => {
  let temp = [];
  if (arr.length) {
    const assIds = [...new Set(arr.map((item) => item.assessment_header_id))];
    assIds.forEach((item) => {
      let p = arr
        .filter((val) => val.assessment_header_id === item)
        .map((cn) => {
          return cn.content;
        });
      let q = [];
      if (p.length) {
        p.forEach((cn) => {
          q.push(...cn);
        });
      }
      temp.push({assessment_header_id: item, content: q});
    });
    return temp;
  }
};
const ThirtyFive = (props) => {
  const [optionDataContent, setOptionDataContent] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const {assessmentData = {}, userAssessmentData = []} = useSelector(
    (state) => state.moduleOne,
  );
  const [dragCardData, setDragCardData] = useState([]);
  const dispatch = useDispatch();
  const {
    card_title,
    card_time,
    descriptions,
    quotes,
    images,
    assessment_id,
    content,
    onSubmitMessage,
    showExercises,
    week,
  } = props.card;
  const {assessments} = props;
  const {headers} = assessmentData;

  useEffect(() => {
    // let optionData =
    //   assessmentData && assessmentData.content && assessmentData.content.length
    //     ? assessmentData.content
    //         .filter((item) => {
    //           return item.assessment_header_id === null;
    //         })
    //         .map((item) => {
    //           return {...item, content: item.data};
    //         })
    //     : [];
    // console.log('option data content', JSON.stringify(optionData));
    let optionData = [
      {
        _id: '61e6636a27541d0ad18e04fb',
        correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
        assessment_header_id: null,
        assessment_heading_id: null,
        data: 'I need you to help me a litte more!',
        content: 'I need you to help me a litte more!',
        slug: null,
        order: 0,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-03-11T06:24:04.512Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e04fc',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
        assessment_heading_id: null,
        data: 'Thank you for your help today!',
        content: 'Thank you for your help today!',
        slug: null,
        order: 1,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e04fe',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
        assessment_heading_id: null,
        data: 'I would like extra help with tasks towards the end of the day.',
        content:
          'I would like extra help with tasks towards the end of the day.',
        slug: null,
        order: 3,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e04fd',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
        assessment_heading_id: null,
        data: 'I need you to help me with the laundry and in setting the table for dinner.',
        content:
          'I need you to help me with the laundry and in setting the table for dinner.',
        slug: null,
        order: 2,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e0502',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
        assessment_heading_id: null,
        data: 'Mom, thank you for spending your afternoon keeping me company. I have been so tired. Would it be possible to help me preparing some meals for the week the next time you come? That would be great!',
        content:
          'Mom, thank you for spending your afternoon keeping me company. I have been so tired. Would it be possible to help me preparing some meals for the week the next time you come? That would be great!',
        slug: null,
        order: 7,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e0503',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
        assessment_heading_id: null,
        data: "You're never available when I ask for help!",
        content: "You're never available when I ask for help!",
        slug: null,
        order: 8,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e04ff',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
        assessment_heading_id: null,
        data: 'Your help would be very important to me, but I understand that you can’t today.',
        content:
          'Your help would be very important to me, but I understand that you can’t today.',
        slug: null,
        order: 4,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e0500',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
        assessment_heading_id: null,
        data: 'Nobody helps me with anything I need.',
        content: 'Nobody helps me with anything I need.',
        slug: null,
        order: 5,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
      {
        _id: '61e6636a27541d0ad18e0501',
        assessment_header_id: null,
        correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
        assessment_heading_id: null,
        data: 'If you were to do the dishes like this, I might as well have done them myself.',
        content:
          'If you were to do the dishes like this, I might as well have done them myself.',
        slug: null,
        order: 6,
        assessment_id: '61e6636a27541d0ad18e04f8',
        createdAt: '2022-01-18T06:51:22.332Z',
        updatedAt: '2022-01-18T06:51:22.332Z',
        __v: 0,
      },
    ];
    setOptionDataContent(optionData);
    dispatch(AppActions.getUserAssessment(props._id, assessment_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentData]);

  useEffect(() => {
    if (userAssessmentData && userAssessmentData.length) {
      let temp = [];
      let tempHeaderParams = [];
      userAssessmentData.forEach((item, i) => {
        temp.push(...item.cards);
        let zz = item.cards.map((item) => {
          return {
            assessment_header_id: item.assessment_header_id,
            content: [
              {
                assessment_header_id: item.assessment_header_id,
                content: item.content,
              },
            ],
          };
        });
        tempHeaderParams.push(...zz);
        setHeaderParams(onlySingleId(tempHeaderParams));
        return;
      });
      setDragCardData(temp);
      // let x = [...optionDataContent, ...temp];
      let x = [
        {
          _id: '622b285920769c2ac68ad09e',
          content: 'I need you to help me a litte more!',
          correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
          default_content: false,
          order: null,
          input_content: null,
          type: null,
          user_id: '6229b166344b7f44eea68c16',
          user_card_id: '6229b187344b7f44eea68caa',
          assessment_id: '61e6636a27541d0ad18e04f8',
          assessment_header_id: '61e6636a27541d0ad18e04f9',
          createdAt: '2022-03-11T10:45:45.492Z',
          updatedAt: '2022-03-11T10:45:45.492Z',
          __v: 0,
          assessment_contents: [],
          assessment_header: [
            {
              _id: '61e6636a27541d0ad18e04f9',
              header: '<p>Helpful strategies to ask for help&nbsp;</p>',
              description: null,
              order: 0,
              assessment_id: '61e6636a27541d0ad18e04f8',
              createdAt: '2022-01-18T06:51:22.332Z',
              updatedAt: '2022-01-18T06:51:22.332Z',
              __v: 0,
            },
          ],
          assessment_heading: [],
          input_box: [],
        },
        {
          _id: '622b285920769c2ac68ad09f',
          content: 'Thank you for your help today!',
          correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
          default_content: false,
          order: null,
          input_content: null,
          type: null,
          user_id: '6229b166344b7f44eea68c16',
          user_card_id: '6229b187344b7f44eea68caa',
          assessment_id: '61e6636a27541d0ad18e04f8',
          assessment_header_id: '61e6636a27541d0ad18e04f9',
          createdAt: '2022-03-11T10:45:45.492Z',
          updatedAt: '2022-03-11T10:45:45.492Z',
          __v: 0,
          assessment_contents: [],
          assessment_header: [
            {
              _id: '61e6636a27541d0ad18e04f9',
              header: '<p>Helpful strategies to ask for help&nbsp;</p>',
              description: null,
              order: 0,
              assessment_id: '61e6636a27541d0ad18e04f8',
              createdAt: '2022-01-18T06:51:22.332Z',
              updatedAt: '2022-01-18T06:51:22.332Z',
              __v: 0,
            },
          ],
          assessment_heading: [],
          input_box: [],
        },
        {
          _id: '622b285920769c2ac68ad0a1',
          content:
            'I would like extra help with tasks towards the end of the day.',
          default_content: false,
          correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
          order: null,
          input_content: null,
          type: null,
          user_id: '6229b166344b7f44eea68c16',
          user_card_id: '6229b187344b7f44eea68caa',
          assessment_id: '61e6636a27541d0ad18e04f8',
          assessment_header_id: '61e6636a27541d0ad18e04fa',
          createdAt: '2022-03-11T10:45:45.492Z',
          updatedAt: '2022-03-11T10:45:45.492Z',
          __v: 0,
          assessment_contents: [],
          assessment_header: [
            {
              _id: '61e6636a27541d0ad18e04fa',
              header: '<p>Unhelpful strategies to ask for help&nbsp;</p>',
              description: '',
              order: 1,
              assessment_id: '61e6636a27541d0ad18e04f8',
              createdAt: '2022-01-18T06:51:22.332Z',
              updatedAt: '2022-03-11T06:31:48.514Z',
              __v: 0,
            },
          ],
          assessment_heading: [],
          input_box: [],
        },
        {
          _id: '622b285920769c2ac68ad0a0',
          content:
            'I need you to help me with the laundry and in setting the table for dinner.',
          default_content: false,
          order: null,
          input_content: null,
          type: null,
          user_id: '6229b166344b7f44eea68c16',
          user_card_id: '6229b187344b7f44eea68caa',
          assessment_id: '61e6636a27541d0ad18e04f8',
          assessment_header_id: '61e6636a27541d0ad18e04f9',
          createdAt: '2022-03-11T10:45:45.492Z',
          updatedAt: '2022-03-11T10:45:45.492Z',
          __v: 0,
          assessment_contents: [],
          correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
          assessment_header: [
            {
              _id: '61e6636a27541d0ad18e04f9',
              header: '<p>Helpful strategies to ask for help&nbsp;</p>',
              description: null,
              order: 0,
              assessment_id: '61e6636a27541d0ad18e04f8',
              createdAt: '2022-01-18T06:51:22.332Z',
              updatedAt: '2022-01-18T06:51:22.332Z',
              __v: 0,
            },
          ],
          assessment_heading: [],
          input_box: [],
        },
        {
          _id: '622b285920769c2ac68ad0a2',
          correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
          content:
            'Mom, thank you for spending your afternoon keeping me company. I have been so tired. Would it be possible to help me preparing some meals for the week the next time you come? That would be great!',
          default_content: false,
          order: null,
          input_content: null,
          type: null,
          user_id: '6229b166344b7f44eea68c16',
          user_card_id: '6229b187344b7f44eea68caa',
          assessment_id: '61e6636a27541d0ad18e04f8',
          assessment_header_id: '61e6636a27541d0ad18e04fa',
          createdAt: '2022-03-11T10:45:45.492Z',
          updatedAt: '2022-03-11T10:45:45.492Z',
          __v: 0,
          assessment_contents: [],
          assessment_header: [
            {
              _id: '61e6636a27541d0ad18e04fa',
              header: '<p>Unhelpful strategies to ask for help&nbsp;</p>',
              description: '',
              order: 1,
              assessment_id: '61e6636a27541d0ad18e04f8',
              createdAt: '2022-01-18T06:51:22.332Z',
              updatedAt: '2022-03-11T06:31:48.514Z',
              __v: 0,
            },
          ],
          assessment_heading: [],
          input_box: [],
        },
        {
          _id: '61e6636a27541d0ad18e0503',
          assessment_header_id: null,
          correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
          assessment_heading_id: null,
          data: "You're never available when I ask for help!",
          content: "You're never available when I ask for help!",
          slug: null,
          order: 8,
          assessment_id: '61e6636a27541d0ad18e04f8',
          createdAt: '2022-01-18T06:51:22.332Z',
          updatedAt: '2022-01-18T06:51:22.332Z',
          __v: 0,
        },
        {
          _id: '61e6636a27541d0ad18e04ff',
          assessment_header_id: null,
          correct_assessment_header_id: '61e6636a27541d0ad18e04fa',
          assessment_heading_id: null,
          data: 'Your help would be very important to me, but I understand that you can’t today.',
          content:
            'Your help would be very important to me, but I understand that you can’t today.',
          slug: null,
          order: 4,
          assessment_id: '61e6636a27541d0ad18e04f8',
          createdAt: '2022-01-18T06:51:22.332Z',
          updatedAt: '2022-01-18T06:51:22.332Z',
          __v: 0,
        },
        {
          _id: '61e6636a27541d0ad18e0500',
          assessment_header_id: null,
          correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
          assessment_heading_id: null,
          data: 'Nobody helps me with anything I need.',
          content: 'Nobody helps me with anything I need.',
          slug: null,
          order: 5,
          assessment_id: '61e6636a27541d0ad18e04f8',
          createdAt: '2022-01-18T06:51:22.332Z',
          updatedAt: '2022-01-18T06:51:22.332Z',
          __v: 0,
        },
        {
          _id: '61e6636a27541d0ad18e0501',
          assessment_header_id: null,
          correct_assessment_header_id: '61e6636a27541d0ad18e04f9',
          assessment_heading_id: null,
          data: 'If you were to do the dishes like this, I might as well have done them myself.',
          content:
            'If you were to do the dishes like this, I might as well have done them myself.',
          slug: null,
          order: 6,
          assessment_id: '61e6636a27541d0ad18e04f8',
          createdAt: '2022-01-18T06:51:22.332Z',
          updatedAt: '2022-01-18T06:51:22.332Z',
          __v: 0,
        },
      ];
      // /************ UNIQUE FILTERATION FOR ARRAY ************* */

      const uniqueOptionDataContent = x.length
        ? unique(x, ['content', 'assessment_header_id' !== null])
        : [];
      setOptionDataContent(uniqueOptionDataContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAssessmentData]);

  /*
   * on drag item  we used ev.dataTransfer.setData method for drag item with id
   */

  const onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData('id', id);
  };

  /*
  on drag over not refresh the page so we used ev.preventDefault() method
  */

  const onDragOver = (ev, id) => {
    ev.preventDefault();
  };

  /*
  on drop item we used ev.dataTransfer.getData method is used for item list
  fetch with id and filter the item with respect to category and set in tasks array
  */

  const onDrop = (ev, header_id, order) => {
    let id = ev.dataTransfer.getData('id');
    let x = headerParams.map((item) => {
      return {
        ...item,
        content: item.content.filter((val) => val.content !== id),
      };
    });
    let y = [
      ...x,
      {
        assessment_header_id: header_id,
        content: [{assessment_header_id: header_id, content: id}],
      },
    ];
    setHeaderParams(onlySingleId(y));
    let tasks = optionDataContent.filter((task) => {
      if (task.content === id) {
        return (task.assessment_header_id = header_id);
      }
      return task;
    });
    setOptionDataContent([...optionDataContent, tasks]);
  };
  console.log(
    'header params ??????? option content data',
    JSON.stringify(optionDataContent),
  );
  const onSave = (e) => {
    e.preventDefault();
    const params = {
      user_id: getItem('userId'),
      user_card_id: props._id,
      assessment_id: assessment_id,
      assessment: headerParams,
    };

    if (headerParams.length) {
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

  const boxBackgroundColor = (order) => {
    if (order === 0) {
      return '#5DBDA9';
    }
    if (order === 1) {
      return '#F2C842';
    }
    if (order === 2) {
      return '#F08B22';
    }
    if (order === 3) {
      return '#57576D';
    }
  };

  /*
    five buckets for drag and drop item
    */

  const dragCardDataContent = dragCardData.length
    ? dragCardData.map((item) => item.content)
    : [];

  /************************************** */
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

      {/*****************assessment description***************** */}
      {assessments &&
      assessments.length &&
      assessments[0].description !== '' ? (
        <div style={commonStyles.assessmentWrapper}>
          {images && images.length
            ? images.map((item, i) => {
                return (
                  <CustomImage
                    key={i}
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
      ) : null}
      {/******************Droppable div************************* */}
      <div style={styles.wrapper}>
        <div style={styles.fourBoxContainer}>
          {headers && headers.length
            ? headers.map((item, index) => {
                const header_id = item._id;
                const order = item.order;
                return (
                  <div
                    key={index}
                    style={{
                      ...styles.droppableDiv,
                    }}
                    className="wip"
                    onDragOver={(e) => onDragOver(e, item._id)}
                    onDrop={(e) => {
                      onDrop(e, item._id, item.order);
                    }}>
                    <p
                      className="task-header"
                      style={{
                        ...commonStyles.dropTitle,
                        backgroundColor: boxBackgroundColor(item.order),
                      }}>
                      {ReactHtmlParser(item.header)}
                    </p>
                    {optionDataContent && optionDataContent.length
                      ? optionDataContent
                          .filter((item) => {
                            return item.assessment_header_id === header_id;
                          })
                          .map((item) => {
                            {
                              /* console.log(
                              'item.correct assessment header id',
                              item.correct_assessment_header_id,
                              item,
                              header_id,
                            ); */
                            }
                            const correctAns =
                              item.correct_assessment_header_id === header_id
                                ? true
                                : false;
                            return (
                              <div style={{position: 'relative'}}>
                                <div
                                  style={
                                    {
                                      // display: 'flex',
                                      // position: 'absolute',
                                      // right: -5,
                                      // top: -15,
                                      // flexDirection: 'row-reverse',
                                      // marginLeft: '20px',
                                      // marginBottom: '-10px',
                                    }
                                  }>
                                  <div
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      border: `1px solid ${
                                        correctAns ? 'green' : 'red'
                                      }`,

                                      borderRadius: '20px',
                                      backgroundColor: '#fff',
                                    }}>
                                    {item.correct_assessment_header_id ===
                                    header_id ? (
                                      <img
                                        src={GreenCheck}
                                        style={{
                                          width: '13px',
                                          height: '13px',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}
                                      />
                                    ) : (
                                      <span
                                        style={{
                                          color: 'red',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        x
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <p
                                  style={{
                                    // ...commonStyles.dragItem,
                                    textAlign: 'center',
                                    border: '1px solid',
                                    // borderColor: boxBackgroundColor(order),
                                    borderColor:
                                      item.correct_assessment_header_id ===
                                      header_id
                                        ? 'green'
                                        : 'red',
                                  }}
                                  onDragStart={(e) =>
                                    onDragStart(e, item.content)
                                  }
                                  draggable
                                  className="draggable">
                                  {item.content}
                                </p>
                              </div>
                            );
                          })
                      : []}
                  </div>
                );
              })
            : []}
        </div>
        {/****************************OPTIONS CONTAINER with gray box******************** */}

        <div style={styles.optionsDiv}>
          {optionDataContent && optionDataContent.length
            ? optionDataContent
                .filter((item, i) => {
                  const exist = dragCardDataContent.find(
                    (val) => val === item.content,
                  )
                    ? true
                    : false;
                  return item.assessment_header_id === null && !exist;
                })
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      onDragStart={(e) => onDragStart(e, item.content)}
                      draggable
                      className="draggable"
                      style={styles.draggableContent}>
                      {item.content}
                    </div>
                  );
                })
            : []}
        </div>
      </div>
      {headers && headers.length ? (
        <div style={commonStyles.buttonWrapper}>
          <button className="btn-orange" onClick={(e) => onSave(e)}>
            {ts('SAVE')}
          </button>
        </div>
      ) : null}
      {/*************Content************ */}
      <div style={{...commonStyles.contentLeftBorder, marginBottom: '20px'}}>
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
export default ThirtyFive;

const styles = {
  fourBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionsDiv: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: DEVICE_WIDTH > 767 ? '60px' : '15px',
    justifyContent: 'space-between',
  },
  draggableContent: {
    width: '48%',
    marginTop: '10px',
    marginBottom: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#F1F3FA',
    paddingLeft: '20px',
    //  border: '1px solid red',
  },
  wrapper: {marginTop: '40px'},
  droppableDiv: {
    width: '48%',
    paddingBottom: '15px',
  },
  droppableDivDrag: {
    width: DEVICE_WIDTH > 767 ? '23%' : '48%',
    paddingBottom: DEVICE_WIDTH > 767 ? '60px' : '30px',
    //  display: 'flex',
  },
};
