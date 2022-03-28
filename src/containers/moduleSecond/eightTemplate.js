import React, {useState} from 'react';
import bookmark from '../../assets/images/bookmark.svg';
import GLOBALS from '../../constants';
import circleWithPen from '../../assets/images/circleWithPen.svg';
import right from '../../assets/images/right.svg';
import cross from '../../assets/images/cross.svg';
import styles from './styles';

import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const {COLORS} = GLOBALS;
const data = [
  {
    id: 1,
    question: `Can you identify any of the thoughts you had in this situation as negative thoughts?`,
  },
  {
    id: 2,
    question: `Can you remember other situations, where negative thoughts came to you?`,
  },
];
const InputBoxWithContent = (props) => {
  const {title, placeholder, value, onChange, style} = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '30px',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      <div style={style}>
        <p
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            display: 'flex',
            textAlign: 'center',
            color: COLORS.WHITE,
            paddingTop: '30px',
          }}>
          {title}
        </p>
      </div>
      <div style={{width: DEVICE_WIDTH > 767 ? '78%' : '68%'}}>
        <form noValidate>
          <textarea
            type="description"
             value={value}
            onChange={onChange}
            required
            placeholder={placeholder}
            style={{
              backgroundColor: COLORS.LIGHT_GRAY,
              fontStyle: 'italic',
              resize: 'none',
              width: '100%',
              paddingTop: '5px',
              paddingLeft: '5px',
            }}
            rows={3}
          />
        </form>
      </div>
    </div>
  );
};
const EightTemplate = (props) => {
  const [situation, setSituation] = useState('');
  const [emotions, setEmotions] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [behaviour, setBehaviour] = useState('');
  const [selected, setSelected] = useState([]);
  console.log('all>>>>>>', situation, emotions, thoughts, behaviour);

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
            <img src={bookmark} />
            <p
              className="dash-text"
              style={{
                paddingLeft: '40px',
                fontSize: 14,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              {props.data.template_description_two}
            </p>
          </div>
          <InputBoxWithContent
            title={'Situation'}
            placeholder="Where were you? Who was with you? What were you doing?"
            value={situation}
            onChange={(situation) => {
              setSituation(situation.target.value);
            }}
            style={{
              backgroundColor: COLORS.CIRCLE_GRAY,
              width: DEVICE_WIDTH > 767 ? '20%' : '30%',
            }}
          />
          <InputBoxWithContent
            title={'Emotions'}
            placeholder="Anxiety, sadness, anger, frustration, despair,...?"
            value={emotions}
            onChange={(emotions) => {
              setEmotions(emotions.target.value);
            }}
            style={{
              backgroundColor: COLORS.GREEN_TEXT,
              width: DEVICE_WIDTH > 767 ? '20%' : '30%',
            }}
          />
          <InputBoxWithContent
            title={'Thoughts'}
            placeholder="What went through your mind at the time? what kind of thoughts did you have? How did you see yourself at the time? How do you think others saw you? What did that situation mean to you at the time? "
            value={thoughts}
            onChange={(thoughts) => {
              setThoughts(thoughts.target.value);
            }}
            style={{
              backgroundColor: COLORS.YELLOW,
              width: DEVICE_WIDTH > 767 ? '20%' : '30%',
            }}
          />
          <InputBoxWithContent
            title={'Behaviour'}
            placeholder="How did you react to the situation? What did you do? What did you fall to do?"
            value={behaviour}
            onChange={(behaviour) => {
              setBehaviour(behaviour.target.value);
            }}
            style={{
              backgroundColor: COLORS.BUTTON_ORANGE,
              width: DEVICE_WIDTH > 767 ? '20%' : '30%',
            }}
          />
          <div
            style={{
              backgroundColor: '#D7E7ED',
              display: 'flex',
              padding: '20px',
              marginTop: '40px',
            }}>
            <img src={circleWithPen} />
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
                <div style={styles.question}>
                  <p>{item.question}</p>
                  <div
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    <div
                      onClick={() => {
                        updateYESNO({id: item.id, value: 'YES'}, selected);
                      }}
                      style={{
                        backgroundColor: isYES
                          ? COLORS.BUTTON_ORANGE
                          : COLORS.GRAY2,
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
                        updateYESNO({id: item.id, value: 'NO'}, selected);
                      }}
                      style={{
                        backgroundColor: isNO
                          ? COLORS.BUTTON_ORANGE
                          : COLORS.GRAY2,
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
          <div style={{width: '20%'}}>
            <button className="btn-orange" onClick={(e) => onSaveMyths(e)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EightTemplate;
