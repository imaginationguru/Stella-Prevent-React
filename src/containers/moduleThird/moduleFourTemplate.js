import React, {useState} from 'react';
import GLOBALS from '../../constants';
import styles from './styles';
import squareCheckCircle from '../../assets/images/squareCheckCircle.svg';
const {COLORS} = GLOBALS;
import right from '../../assets/images/right.svg';
const quesData = [
  {
    id: 1,
    value:
      'I tend to spend a lot of time in my day trying to put unpleasant thoughts and emotions out of my head.',
    selectedStatus: null,
  },
  {
    id: 2,
    value:
      'I tend to spend a lot of time in my day thinking because I do not feel as good as I would like to feel, at this stage of my life.',
    selectedStatus: null,
  },
  {
    id: 3,
    value:
      'I avoid dealing with a problem that may arise (for example, an unexpected bill to pay), for fear of not being able to solve it.',
    selectedStatus: null,
  },
  {
    id: 4,
    value:
      'I avoid talking to my partner or my family about things that are important to me, for fear of creating conflict.',
    selectedStatus: null,
  },
  {
    id: 5,
    value:
      'I avoid doing new things (for example, going out alone with my son; leaving my son a little bit in the care of my mother), for fear of not feeling well doing it.',
    selectedStatus: null,
  },
];

const optionsData = [
  {
    id: 1,
    value: 'Never',
  },
  {
    id: 2,
    value: 'Sometimes',
  },
  {
    id: 3,
    value: 'Oftentimes',
  },
];

const generateDynamicColor = (val) => {
  if (val === 1) {
    return COLORS.GREEN_TEXT;
  }
  if (val === 2) {
    return COLORS.YELLOW;
  }
  if (val === 3) {
    return COLORS.CIRCLE_GRAY;
  }
};
const ModuleFourTemplate = (props) => {
  const [ques, setQues] = useState(quesData);
  const onSelectionHandler = (qId, val) => {
    if (ques.length) {
      let temp = ques.map((item) => {
        return {
          ...item,
          selectedStatus: item.id === qId ? val.id : item.selectedStatus,
        };
      });
      setQues(temp);
    }
  };

  const onSubmit = () => {
    console.log('submit>>>>>>>', ques);
  };
  return (
    <div>
      <div className="navcontent">
        <div className="navcontent-wrapper">
          <h2 className="dashboard-heading">{props.data.template_title}</h2>
          <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
          <p className="dash-text-shadow">{props.data.template_userName}</p>
          <p className="dash-text-color" style={{textAlign: 'center'}}>
            {props.data.template_description_one}
          </p>
          <div
            style={{
              backgroundColor: '#D7E7ED',
              display: 'flex',
              padding: '20px',
            }}>
            <img src={squareCheckCircle} />
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

          <div
            className="row container"
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              marginTop: '60px',
            }}>
            <div className="col-md-7 sm-7 col-7"></div>
            {optionsData.length &&
              optionsData.map((item) => {
                return (
                  <div
                    className="col-md-1 sm-1 col-1"
                    style={{
                      borderRadius: '3px',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: generateDynamicColor(item.id),
                    }}>
                    <p
                      style={{
                        color: COLORS.WHITE,
                        paddingTop: '10px',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}>
                      {item.value}
                    </p>
                  </div>
                );
              })}
          </div>

          {ques.length &&
            ques.map((item) => {
              return (
                <div
                  className="row container"
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}>
                  <div
                    className="col-md-7 sm-7 col-7"
                    style={{
                      border: '2px solid #D8D8D8',
                      borderRadius: '3px',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                    }}>
                    {item.value}
                  </div>
                  {optionsData.length &&
                    optionsData.map((val) => {
                      const isSelected = item.selectedStatus === val.id;
                      return (
                        <div
                          className="col-md-1 sm-1 col-1"
                          style={{
                            border: '2px solid',
                            borderColor: generateDynamicColor(val.id),
                            borderRadius: '3px',
                            backgroundColor: isSelected
                              ? generateDynamicColor(val.id)
                              : '#fff',
                          }}
                          onClick={() => onSelectionHandler(item.id, val)}>
                          <p
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}>
                            {isSelected ? (
                              <img
                                src={right}
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  marginTop: '15px',
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </p>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          <div style={{width: '20%'}}>
            <button className="btn-orange" onClick={(e) => onSubmit()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModuleFourTemplate;
