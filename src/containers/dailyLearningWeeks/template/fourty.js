import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import ExerciseBox from '@components/ExerciseBox';
import { translate as ts } from '@i18n/translate';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
  CustomImage,
} from '@components/Cards';
const { IMAGE_BASE_URL } = GLOBALS;
const Template40 = (props) => {
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
                description={ReactHtmlParser(item.desc)}
              />
            );
          })
        : []}
      <div className="row">
        {images && images.length
          ? images
            .filter((item) => {
              return item.image_type === 'first';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, i) => {
              return (
                <div className="col-md-4">
                  <p style={{ textAlign: 'center' }}>{item.description}</p>
                  <CustomImage
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                  />
                  {content && content.length
                    ? content
                      .filter((val) => {
                        return val.type === 'first';
                      })
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .map((ele, index) => {
                        return (
                          <CardContent
                            key={index}
                            content={ReactHtmlParser(ele.content)}
                            style={{ textAlign: 'left' }}
                          />
                        );
                      })
                    : []}
                </div>
              );
            })
          : []}

        {images && images.length
          ? images
            .filter((item) => {
              return item.image_type === 'second';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, i) => {
              return (
                <div className="col-md-4">
                  <p style={{ textAlign: 'center' }}>{item.description}</p>
                  <CustomImage
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                  />
                  {content && content.length
                    ? content
                      .filter((val) => {
                        return val.type === 'second';
                      })
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .map((ele, index) => {
                        return (
                          <CardContent
                            key={index}
                            content={ReactHtmlParser(ele.content)}
                            style={{ textAlign: 'left' }}
                          />
                        );
                      })
                    : []}
                </div>
              );
            })
          : []}

        {images && images.length
          ? images
            .filter((item) => {
              return item.image_type === 'third';
            })
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, i) => {
              return (
                <div className="col-md-4">
                  <p style={{ textAlign: 'center' }}>{item.description}</p>
                  <CustomImage
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    style={{
                      display: item.image !== '' ? 'flex' : 'none',
                    }}
                  />
                  {content && content.length
                    ? content
                      .filter((val) => {
                        return val.type === 'third';
                      })
                      .sort((a, b) => (a.order > b.order && 1) || -1)
                      .map((ele, index) => {
                        return (
                          <CardContent
                            key={index}
                            content={ReactHtmlParser(ele.content)}
                            style={{ textAlign: 'left' }}
                          />
                        );
                      })
                    : []}
                </div>
              );
            })
          : []}
      </div>

      {content && content.length
        ? content
          .filter((item) => {
            return item.type === 'fourth';
          })
          .sort((a, b) => (a.order > b.order && 1) || -1)
          .map((item, index) => {
            return (
              <CardContent
                key={index}
                content={ReactHtmlParser(item.content)}
              />
            );
          })
        : []}
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default Template40;
