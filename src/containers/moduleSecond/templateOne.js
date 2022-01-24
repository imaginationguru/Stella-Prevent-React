import React from 'react';
import shelja from '../../assets/images/shelja.svg';
import GLOBALS from '../../constants';
const {COLORS} = GLOBALS;
const TemplateOne = (props) => {
  return (
    <>
      <h2 className="dashboard-heading">{props.data.template_title}</h2>
      <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
      <div className="dash-icon text-center">
        <img className="nav-hover" src={shelja} />
      </div>

      <div
        style={{
          border: '2px solid',
          marginTop: '40px',
          paddingLeft: '20px',
          borderTop: '0px',
          borderRight: '0px',
          borderBottom: '0px',
          borderColor: COLORS.BUTTON_ORANGE,
        }}>
        <p className="dash-text-shadow">{props.data.template_userName}</p>
        <p className="dash-text-shadow">
          {props.data.template_description_one}
        </p>
        <p className="dash-text">{props.data.template_description_two}</p>

        <ul>
          <li className="dash-text">{props.data.template_description_third}</li>
          <li className="dash-text">{props.data.template_description_four}</li>
          <li className="dash-text">{props.data.template_description_five}</li>
        </ul>
        <p className="dash-text">{props.data.template_description_six}</p>
        <p className="dash-text">{props.data.template_description_seven}</p>
      </div>
    </>
  );
};

export default TemplateOne;
