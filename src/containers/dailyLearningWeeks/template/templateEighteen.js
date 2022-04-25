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
const {IMAGE_BASE_URL} = GLOBALS;
const TemplateEighteen = (props) => {
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
      {/**********************content************** */}
      {content && content.length
        ? content
            .filter((item) => item.type === 'first')
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
      {/**********************Images************** */}
      <div style={{marginBottom: '60px'}}>
        <div className="row">
          {images && images.length
            ? images
                .filter((item) => item.image_type === 'first')
                .map((item) => {
                  return (
                    <div className="col-md-5" style={styles.outerImageWrapper}>
                      <CustomImage
                        src={`${IMAGE_BASE_URL}${item.image}`}
                        style={{display: item.image !== '' ? 'flex' : 'none'}}
                        title={ReactHtmlParser(item.description)}
                      />
                    </div>
                  );
                })
            : null}
        </div>

        <div className="row">
          {images && images.length
            ? images
                .filter((item) => item.image_type === 'second')
                .sort((a, b) => (a.order > b.order && 1) || -1)
                .map((item) => {
                  return (
                    <div className="col-md-4 sm-4">
                      <CustomImage
                        src={`${IMAGE_BASE_URL}${item.image}`}
                        style={{
                          display: item.image !== '' ? 'flex' : 'none',
                        }}
                        title={ReactHtmlParser(item.description)}
                      />
                    </div>
                  );
                })
            : null}
        </div>

        <div className="row">
          {images && images.length
            ? images
                .filter((item) => item.image_type === 'third')
                .map((item) => {
                  return (
                    <div className="col-md-5" style={styles.outerImageWrapper}>
                      <CustomImage
                        src={`${IMAGE_BASE_URL}${item.image}`}
                        style={{display: item.image !== '' ? 'flex' : 'none'}}
                        title={ReactHtmlParser(item.description)}
                      />
                    </div>
                  );
                })
            : null}
        </div>
      </div>

      {/**********************content************** */}
      {content && content.length
        ? content
            .filter((item) => item.type === 'second')
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

export default TemplateEighteen;
const styles = {
  outerImageWrapper: {
    marginTop: '30px',
    marginBottom: '30px',
    margin: '0 auto',
  },
};
