import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import ExerciseBox from '@components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';

import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const {IMAGE_BASE_URL} = GLOBALS;
const TwentyFour = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
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

      {/**********************description************** */}
      {descriptions && descriptions.length
        ? descriptions
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  description={ReactHtmlParser(item.desc)}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : []}

      {/**********************Images************** */}
      {images && images.length
        ? images
            .filter((item) => {
              return item.image_type === 'first';
            })
            .map((item) => {
              return (
                <div
                  style={{
                    height: DEVICE_WIDTH > 767 ? '400px' : '230px',
                    marginBottom: '60px',
                  }}>
                  <CustomImage
                    imageSize={item.imageSize}
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      ...styles.bigImage,
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                    isVisible={true}
                    animationIn={'fadeInUp'}
                  />
                  <p
                    style={{
                      textAlign: 'center',
                      marginBottom: '60px',
                    }}>
                    {item.description}
                  </p>
                </div>
              );
            })
        : null}

      {images && images.length
        ? images
            .filter((item) => {
              return item.image_type === 'second';
            })
            .map((item) => {
              return (
                <CustomImage
                  imageSize={item.imageSize}
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  style={{
                    display: item.image !== '' ? 'flex' : 'none',
                  }}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : null}

      {/**********************content************** */}
      <div style={{marginTop: '20px'}}>
        {content && content.length
          ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, index) => {
                return (
                  <CardContent
                    key={index}
                    content={ReactHtmlParser(item.content)}
                    isVisible={true}
                    animationIn={'fadeInUp'}
                  />
                );
              })
          : []}
      </div>
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TwentyFour;
const styles = {
  bigImage: {
    width: DEVICE_WIDTH > 767 ? '60%' : '100%',
    height: DEVICE_WIDTH > 767 ? '400px' : '230px',
    margin: '0 auto',
    marginBottom: '40px',
  },
};
