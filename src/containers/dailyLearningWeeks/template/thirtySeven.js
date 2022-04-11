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
  OldCustomImage,
} from '@components/Cards';
import {Animated} from 'react-animated-css';
const {IMAGE_BASE_URL} = GLOBALS;
const ThirtySeven = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    showExercises,
    week,
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

      {images && images.length
        ? images
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, i) => {
              return (
                <Animated isVisible={true} animationIn={'fadeInUp'}>
                  <div style={styles.wrapper} key={i}>
                    <OldCustomImage
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      style={{
                        ...styles.customImageStyle,
                        display: item.image !== '' ? 'flex' : 'none',
                      }}
                    />
                    <CardDescription
                      style={styles.descStyle}
                      description={ReactHtmlParser(item.description)}
                    />
                  </div>
                </Animated>
              );
            })
        : null}

      {/**********************content************** */}

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
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default ThirtySeven;
const styles = {
  wrapper: {
    display: 'flex',
    marginTop: '10px',
  },
  customImageStyle: {
    width: '180px',
    height: '180px',
    marginLeft: '0',
    flexDirection: 'column',
  },
  descStyle: {
    marginTop: '23px',
    marginLeft: '50px',
  },
};
