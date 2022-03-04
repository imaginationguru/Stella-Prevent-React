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
function Contact(props) {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

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
            <div className='bk-btn-wrap'>
              <BackToDashboard />
            </div>
            <div className='contactus-wrapper'>
              <h4 className='t-heading'>Let us know how we can help!</h4>
              <div className='contactform'>
                <form>
                  <div className='cell-row'>
                    <div className='cell-33'>
                      <label className='cell-label'>First Name</label>
                      <div className='cell-field has-icon'>
                        <input type="text" />
                        <span className='cell-icon'></span>
                      </div>
                    </div>
                    <div className='cell-33'>
                      <label className='cell-label'>Last Name</label>
                      <div className='cell-field has-icon'>
                        <input type="text" />
                        <span className='cell-icon'></span>
                      </div>
                    </div>
                    <div className='cell-33'>
                      <label className='cell-label'>Email</label>
                      <div className='cell-field has-icon'>
                        <input type="text" />
                        <span className='cell-icon'></span>
                      </div>
                    </div>
                  </div>
                  <div className='cell-row'>
                    <div className='cell-100'>
                      <label className='cell-label'>Message</label>
                      <div className='cell-field'>
                        <textarea></textarea>
                      </div>
                    </div>
                  </div>
                  <div className='c-form-footer text-right'>
                    <button className='btn-green'>Send</button>
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
