import React from 'react';
import GLOBALS from '../../../constants';
import ReactHtmlParser from 'react-html-parser';
import {
  CardQuote,
  CardTitle,
  CardDescription,
  CardContent,
  CustomImage,
} from '../../../components/Cards';
import { Dimensions } from 'react-native';
const { COLORS, IMAGE_BASE_URL } = GLOBALS;
const { BUTTON_ORANGE } = COLORS;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const Congratulation = (props) => {
  const { card_title, images, quotes, descriptions, content } = props.card;
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

      {/*************************first type image************** */}

      {images && images.length
        ? images
          .filter((item) => {
            return item.image_type === 'first';
          })
          .map((item, index) => {
            return (
              <CustomImage

                key={index}
                src={`${IMAGE_BASE_URL}${item.image}`}
                style={{
                  display: item.image !== '' ? 'flex' : 'none',
                }}
                title={ReactHtmlParser(item.description)}
              />
            );
          })
        : []}

      <CardTitle
        title={ReactHtmlParser(card_title)}
        style={{ textAlign: 'center' }}
      />

      <div
        style={{
          marginTop: '40px',
          marginBottom: '40px',
        }}>
        {descriptions && descriptions.length
          ? descriptions
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  style={styles.textStyle}
                  description={ReactHtmlParser(item.desc)}
                />
              );
            })
          : []}
      </div>

      {/*************************second type image************** */}

      {images && images.length
        ? images
          .filter((item) => {
            return item.image_type === 'second';
          })
          .map((item, index) => {
            return (
              <CustomImage
                imageSize={item.imageSize}
                key={index}
                src={`${IMAGE_BASE_URL}${item.image}`}
                style={{
                  display: item.image !== '' ? 'flex' : 'none',
                }}
                title={ReactHtmlParser(item.description)}
              />
            );
          })
        : []}

      {content && content.length
        ? content
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, i) => {
            return (
              <CardContent
                key={i}
                content={ReactHtmlParser(item.content)}

              />
            );
          })
        : []}
    </>
  );
};

export default Congratulation;

const styles = {
  textStyle: {
    border: '2px solid',
    borderLeftColor: BUTTON_ORANGE,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: DEVICE_WIDTH > 767 ? '50%' : '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '20px',
  },
};
