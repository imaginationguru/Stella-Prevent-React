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
  Platform,
  useWindowDimensions,
  Dimensions,
} from 'react-native';

import GLOBALS from '../../constants';
const DEVICE_WIDTH = Dimensions.get('window').width;

const {COLORS, FONTS} = GLOBALS;
const {LIGHT_BLACK, WHITE, HEADING_BLACK, BLACK, DARK_GREEN} = COLORS;
import Header from '../../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import MasterLayout from '../../components/MasterLayout';
import BackToDashboard from '../../components/common/backToDashboard';
import Footer from '../../components/Footer';
import BackBtn from '../../components/common/backbtn';
import ProfileHeader from '../../components/common/profileHeader';
import commonStyles from '../dailyLearningWeeks/commonStyles';
import {emailRegex} from '../../utils/RegexUtils';
import * as AppActions from '../../actions';
function Contact(props) {
  const {loginData} = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMesage] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMesageError] = useState('');
  const [weekDataDynamic, setweekDataDynamic] = useState([
    {
      value: '1',
      label: 'Subject 1',
    },
    {
      value: '2',
      label: 'Subject 2',
    },
    {
      value: '3',
      label: 'Subject 3',
    },
    {
      value: '4',
      label: 'Subject 4',
    },
  ]);
  const [selecteditem, setSelectedItem] = useState(1);
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(loginData, 'loginData');
    if (loginData?.user?._id) {
      console.log('enter');
      setFirstName(loginData.user.firstName);
      setEmail(loginData.user.email);
      setLastName(loginData.user.lastName);
    }
  }, []);

  const onWeekChange = (event) => {
    setValue(event.target.value);
    setSelectedItem(event.target.value.replace('Week' + ' ', ''));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'firstName') {
      setFirstName(value);
      setFirstNameError('');
    }
    if (name === 'LastName') {
      setLastName(value);
      setLastNameError('');
    }
    if (name === 'Email') {
      setEmail(value);
      setEmailError('');
    }
    if (name === 'Message') {
      setMesage(value);
      setMesageError('');
    }
  };

  const onSend = (e) => {
    e.preventDefault();

    const params = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      message: message,
      subject: value,
    };

    if (firstName.length === 0) {
      setFirstNameError('Please fill first name');
    } else if (lastName.length === 0) {
      setLastNameError('Please fill last name');
    } else if (email.length === 0) {
      setEmailError('Please fill email');
    } else if (email.length && !emailRegex.test(email)) {
      setEmailError('Please fill  valid email');
    } else if (message.length === 0) {
      setMesageError('Please fill message');
    } else {
      dispatch(AppActions.contactUs(params));
      // setFirstName('');
      // setLastName('');
      setMesage('');
      // setEmail('');
    }
  };

  return (
    // <MasterLayout>
    //   <div className="main-dashboard">
    //     <BackToDashboard />
    //     <Text>hhi</Text>
    //   </div>
    // </MasterLayout>
    <div className="main-dashboard">
      <View style={[styles.container, {}]}>
        {loginData?.user?._id ? (
          <ProfileHeader
            {...props}
            showProfileBtn={false}
            showEditIcon={true}
            onEditClick={(file) => selectImage(file)}
          />
        ) : null}
        <div className="v-container m-tb-30">
          <div className="blob-container">
            <div className="bk-btn-wrap">
              <BackToDashboard
                isLoginPage={loginData?.user?._id ? false : true}
              />
            </div>
            <div className="contactus-wrapper">
              <h4 className="t-heading">Let us know how we can help!</h4>
              <div className="contactform">
                <form noValidate onSubmit={(e) => onSend(e)}>
                  <label className="cell-label">Subject</label>
                  <div
                    className="c-dropdown"
                    style={{
                      width: '100%',
                      margin: '0 auto',
                      borderRadius: '12px',
                      padding: '5px',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                      boxShadow:
                        '0px 30.2415px 60.4831px rgba(0, 111, 89, 0.38)',
                      border: '1px solid rgba(0, 111, 89, 0.38)',
                      marginBottom: 20,
                    }}>
                    <select
                      value={value}
                      onChange={onWeekChange}
                      style={{
                        width: '100%',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        backgroundColor: '#ffffff',
                        border: '0px solid rgba(0, 111, 89, 0.38)',
                      }}>
                      {weekDataDynamic.map((item) => {
                        return <option value={item.value}>{item.label}</option>;
                      })}
                    </select>
                  </div>
                  {loginData?.user?._id ? null : (
                    <div className="cell-row">
                      <div className="cell-33">
                        <label className="cell-label">First Name</label>
                        <div className="cell-field has-icon">
                          <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            value={firstName}
                          />
                          <span style={commonStyles.error}>
                            {firstNameError}
                          </span>
                        </div>
                      </div>
                      <div className="cell-33">
                        <label className="cell-label">Last Name</label>
                        <div className="cell-field has-icon">
                          <input
                            type="text"
                            name="LastName"
                            onChange={handleChange}
                            value={lastName}
                          />
                          <span style={commonStyles.error}>
                            {lastNameError}
                          </span>
                        </div>
                      </div>
                      <div className="cell-33">
                        <label className="cell-label">Email</label>
                        <div className="cell-field has-icon">
                          <input
                            type="text"
                            name="Email"
                            onChange={handleChange}
                            value={email}
                          />
                          <span style={commonStyles.error}>{emailError}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="cell-row">
                    <div className="cell-100">
                      <label className="cell-label">Message</label>
                      <div className="cell-field">
                        <textarea
                          name="Message"
                          onChange={handleChange}
                          value={message}></textarea>
                        <span style={commonStyles.error}>{messageError}</span>
                      </div>
                    </div>
                  </div>
                  <div className="c-form-footer text-right">
                    <button className="btn-green">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </View>
    </div>
  );
}
export default Contact = React.memo(Contact);
//export default ProfileDetails;
const styles = StyleSheet.create({
  container: {},
});
