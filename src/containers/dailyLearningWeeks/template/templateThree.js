import React from 'react';
import GLOBALS from '@constants';
import ReactHtmlParser from 'react-html-parser';
import ExerciseBox from '@components/ExerciseBox';
import {CardQuote, CardTitle, CardContent} from '@components/Cards';
const {COLORS} = GLOBALS;
const {RED, GRAY1} = COLORS;
const TemplateThree = (props) => {
  const {card_title, content, quotes, showExercises, week} = props.card;
  return (
    <>
      <div style={styles.innerContainer}>
        {/********************************quotes************* */}
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
        {/********************************Card Tilte and time************ */}
        <CardTitle
          title={ReactHtmlParser(card_title)}
          style={styles.cardTitle}
        />

        {/************************content************* */}
        {content && content.length
          ? content
              .sort((a, b) => (a.order > b.order && 1) || -1)
              .map((item) => {
                return <CardContent content={ReactHtmlParser(item.content)} />;
              })
          : []}
        <hr style={styles.hrTag} />
      </div>
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TemplateThree;

const styles = {
  innerContainer: {marginTop: '140px'},
  cardTitle: {
    color: RED,
    fontSize: 20,
    fontFamily: 'HKGrotesk Regular',
  },

  hrTag: {marginBottom: '70px', color: GRAY1},
};
