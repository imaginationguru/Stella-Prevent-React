import React, {useState, useEffect} from 'react';
import shelja from '@assets/images/shelja.svg';
import GLOBALS from '@constants';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '@actions';
import ExerciseBox from '@components/ExerciseBox';
const {COLORS} = GLOBALS;
const {LIGHT_GRAY} = COLORS;
const TemplateTen = (props) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const {templateData = []} = useSelector((state) => state.moduleOne);
  useEffect(() => {}, []);
  /* 
  onSave function API call for save the data of input field
  */
  const onSave = (e) => {
    e.preventDefault();
    alert(description);
  };

  return (
    <div>
      <h2 className="dashboard-heading">{props.data.template_title}</h2>
      <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
      <div className="dash-icon text-center">
        <img className="nav-hover" src={shelja} />
      </div>
      {/* <p className="dash-text">{props.data.template_userName}</p> */}
      <div
        style={{
          border: '2px solid #66BA58',
          paddingLeft: '20px',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRightWidth: 0,
        }}>
        <p className="dash-text-italic">
          {props.data.template_description_one}
        </p>

        <p className="dash-text-italic">
          {props.data.template_description_two}
        </p>
      </div>
      <form noValidate style={{marginTop: '70px'}}>
        <div className="formRow">
          <div className="w100">
            <div className="formField has-icon">
              <textarea
                type="description"
                className="f-field"
                value={description}
                onChange={(description) => {
                  setDescription(description.target.value);
                }}
                required
                placeholder={props.placeholder}
                style={{
                  backgroundColor: LIGHT_GRAY,
                  fontStyle: 'italic',
                  resize: 'none',
                  paddingTop: '10px',
                }}
              />
            </div>
          </div>
        </div>
      </form>

      <div style={{width: '20%', marginTop: '30px'}}>
        <button className="btn-orange" onClick={(e) => onSave(e)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TemplateTen;
