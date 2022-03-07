import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import GLOBALS from '../../constants';
import {navigatortoStart} from '../../config/navigationOptions.web';
import dashboardHeader from '../../assets/images/dashboardHeader/dashboardHeader.png';
import profile from '../../assets/images/profile.png';
import cancel from '../../assets/images/cancel.png';
import edit from '../../assets/images/edit.png';
const {COLORS, FONTS, IMAGE_BASE_URL} = GLOBALS;
const {DARK_GREEN, WHITE, GreenForSlider} = COLORS;
import {getItem} from '../../utils/AsyncUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../actions';
import Dropzone from 'react-dropzone';
import {normalize} from '../../utils/Helper';
import Slider, {SliderThumb} from '@mui/material/Slider';
import {styled} from '@mui/material/styles';

// import {MDCSlider} from '../../updatedNodeModules/@material/slider';

// const slider = new MDCSlider(document.querySelector('.mdc-slider'));

// @use "../slider/styles";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ProfileHeader = (props) => {
  // const slider = new MDCSlider(document.querySelector('.mdc-slider'));

  const {loginData = {}, profileImg = ''} = useSelector(
    (state) => state.authReducer,
  );
  const moduleOne = useSelector((state) => state.moduleOne);
  console.log('profile image user', profileImg);
  const [profileImage, setProfilePhoto] = useState('');
  let firstName = getItem('firstName');
  let lastName = getItem('lastName');
  const dispatch = useDispatch();

  let {
    showProfileBtn,
    showEditIcon,
    onEditClick,
    onProfileClick,
    onDeleteClick,
    onLogout,
  } = props;

  useEffect(() => {
    console.log('use effect..profileImg', profileImg);
    console.log('use effect..profile', profile);
    console.log(profileImage == '' ? profile : profileImage, 'llll');
    if (profileImg == null || profileImg == '') {
      console.log('if');
      setProfilePhoto(profile);
    } else {
      console.log('else');
      setProfilePhoto(`${IMAGE_BASE_URL}${profileImg}`);
    }
  }, [profileImg, moduleOne?.currentActiveCard?.current_week]);

  const marks = [
    {
      value: 20,
    },
    {
      value: 40,
    },
    {
      value: 60,
    },
    {
      value: 80,
    },
    {
      value: 100,
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        resizeMode="cover"
        // source={dashboardHeader}
        style={styles.bgImage}>
        <View style={styles.profileWrapper}>
          <View style={styles.profileWrapp}>
            <View style={styles.profileWrapLeft}>
              <View style={styles.profileConatiner}>
                <View style={styles.profileWrap}>
                  <Image
                    resizeMode={'cover'}
                    source={profileImage == '' ? profile : profileImage}
                    style={{
                      width: DEVICE_WIDTH > 767 ? '10vw' : '150px',
                      height: DEVICE_WIDTH > 767 ? '10vw' : '150px',
                      borderRadius: '50%',
                      backgroundColor: COLORS.GRAY,
                      margin: DEVICE_WIDTH > 767 ? '' : 'auto',
                    }}
                  />
                  {showEditIcon && (
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        onEditClick(acceptedFiles[0]);
                      }}>
                      {({getRootProps, getInputProps}) => (
                        <section>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              right: '0vw',
                            }}
                            {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              multiple={false}
                              accept="image/*"
                            />
                            {/* <p>hi</p> */}
                            <img
                              src={edit}
                              style={{
                                width: DEVICE_WIDTH > 767 ? '4vw' : '62px',
                                height: DEVICE_WIDTH > 767 ? '4vw' : '62px',
                                cursor: 'pointer',
                              }}
                            />
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  )}
                </View>
              </View>
              <View style={styles.textConatiner}>
                <View>
                  <Text style={styles.username}>
                    {firstName} {lastName}
                  </Text>
                </View>
                {showProfileBtn && (
                  <TouchableOpacity
                    onPress={() => onProfileClick()}
                    style={styles.btn}>
                    <Text style={styles.btnTxt}>Profile</Text>
                  </TouchableOpacity>
                )}
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // setTimeout(() => {
                      //   navigatortoStart();
                      // }, localStorage.clear());
                      dispatch(AppActions.logout());
                      // dispatch(AppActions.dashboardModalAction(false));
                    }}>
                    <Text style={[styles.btnTxtLogout]}>Logout</Text>
                  </TouchableOpacity>

                  {showEditIcon && profileImg != null && profileImg != '' && (
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        {
                          backgroundColor: 'rgba(255, 0, 0, 0.78)',
                          height: 'auto',
                          paddingHorizontal: 5,
                        },
                      ]}
                      onPress={() => {
                        onDeleteClick();
                      }}>
                      <Text style={[styles.btnTxtLogout]}>Delete Image</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.profileWrapRight}>
              <View>
                <Text style={styles.username}>
                  Week {moduleOne?.currentActiveCard?.current_week}
                </Text>
              </View>
              {/* <h4>Add Range Slider Here</h4> */}
              {/* <div class="mdc-slider mdc-slider--discrete mdc-slider--tick-marks ">
                <input
                  class="mdc-slider__input"
                  type="range"
                  min="0"
                  max="100"
                  value="50"
                  name="volume"
                  aria-label="Continuous slider demo"
                />
                <div class="mdc-slider__track">
                  <div class="mdc-slider__track--inactive"></div>
                  <div class="mdc-slider__track--active">
                    <div class="mdc-slider__track--active_fill mdc-slider_thumbColor"></div>
                  </div>
                  <div class="mdc-slider__tick-marks">
                    <div class="mdc-slider__tick-mark--active mdc-slider_thumbColorActive"></div>
                    <div class="mdc-slider__tick-mark--active mdc-slider_thumbColorActive"></div>
                    <div class="mdc-slider__tick-mark--active mdc-slider_thumbColorActive"></div>
                    <div class="mdc-slider__tick-mark--active mdc-slider_thumbColorActive"></div>
                    <div class="mdc-slider__tick-mark--active mdc-slider_thumbColorActive"></div>
                  </div>
                </div>
                <div
                  class="mdc-slider__thumb"
                  // style="left:calc(30%-24px)"
                  // style={{left: calc('24px')}}
                  // style={{left: normalize(setRange())}}
                >
                  <div class="mdc-slider__thumb-knob mdc-slider_thumbColor"></div>
                </div>
              </div> */}

              <Slider
                track="inverted"
                // disabled={true}
                aria-labelledby="track-inverted-slider"
                value={moduleOne?.currentActiveCard?.current_week * 20}
                defaultValue={20}
                marks={marks}
                sx={{
                  color: GreenForSlider,
                  height: '10px',
                  '& .MuiSlider-track': {
                    backgroundColor: GreenForSlider,
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: GreenForSlider,
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: GreenForSlider,
                  },
                  '& .MuiSlider-mark': {
                    backgroundColor: WHITE,
                    height: '4px',
                  },
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileHeader;
const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    // height: DEVICE_WIDTH > 767 ? '15vw' : '320px',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  profileWrapper: {
    border: `2px solid ${DARK_GREEN}`,
    width: '80%',
    position: 'static',
    // top: 30,
    // left: '10%',
    backgroundColor: '#ffffff',
    opacity: 0.8,
    borderRadius: 20,
    borderShadow: ' 0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
    flexDirection: 'row',
    padding: '1vw',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profileConatiner: {
    flex: DEVICE_WIDTH > 767 ? '0 0 auto' : '0 0 100%',
    alignItems: 'center',
  },
  profileWrap: {
    width: DEVICE_WIDTH > 767 ? '11vw' : '175px',
  },
  edit: {
    position: 'absolute',
    width: '3.5vw',
    height: '3.5vw',
    right: '1.8vw',
    bottom: 0,
  },
  username: {
    fontSize: DEVICE_WIDTH > 767 ? '2.9vw' : '22px',
    fontFamily: FONTS.SEMI_BOLD,
    // font-style: normal;
    // font-weight: bold;
    color: DARK_GREEN,
    // margin-bottom: 0;
    textAlign: DEVICE_WIDTH > 767 ? 'left' : 'center',
  },
  btn: {
    backgroundColor: '#C4C4C4',
    width: DEVICE_WIDTH > 767 ? '10vw' : '80px',
    borderRadius: 5,
    height: DEVICE_WIDTH > 767 ? '2.2vw' : '30px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: DEVICE_WIDTH > 767 ? '' : 'auto',
    marginTop: '1vw',
  },
  btnTxt: {
    color: DARK_GREEN,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: DEVICE_WIDTH > 767 ? '1.3vw' : '16px',
  },
  btnLogout: {
    backgroundColor: '#979797',
    width: '18%',
    borderRadius: 5,
    height: '1.7vw',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1vw',
  },
  btnTxtLogout: {
    color: COLORS.HEADING_BLACK,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: DEVICE_WIDTH > 767 ? '1.3vw' : '16px',
    textAlign: 'center',
  },
  textConatiner: {
    flex: DEVICE_WIDTH > 767 ? '1 1 auto' : '0 0 100%',
  },
  titleStyle: {
    fontStyle: FONTS.NEW_REGULAR,
    fontSize: '1.2vw',
    textAlign: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  profileWrapp: {
    width: '100%',
    flex: '0 0 100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  profileWrapLeft: {
    flex: DEVICE_WIDTH > 767 ? '0 0 50%' : '0 0 100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  profileWrapRight: {
    flex: DEVICE_WIDTH > 767 ? '0 0 50%' : '0 0 100%',
    padding: 15,
  },
});
