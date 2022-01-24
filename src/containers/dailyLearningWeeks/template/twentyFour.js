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
                <CustomImage
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  style={{
                    ...styles.bigImage,
                    display: item.image !== '' ? 'flex' : 'none',
                  }}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
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

export default TwentyFour;
const styles = {
  bigImage: {
    //width: '680px',
    width: '60%',
    height: '380px',
    margin: '0 auto',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // display: 'flex',
    marginBottom: '40px',
    // border: '1px solid red',
  },
};
