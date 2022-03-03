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
function Contact(props) {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <MasterLayout>
      <div className="main-dashboard">
        <BackToDashboard />
        <Text>hhi</Text>
      </div>
    </MasterLayout>
  );
}
export default Contact = React.memo(Contact);
//export default ProfileDetails;
const styles = StyleSheet.create({
  container: {},
});
