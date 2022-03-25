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
  OldCustomImage,
} from '../../../components/Cards';
import {Animated} from 'react-animated-css';
import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const {IMAGE_BASE_URL, FONTS} = GLOBALS;
const ThirtyOne = (props) => {
  const {
    card_title,
    descriptions,
    card_time,
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
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : []}

      {/**********************content************** */}

      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.type === 'first')
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                  style={styles.contentStyle}
                />
              );
            })
        : []}

      {images && images.length
        ? images
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.image_type === 'first')
            .map((item, i) => {
              return (
                <Animated animationIn={'fadeInUp'}>
                  <div style={styles.wrapper} key={i} className="wrap-data">
                    <OldCustomImage
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      style={{
                        ...styles.customImageStyle,
                        display: item.image !== '' ? 'flex' : 'none',
                      }}
                    />
                    <CardDescription
                      style={styles.descStyle}
                      description={ReactHtmlParser(item.description)}
                    />
                  </div>
                </Animated>
              );
            })
        : null}
      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.type === 'second')
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                  style={styles.contentStyle}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : []}

      {images && images.length
        ? images
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.image_type === 'second')
            .map((item, i) => {
              return (
                <Animated isVisible={true} animationIn={'fadeInUp'}>
                  <div style={styles.wrapper} key={i} className="wrap-data">
                    <OldCustomImage
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      style={{
                        ...styles.customImageStyle,
                        display: item.image !== '' ? 'flex' : 'none',
                      }}
                    />
                    <CardDescription
                      style={styles.descStyle}
                      description={ReactHtmlParser(item.description)}
                    />
                  </div>
                </Animated>
              );
            })
        : null}
      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.type === 'third')
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                  style={styles.contentStyle}
                  isVisible={true}
                  animationIn={'fadeInUp'}
                />
              );
            })
        : []}

      {images && images.length
        ? images
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.image_type === 'third')
            .map((item, i) => {
              return (
                <Animated isVisible={true} animationIn={'fadeInUp'}>
                  <div style={styles.wrapper} key={i} className="wrap-data">
                    <OldCustomImage
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      style={{
                        ...styles.customImageStyle,
                        display: item.image !== '' ? 'flex' : 'none',
                      }}
                    />
                    <CardDescription
                      style={styles.descStyle}
                      description={ReactHtmlParser(item.description)}
                    />
                  </div>
                </Animated>
              );
            })
        : null}
      {/*************BOTTOM CONTENT***************** */}
      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .filter((val) => val.type === 'four')
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

export default ThirtyOne;
const styles = {
  wrapper: {
    display: 'flex',
    marginTop: '10px',
    //border: '1px solid red',
    width: '100%',
  },
  contentStyle: {
    width: DEVICE_WIDTH > 767 ? '80%' : '100%',
    // textAlign: DEVICE_WIDTH > 767 ? 'left' : 'center',
    // alignContent: 'flex-end',
    // justifyContent: 'end',
    // border: '1px solid red',
    fontFamily: FONTS.SEMI_BOLD,
    marginBottom: '-15px',
    width: 180,
    textAlign: 'center',
    paddingTop: 20,
    // float: 'right',
  },
  customImageStyle: {
    width: '180px',
    height: '180px',
    // marginLeft: '0',
    flexDirection: 'column',
  },
  descStyle: {width: '100%', paddingLeft: '35px', marginTop: '25px'},
};
