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

import { getItem } from '@utils/AsyncUtils';
import { translate as ts } from '@i18n/translate';
const { IMAGE_BASE_URL } = GLOBALS;
const TemplateTwelve = (props) => {
  const {
    content,
    descriptions,
    images,
    card_title,
    quotes,
    card_time,
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
                quote={item.quote ? ReactHtmlParser(item.quote[getItem('language')]) : []}
              />
            );
          })
        : []}
      <CardTitle title={ReactHtmlParser(card_title[getItem('language')])} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} ${ts('MIN')}` : `${card_time} ${ts('MINS')}`
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
                description={ReactHtmlParser(item.desc[getItem('language')])}
                isVisible={true}
                animationIn={'fadeInUp'}
              />
            );
          })
        : []}

      <div className="row">
        <div className="dash-icon  col-md-3 col-sm-12 col-12">
          {images && images.length
            ? images.map((item, i) => {
              return (
                <CustomImage
                  imageSize={item.imageSize}
                  key={i}
                  src={`${IMAGE_BASE_URL}${item.image}`}
                  style={{ display: item.image !== '' ? 'flex' : 'none' }}
                  isVisible={true}
                  animationIn={'fadeInLeft'}
                />
              );
            })
            : []}
        </div>
        <div style={styles.contentText} className="col-md-9 col-sm-12 col-12">
          {content && content.length
            ? content
              .filter((item) => {
                return item.type === 'first';
              })
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item) => {
                return (
                  <CardContent
                    content={ReactHtmlParser(item.content[getItem('language')])}
                    isVisible={true}
                    animationIn={'fadeInRight'}
                  />
                );
              })
            : []}
        </div>
      </div>
      {content && content.length
        ? content
          .filter((item) => {
            return item.type === 'second';
          })
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item) => {
            return (
              <CardContent
                content={ReactHtmlParser(item.content[getItem('language')])}
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

export default TemplateTwelve;
const styles = {
  contentText: {
    alignItems: 'flex-end',
  },
};
