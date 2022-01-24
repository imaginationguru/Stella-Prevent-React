/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MasterLayout from '../../components/MasterLayout';
import Footer from '../../components/Footer';
import TemplateOne from './template/templateOne';
import TemplateTwo from './template/templateTwo';
import TemplateThree from './template/templateThree';
import TemplateFour from './template/templateFour';
import TemplateFive from './template/templateFive';
import TemplateSix from './template/templateSix';
import TemplateSeven from './template/templateSeven';
import TemplateEight from './template/templateEight';
import TemplateNine from './template/templateNine';
import TemplateEleven from './template/templateEleven';
import TemplateTwelve from './template/templateTwelve';
import ComparisonTemplate from './template/comparisonTemplate';
import TemplateFourteen from './template/templateFourteen';
import TemplateThermometer from './template/templateThermometer';
import Congratulation from './template/congratulation';
import GLOBALS from '../../constants';
import * as AppActions from '../../actions';
import TemplateVideo from './template/templateVideo';
import TemplateEighteen from './template/templateEighteen';
import TemplateNineteen from './template/templateNineteen';
import TrackerTemplate from './template/trackerTemplate';
import Seventeen from './template/seventeen';
import TwentyOne from './template/twentyOne';
import TwentyTwo from './template/twentyTwo';
import TwentyThree from './template/twentyThree';
import TwentyFour from './template/twentyFour';
import TwentyFive from './template/twentyFive';
import TwentySix from './template/twentySix';
import TwentySeven from './template/twentySeven';
import TwentyEight from './template/twentyEight';
import ThirtyTwo from './template/thirtyTwo';
import Thirty from './template/thirty';
import ThirtyThree from './template/thirtyThree';
import ThirtyFour from './template/thirtyFour';
import ThirtyFive from './template/thirtyFive';
import ThirtySix from './template/thirtySix';
import ThirtySeven from './template/thirtySeven';
import {Header, SubHeader} from './Navbar';
import ThirtyOne from './template/thirtyOne';
import ThirtyEight from './template/thirtyEight';
import ThirtyNine from './template/thirtyNine';
import Template40 from './template/fourty';
import FourOne from './template/fourOne';
import FourTwo from './template/fourTwo';
import FourThree from './template/fourThree';
import FourFive from './template/fourFive';
import FourSix from './template/fourSix';
import Template44 from './template/fourfour';
import FourSeven from './template/fourSeven';
import FourEight from './template/fourEight';
import FourNine from './template/fourNine';
import Fifty from './template/fifty';
const {COLORS} = GLOBALS;
const DailyLearningWeeks = (props) => {
  const dispatch = useDispatch();
  const {
    templateData = [],
    currentActiveCard = [],
    selectedWeek = 1,
  } = useSelector((state) => state.moduleOne);
  const [currentTemplateIds, setCurrentTemplateIds] = useState([]);
  const [currentCardIds, setCurrentCardIds] = useState([]);
  const [currentDayBasicCardData, setCurrentDayBasicCardData] = useState([]);
  const [subCardIndex, setSubCardIndex] = useState(0);
  const [subCardOnBasisOfIndexData, setsubCardOnBasisOfIndexData] = useState(
    {},
  );
  const [subCardNextData, setSubCardNextData] = useState({});
  const [subCardPrevData, setSubCardPrevData] = useState({});
  const [subCardId, setSubCardId] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  console.log('current active card', currentActiveCard[0]);
  useEffect(() => {
    if (currentActiveCard.length) {
      const cWeek = currentActiveCard[0].week;
      const cDay = currentActiveCard[0].day;
      setCurrentWeek(cWeek);
      setCurrentDay(cDay);
    }
  }, [currentActiveCard]);

  const assessId =
    subCardOnBasisOfIndexData &&
    subCardOnBasisOfIndexData.card &&
    subCardOnBasisOfIndexData.card.assessment_id
      ? subCardOnBasisOfIndexData.card.assessment_id
      : null;
  const userCardId =
    subCardOnBasisOfIndexData &&
    subCardOnBasisOfIndexData.card &&
    subCardOnBasisOfIndexData.card._id
      ? subCardOnBasisOfIndexData.card._id
      : null;
  useEffect(() => {
    if (subCardOnBasisOfIndexData.card) {
      if (subCardOnBasisOfIndexData.card.assessment_id !== null) {
        let assessment_id = subCardOnBasisOfIndexData.card.assessment_id;
        let user_card_id = subCardOnBasisOfIndexData._id;
        dispatch(AppActions.getAssessmentData(assessment_id, user_card_id));
        // dispatch(AppActions.getUserAssessment(user_card_id, assessment_id));
      }
    }
  }, [assessId, userCardId]);
  /****************SUB CARDS HANLDER ****************** */
  const subCardHandler = (idx = 0, data = {}) => {
    console.log('sub card handler>>>>>>', idx, data);
    setSubCardIndex(idx);
    setsubCardOnBasisOfIndexData(data);
  };

  /*************SUB CARD NEXT AND PREV HANDLER */

  /*Function  changing for card components */

  const subCardNextPrev = (idx, id) => {
    console.log('card >>>>id>>>>>', id);
    //dispatch(AppActions.markRead(id));

    let cardId = currentCardIds.length
      ? currentCardIds.find((item, index) => {
          return index === idx;
        })
      : null;
    if (cardId) {
      let data =
        currentDayBasicCardData && currentDayBasicCardData.length
          ? currentDayBasicCardData.find((item) => {
              console.log('card Id sub cards handler', item);
              return item._id === cardId;
            })
          : {};
      subCardHandler(idx, data);
    }

    let prevCardId = '';
    let nextCardId = '';

    if (idx >= 0) {
      nextCardId = currentCardIds.length
        ? currentCardIds.find((item, index) => {
            return index === idx + 1;
          })
        : null;
      if (nextCardId) {
        let data =
          currentDayBasicCardData && currentDayBasicCardData.length
            ? currentDayBasicCardData.find((item) => {
                return item._id === nextCardId;
              })
            : {};
        setSubCardNextData(data); // Sub Card Data set for next card
      }
      if (idx >= 1) {
        prevCardId = currentCardIds.length
          ? currentCardIds.find((item, index) => {
              return index === idx - 1;
            })
          : null;
        if (prevCardId) {
          let data =
            currentDayBasicCardData && currentDayBasicCardData.length
              ? currentDayBasicCardData.find((item) => {
                  return item._id === prevCardId;
                })
              : {};
          setSubCardPrevData(data); // Sub Card Data set for previous card
        }
      }
    }
  };

  /****************SET DEFAULT DATA FOR On Basis of days ************ */

  const activeTemplateDataHandler = (data) => {
    if (data && data.cards) {
      setCurrentDayBasicCardData(data.cards);
      setCurrentTemplateIds(
        data
          ? data.cards.length
            ? data.cards.map((item) => {
                return item.card.template_id;
              })
            : []
          : [],
      );

      setCurrentCardIds(
        data
          ? data.cards.length
            ? data.cards.map((item) => item._id)
            : []
          : [],
      );
    }
  };

  /*************INITIAL COMPLETE FETCH TEMPLATE DATA *********** */
  const initialFetchTemplateData = () => {
    if (templateData.length) {
      let dayBasicData = templateData.find((item) => {
        return item.day === currentDay;
      });

      if (
        dayBasicData &&
        dayBasicData._id &&
        dayBasicData.cards &&
        dayBasicData.cards.length
      ) {
        activeTemplateDataHandler(dayBasicData);
        subCardHandler(
          0,
          dayBasicData.cards.find((_val, idx) => idx === 0),
        );
        setSubCardNextData(dayBasicData.cards.find((_val, idx) => idx === 1));
      }
    }
  };

  /************************************************ */
  useEffect(() => {
    console.log('get template daily learningd', currentWeek);
    // dispatch(AppActions.getTemplateData(currentWeek)); //uncomment when unlock contents
    dispatch(AppActions.getTemplateData(selectedWeek));
    // dispatch(AppActions.getCurrentActiveCard()); //uncomment when unlock contents
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('initial fetch template data');
    initialFetchTemplateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData]);

  useEffect(() => {}, [subCardIndex]);
  useEffect(() => {
    initialFetchTemplateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  const generateUI = (status, data = {}) => {
    switch (status) {
      case 1:
        /// return <FourSeven {...data} />;
        return <TemplateOne {...data} />;
      case 2:
        return <TemplateTwo {...data} />;
      case 3:
        return <TemplateThree {...data} />;
      case 4:
        return <TemplateFour {...data} />;
      case 5:
        return <TemplateFive {...data} />; //Special card with drag n drop
      case 6:
        return <TemplateSix {...data} />; //Special card with Balance
      case 7:
        return <TemplateSeven {...data} />;
      case 8:
        return <TemplateEight {...data} />;
      case 9:
        return <TemplateNine {...data} />; //Special Card with input field
      case 10:
        return <Congratulation {...data} />;
      case 11:
        return <TemplateEleven {...data} />; // Special card with right and wrong
      case 12:
        return <TemplateTwelve {...data} />;
      case 13:
        return <ComparisonTemplate {...data} />; //Compare Special Card
      case 14:
        return <TemplateFourteen {...data} />;
      case 15:
        return <TemplateThermometer {...data} />; //Thermometer
      case 16:
        return <TemplateVideo {...data} />;
      case 17:
        return <Seventeen {...data} />;
      case 18:
        return <TemplateEighteen {...data} />;
      case 19:
        return <TemplateNineteen {...data} />;
      case 20:
        return <TrackerTemplate {...data} />;
      case 21:
        return <TwentyOne {...data} />;
      case 22:
        return <TwentyTwo {...data} />;
      case 23:
        return <TwentyThree {...data} />;
      case 24:
        return <TwentyFour {...data} />;
      case 25:
        return <TwentyFive {...data} />;
      case 26:
        return <TwentySix {...data} />;
      case 27:
        return <TwentySeven {...data} />;
      case 28:
        return <TwentyEight {...data} />;
      case 29:
        return <Seventeen {...data} />;
      //template 29 similar to template 17
      case 30:
        return <Thirty {...data} />; //dynamic
      case 31:
        return <ThirtyOne {...data} />;
      case 32:
        return <ThirtyTwo {...data} />; //dynamic
      case 33:
        return <ThirtyThree {...data} />; //dynamic
      case 34:
        return <ThirtyFour {...data} />; //dynamic
      case 35:
        return <ThirtyFive {...data} />; //dynamic done
      case 36:
        return <ThirtySix {...data} />;
      case 37:
        return <ThirtySeven {...data} />;
      case 38:
        return <ThirtyEight {...data} />;
      case 39:
        return <ThirtyNine {...data} />;
      case 40:
        return <Template40 {...data} />;
      case 41:
        return <FourOne {...data} />;
      case 42:
        return <FourTwo {...data} />; //dynamic
      case 43:
        return <FourThree {...data} />; //dynamic
      case 44:
        return <Template44 {...data} />;
      case 45:
        return <FourFive {...data} />;
      case 46:
        return <FourSix {...data} />;
      case 47:
        return <FourSeven {...data} />;
      case 48:
        return <FourEight {...data} />;
      case 49:
        return <FourNine {...data} />;
      case 50:
        return <Fifty {...data} />;
      default:
        return null;
    }
  };

  const nextDayOnNextClickHandler = () => {
    //  setDay(day + 1);
    setCurrentDay(currentDay + 1);
    initialFetchTemplateData();
  };

  const previousDayOnNextClickHandler = () => {
    //  setDay(day - 1);
    setCurrentDay(currentDay - 1);
    initialFetchTemplateData();
  };

  const dayCount =
    templateData.length &&
    templateData.map((item) => {
      return item;
    });

  return (
    <>
      <MasterLayout>
        <div className="dashboard-body">
          <div className="container">
            <div className="dashboard-body-inner">
              {/* ***********************************Navbar Start********************** */}
              <div>
                <p style={{color: COLORS.GREEN_TEXT, fontWeight: 'bold'}}>
                  Home /{'  '}
                  <span style={{color: COLORS.GRAY1, fontWeight: 'bold'}}>
                    Week{' '}
                    {/* {props.location.state !== '' &&
                    props.location.state !== undefined
                      ? props.location.state
                      : 1} */}
                    {selectedWeek ? selectedWeek : 1}
                  </span>
                </p>
              </div>

              {/****************************************************************************** */}

              {templateData.length ? (
                <div style={{width: '100%'}}>
                  <Header
                    data={templateData}
                    currentDay={currentDay}
                    onDayChange={(day) => {
                      setCurrentDay(day);
                    }}
                  />
                  <SubHeader
                    data={templateData.filter(
                      (item) => item.day === currentDay,
                    )}
                    onCardChange={(i, id) => {
                      subCardNextPrev(i, id);
                      setSubCardId(id);
                    }}
                    subCardIndex={subCardIndex}
                  />
                </div>
              ) : null}
              {/* ***********************************Navbar End********************** */}

              {/* ******** ************************** Cards Render UI Start********************** */}

              <div style={{width: '100%'}}>
                {subCardOnBasisOfIndexData.card &&
                subCardOnBasisOfIndexData.card.template_data[0] &&
                subCardOnBasisOfIndexData.card.template_data[0].template_number
                  ? generateUI(
                      subCardOnBasisOfIndexData.card.template_data[0]
                        .template_number,
                      subCardOnBasisOfIndexData,
                    )
                  : []}
              </div>

              {/* ******** ************************** Cards Render UI End********************** */}

              {/* ***********************NAVIGATION BACK AND NEXT BUTTON FOR DAYS START**************** */}

              <div className="dashboard-footer-nav">
                <div className="footer-nav-inner">
                  {/*****************************************BOTTOM PREVIOUS BUTTON************* */}
                  <div style={{alignItems: 'flex-end'}}>
                    <div
                      className="footer-nav-left"
                      onClick={() => {
                        subCardNextPrev(subCardIndex - 1, subCardId);
                      }}>
                      {subCardIndex === 0 ? (
                        currentDay === 1 ? null : (
                          <div
                            className="f-nav-link"
                            onClick={() => previousDayOnNextClickHandler()}>
                            <h3> Previous Day</h3>
                          </div>
                        )
                      ) : (
                        <div className="f-nav-link">
                          <h3>{subCardPrevData.card.card_title}</h3>
                          <h6>
                            {subCardPrevData.card.card_time === '1'
                              ? `${subCardPrevData.card.card_time} Minute`
                              : `${subCardPrevData.card.card_time} Minutes`}
                          </h6>
                        </div>
                      )}
                    </div>
                  </div>
                  {/***********************************BOTTOM***NEXT BUTTON************************** */}

                  <div
                    className="footer-nav-right"
                    onClick={() => {
                      console.log('sub card Id>>>on clikc>', subCardId);
                      subCardNextPrev(subCardIndex + 1, subCardId);
                    }}>
                    {subCardIndex === currentTemplateIds.length - 1 ? (
                      dayCount.length > currentDay ? (
                        <div
                          className="f-nav-link"
                          onClick={() => nextDayOnNextClickHandler()}>
                          <h3> Next Day</h3>
                        </div>
                      ) : null
                    ) : (
                      <div>
                        {subCardNextData && subCardNextData.card ? (
                          <div className="f-nav-link">
                            <h3>{subCardNextData.card.card_title}</h3>
                            <h6
                              style={{
                                textAlign: 'right',
                              }}>
                              {subCardNextData.card.card_time === '1'
                                ? `${subCardNextData.card.card_time} Minute`
                                : `${subCardNextData.card.card_time} Minutes`}
                            </h6>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ***********************NAVIGATION BACK AND NEXT BUTTON FOR DAYS END**************** */}
            </div>
          </div>
        </div>
      </MasterLayout>
      <Footer />
    </>
  );
};

export default DailyLearningWeeks;

// const styles = {
//   menuIcon: {
//     position: 'absolute',
//     top: '30%',
//     right: '5%',
//   },
//   outerCircle: {
//     border: '1px solid',
//     height: '20px',
//     width: '20px',
//     borderRadius: '20px',
//     alignItems: 'center',
//     justifyContent: 'center',
//     display: 'flex',
//   },
//   innerCircle: {
//     border: '1px solid',
//     borderColor: COLORS.GREEN_TEXT,
//     height: '12px',
//     width: '12px',
//     borderRadius: '12px',
//   },
//   cardDiv: {
//     display: 'flex',
//     marginTop: '2%',
//     marginBottom: '3%',
//   },
//   daysContainer: {
//     width: '100%',
//     marginTop: '20px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   radioDiv: {
//     marginBottom: '10px',
//     height: '20px',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     display: 'flex',
//   },
// };
