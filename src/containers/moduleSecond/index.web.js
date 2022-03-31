/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import MasterLayout from '../../components/MasterLayout';
import header from '../../assets/images/header.png';
import Footer from '../../components/Footer';
import commonStyles from '../dailyLearningWeeks/commonStyles';
import TemplateOne from './templateOne';
 import dummyData from './dummyData';
import menu from '../../assets/images/menu.svg';
import GLOBALS from '../../constants';
import {navigatorPush} from '../../config/navigationOptions.web';
import Menu from '../../components/Menu';
import TemplateThird from './templateThird';
import TemplateTen from '../dailyLearningWeeks/template/templateTen';
 import EightTemplate from './eightTemplate';
import TemplateThermometer from '../dailyLearningWeeks/template/templateThermometer';
 import TemplateNineteen from './templateNineteen';
import t21 from '../../assets/images/t21.svg';
import t22 from '../../assets/images/t22.svg';
import t23 from '../../assets/images/t23.svg';
import t24 from '../../assets/images/t24.svg';
 import TwentyOne from './twentyOne';
import Congratulation from '../dailyLearningWeeks/template/congratulation';
import ThirtyTwo from './thirtyTwo';
import TemplateSix from '../dailyLearningWeeks/template/templateSix';
import CompareTemplate from './compareTemplate';
import ModuleFourTemplate from '../moduleThird/moduleFourTemplate';
import TemplateEleven from '../moduleThird/template11';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../actions';
const {COLORS} = GLOBALS;
const ModuleSecond = (componentId) => {
  const [active, setActive] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const {isDashboardModal} = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const generateUI = (status) => {
    let uiProps = dummyData.find(
      (item) => Number(item.template_id) === status + 1,
    );
    switch (status) {
      case 0:
        return <TemplateOne data={uiProps} />;
       case 2:
        return <TemplateThird data={uiProps} />;
      case 3:
        return (
          <TemplateTen
            data={uiProps}
            placeholder={
              'Write down the thoughts, images or emotions that came to you '
            }
          />
        );
       case 6:
        return <CompareTemplate data={uiProps} />;
      case 7:
        return <EightTemplate data={uiProps} />;
       case 10:
        return <TemplateNineteen data={uiProps} isInput={true} />;
       case 12:
        return <TemplateNineteen data={uiProps} />;
      case 13:
        return (
          <TemplateTen
            data={uiProps}
            placeholder={'Describe the situation here...'}
          />
        );
       case 15:
        return <TemplateNineteen data={uiProps} />;
      case 16:
        return <TemplateNineteen data={uiProps} />;
       
        
      case 20:
        return <TwentyOne data={uiProps} />;
      case 21:
        return <TemplateNineteen data={uiProps} />;
      case 22:
        return <TemplateNineteen data={uiProps} />;
      case 23:
        return <ModuleFourTemplate data={uiProps} />;
      case 24:
        return <TemplateNineteen data={uiProps} />;
      case 25:
        return <TemplateNineteen data={uiProps} />;
      case 26:
        return <TemplateNineteen data={uiProps} />;
      case 27:
        return <TemplateEleven data={uiProps} />;
      case 28:
        return <TemplateNineteen data={uiProps} />;
      case 29:
        return <TemplateNineteen data={uiProps} />;
       case 31:
        return <ThirtyTwo data={uiProps} />;
      // case 32:
      //   return <Congratulation data={uiProps} />;

      default:
        return null;
    }
  };

  return (
    <>
      <MasterLayout>
        <div className="wrapper">
          
          
          <div className="dashboard-body">
            <div className="container">
              <div className="dashboard-body-inner">
                {/* ***********************************NAVBAR********************** */}

                <div style={commonStyles.tabBar}>
                  {dummyData.length &&
                    dummyData
                      .filter((item, index) => {
                        return index >= active && index <= active + 10;
                      })
                      .map((item, index) => {
                        const isActive = index === 0 ? true : false;

                        return (
                          <button
                            className="navbutton "
                            style={{
                              backgroundColor: isActive ? '#006f59' : 'white',
                             }}>
                            {item.template_icon === null ? (
                              item.template_id
                            ) : (
                              <img src={item.template_icon} />
                            )}
                          </button>
                        );
                      })}
                </div>

                {/* ********************************** CONTENT********************** */}

                {generateUI(active)}

                {/* ***********************BACK AND NEXT BUTTON**************** */}

                <div className="dashboard-footer-nav">
                  <div className="footer-nav-inner">
                    <div style={{alignItems: 'flex-end'}}>
                      {active > 0 && (
                        <div
                          className="footer-nav-left"
                          onClick={() => {
                            setActive(active - 1);
                          }}>
                          <div className="f-nav-link">
                            <h3>{dummyData[active - 1].template_title}</h3>
                            <h6>
                              {dummyData[active - 1].template_time
                                ? dummyData[active - 1].template_time
                                : dummyData[active - 1].template_name}
                            </h6>
                          </div>
                        </div>
                      )}
                    </div>
                    {dummyData.length - 1 !== active ? (
                      <div
                        className="footer-nav-right"
                        onClick={() => {
                          setActive(active + 1);
                        }}>
                        <div className="f-nav-link">
                          <h3>{dummyData[active + 1].template_title}</h3>
                          <h6>
                            {dummyData[active + 1].template_time
                              ? dummyData[active + 1].template_time
                              : dummyData[active + 1].template_name}
                          </h6>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>     
       
      </MasterLayout>
      <Footer />
    </>
  );
};

export default ModuleSecond;

 
 
