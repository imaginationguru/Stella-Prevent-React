/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import MasterLayout from '../../components/MasterLayout';
import header from '../../assets/images/header.png';
import Footer from '../../components/Footer';
import commonStyles from '../dailyLearningWeeks/commonStyles';
import TemplateOne from '../moduleSecond/templateOne';
import dummyData from './dummyData';
import menu from '../../assets/images/menu.svg';
import GLOBALS from '../../constants';
import { navigatorPush } from '../../config/navigationOptions.web';
import Menu from '../../components/Menu';
import ModuleFourTemplate from './moduleFourTemplate';
import TemplateNineteen from '../moduleSecond/templateNineteen';
import TemplateTen from '../dailyLearningWeeks/template/templateTen';
import MSevenTemplate from './mSevenTemplate';
import TemplateNine from '../dailyLearningWeeks/template/templateEight';
import TemplateEleven from './template11';
import { translate as ts } from '@i18n/translate';

const { COLORS } = GLOBALS;
const ModuleSecond = (componentId) => {
  const [active, setActive] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const generateUI = (status) => {
    let uiProps = dummyData.find(
      (item) => Number(item.template_id) === status + 1,
    );
    switch (status) {
      case 0:
        return <TemplateOne data={uiProps} />;
      case 2:
        return <TemplateNineteen data={uiProps} />;
      case 3:
        return <ModuleFourTemplate data={uiProps} />;
      case 5:
        return (
          <TemplateTen
            data={uiProps}
            placeholder="Describe the strategies you have used to deal with unpleasant thoughts or emotions and what are their results"
          />
        );
      case 6:
        return <MSevenTemplate data={uiProps} />;
      case 7:
        return <MSevenTemplate data={uiProps} />;
      // case 8:
      //   return <TemplateEight data={uiProps} />;
      case 9:
        return <TemplateNine data={uiProps} />;
      case 10:
        return <TemplateEleven data={uiProps} />;
      case 11:
        return (
          <TemplateTen
            data={uiProps}
            placeholder="Write down the behaviors you may have in your day-to-day life that demonstrate what is important to you as a mother."
          />
        );
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

                <div>
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
                </div>

                {/* ********************************** CONTENT********************** */}

                {generateUI(active)}

                {/* ***********************BACK AND NEXT BUTTON**************** */}

                <div className="dashboard-footer-nav">
                  <div className="footer-nav-inner">
                    <div style={{ alignItems: 'flex-end' }}>
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
                    {dummyData.length - 1 !== active && (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              ts("ModalClosed")
              // alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <Menu
              modalVisible={() => setModalVisible(false)}
              onNavigateModuleOne={() =>
                navigatorPush({ componentId, screenName: 'DailyLearningWeeks' })
              }
              onNavigateModuleSecond={() =>
                navigatorPush({ componentId, screenName: 'ModuleSecond' })
              }
              onNavigateModuleThird={() => setModalVisible(false)}
            />
          </Modal>
        )}
      </MasterLayout>
      <Footer />
    </>
  );
};

export default ModuleSecond;
