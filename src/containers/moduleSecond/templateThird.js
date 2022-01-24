import React from 'react';
import thought from '../../assets/images/thought.png';
import GLOBALS from '../../constants';
const {COLORS} = GLOBALS;
const TemplateThird = (props) => {
  return (
    <div className="navcontent">
      <div className="navcontent-wrapper">
        <h2 className="dashboard-heading">{props.data.template_title}</h2>
        <h6 className="dash-time m-b-30">{props.data.template_time}</h6>

        <p className="dash-text-color">{props.data.template_description_one}</p>
        <p className="dash-text">{props.data.template_description_two}</p>
        <div className="dash-icon text-center">
          <p className="dash-text-color">Thoughts</p>
          <p className="dash-text">{props.data.template_description_third}</p>
          <img className="nav-hover" src={thought} />
          <p className="dash-text-color">Emotions</p>
          <p className="dash-text">{props.data.template_description_four}</p>
        </div>
      </div>
    </div>
  );
};

export default TemplateThird;
