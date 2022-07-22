import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import ExerciseBox from '@components/ExerciseBox';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CardAudio,
  CustomImage,
} from '@components/Cards';
import { translate as ts } from '@i18n/translate';
import { storeItem, getItem } from '@utils/AsyncUtils';
const { IMAGE_BASE_URL } = GLOBALS;
const TemplateOne = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    videos,
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
      {/**************audio******************** */}

      {videos && videos.length
        ? videos
          .filter((item) => {
            return item.video_type === 'audio' && item.order === 0;
          })
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, i) => {
            return (
              <CardAudio
                src={`${IMAGE_BASE_URL}${item.video}`}
                style={{
                  display: item.video !== '' ? 'block' : 'none',
                  textAlign: 'center',
                }}
              />
            );
          })
        : []}

      {/**********************Images************** */}

      {images && images.length
        ? images.map((item) => {
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
      <div style={commonStyles.contentLeftBorder}>
        {content && content.length
          ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content[getItem('language')])}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
          : []}
      </div>
      {/**************audio******************** */}
      {videos && videos.length
        ? videos
          .filter((item) => {
            return item.video_type === 'audio' && item.order === 1;
          })
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, i) => {
            return (
              <CardAudio
                src={`${IMAGE_BASE_URL}${item.video}`}
                style={{
                  display: item.video !== '' ? 'block' : 'none',
                  textAlign: 'center',
                }}
              />
            );
          })
        : []}
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TemplateOne;
