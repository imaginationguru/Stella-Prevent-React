import React from 'react';
import thoughts1 from '../../assets/images/thoughts1.png';
import GLOBALS from '../../constants';
import styles from './styles';
const {COLORS} = GLOBALS;
const CompareTemplate = (props) => {
  return (
    <div className="navcontent">
      <div className="navcontent-wrapper">
        <h2 className="dashboard-heading">{props.data.template_title}</h2>
        <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
        <p className="dash-text-shadow">{props.data.template_userName}</p>
        <p className="dash-text">{props.data.template_description_one}</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '40px',
            marginTop: '40px',
          }}>
          <div style={styles.thoughtsBox}>
            <div className="dash-icon text-center">
              <img className="nav-hover" src={thoughts1} />
              <p style={{color: COLORS.GREEN_TEXT, paddingTop: '20px'}}>
                Useful Thoughts
              </p>
            </div>
            {/* <p className="dash-text">{props.data.template_description_two}</p> */}
            <ul className="dash-text-italic">
              <li style={{paddingBottom: '15px'}}>
                Help find solutions to concrete problems
              </li>
              <li style={{paddingBottom: '15px'}}>
                They help "do what needs to be done" - motivate us to act
              </li>
              <li style={{paddingBottom: '15px'}}>
                They are associated with constructive feelings: being able to
                plan the future step by step and to learn from past experiences
              </li>
            </ul>
          </div>
          <div style={styles.thoughtsBox}>
            <div className="dash-icon text-center">
              <img className="nav-hover" src={thoughts1} />
              <p style={{color: COLORS.YELLOW, paddingTop: '20px'}}>
                Negative Thoughts
              </p>
            </div>
            {/* <p className="dash-text">{props.data.template_description_third}</p> */}
            <ul className="dash-text-italic">
              <li style={{paddingBottom: '15px'}}>
                Create "stories about what's happening" that are not based on
                real facts
              </li>
              <li style={{paddingBottom: '15px'}}>
                They do not help "do what needs to be done" - they block us
              </li>
              <li style={{paddingBottom: '15px'}}>
                They are associated with destructive and devaluing feelings
              </li>
            </ul>
          </div>
        </div>
        <p className="dash-text">{props.data.template_description_fourth}</p>
      </div>
    </div>
  );
};
export default CompareTemplate;
