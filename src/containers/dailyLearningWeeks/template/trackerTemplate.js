import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { navigatorPush } from '../../../config/navigationOptions';
import GLOBALS from '../../../constants';
import { translate as ts } from '../../../i18n/translate';
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
const { IMAGE_BASE_URL, COLORS } = GLOBALS;
const { BUTTON_ORANGE } = COLORS;
const TrackerTemplate = (props, componentId) => {
  const {
    card_title,
    descriptions,
    card_time,
    content,
    images,
    quotes,
    showActivityTracker,
    showMoodTracker,
    showSleepTracker,
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
                animationIn="fadeInUp"
              />
            );
          })
        : []}
      {/**********************Images************** */}
      {images && images.length
        ? images.map((item, i) => {
          return (
            <CustomImage
              imageSize={item.imageSize}
              src={`${IMAGE_BASE_URL}${item.image}`}
              style={{ display: item.image !== '' ? 'flex' : 'none' }}
            />
          );
        })
        : null}

      <div style={styles.trackerWrapper}>
        <Animated animationIn="fadeInLeft">
          {showMoodTracker === true ? (
            <p
              style={styles.trackerList}
              onClick={() =>
                navigatorPush({
                  componentId,
                  screenName: 'MoodTracker',
                  passProps: { isFromCard: true },
                })
              }>
              {ts('CLICK_MOOD_TRACKER')}
            </p>
          ) : null}
        </Animated>
        <Animated animationIn="fadeInLeft" animationInDelay={'200'}>
          {showActivityTracker === true ? (
            <p
              style={styles.trackerList}
              onClick={() =>
                navigatorPush({
                  componentId,
                  screenName: 'ActivityTracker',
                  passProps: { isFromCard: true },
                })
              }>
              {ts('CLICK_ACTIVITY_TRACKER')}
            </p>
          ) : null}
        </Animated>
        <Animated animationIn="fadeInLeft" animationInDelay={'300'}>
          {showSleepTracker === true ? (
            <p
              onClick={() =>
                navigatorPush({
                  componentId,
                  screenName: 'SleepTracker',
                  passProps: { isFromCard: true },
                })
              }
              style={styles.trackerList}>
              {ts('CLICK_SLEEP_TRACKER')}
            </p>
          ) : null}
        </Animated>
      </div>

      {/**********************content************** */}
      {content && content.length
        ? content
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, index) => {
            return (
              <CardContent
                key={index}
                content={ReactHtmlParser(item.content)}
                animationIn="fadeInUp"
              />
            );
          })
        : []}
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TrackerTemplate;
const styles = {
  trackerWrapper: {
    marginTop: '40px',
  },
  trackerList: {
    color: BUTTON_ORANGE,
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
  },
};
