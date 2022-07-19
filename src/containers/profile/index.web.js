import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import { getItem } from '@utils/AsyncUtils';
import * as AppActions from '@actions';
import GLOBALS from '@constants';
import Strings from '@constants/Strings';
import { navigatorPush, navigatorPop } from '@config/navigationOptions.web';
import Footer from '@components/Footer';
import Button from '@components/common/button';
import Toggle from '@components/common/toggle';
import PopUp from '@components/common/popUp';
import BackBtn from '@components/common/backbtn';
import Loader from '@components/Loader';
import ProfileHeader from '@components/common/profileHeader';
const DEVICE_WIDTH = Dimensions.get('window').width;
const { COLORS, FONTS } = GLOBALS;
const { LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN } = COLORS;
import Header from '@components/Header';

import { useSelector, useDispatch } from 'react-redux';
import journal from '@assets/images/subscription/journal.png';
import back from '@assets/images/subscription/back.png';
import Input1 from '@components/TextInput';
import RadioButton1 from '@components/RadioButton1';
import { customAlert } from '@helpers/commonAlerts.web';
import {
  validateIsEmpty,
  validatePassword,
  validateContact,
  validateZipcode,
  validateANZipcode,
  validatePhoneWithSpecialSymbol,
  validateName,
} from '@utils/validations';
import { normalize } from '@utils/Helper';
import { translate as ts } from '@i18n/translate';

const { IMAGE_BASE_URL } = GLOBALS;

function ProfileDetails({ props, componentId }) {
  const layout = useWindowDimensions();
  const { loginData = {} } = useSelector((state) => state.authReducer);
  const { getLanguages = {} } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.common);

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
  const [language, setLanguage] = useState(getLanguages);
  /**Change Notification  */
  const [notification, setNotification] = useState([
    { id: 1, value: 'email', name: ts('EMAIL_NOTIFY'), isSelected: false },
    { id: 2, value: 'sms', name: ts('SMS_NOTIFY'), isSelected: true },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginData) {
      setName(loginData.user.firstName);
      setLName(loginData.user.lastName);
      setEmail(loginData.user.email);
      setPhone(loginData.user.phoneNumber);
      setCountry(loginData.user.countryName);
      setZipcode(loginData.user.zipcode);
      setCity(loginData.user.city ? loginData.user.city : '');
      setAge(loginData.user.ageYear ? loginData.user.ageYear + 'Y' : '');
      let temp_language = language.map((el) =>
        el.value === loginData.user.language
          ? { ...el, isSelected: true }
          : { ...el, isSelected: false },
      );
      setLanguage(temp_language);

      let temp_notification = notification.map((el, index) =>
        index == 0
          ? { ...el, isSelected: loginData.user.email_notification }
          : { ...el, isSelected: loginData.user.sms_notification },
      );
      setNotification(temp_notification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  useEffect(() => {
    dispatch(AppActions.updateUserData({ user_id: getItem('userId') }));
    dispatch(AppActions.getLanguages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**CHandle submit click of profile button */
  const navigator = (type, item) => {
    switch (type) {
      case 'profile':
        if (validateIsEmpty(phone?.trim()))
          setPhoneError('Please enter phone number');
        else if (!validatePhoneWithSpecialSymbol(phone) || phone.length < 10)
          setPhoneError('Please enter a valid phone number');
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
          el.id === item.id ? { ...el, isSelected: !el.isSelected } : { ...el },
        );
        setNotification(temp_array);
        let notify_param = {
          email_notification: temp_array[0].isSelected,
          sms_notification: temp_array[1].isSelected,
          user_id: getItem('userId'),
        };
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
    console.log('Priyanka_item', item)
    let temp_language = language.map((el) =>
      el.id === item ? { ...el, isSelected: true } : { ...el, isSelected: false },
    );
    setLanguage(temp_language);
  };

  /**Select Image for Uploading*/
  const selectImage = (file) => {
    if (!file) return;

    if (file.type.includes('image')) {
      if (file.size > 10240000) {
        customAlert(ts('FILE_LARGE_ERROR'), 'error');
        return;
      }
      let formdata = new FormData();
      formdata.append('user_id', getItem('userId'));
      formdata.append('file', file);

      dispatch(AppActions.uploadProfile(formdata));
    } else {
      customAlert(ts('INCORRECT_FILE_ERROR'), 'error');
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
      <BackBtn
        onPress={() => navigatorPush({ componentId, screenName: 'Dashboard' })}
      />
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
        <View style={{ flex: DEVICE_WIDTH > 767 ? '0.3' : '100%' }}>
          <View>
            <Text style={styles.heading}>{ts('PLAN')}</Text>
            <View style={{ flexDirection: 'row', marginTop: '16px' }}>
              <Image
                resizeMode={'contain'}
                source={`${IMAGE_BASE_URL}${loginData?.planInfo?.image}`}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={{
                  /// fontFamily: 'Inter',
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
                  passProps: { currentPlan: loginData?.planInfo },
                })
              }
              textStyle={{
                fontSize: '16px',
              }}
              title={loginData?.planInfo?.price == 0 ? ts('UPGRADE') : ts('VIEW_PLANS')}
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
            <View style={styles.hrLine} />

            <Text style={styles.heading}>{ts('CHANGE_PASSWORD')}</Text>
            <Input1
              secureTextEntry={true}
              inputStyle={{ padding: 10, height: 40 }}
              setCode={(text) => {
                setPassword(text);
                setPswdError('');
              }}
              value={password}
              error={pswdError}
              label={ts('CURRENT_PASSWORD')}></Input1>
            <Input1
              secureTextEntry={true}
              error={newpswdError}
              inputStyle={{ padding: 10, height: 40 }}
              setCode={(text) => {
                setNewPassword(text);
                setNewPswdError('');
              }}
              value={Newpassword}
              label={ts('NEW_PASSWORD')}
              placeholder=""></Input1>
            <Input1
              secureTextEntry={true}
              error={cnpswdError}
              inputStyle={{ padding: 10, height: 40 }}
              setCode={(text) => {
                setConfPassword(text);
                setConfirmPswdError('');
              }}
              value={Confpassword}
              label={ts('CONFIRM_NEW_PASSWORD')}></Input1>
            <Button
              onVerifyPress={() => validateField()}
              textStyle={{ fontSize: '16px' }}
              btnStyle={{
                height: 40,
                width: '100%',
                marginTop: '1.1vw',
                marginBottom: '2.1vw',
              }}
              title={ts('CHANGE_PASSWORD')}
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
          </View>
        </View>
        {/* 2nd column */}
        <View style={{ flex: DEVICE_WIDTH > 767 ? '0.3' : '100%' }}>
          <Text style={styles.heading}>{ts('ACCOUNT_INFO')}</Text>
          <Input1
            editable={false}
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => setName(text)}
            value={name}
            label={ts('FIRST_NAME')}
            placeholder=""></Input1>
          <Input1
            editable={false}
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => setName(text)}
            value={lname}
            label={ts('LAST_NAME')}
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
            label={ts('EMAIL')}
            placeholder=""></Input1>

          <Input1
            editable={false}
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => setAge(text)}
            value={age}
            label={ts('AGE_AT_REGISTRATION')}
            placeholder=""></Input1>
          <Input1
            type=""
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => {
              setPhone(text);
              setPhoneError('');
            }}
            maxLength={'15'}
            value={phone}
            error={phoneError}
            label={ts('PHONE')}
            placeholder=""></Input1>
          <Input1
            editable={true}
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => {
              setCity(text);
              setCityError('');
            }}
            value={city}
            error={cityError}
            maxLength={'25'}
            label={ts('CITY')}
            placeholder=""></Input1>
          <Input1
            type=""
            maxLength={10}
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => {
              setZipcode(text);
              setZipcodeError('');
            }}
            value={zipcode}
            error={zipcodeError}
            label={ts('ZIP_CODE')}
            placeholder=""></Input1>
          <Input1
            editable={false}
            inputStyle={{ padding: 10, height: 40 }}
            setCode={(text) => setCountry(text)}
            value={country}
            label={ts('COUNTRY')}
            placeholder=""></Input1>

          <Button
            btnStyle={{
              height: 35,
              width: '100%',
              marginVertical: '2.1vw',
            }}
            onVerifyPress={() => navigator('profile')}
            textStyle={{ fontSize: '16px' }}
            title={ts('UPDATE_PROFILE')}
            bgColor={DARK_GREEN}
            textColor={WHITE}></Button>
        </View>

        {/* 3rd column */}

        <View style={{ flex: DEVICE_WIDTH > 767 ? '0.3' : '100%' }}>
          <Text style={styles.heading}>Language</Text>
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
                label={item.language_name}
                onPress={(item) => itemClick(item)}
              />
            );
          })}
          <Button
            onVerifyPress={() => navigator('change_language')}
            textStyle={{ fontSize: '16px' }}
            btnStyle={{
              height: 35,
              width: '100%',
              marginVertical: '2.1vw',
            }}

            title="Change"
            bgColor={DARK_GREEN}
            textColor={WHITE}></Button>

          <View style={styles.hrLine} />
          <Text style={styles.heading}>{ts('NOTIFICATION')}</Text>
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
    // fontSize: '24px',

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
