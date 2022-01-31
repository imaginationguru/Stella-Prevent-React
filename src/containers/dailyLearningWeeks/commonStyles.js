import GLOBALS from '../../constants';
import {Dimensions} from 'react-native';
const {COLORS} = GLOBALS;
const {BUTTON_ORANGE, LIGHT_GRAY} = COLORS;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const commonStyles = {
  img: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    align: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    display: 'flex',
    marginTop: '2%',
    marginBottom: '3%',
    justifyContent: 'space-between',
    // border: '1px solid red',
  },
  name: {textAlign: 'center', fontStyle: 'italic', fontSize: '14px'},
  droppableDiv: {
    width: DEVICE_WIDTH > 767 ? '23%' : '48%',
    paddingBottom: DEVICE_WIDTH > 767 ? '60px' : '30px',
    display: 'flex',
  },
  droppableDivDrag: {
    width: DEVICE_WIDTH > 767 ? '23%' : '48%',
    paddingBottom: DEVICE_WIDTH > 767 ? '60px' : '30px',
  //  display: 'flex',
  },
  dropTitle: {
    color: '#ffff',
    textAlign: 'center',
    height: DEVICE_WIDTH > 767 ? '80px' : 'auto',
    flex: '1 1 auto',
    paddingTop: '15px',
    paddingBottom: '15px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragItem: {
    marginTop: '20px',
    textAlign: 'center',
    border: '1px solid',
  },

  subContent: {textAlign: 'left', padding: '10px', fontSize: 15},
  subContent1: {
    textAlign: 'left',
    padding: '10px',
    fontSize: 15,
    color: 'white',
  },
  draggableDiv: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    flex: 'wrap',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: '100px',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '49%',
    backgroundColor: '#F1F3FA',
    marginTop: '20px',
    paddingLeft: '20px',
    borderRadius: '5px',
  },
  imageContent: {width: '48%'},
  question: {
    flexDirection: 'row',
    display: 'flex',
    // marginTop: '40px',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: '40px',
  },
  imageDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '50px',
    marginBottom: '30px',
    border: '1px solid red',
  },
  imageTitle: {
    textAlign: 'center',
  },
  col4: {
    width: '23%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#57576D',
  },
  thermoTitle: {textAlign: 'center', color: '#ffff', paddingTop: '12px'},
  thermoImage: {
    backgroundColor: '#57576D',
    width: '140px',
    height: '100px',
    boxSizing: 'border-box',
    borderRadius: '100%',
    minWidth: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  w501: {marginBottom: '21px'},
  error: {color: 'red', paddingLeft: '5px'},
  socialError: {
    textAlign: 'center',
    align: 'center',
    justifyContent: 'center',
    color: 'red',
  },
  //Template Five Styles
  cardFiveImage: {
    width: '160px',
    height: '160px',
    marginLeft: '25px',
  },
  //********template Four styles  */
  cardFiveImageDiv: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100%',
    flexWrap: 'wrap',
    //border: '1px solid black',
  },
  imageSize: {width: '160px', height: '160px', margin: '7px'},
  //********template Four styles end  */
  descFive: {
    marginLeft: DEVICE_WIDTH > 767 ? '200px' : '0',
  },
  contentLeftBorder: {
    border: `2px solid ${BUTTON_ORANGE}`,
    borderTopWidth: '0px ',
    borderBottomWidth: '0px',
    borderRightWidth: '0px',
    borderLeft: `2px solid ${BUTTON_ORANGE}`,
    paddingLeft: '15px',
  },
  inputFieldStyle: {
    backgroundColor: LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    paddingTop: '20px',
    height: '200px',
  },
  assessImage: {
    width: '120px',
    height: '120px',
  },
  assessDesc: {
    paddingLeft: '25px',
    paddingTop: '10px',
    //width: '90%',
    // border: '1px solid red',
  },
  assessmentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#D7E7ED',
    padding: '15px',
  },
  buttonWrapper: {
    width: DEVICE_WIDTH > 767 ? '20%' : '100%',
    marginBottom: '60px',
    marginTop: '40px',
  },
};

export default commonStyles;
