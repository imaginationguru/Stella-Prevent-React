import GLOBALS from '../../constants';
const {COLORS} = GLOBALS;

const styles = {
  subTitle: {
    paddingTop: '5px',
   },
  imageWidth: {
    width: '25%',
    textAlign: 'center',
  },
  leftTitle: {
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingTop: '30px',
  },
  rightTextArea: {
    backgroundColor: COLORS.LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    width: '100%',
    paddingTop: '5px',
    paddingLeft: '5px',
  },
  inputBoxStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30px',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
};

export default styles;
