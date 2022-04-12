import React from 'react';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import GLOBALS from '@constants';
import ReactHtmlParser from 'react-html-parser';
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
const TemplateNineteen = (props) => {
  const {
    card_title,
    card_time,
    images,
    content,
    descriptions,
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
                  animationIn="fadeInUp"
                />
              );
            })
        : []}
      {/*************************Comparison content******************* */}
      <div style={styles.compareContainer}>
        {/**************************left side image******************* */}
        <div style={commonStyles.imageContent}>
          <div className="dash-icon" style={styles.leftImage}>
            {images && images.length
              ? images
                  .filter((item) => {
                    return item.image_type === 'first';
                  })
                  .map((img, index) => {
                    return (
                      <>
                        <CustomImage
                          src={`${IMAGE_BASE_URL}${img.image}`}
                          style={{
                            width: '140px',
                            height: '140px',
                            margin: '0',
                            display: img.image !== '' ? 'flex' : 'none',
                          }}
                          animationIn="fadeInLeft"
                        />
                      </>
                    );
                  })
              : null}
          </div>
          {/**************************left side content******************* */}
          {content && content.length
            ? content
                .filter((item) => {
                  return item.type === 'first';
                })
                .map((item, index) => {
                  return (
                    <CardContent
                      content={ReactHtmlParser(item.content)}
                      animationIn="fadeInLeft"
                    />
                  );
                })
            : []}
        </div>
        <p style={styles.centerText}>VS</p>
        {/**************************Right Side content******** */}
        <div style={commonStyles.imageContent}>
          {/**************************right side image******************* */}
          <div className="dash-icon" style={styles.rightImage}>
            {images && images.length
              ? images
                  .filter((item) => {
                    return item.image_type === 'second';
                  })
                  .map((img, index) => {
                    return (
                      <>
                        <CustomImage
                          src={`${IMAGE_BASE_URL}${img.image}`}
                          style={{
                            width: '140px',
                            height: '140px',
                            margin: '0',
                            display: img.image !== '' ? 'flex' : 'none',
                          }}
                          animationIn="fadeInRight"
                        />
                      </>
                    );
                  })
              : null}
          </div>
          {/**************************right side content******************* */}
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
                      animationIn="fadeInRight"
                    />
                  );
                })
            : []}
        </div>
      </div>

      {/***********************Bottom content****************** */}
      {content && content.length
        ? content
            .filter((item) => {
              return item.type === 'third';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, i) => {
              return (
                <CardContent
                  key={i}
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
export default TemplateNineteen;

const styles = {
  compareContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '40px',
    marginTop: '40px',
  },
  leftImage: {
    justifyContent: 'center',
    display: 'flex',
  },
  rightImage: {justifyContent: 'center', display: 'flex'},
  centerText: {fontWeight: 'bold', marginTop: '30px'},
};
