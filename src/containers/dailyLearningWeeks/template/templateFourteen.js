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
const {IMAGE_BASE_URL} = GLOBALS;
const TemplateFourteen = (props) => {
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
      <div>
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
                    isVisible={true}
                    animationIn={'fadeInUp'}
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
                .map((imgItem) => {
                  let text = imgItem.description
                    .toString()
                    .replace(/\xA0/g, ' ');
                  return (
                    <div className="col-md-6 col-12 res-wrap">
                      <CustomImage
                        src={`${IMAGE_BASE_URL}${imgItem.image}`}
                        style={{
                          display: imgItem.image !== '' ? 'flex' : 'none',
                        }}
                        title={ReactHtmlParser(text)
                          .toString()
                          .replace(/\xA0/g, ' ')}
                        isVisible={true}
                        animationIn={'fadeInUp'}
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
                      isVisible={true}
                      animationIn={'fadeInUp'}
                    />
                  );
                })
            : []}
        </div>
        {/**********************Bottom image type content************ */}
        <div className="row" style={styles.bottomImages}>
          {images && images.length
            ? images
                .filter((item) => {
                  return item.image_type === 'second';
                })
                .sort((a, b) => (a.order > b.order && 1) || -1)
                .map((imgItem) => {
                  let text = imgItem.description
                    .toString()
                    .replace(/\xA0/g, ' ');
                  return (
                    <div className="col-md-6 col-12 res-wrap">
                      <CustomImage
                        src={`${IMAGE_BASE_URL}${imgItem.image}`}
                        style={{
                          display: imgItem.image !== '' ? 'flex' : 'none',
                        }}
                        title={ReactHtmlParser(text)}
                        isVisible={true}
                        animationIn={'fadeInUp'}
                        animationInDelay={'200'}
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

export default TemplateFourteen;

const styles = {
  middleContent: {marginTop: '4%'},
  bottomImages: {
    marginTop: '30px',
    marginBottom: '40px',
  },
};
