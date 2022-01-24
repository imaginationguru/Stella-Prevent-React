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
const ThirtyNine = (props) => {
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

      <div className="row">
        <div className="col-md-3 col-sm-6 col-6">
          {images && images.length
            ? images.map((item, i) => {
                return (
                  <CustomImage
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      display: item.image !== '' ? 'flex' : 'none',
                      height: '400px',
                    }}
                    isVisible={true}
                    animationIn={'fadeInLeft'}
                  />
                );
              })
            : []}
        </div>
        <div className="col-md-9 col-sm-6 col-6">
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

export default ThirtyNine;
const styles = {
  // contentText: {
  //   alignItems: 'flex-end',
  // },
};
