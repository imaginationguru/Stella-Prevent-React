import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import commonStyles from '../commonStyles';
import ExerciseBox from '@components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
const {IMAGE_BASE_URL} = GLOBALS;
const TemplateFour = (props) => {
  const {
    card_title,
    card_time,
    descriptions,
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

      {/*****************************DESCRIPTION********************** */}
      <div style={commonStyles.descFive}>
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
      </div>
      {/**************************IMAGES********************* */}

      <div style={commonStyles.cardFiveImageDiv}>
        {images && images.length
          ? images
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, index) => {
                return (
                  <CustomImage
                    key={index}
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      ...commonStyles.imageSize,
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                    isVisible={true}
                    animationIn={'fadeInUp'}
                  />
                );
              })
          : []}
      </div>
      {/***************************CONTENT******************** */}
      <div style={commonStyles.contentLeftBorder}>
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

export default TemplateFour;
