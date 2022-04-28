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
  OldCustomImage,
} from '@components/Cards';
import {Animated} from 'react-animated-css';

import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const {COLORS, IMAGE_BASE_URL} = GLOBALS;
const FourSeven = (props) => {
  const {
    card_time,
    card_title,
    content,
    descriptions,
    quotes,
    images,
    week,
    showExercises,
  } = props.card;

  const image = [
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.08738200966836329--sandy_rounded.png',
      title: 'Sadness,crying spells',
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.39541503332044936--jamila_rounded.png',
      title: 'Irritability',
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.39541503332044936--jamila_rounded.png',
      title: 'Anxiety or persistent worry',
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.08738200966836329--sandy_rounded.png',
      title: `Feeling guilty or undervalued("I'm not a good mother)"`,
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.39541503332044936--jamila_rounded.png',
      title: `Difficulty concentrating`,
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.39541503332044936--jamila_rounded.png',
      title: `Lack of motivation or interest in activities that were previously enjoyable`,
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.08738200966836329--sandy_rounded.png',
      title: `Fatigue, lack of energy`,
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.39541503332044936--jamila_rounded.png',
      title: `Isolating oneself from family and friends `,
    },
    {
      image:
        'https://mamalift.curiodigitaltx.com/upload/0.39541503332044936--jamila_rounded.png',
      title: `Changes in appetite and/or sleep `,
    },
  ];

  return (
    <>
      {/**********************quotes************** */}
      <CardTitle title={ReactHtmlParser(card_title)} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} Minute` : `${card_time} Minutes`
        }
      />

      {/**********************description************** */}
      {descriptions && descriptions.length
        ? descriptions.map((item, index) => {
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

      {/**********************Show Images********************** */}
      <div className="inner-container">
        <div style={styles.bottomImages} className="f-r">
          {images && images.length
            ? images
                .filter((item) => item.image_type != 'footer')
                .map((item, index) => {
                  return (
                    <div className="f-3" key={index}>
                      <OldCustomImage
                        key={index}
                        src={`${IMAGE_BASE_URL}${item.image}`}
                        style={{
                          display: item.image !== '' ? 'flex' : 'none',
                          height: '120px',
                          width: '120px',
                        }}
                        isVisible={true}
                        animationIn={'fadeInLeft'}
                        title={ReactHtmlParser(item.description)}
                      />
                    </div>
                  );
                })
            : []}
        </div>
      </div>

      {images && images.length ? (
        <CustomImage
          src={`${IMAGE_BASE_URL}${images
            .filter((item) => item.image_type == 'footer')
            .map((val) => val.image)}`}
          style={{
            display: image[0].image !== '' ? 'flex' : 'none',
            height: '100px',
            width: '100px',
          }}
          isVisible={true}
          animationIn={'fadeInLeft'}
        />
      ) : null}

      {/********************************content ******************* */}
      <Animated isVisible={true} animationIn={'fadeInUp'}>
        <div style={styles.contentView}>
          {images && images.length
            ? images
                .filter((item) => item.image_type == 'footer')
                .map((item, i) => {
                  return (
                    <CardContent
                      key={i}
                      content={ReactHtmlParser(item.description)}
                    />
                  );
                })
            : []}
        </div>
      </Animated>
    </>
  );
};

export default FourSeven;

const styles = {
  contentView: {
    border: '2px solid #F08B22',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    paddingLeft: '15px',
  },
  descView: {
    width: DEVICE_WIDTH > 767 ? '70%' : '100%',
    border: '2px solid #F08B22',
    padding: '20px',
    borderRadius: '5px',
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottomImages: {
    marginTop: '30px',
    marginBottom: '40px',
    display: 'flex',
    paddingHorizontal: '20px',
    //margin: '20px',
    //  width: "80%",
    flexWrap: 'wrap',
  },
  twoImageDiv: {
    minWidth: '30%',
    margin: '0 auto',
    flexWrap: 'wrap',
    padding: '10px',
  },
};
