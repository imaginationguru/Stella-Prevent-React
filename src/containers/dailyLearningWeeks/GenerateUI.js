import React, {useEffect} from 'react';
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
import Thirty from './template/thirty';
import ThirtyOne from './template/thirtyOne';
import ThirtyTwo from './template/thirtyTwo';
import ThirtyThree from './template/thirtyThree';
import ThirtyFour from './template/thirtyFour';
import ThirtyFive from './template/thirtyFive';
import ThirtySix from './template/thirtySix';
import ThirtySeven from './template/thirtySeven';
import ThirtyEight from './template/thirtyEight';
import ThirtyNine from './template/thirtyNine';
import Template40 from './template/fourty';
import FourOne from './template/fourOne';
import FourTwo from './template/fourTwo';
import FourThree from './template/fourThree';
import Template44 from './template/fourfour';
import FourFive from './template/fourFive';
import FourSix from './template/fourSix';
import FourSeven from './template/fourSeven';
import {useDispatch} from 'react-redux';
import * as AppActions from '@actions';
const GenerateUI = ({status, data = {}}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let readParams = {
      id: data._id,
      user_id: data.user_id,
      is_last_week: data.is_last_week.toString(),
      is_last_day: data.is_last_day.toString(),
      week: data.week,
      day: data.day,
    };
    if (data._id) {
      if (data.is_read) {
      } else {
        dispatch(AppActions.markRead(readParams, data.week));
      }
    }
  }, [data._id]);

  //return <FourSeven {...data} />

  switch (status) {
    case 1:
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
    default:
      return <></>;
  }
};

export default GenerateUI;
