import React, { useState } from 'react';
import GLOBALS from '../../constants';
import styles from './styles';
import compass1 from '../../assets/images/compass1.svg';

import { Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const { COLORS } = GLOBALS;

const InputBoxWithContent = (props) => {
  const { title, placeholder, value, onChange, style } = props;
  return (
    <div style={styles.inputBoxStyle}>
      <div style={style}>
        <p style={styles.leftTitle}>{title}</p>
      </div>
      <div style={{ width: '78%' }}>
        <form noValidate>
          <textarea
            type="description"
            // className="f-field"
            value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
            style={styles.rightTextArea}
            rows={3}
          />
        </form>
      </div>
    </div>
  );
};
const TemplateEleven = (props) => {
  const [myBehaviours, setMyBehaviours] = useState('');
  const [myValues, setMyValues] = useState('');


  const onSaveMyths = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="navcontent">
        <div className="navcontent-wrapper">
          <h2 className="dashboard-heading">{props.data.template_title}</h2>
          <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
          <p className="dash-text-shadow">{props.data.template_userName}</p>
          <p className="dash-text">{props.data.template_description_one}</p>
          <div
            style={{
              backgroundColor: '#D7E7ED',
              display: 'flex',
              padding: '20px',
            }}>
            <div
              style={{
                backgroundColor: COLORS.CIRCLE_GRAY,
                padding: '20px',
                borderRadius: '50px',
              }}>
              <img src={compass1} />
            </div>
            <p
              className="dash-text"
              style={{
                paddingLeft: DEVICE_WIDTH > 767 ? '40px' : '0',
                fontSize: 14,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              {props.data.template_description_two}
            </p>
          </div>
          <div style={styles.inputBoxStyle}>
            <div
              style={{
                width: DEVICE_WIDTH > 767 ? '20%' : '30%',
                backgroundColor: COLORS.YELLOW,

                borderRadius: '5px',
              }}>
              <p
                style={{
                  textAlign: 'center',
                  color: COLORS.WHITE,
                  paddingTop: '10px',
                }}>
                Living area
              </p>
            </div>
            <div
              style={{
                width: DEVICE_WIDTH > 767 ? '78%' : '68%',
                backgroundColor: COLORS.YELLOW,
                borderRadius: '5px',
              }}>
              <p
                style={{
                  textAlign: 'center',
                  color: COLORS.WHITE,
                  paddingTop: '10px',
                }}>
                Parenting
              </p>
            </div>
          </div>
          <InputBoxWithContent
            title={'My Values'}
            placeholder="What is important to me?  What mother would you like to be for my son?  What characteristics would you like to have?  What kind of relationship would you like to build with my child?"
            value={myValues}
            onChange={(myValues) => {
              setMyValues(myValues.target.value);
            }}
            style={{ backgroundColor: COLORS.CIRCLE_GRAY, width: '20%' }}
          />
          <InputBoxWithContent
            title={'My Behaviours'}
            placeholder="What behaviors can I have, in my day-to-day life, to act according to what is truly important to me?"
            value={myBehaviours}
            onChange={(myBehaviours) => {
              setMyBehaviours(myBehaviours.target.value);
            }}
            style={{ backgroundColor: COLORS.CIRCLE_GRAY, width: '20%' }}
          />

          <div style={{ width: '20%', marginTop: '30px' }}>
            <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TemplateEleven;
