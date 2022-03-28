import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import GLOBALS from '../../../constants';
import Header from '../../../components/Header';
import Button from '../../../components/common/button';
import DropDown from '../../../components/common/dropDown';
import {countryData} from '../../../utils/CountryCode';
 import back from '../../../assets/images/subscription/back.png';
import logo from '../../../assets/images/subscription/logoTm.png';
import book from '../../../assets/images/subscription/book.png';
import paypal from '../../../assets/images/subscription/paypal.png';
import apple from '../../../assets/images/subscription/apple.png';
  import Input from '../../../components/Input';
import {navigatorPush} from '../../../config/navigationOptions.web';

const {COLORS, FONTS} = GLOBALS;
const {
  BLUR,
  WHITE,
  BORDER_COLOR,
  SHADOW_COLOR,
  HEADING_BLACK,
  BLACK,
  DARK_GREEN,
} = COLORS;
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {validateEmail, validateIsEmpty} from '../../../utils/validations';
const Payment = (props) => {
  console.log('payment module props', props);
  let premiumPrice = props.location.state;
  const [price, setPrice] = useState(premiumPrice);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [showModal, setModalVisibility] = useState(false);
  const [list, setArryData] = useState([]);
  const [popUpTitle, setTitle] = useState('');

  const [emailError, setEmailError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [nameError, setNameError] = useState('');
  const [zipError, setZipError] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (
      validateIsEmpty(name) ||
      validateIsEmpty(email) ||
      validateIsEmpty(country) ||
      validateIsEmpty(zipCode)
    ) {
      if (validateIsEmpty(name)) setNameError('Please enter name');
      if (validateIsEmpty(email)) setEmailError('Please enter email');
      if (!validateEmail(email)) setEmailError('Please enter valid email');
      if (validateIsEmpty(country)) setCountryError('please select country');
      if (validateIsEmpty(zipCode)) setZipError('please enter zipcode');
    } else {
     }
  };

  const navigator = (type, data) => {
    switch (type) {
      case 'country':
        setArryData(countryData);
        setTitle('Select Country');
        setModalVisibility(true);
        break;
      case 'selected_gender':
        console.log(data);
        setCountry(data);
        setCountryError('');
        setModalVisibility(false);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.innerLeft}>
          <Image source={logo} style={{width: 150, height: 50}} />
          <View style={{marginTop: '3vw', marginHorizontal: '7.5vw'}}>
            <TouchableOpacity
              style={{flexDirection: 'row', width: '25%'}}
              onPress={() =>
                navigatorPush({
                  screenName: 'Subscription',
                })
              }>
              <Image source={back} style={{width: 20, height: 20}} />
              <Text
                style={{
                  marginLeft: '1.5vw',
                  fontFamily: 'HKGrostesk Medium',
                  fontSize: '1.2vw',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  color: '#1A1F36',
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <View style={{marginLeft: '3vw', marginTop: '2.5vw'}}>
              <Text
                style={{
                  fontFamily: 'HKGrostesk',
                  fontSize: '1.5vw',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  color: '#697386',
                }}>
                Premium
              </Text>
              <Text
                style={{
                  marginTop: '1vw',
                  fontFamily: 'HKGrostesk',
                  fontSize: '2.2vw',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  color: '#1A1F36',
                }}>
                {price}
              </Text>
            </View>
            <View
              style={{
                marginLeft: '5vw',
                marginTop: '3vw',
                alignItems: 'center',
              }}>
              <Image source={book} style={{height: 222, width: 222}} />
              <View style={{flexDirection: 'row', marginTop: '6vw'}}>
                <View style={styles.verticalLine} />

                <TouchableOpacity style={{marginHorizontal: '1vw'}}>
                  <Text style={styles.terms}>Terms</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.terms}>Privacy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.innerRight}>
          {/* 
           <View style={styles.paypalBox}>
            <Image source={paypal} style={{width: '2.4vw', height: '2.1vw'}} />
          </View>
          <TouchableOpacity style={styles.paypalPay}>
            <Image source={apple} style={{width: '3.4vw', height: '1.4vw'}} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '3vw',
              alignItems: 'center',
            }}>
            <View style={styles.horizontalLine} />
            <Text
              style={{
                fontFamily: 'Inter Regular',
                fontSize: '1.1vw',
                fontStyle: 'normal',
                fontWeight: '500',
                color: '#8792A2',
                marginHorizontal: '1vw',
              }}>
              Or pay with card
            </Text>
            <View style={styles.horizontalLine} />
          </View>
          */}

          <View style={{marginTop: '5vw'}}>
            <Input
              type="email"
              inputStyle={{padding: 10, height: 40}}
              setCode={(text) => setEmail(text)}
              value={email}
              error={emailError}
              label="Email"
              placeholder=""></Input>
            <Input
              type="cards"
              maxLength={20}
              inputStyle={{padding: 10, height: 40}}
              setCode={(text) => setCardNumber(text)}
              value={cardNumber}
               label="Card number"
              placeholder="1234 1234 1234 1234"></Input>
            <View style={{flex:1,flexDirection: 'row',marginTop:-25,}}>
              <Input
                type=""
                maxLength={20}
                inputStyle={{padding: 10,  height: 40,}}
                setCode={(text) => setExpDate(text)}
                value={expDate}
                 placeholder="MM / YY"></Input>
              <Input
                type="key"
                maxLength={20}
                inputStyle={{padding: 10, height: 40,}}
                setCode={(text) => setCvc(text)}
                value={cvc}
                 placeholder="CVC"></Input>
            </View>
            <Input
              type=""
              maxLength={30}
              inputStyle={{padding: 10, height: 40}}
              setCode={(text) => setName(text)}
              value={name}
              error={nameError}
              label="Name on card"
              placeholder=""></Input>
            <Input
              type="dropdown"
              btnPress={() => navigator('country')}
              isDropdown={true}
              maxLength={20}
              inputStyle={{padding: 10}}
              setCode={(text) => setCountry(text)}
              value={country}
              error={countryError}
              label="Select Country"
              placeholder={''}
            />
            <Input
              type=""
              maxLength={6}
              inputStyle={{padding: 10,marginTop:-25, height: 40}}
              setCode={(text) => setZipCode(text)}
              value={zipCode}
              error={zipError}
              placeholder="ZIP"></Input>
            <Button
              btnStyle={{
                height: 40,
                width: '100%',
                marginTop: '1.1vw',
                alignSelf: 'center',
              }}
              onVerifyPress={onSubmit}
              title={'Pay' + ' ' + price}
              bgColor={DARK_GREEN}
              textColor={WHITE}></Button>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onDismiss={() => {
          setModalVisibility(false);
          console.log('Modal has been closed.');
        }}>
        <DropDown
          onItemSelection={(type, data) => {
            navigator(type, data);
          }}
          data={list}
          title={popUpTitle}
        />
      </Modal>
    </View>
  );
};

export default Payment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: '2%',
  },
  innerLeft: {
    flex: 0.5,
  },
  innerRight: {
    flex: 0.5,
    paddingHorizontal: '7.5vw',
  },
  horizontalLine: {
    height: 1,
    width: '15.5vw',
    backgroundColor: '#3c42571f',
  },
  verticalLine: {
    height: 20,
    width: 2,
    backgroundColor: '#8792A2',
  },
  paypalBox: {
    marginTop: '5vw',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: WHITE,
    borderColor: BORDER_COLOR,
    shadowColor: BORDER_COLOR,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 10,
    height: 40,
  },
  paypalPay: {
    marginTop: '1vw',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: BLACK,
    height: 40,
  },
  terms: {
    fontSize: '1vw',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#8792A2',
  },
});