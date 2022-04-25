import GLOBALS from '@constants';

export const styles = {
  menuIcon: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },
  outerCircle: {
    border: '1px solid',
    height: '20px',
    width: '20px',
    borderRadius: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  innerCircle: {
    border: '1px solid',
    borderColor: GLOBALS.COLORS.GREEN_TEXT,
    height: '12px',
    width: '12px',
    borderRadius: '12px',
  },
  cardDiv: {
    display: 'flex',
    marginTop: '2%',
    marginBottom: '3%',
  },
  daysContainer: {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  radioDiv: {
    marginBottom: '10px',
    height: '20px',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
};
