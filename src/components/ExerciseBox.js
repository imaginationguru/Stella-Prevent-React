import GLOBALS from '@constants';
const {COLORS} = GLOBALS;
const {BUTTON_ORANGE, WHITE} = COLORS;
const ExerciseBox = (props) => {
  const {week} = props;
  return (
    <div style={styles.wrapper}>
      <p style={styles.title}>Exercises & Reading</p>
      <p style={styles.subTitle}>
        Here you can find the activities of week {week}, the audio exercises and
        additional information.
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
