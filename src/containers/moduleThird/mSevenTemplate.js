import React from 'react';
import v1 from '../../assets/images/v1.svg';
import v2 from '../../assets/images/v2.svg';
import v3 from '../../assets/images/v3.svg';
import v4 from '../../assets/images/v4.svg';
import styles from './styles';
const MSevenTemplate = (props) => {
  return (
    <div className="navcontent">
      <div className="navcontent-wrapper">
        <h2 className="dashboard-heading">{props.data.template_title}</h2>
        <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
        <p className="dash-text">{props.data.template_userName}</p>
        <p className="dash-text-color" style={{textAlign: 'center'}}>
          {props.data.template_description_one}
        </p>

        <p className="dash-text">{props.data.template_description_two}</p>
        <p className="dash-text-color" style={{textAlign: 'center'}}>
          {props.data.template_description_third}
        </p>
        <div
          style={{
            marginBottom: '20px',
            marginTop: '60px',
          }}>
          <div
            className="dash-icon"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <div style={styles.imageWidth}>
              <div style={{textAlign: 'center'}}>
                <img className="nav-hover" src={v1} />
              </div>
              <p style={styles.subTitle}>
                They are what give my life meaning. What is truly important to
                me.
              </p>
            </div>
            <div style={styles.imageWidth}>
              <div style={{textAlign: 'center'}}>
                <img className="nav-hover" src={v2} />
              </div>
              <p style={styles.subTitle}>
                They are the direction I want to take in my life.
              </p>
            </div>
            <div style={styles.imageWidth}>
              <div style={{textAlign: 'center'}}>
                <img className="nav-hover" src={v3} />
              </div>
              <p style={styles.subTitle}>
                These are characteristics that I want to be present in my
                actions.
              </p>
            </div>
          </div>
          <div className="dash-icon text-center">
            <img className="nav-hover" src={v4} />
            <p style={styles.subTitle}>
              They are a kind of compass that guides our behavior and helps us
              to focus on what is important for our life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSevenTemplate;
