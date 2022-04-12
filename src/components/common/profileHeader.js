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
import GLOBALS from '@constants';
import profile from '@assets/images/profile.png';
import cancel from '@assets/images/cancel.png';
import edit from '@assets/images/edit.png';
const {COLORS, FONTS, IMAGE_BASE_URL} = GLOBALS;
const {DARK_GREEN, WHITE, GreenForSlider} = COLORS;
import {getItem} from '@utils/AsyncUtils';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import Dropzone from 'react-dropzone';
import {normalize} from '@utils/Helper';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';

const ProfileHeader = (props) => {
  const {loginData = {}, profileImg = ''} = useSelector(
    (state) => state.authReducer,
  );
  const moduleOne = useSelector((state) => state.moduleOne);
  const {currentActiveCard = {}} = useSelector((state) => state.moduleOne);
  const [profileImage, setProfilePhoto] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [DEVICE_WIDTH, setDimensionsW] = useState(
    Dimensions.get('window').width,
  );
  const [DEVICE_HEIGHT, setDimensionsH] = useState(
    Dimensions.get('window').height,
  );
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
    if (profileImg == null || profileImg == '') {
      setProfilePhoto(profile);
    } else {
      setProfilePhoto(`${IMAGE_BASE_URL}${profileImg}`);
    }
  }, [profileImg, moduleOne?.currentActiveCard?.current_week]);
  useEffect(() => {
    Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensionsW(window.width);
      setDimensionsH(window.height);
    });
    return () => {
      Dimensions.removeEventListener('change', () => {});
    };
  }, []);
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
    <View style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).outerContainer}>
      <ImageBackground
        resizeMode="cover"
        style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).bgImage}>
        <div className="pWrap">
          <View style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).profileWrapp}>
            <View style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).profileWrapLeft}>
              <View
                style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).profileConatiner}>
                <View style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).profileWrap}>
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
              <View style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).textConatiner}>
                <View>
                  <Text style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).username}>
                    {firstName} {lastName}
                  </Text>
                </View>
                {showProfileBtn && (
                  <TouchableOpacity
                    onPress={() => onProfileClick()}
                    style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).btn}>
                    <Text style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).btnTxt}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).btn}
                    onPress={() => {
                      dispatch(AppActions.logout());
                    }}>
                    <Text
                      style={[
                        styles(DEVICE_WIDTH, DEVICE_HEIGHT).btnTxtLogout,
                      ]}>
                      Logout
                    </Text>
                  </TouchableOpacity>

                  {showEditIcon && profileImg != null && profileImg != '' && (
                    <TouchableOpacity
                      style={[
                        styles(DEVICE_WIDTH, DEVICE_HEIGHT).btn,
                        {
                          backgroundColor: 'rgba(255, 0, 0, 0.78)',
                          height: 'auto',
                          paddingHorizontal: 5,
                        },
                      ]}
                      onPress={() => {
                        onDeleteClick();
                      }}>
                      <Text
                        style={[
                          styles(DEVICE_WIDTH, DEVICE_HEIGHT).btnTxtLogout,
                        ]}>
                        Delete Image
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).profileWrapRight}>
              <View>
                <Text style={styles(DEVICE_WIDTH, DEVICE_HEIGHT).username}>
                  Module {moduleOne?.currentActiveCard?.current_week}
                </Text>
              </View>

              <Slider
                track="inverted"
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
        </div>
      </ImageBackground>
    </View>
  );
};

export default ProfileHeader;
export const styles = (DEVICE_WIDTH, DEVICE_HEIGHT) => {
  return StyleSheet.create({
    outerContainer: {
      width: '100%',
      paddingTop: '30px',
      paddingBottom: '30px',
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

      color: DARK_GREEN,
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

    sliderheader: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    weektitle: {
      fontSize: DEVICE_WIDTH > 767 ? '2.2vw' : '22px',
      fontFamily: FONTS.SEMI_BOLD,
      color: DARK_GREEN,
    },
    alltitle: {
      fontSize: DEVICE_WIDTH > 767 ? '1.5vw' : '16px',
      fontFamily: FONTS.SEMI_BOLD,
      color: DARK_GREEN,
    },
  });
};
