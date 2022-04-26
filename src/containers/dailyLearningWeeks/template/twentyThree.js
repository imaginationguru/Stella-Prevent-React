import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '../../../constants';
import commonStyles from '../../../containers/dailyLearningWeeks/commonStyles';
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
const TwentyThree = (props) => {
  const {
    card_time,
    card_title,
    descriptions,
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

      {/****************************center Image************** */}

      {images && images.length
        ? images
          .filter((item) => {
            return item.image_type === 'first';
          })
          .map((item, index) => {
            return (
              <CustomImage
                key={index}
                src={
                  item.image !== '' ? `${IMAGE_BASE_URL}${item.image}` : null
                }
                style={{
                  display: item.image !== '' ? 'flex' : 'none',
                  marginBottom: '30px',
                }}
                title={item.description}
              />
            );
          })
        : []}

      {/**********************first type content************ */}
      <div style={commonStyles.contentLeftBorder}>
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
      </div>
      {/***************************description*************** */}
      {descriptions && descriptions.length
        ? descriptions
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, index) => {
            let mOrder = item.order + 1;
            let image = '';
            let image_type = '';
            let description = '';

            if (images.length) {
              const data = images.find((val) => val.order === mOrder);
              if (data) {
                if (data.image) {
                  image = data.image;
                }
                if (data.image_type) {
                  image_type = data.image_type;
                }
                if (data.description) {
                  description = data.description;
                }
              }
            }
            const isLeft = image_type === 'left';
            return (
              <>
                {isLeft ? (
                  <Animated isVisible={true} animationIn={'fadeInLeft'}>
                    <div
                      style={{
                        ...styles.imgContentWrapper,
                      }}>
                      <CustomImage
                        src={`${IMAGE_BASE_URL}${image}`}
                        style={{
                          ...styles.imageWrapper,
                          display: image !== '' ? 'flex' : 'none',
                        }}
                        title={description}
                      />

                      <CardDescription
                        key={index}
                        style={{
                          ...styles.descStyle,
                          marginLeft: '10%',
                          border:
                            item.desc !== ''
                              ? `1px solid ${BUTTON_ORANGE}`
                              : '0px',
                        }}
                        description={ReactHtmlParser(item.desc)}
                      />
                    </div>
                  </Animated>
                ) : (
                  <Animated isVisible={true} animationIn={'fadeInRight'}>
                    <div style={styles.imgContentWrapper}>
                      <CardDescription
                        key={index}
                        style={{
                          ...styles.descStyle,
                          border:
                            item.desc !== ''
                              ? `1px solid ${BUTTON_ORANGE}`
                              : '0px',
                        }}
                        description={ReactHtmlParser(item.desc)}
                      />

                      <CustomImage
                        src={`${IMAGE_BASE_URL}${image}`}
                        style={{
                          ...styles.imageWrapper,
                          display: image !== '' ? 'flex' : 'none',
                        }}
                        title={description}
                      />
                    </div>
                  </Animated>
                )}
              </>
            );
          })
        : []}

      {/************************bottom second content****************** */}
      <div style={{ ...commonStyles.contentLeftBorder, marginTop: '30px' }}>
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
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TwentyThree;
const styles = {
  imgContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    marginBottom: '15px',
  },
  descStyle: {
    width: '90%',
    textAlign: 'justify',
    padding: '10px',
    borderRadius: '10px',
  },

  imageWrapper: {
    width: '120px',
    height: '120px',
  },
};
