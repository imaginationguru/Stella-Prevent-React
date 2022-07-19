import GLOBALS from '@constants';
import { translate as ts } from '@i18n/translate';
const { COLORS } = GLOBALS;
const { BUTTON_ORANGE, WHITE } = COLORS;
const ExerciseBox = (props) => {
  const { week } = props;
  return (
    <div style={styles.wrapper}>
      <p style={styles.title}>{ts('EXERCISE_READ')}</p>
      <p style={styles.subTitle}>
        {ts('EXERCISE_READ1')} {week}{ts('EXERCISE_READ2')}
      </p>
    </div>
  );
};

export default ExerciseBox;
const styles = {
  wrapper: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '10px',
    backgroundColor: BUTTON_ORANGE,
  },
  title: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: '18px',
  },
  subTitle: {
    color: WHITE,
    fontSize: '16px',
  },
};
