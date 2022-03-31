import React, { useState } from 'react';
import star from '../../assets/images/star.svg';
import right from '../../assets/images/right.svg';
import cross from '../../assets/images/cross.svg';
import commonStyles from '../dailyLearningWeeks/commonStyles';
import GLOBALS from '../../constants';
const { COLORS } = GLOBALS;
const { CIRCLE_GRAY, BOX_GRAY, GRAY2, BUTTON_ORANGE } = COLORS;
const data = [
  {
    id: 1,
    question: `Do you feel that the information in this module made sense to you?`,
  },
  {
    id: 2,
    question: `Do you feel you have understood the information in this module well?`,
  },
  {
    id: 3,
    question: `Have you been able to apply the strategies and activities that we talked about in the previous modules, in your day-to-day?`,
  },
  {
    id: 4,
    question: `Do you feel that daily strategies / activities could be useful in your day-to-day?`,
  },
];
const ThirtyTwo = (props) => {
  const [selected, setSelected] = useState([]);

  const updateYESNO = (data = {}, arr = []) => {
    if (arr.length) {
      const isAlready = arr.find((item) => item.id === data.id) ? true : false;
      if (isAlready) {
        const isSameValue = arr.find(
          (item) => item.id === data.id && item.value === data.value,
        )
          ? true
          : false;
        if (isSameValue) {
          setSelected(arr.filter((item) => item.id !== data.id));
        } else {
          setSelected(
            arr.map((item) => {
              return {
                ...item,
                value: item.id === data.id ? data.value : item.value,
              };
            }),
          );
        }
      } else {
        setSelected([...arr, data]);
      }
    } else {
      setSelected([data]);
    }
  };

  const onSaveMyths = (e) => {
    e.preventDefault();

  };
  return (
    <div className="navcontent">
      <div className="navcontent-wrapper">
        <h2 className="dashboard-heading">{props.data.template_title}</h2>
        <h6 className="dash-time m-b-30">{props.data.template_time}</h6>
        <div>
          <p className="dash-text-color" style={{ textAlign: 'right' }}>
            {props.data.template_description_one}
          </p>

          <div
            style={{
              backgroundColor: BOX_GRAY,
              display: 'flex',
              padding: '20px',
            }}>
            <img src={star} />

            <p
              className="dash-text"
              style={{
                paddingLeft: DEVICE_WIDTH > 767 ? '40px' : '0',
                fontSize: 14,
                alignSelf: 'center',
              }}>
              {props.data.template_description_two}
            </p>
          </div>

          {data.length &&
            data.map((item) => {
              const isYES =
                selected && selected.length
                  ? selected.find((val) => {
                    return val.id === item.id && val.value === 'YES';
                  })
                    ? true
                    : false
                  : false;
              const isNO =
                selected && selected.length
                  ? selected.find(
                    (val) => val.id === item.id && val.value === 'NO',
                  )
                    ? true
                    : false
                  : false;
              return (
                <div style={commonStyles.question}>
                  <p>{item.question}</p>
                  <div
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    <div
                      onClick={() => {
                        updateYESNO({ id: item.id, value: 'YES' }, selected);
                      }}
                      style={{
                        backgroundColor: isYES ? BUTTON_ORANGE : GRAY2,
                        padding: '10px',
                        width: '35px',
                        height: '35px',
                        boxSizing: 'border-box',
                        borderRadius: '50%',
                        minWidth: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <img src={right} />
                    </div>
                    <div
                      onClick={() => {
                        updateYESNO({ id: item.id, value: 'NO' }, selected);
                      }}
                      style={{
                        backgroundColor: isNO ? BUTTON_ORANGE : GRAY2,
                        padding: '10px',
                        width: '35px',
                        height: '35px',
                        boxSizing: 'border-box',
                        borderRadius: '50%',
                        minWidth: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '25px',
                      }}>
                      <img src={cross} />
                    </div>
                  </div>
                </div>
              );
            })}
          <div style={{ width: '20%' }}>
            <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirtyTwo;
