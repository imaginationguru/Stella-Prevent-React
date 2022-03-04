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

function Contact(props) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMesage] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMesageError] = useState('');
  useEffect(() => {}, []);

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
    };

    if (firstName.length === 0) {
      setFirstNameError('please fill first name');
    } else if (lastName.length === 0) {
      setLastNameError('please fill last name');
    } else if (email.length === 0) {
      setEmailError('please fill email');
    } else if (email.length && !emailRegex.test(email)) {
      setEmailError('please fill  valid email');
    } else if (message.length === 0) {
      setMesageError('please fill message');
    }
    console.log('data>>>>>>', params);
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
        <ProfileHeader
          {...props}
          showProfileBtn={false}
          showEditIcon={true}
          onEditClick={(file) => selectImage(file)}
        />
        <div className="v-container m-tb-30">
          <div className="blob-container">
            <div className="bk-btn-wrap">
              <BackToDashboard />
            </div>
            <div className="contactus-wrapper">
              <h4 className="t-heading">Let us know how we can help!</h4>
              <div className="contactform">
                <form noValidate onSubmit={(e) => onSend(e)}>
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
                        <span style={commonStyles.error}>{firstNameError}</span>
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
                        <span style={commonStyles.error}>{lastNameError}</span>
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
