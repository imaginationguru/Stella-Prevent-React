import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import {getItem} from '../../utils/AsyncUtils';
import * as AppActions from '../../actions';
import GLOBALS from '../../constants';
import Strings from '../../constants/Strings';
import {navigatorPush, navigatorPop} from '../../config/navigationOptions.web';
import Footer from '../../components/Footer';
import Button from '../../components/common/button';
import Toggle from '../../components/common/toggle';
import PopUp from '../../components/common/popUp';
import BackBtn from '../../components/common/backbtn';
import Loader from '../../components/Loader';
import ProfileHeader from '../../components/common/profileHeader';
const DEVICE_WIDTH = Dimensions.get('window').width;
const {COLORS, FONTS} = GLOBALS;
const {LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;
import Header from '../../components/Header';

import {useSelector, useDispatch} from 'react-redux';
import journal from '../../assets/images/subscription/journal.png';
import back from '../../assets/images/subscription/back.png';
import Input1 from '../../components/TextInput';
import RadioButton1 from '../../components/RadioButton1';
import {customAlert} from '../../helpers/commonAlerts.web';
import {
  validateIsEmpty,
  validatePassword,
  validateContact,
  validateZipcode,
  validateANZipcode,
  validatePhoneWithSpecialSymbol,
  validateName,
} from '../../utils/validations';
import {normalize} from '../../utils/Helper';

const {IMAGE_BASE_URL} = GLOBALS;

function ProfileDetails(props) {
  const layout = useWindowDimensions();
  console.log(layout, 'layout,,,,');
  const {loginData = {}} = useSelector((state) => state.authReducer);
  const {isLoading} = useSelector((state) => state.common);

  /**Account Info */
  const [name, setName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [cityError, setCityError] = useState('');

  /**Change Password  */
  const [password, setPassword] = useState('');
  const [Newpassword, setNewPassword] = useState('');
  const [Confpassword, setConfPassword] = useState('');

  const [pswdError, setPswdError] = useState('');
  const [newpswdError, setNewPswdError] = useState('');
  const [cnpswdError, setConfirmPswdError] = useState('');

  /**Change Language  */
  const [language, setLanguage] = useState([
    {id: 1, value: 'en', name: 'English', isSelected: false},
    {id: 2, value: 'sp', name: 'Spanish', isSelected: true},
  ]);
  /**Change Notification  */
  const [notification, setNotification] = useState([
    {id: 1, value: 'email', name: 'Email Notification', isSelected: false},
    {id: 2, value: 'sms', name: 'SMS Notification', isSelected: true},
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginData) {
      console.log('usererrtsadfds login data', loginData);
      console.log(loginData.user.image_path, 'lplplplp');
      setName(loginData.user.firstName);
      setLName(loginData.user.lastName);
      setEmail(loginData.user.email);
      setPhone(loginData.user.phoneNumber);
      setCountry(loginData.user.countryName);
      setZipcode(loginData.user.zipcode);
      setCity(loginData.user.city ? loginData.user.city : '');
      setAge(loginData.user.ageYear + 'Y');
      let temp_language = language.map((el) =>
        el.value === loginData.user.language
          ? {...el, isSelected: true}
          : {...el, isSelected: false},
      );
      setLanguage(temp_language);

      let temp_notification = notification.map((el, index) =>
        index == 0
          ? {...el, isSelected: loginData.user.email_notification}
          : {...el, isSelected: loginData.user.sms_notification},
      );
      setNotification(temp_notification);
    }
  }, [loginData]);

  useEffect(() => {
    dispatch(AppActions.updateUserData({user_id: getItem('userId')}));
  }, []);

  /**CHandle submit click of profile button */
  const navigator = (type, item) => {
    switch (type) {
      case 'profile':
        console.log(phone, 'lllll');
        if (validateIsEmpty(phone?.trim()))
          setPhoneError('Please enter phone number');
        else if (!validatePhoneWithSpecialSymbol(phone) || phone.length < 10)
          setPhoneError('Please enter a valid phone number');
        // else if (!validateContact(phone))
        //   setPhoneError('Please enter a valid phone number');
        else if (validateIsEmpty(city?.trim()))
          setCityError('Please enter a city');
        else if (!validateName(city?.trim()))
          setCityError('Please enter valid city');
        else if (validateIsEmpty(zipcode?.trim()))
          setZipcodeError('Please enter zipcode');
        else if (!validateANZipcode(zipcode))
          setZipcodeError('Please enter a valid zipcode');
        else {
          let param = {
            phoneNumber: phone,
            zipcode: zipcode,
            user_id: getItem('userId'),
            city: city,
          };
          dispatch(AppActions.updateUserDetails(param));
          console.log(param, 'params');
        }
        break;
      case 'change_password':
        let param = {
          current_password: password,
          new_password: Newpassword,
          confirm_new_password: Confpassword,
          user_id: getItem('userId'),
        };
        dispatch(AppActions.updatePassword(param));
        break;
      case 'change_language':
        let selected_value = language.find((o) => o.isSelected === true);
        let final_param = {
          language: selected_value.value,
          user_id: getItem('userId'),
        };
        dispatch(AppActions.changeLanguage(final_param));
        break;
      case 'toggle_notify':
        let temp_array = notification.map((el) =>
          el.id === item.id ? {...el, isSelected: !el.isSelected} : {...el},
        );
        setNotification(temp_array);
        let notify_param = {
          email_notification: temp_array[0].isSelected,
          sms_notification: temp_array[1].isSelected,
          user_id: getItem('userId'),
        };
        console.log(notify_param, 'params');
        dispatch(AppActions.toggleNotification(notify_param));
        break;
      default:
        break;
    }
  };
  /**Change Password validation check */
  const validateField = () => {
    if (validateIsEmpty(password.trim())) {
      setPswdError(Strings.validation.CURRENT_PWD_REQ);
    } else if (validateIsEmpty(Newpassword.trim())) {
      setNewPswdError(Strings.validation.NEW_PWD_REQ);
    } else if (!validatePassword(Newpassword)) {
      setNewPswdError(Strings.validation.PASSWORD_ERROR);
    } else if (password === Newpassword) {
      setNewPswdError(Strings.validation.PWD_ERR);
    } else if (validateIsEmpty(Confpassword.trim())) {
      setConfirmPswdError(Strings.validation.C_PWD_REQ);
    } else if (Confpassword != Newpassword) {
      setConfirmPswdError(Strings.validation.PASSWORD_NOT_MATCH);
    } else {
      navigator('change_password');
    }
  };

  /**Hanlde Language chnage */
  const itemClick = (item) => {
    let temp_language = language.map((el) =>
      el.id === item ? {...el, isSelected: true} : {...el, isSelected: false},
    );
    setLanguage(temp_language);
  };

  /**Select Image for Uploading*/
  const selectImage = (file) => {
    console.log(file);
    console.log(file.name, 'lll');
    if (!file) return;

    if (file.type.includes('image')) {
      if (file.size > 10240000) {
        customAlert('The file is too large, max size:10mb', 'error');
        return;
      }
      let formdata = new FormData();
      formdata.append('user_id', getItem('userId'));
      formdata.append('file', file);
      // formdata.append("file", {
      //   uri: file.path,
      //   name: file.name,
      //   type: file.type,
      // });
      console.log(formdata, 'fo');
      dispatch(AppActions.uploadProfile(formdata));
    } else {
      customAlert('Please select only images', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        {...props}
        showProfileBtn={false}
        showEditIcon={true}
        onEditClick={(file) => selectImage(file)}
        onDeleteClick={() => {
          let param = {
            image_path: '',
            user_id: getItem('userId'),
          };
          dispatch(AppActions.updateUserDetails(param));
        }}
      />
      <PopUp />
      {isLoading && <Loader />}
      {/* */}
      <BackBtn></BackBtn>
      <View style={styles.backBtn}></View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '10vw',
          flexWrap: 'wrap',
        }}>
        {/* 1st colum */}
        <View style={{flex: DEVICE_WIDTH > 767 ? '0.3' : '100%'}}>
          <View>
            <Text style={styles.heading}>Plan</Text>
            <View style={{flexDirection: 'row', marginTop: '16px'}}>
              <Image
                resizeMode={'contain'}
                source={`${IMAGE_BASE_URL}${loginData?.planInfo?.image}`}
                style={{width: 25, height: 25}}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: '24px',
                  color: '#0B0914',
                  marginLeft: '16px',

                  fontFamily: FONTS.SEMI_BOLD,
                }}>
                {loginData?.planInfo?.title}
              </Text>
            </View>
            <Button
              btnStyle={{
                height: 35,
                width: '100%',
                marginTop: '1.1vw',
                marginBottom: '2.1vw',
              }}
              onVerifyPress={() =>
                navigatorPush({
                  screenName: 'Subscription',
                  passProps: {currentPlan: loginData?.planInfo},
                })
              }
              textStyle={{
                // fontSize: '16px',
                fontSize: '16px',
              }}
              title={
                loginData?.planInfo?.numericPrice == 0
                  ? 'Upgrade'
                  : 'View Plans'
              }
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
            <View style={styles.hrLine} />

            <Text style={styles.heading}>Change Password</Text>
            <Input1
              secureTextEntry={true}
              inputStyle={{padding: 10, height: 40}}
              setCode={(text) => {
                setPassword(text);
                setPswdError('');
              }}
              value={password}
              error={pswdError}
              label="Current Password"></Input1>
            <Input1
              secureTextEntry={true}
              error={newpswdError}
              inputStyle={{padding: 10, height: 40}}
              setCode={(text) => {
                setNewPassword(text);
                setNewPswdError('');
              }}
              value={Newpassword}
              label="New Password"
              placeholder=""></Input1>
            <Input1
              secureTextEntry={true}
              error={cnpswdError}
              inputStyle={{padding: 10, height: 40}}
              setCode={(text) => {
                setConfPassword(text);
                setConfirmPswdError('');
              }}
              value={Confpassword}
              label="Confirm New Password"></Input1>
            <Button
              onVerifyPress={() => validateField()}
              textStyle={{fontSize: '16px'}}
              btnStyle={{
                height: 40,
                width: '100%',
                marginTop: '1.1vw',
                marginBottom: '2.1vw',
              }}
              title="Change Password"
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
          </View>
        </View>
        {/* 2nd column */}
        <View style={{flex: DEVICE_WIDTH > 767 ? '0.3' : '100%'}}>
          <Text style={styles.heading}>Account Info</Text>
          <Input1
            editable={false}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => setName(text)}
            value={name}
            label="First Name"
            placeholder=""></Input1>
          <Input1
            editable={false}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => setName(text)}
            value={lname}
            label="Last Name"
            placeholder=""></Input1>
          <Input1
            editable={false}
            inputStyle={{
              padding: 10,
              height: 40,
              paddingHorizontal: 5,
              flexWrap: 'wrap',
              overflow: 'hidden',
              backgroundColor: 'red',
            }}
            setCode={(text) => setName(text)}
            value={email}
            label="Email"
            placeholder=""></Input1>

          <Input1
            editable={false}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => setAge(text)}
            value={age}
            label="Age at Registration as on Signup Screen"
            placeholder=""></Input1>
          <Input1
            type=""
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => {
              setPhone(text);
              setPhoneError('');
            }}
            maxLength={'15'}
            value={phone}
            error={phoneError}
            label="Phone"
            placeholder=""></Input1>
          <Input1
            editable={true}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => {
              setCity(text);
              setCityError('');
            }}
            value={city}
            error={cityError}
            maxLength={'25'}
            label="City"
            placeholder=""></Input1>
          <Input1
            type=""
            maxLength={10}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => {
              setZipcode(text);
              setZipcodeError('');
            }}
            value={zipcode}
            error={zipcodeError}
            label="Zip Code"
            placeholder=""></Input1>
          <Input1
            editable={false}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => setCountry(text)}
            value={country}
            label="Country"
            placeholder=""></Input1>

          <Button
            btnStyle={{
              height: 35,
              width: '100%',
              marginVertical: '2.1vw',
            }}
            onVerifyPress={() => navigator('profile')}
            textStyle={{fontSize: '16px'}}
            title="Update Profile"
            bgColor={DARK_GREEN}
            textColor={WHITE}></Button>
        </View>

        {/* 3rd column */}

        <View style={{flex: DEVICE_WIDTH > 767 ? '0.3' : '100%'}}>
          {/* <Text style={styles.heading}>Language</Text>


        {language.map((item, index) => {
            return (
                <RadioButton1
                    item={item}
                    selectedOption={item.isSelected}
                    outerStyle={[styles.outerCheckbox, { marginVertical: '0.5vw' }]}
                    innerStyle={[
                        styles.outerCheckbox,
                        { borderWidth: 17, borderRadius: '4vw' },
                    ]}
                    label={item.name}
                    onPress={(item) => itemClick(item)}
                />
            );
        })}
        <Button
            onVerifyPress={() => navigator('change_language')}
            textStyle={{ fontSize: '16px' }}
            btnStyle={{

                height: 30,
                width: '100%',
                marginTop: '1.1vw',
            }}
            title="Change"
            textStyle={{ fontSize: 12 }}
            bgColor={DARK_GREEN}
            textColor={WHITE}></Button>  */}

          {/* <View style={styles.hrLine} /> */}
          <Text style={styles.heading}>Notifications</Text>
          {notification.map((item) => {
            return (
              <Toggle
                onPress={(selected_value) => navigator('toggle_notify', item)}
                item={item}
                title={item.name}
                enabled={item.isSelected}
              />
            );
          })}
        </View>
      </View>
      <Footer />
    </View>
  );
}
export default ProfileDetails = React.memo(ProfileDetails);
//export default ProfileDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  borderLine: {
    height: 1,
    backgroundColor: '#A9A9AA',
    marginHorizontal: 3,
  },
  checkbox: {
    borderRadius: 10,
    color: 'black',
  },
  heading: {
    // fontSize: '1.2vw',
    fontSize: '24px',

    fontWeight: '700',
    fontStyle: 'normal',
    color: '#313132',
    marginBottom: '0.5vw',
    fontSize: 13,
  },
  backBtn: {
    alignItems: 'flex-start',
    padding: '2vw',
    paddingBottom: '16px',
  },
  hrLine: {
    height: 1,
    backgroundColor: '#BBBBBB',
    marginVertical: '1.8vw',
  },
  verticalLine: {
    height: 20,
    width: 2,
    backgroundColor: '#8792A2',
  },
  outerCheckbox: {
    borderRadius: '4vw',
  },
});
