/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import GLOBALS from '../../constants';
import { styles } from './styles';
const { GREEN_TEXT, BORDER_GRAY, WHITE, CIRCLE_GRAY, GRAY } = GLOBALS.COLORS;

export const Header = ({
  data = [],
  currentDay = 1,
  onDayChange,
  isDisabled,
}) => {
  const newData = data.length
    ? data.map((val) => {
      return {
        ...val,
        isDisabled: isDisabled.length
          ? isDisabled.find((e) => e.day === val.day).isDisabled
          : false,
      };
    })
    : [];

  return (
    <div className="row" style={styles.daysContainer}>
      {newData.length
        ? newData.map((item, index) => {
          const { day, isDisabled } = item;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onDayChange(day);
              }}>
              <span style={styles.radioDiv}>
                <span
                  style={{
                    ...styles.outerCircle,
                    borderColor:
                      day === currentDay ? GREEN_TEXT : BORDER_GRAY,
                  }}>
                  {day === currentDay && (
                    <div
                      style={{
                        ...styles.innerCircle,
                        backgroundColor:
                          day === currentDay ? GREEN_TEXT : WHITE,
                      }}
                    />
                  )}
                </span>
              </span>
              <p
                className="tabDayData"
                style={{
                  borderColor: day === currentDay ? GREEN_TEXT : BORDER_GRAY,
                  color:
                    day === currentDay
                      ? GREEN_TEXT
                      : isDisabled
                        ? GRAY
                        : CIRCLE_GRAY,
                }}>
                {`Day ${day}`}
              </p>
            </TouchableOpacity>
          );
        })
        : null}
    </div>
  );
};

export const SubHeader = ({
  data = [],
  cardNumber,
  onCardChange,
  style,
  isDisabled,
}) => {
  const newData =
    data.length && data[0].cards.length
      ? data[0].cards
        .sort((a, b) => (a.card.card_number > b.card.card_number && 1) || -1)
        .map((val) => {
          return {
            ...val,
            isCompleted: isDisabled.length
              ? isDisabled.find((e) => e.card === val._id).isCompleted
              : false,
          };
        })
      : [];

  return (
    <div style={styles.cardDiv} className="btn-nav-wrapper">
      {newData.length
        ? newData.map((val, index) => {
          return (
            <button
              key={index}
              className="navbutton"
              style={{
                ...style,
                backgroundColor:
                  val.card_number === cardNumber
                    ? '#006f59'
                    : val.isCompleted || val.card_number < cardNumber
                      ? WHITE
                      : BORDER_GRAY,
                marginRight: '3%',
              }}
              onClick={() => {
                onCardChange(val._id);
              }}>
              {`${index + 1}`}
            </button>
          );
        })
        : null}
    </div>
  );
};

const CombineHeader = () => {
  return (
    <>
      <Header />
      <SubHeader />
    </>
  );
};

export default CombineHeader;
