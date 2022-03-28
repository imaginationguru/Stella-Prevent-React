import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import ExerciseBox from '../../../components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import { Animated } from 'react-animated-css';

import { Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const { COLORS, IMAGE_BASE_URL } = GLOBALS;
const FourSeven = (props) => {
  const {
    card_time,
    card_title,
    content,
    descriptions,
    quotes,
    images,
    week,
    showExercises,
  } = props.card;

  return (
    <>
      {/**********************quotes************** */}
      {quotes && quotes.length
        ? quotes
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, index) => {
            return (
              <CardQuote
                key={index}
                quote={item.quote.length ? ReactHtmlParser(item.quote) : []}
              />
            );
          })
        : []}
      <CardTitle title={ReactHtmlParser(card_title)} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} Minute` : `${card_time} Minutes`
        }
      />



      {/**********************Images********************** */}
      <div style={styles.imageView}>
        {images && images.length
          ? images
            .filter((item) => item.image_type === 'first')
            .map((item, index) => {
              return (
                <CustomImage
                  key={index}
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  style={{
                    display: item.image !== '' ? 'flex' : 'none',
                  }}
                  isVisible={true}
                  animationIn={'fadeInLeft'}
                />
              );
            })
          : []}

        {/********************************content******************* */}

        {props.assessments.length
          ? props.assessments
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  description={ReactHtmlParser(item.description)}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                  style={{ paddingLeft: '40px' }}
                />
              );
            })
          : []}
      </div>

      {images && images.length
        ? images
          .filter((item) => item.image_type === 'second')
          .map((item, index) => {
            return (
              <CustomImage
                key={index}
                src={`${IMAGE_BASE_URL}${item.image}`}
                style={{
                  display: item.image !== '' ? 'flex' : 'none',
                }}
                isVisible={true}
                animationIn={'fadeInLeft'}
              />
            );
          })
        : []}

      {/********************************content ******************* */}
      <Animated isVisible={true} animationIn={'fadeInUp'}>
        <div style={styles.contentView}>
          {content && content.length
            ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, i) => {
                return (
                  <CardContent
                    key={i}
                    content={ReactHtmlParser(item.content)}
                  />
                );
              })
            : []}
        </div>
      </Animated>
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default FourSeven;

const styles = {
  contentView: {
    border: '2px solid #F08B22',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    paddingLeft: '15px',
  },
  descView: {
    width: DEVICE_WIDTH > 767 ? '70%' : '100%',
    border: '2px solid #F08B22',
    padding: '20px',
    borderRadius: '5px',
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
  },
};
