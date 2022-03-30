import React, { useState } from 'react';
import shelja from '../../assets/images/shelja.svg';
const TemplateNineteen = (props) => {
  const { isInput } = props;
  const [strategies, setStrategies] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    setStrategies('');
  };
  return (
    <div className="navcontent">
      <div className="navcontent-wrapper">
        <h2 className="dashboard-heading">{props.data.template_title}</h2>
        <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
        <p
          className="dash-text-color"
          style={{ textAlign: 'center', fontSize: '20px', marginBottom: '20px' }}>
          {props.data.template_description_one}
        </p>
        <p className="dash-text-italic">
          {props.data.template_description_two}
        </p>

        <div className="dash-icon text-center">
          <img className="nav-hover" src={shelja} />
        </div>
        <div
          style={{
            border: '2px solid #F08B22',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            paddingLeft: '15px',
          }}>
          <p className="dash-text-italic">
            {props.data.template_description_third}
          </p>
          <p className="dash-text-italic">
            {props.data.template_description_fourth}
          </p>
          <p className="dash-text-italic">
            {props.data.template_description_five}
          </p>
          <p>{props.data.template_description_six}</p>
        </div>
        {isInput && (
          <>
            <div style={{ marginTop: '30px' }}>
              <form noValidate style={{ marginTop: '70px' }}>
                <div className="formRow">
                  <div className="w100">
                    <div className="formField has-icon">
                      <textarea
                        type="description"
                        className="f-field"
                        value={strategies}
                        onChange={(strategies) => {
                          setStrategies(strategies.target.value);
                        }}
                        required
                        placeholder="Write your message here..."
                        style={{
                          backgroundColor: '#F1F3FA',
                          fontStyle: 'italic',
                          resize: 'none',
                          paddingTop: '10px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div style={{ width: '20%' }}>
              <button className="btn-orange" onClick={(e) => onSubmit(e)}>
                SEND
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateNineteen;
