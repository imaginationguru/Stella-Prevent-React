import React from 'react';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import ReactHtmlParser from 'react-html-parser';
import ExerciseBox from '@components/ExerciseBox';
import GLOBALS from '@constants';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';

import { translate as ts } from '@i18n/translate';
const { IMAGE_BASE_URL } = GLOBALS;
const ThirtySix = (props) => {
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
                description={ReactHtmlParser(item.desc)}
              />
            );
          })
        : []}
      <div style={styles.topContent}>
        {/**********************first type content************ */}
        {content && content.length
          ? content
            .filter((item) => {
              return item.type === 'first';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                />
              );
            })
          : []}
        {/**********************Top Image************ */}
        <div className="row" style={styles.bottomImages}>
          {images && images.length
            ? images
              .filter((item) => {
                return item.image_type === 'first';
              })
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((imgItem, index) => {
                return (
                  <div className="col-md-4">
                    <CustomImage
                      src={`${IMAGE_BASE_URL}${imgItem.image}`}
                      style={{
                        display: imgItem.image !== '' ? 'flex' : 'none',
                      }}
                      title={ReactHtmlParser(imgItem.description)}
                    />
                  </div>
                );
              })
            : []}
        </div>

        {/**********************second type content************ */}
        <div style={styles.middleContent}>
          {content && content.length
            ? content
              .filter((item) => {
                return item.type === 'second';
              })
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item, index) => {
                return (
                  <CardContent
                    key={index}
                    content={ReactHtmlParser(item.content)}
                  />
                );
              })
            : []}
        </div>
        {/**********************Bottom image type content************ */}
        <div style={styles.bottomImages}>
          {images && images.length
            ? images
              .filter((item) => {
                return item.image_type === 'second';
              })
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((imgItem, index) => {
                return (
                  <div style={styles.twoImageDiv} key={index}>
                    <CustomImage
                      src={`${IMAGE_BASE_URL}${imgItem.image}`}
                      style={{
                        display: imgItem.image !== '' ? 'flex' : 'none',
                      }}
                      title={ReactHtmlParser(imgItem.description)}
                    />
                  </div>
                );
              })
            : []}
        </div>
        {/**********************third type content************ */}
        {content && content.length
          ? content
            .filter((item) => {
              return item.type === 'third';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                />
              );
            })
          : []}
      </div>
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default ThirtySix;

const styles = {
  topContent: {
    marginBottom: '200px',
  },
  middleContent: { marginTop: '4%' },
  bottomImages: {
    marginTop: '30px',
    marginBottom: '40px',
    display: 'flex',
  },
  twoImageDiv: {
    width: '35%',
    margin: '0 auto',
  },
  contentStyle: { marginTop: '20px' },
};
