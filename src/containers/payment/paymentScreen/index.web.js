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
  Linking,
} from 'react-native';
import GLOBALS from '../../../constants';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import Button from '../../../components/common/button';
import DropDown from '../../../components/common/dropDown';
import {countryData} from '../../../utils/CountryCode';

import ProfileHeader from '../../../components/common/profileHeader';
//import {screenHeight, screenWidth} from '../../utils/dimension';
import back from '../../../assets/images/subscription/back.png';
import logo from '../../../assets/images/subscription/logoTm.png';
import book from '../../../assets/images/subscription/book.png';
import paypal from '../../../assets/images/subscription/paypal.png';
import apple from '../../../assets/images/subscription/apple.png';
//import key from '../../../assets/images/subscription/key.png';
//import cards from '../../../assets/images/subscription/cards.png';
import Input from '../../../components/Input';
import {
  navigatorPush,
  navigatorPop,
} from '../../../config/navigationOptions.web';
import {
  SquarePaymentsForm,
  CreditCardInput,
} from 'react-square-web-payments-sdk';
import {getItem} from '../../../utils/AsyncUtils';
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

import BackBtn from '../../../components/common/backbtn';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../actions';
import {validateEmail, validateIsEmpty} from '../../../utils/validations';
const Payment = (props) => {
  console.log('payment module props', props);
  const {loginData = {}} = useSelector((state) => state.authReducer);
  let premiumPrice = props.location.state.price;
  const [price, setPrice] = useState(premiumPrice);
  const [email, setEmail] = useState(loginData?.user?.email);
  const [name, setName] = useState(
    loginData?.user?.firstName + ' ' + loginData?.user?.lastName,
  );
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
  const {isLoading} = useSelector((state) => state.common);
  useEffect(() => {
    console.log(loginData, 'loginData........');
    setName(loginData?.user?.firstName + ' ' + loginData?.user?.lastName);
    setEmail(loginData?.user?.email);
  }, [loginData]);
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
      // dispatch(AppActions.payment);
    }
  };

  const purchasePlan = (token, buyer) => {
    console.log(token, buyer, 'Finaly data');
    if (validateIsEmpty(name) || validateIsEmpty(email)) {
      if (validateIsEmpty(name)) setNameError('Please enter name');
      if (validateIsEmpty(email)) setEmailError('Please enter email');
      if (!validateEmail(email)) setEmailError('Please enter valid email');
    } else if (token.status && token.status == 'Invalid') {
    } else {
      let param = {
        name_on_card: name,
        amount: props.location.state.numericPrice.toString(),
        currency: 'USD',
        user_id: getItem('userId'),
        card_nonce: token.token,
        email: email,
        plan_id: props.location.state._id,
      };
      dispatch(AppActions.Addpayment(param));
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
      <ProfileHeader
        onProfileClick={() => navigatorPush({screenName: 'Profile'})}
        showProfileBtn={true}
        showEditIcon={false}
      />
      {isLoading ? <Loader /> : null}
      <BackBtn title={'Back'} btnStyle={{paddingLeft: '20px'}} />
      <View style={styles.innerContainer}>
        <View style={styles.innerLeft}>
          <View style={{marginTop: '20px', marginHorizontal: '80px'}}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONTS.SEMI_BOLD,
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  color: '#697386',
                }}>
                Premium
              </Text>
              <Text
                style={{
                  marginTop: '1vw',
                  fontFamily: FONTS.SEMI_BOLD,
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  color: '#1A1F36',
                }}>
                {price}
              </Text>
            </View>
            <View
              style={{
                //  marginLeft: '5vw',
                marginTop: '3vw',
                alignItems: 'center',
              }}>
              <Image source={book} style={{height: '100px', width: '100px'}} />
              <View style={{flexDirection: 'row', marginTop: '30px'}}>
                <View style={styles.verticalLine} />

                <TouchableOpacity
                  onPress={() =>
                    window.open(
                      'https://stella-careportal.curio-dtx.com/upload/acknowldgement.pdf',
                      '_blank',
                    )
                  }
                  style={{marginHorizontal: '10px'}}>
                  <Text style={styles.terms}>Terms</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    window.open(
                      'https://stella-careportal.curio-dtx.com/upload/PRIVACY_POLICY0203_stella.pdf',
                      '_blank',
                    )
                  }>
                  <Text style={styles.terms}>Privacy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.innerRight}>
          <Input
            type="email"
            labelStyle={{
              color: COLORS.text_Gray,
              fontSize: '12px',
              paddingBottom: '5px',
            }}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => setEmail(text)}
            value={email}
            error={emailError}
            label="Email"
            placeholder=""></Input>
          <Input
            labelStyle={{
              color: COLORS.text_Gray,
              fontSize: '12px',
              paddingBottom: '5px',
            }}
            type=""
            maxLength={30}
            inputStyle={{padding: 10, height: 40}}
            setCode={(text) => setName(text)}
            value={name}
            error={nameError}
            label="Name on card"
            placeholder=""></Input>
          <SquarePaymentsForm
            /**
             * Identifies the calling form with a verified application ID
             * generated from the Square Application Dashboard.
             */
            applicationId="sandbox-sq0idb-WPw6oJXhJty7VgI9HN3Edw"
            /**
             * Invoked when payment form receives the result of a tokenize generation request.
             * The result will be a valid credit card or wallet token, or an error.
             */
            cardTokenizeResponseReceived={(token, buyer) => {
              console.log('response...');
              console.info({token, buyer});
              purchasePlan(token, buyer);
            }}
            /**
             * This function enable the Strong Customer Authentication (SCA) flow
             *
             * We strongly recommend use this function to verify the buyer and
             * reduce the chance of fraudulent transactions.
             */
            createVerificationDetails={() => ({
              amount: '40.00',
              // amount: {price},
              /* collected from the buyer */
              billingContact: {
                addressLines: ['123 Main Street', 'Apartment 1'],
                familyName: 'Doe',
                givenName: 'John',
                countryCode: 'GB',
                city: 'London',
              },
              currencyCode: 'GBP',
              intent: 'CHARGE',
            })}
            /**
             * Identifies the location of the merchant that is taking the payment.
             * Obtained from the Square Application Dashboard - Locations tab.
             */
            locationId="L726CAXF29YB8">
            <CreditCardInput />
          </SquarePaymentsForm>
        </View>
      </View>
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
    flexWrap: 'wrap',
    padding: '15px',
    justifyContent: 'center',
  },
  innerLeft: {
    marginBottom: '40px',
    justifyContent: 'center',
  },
  innerRight: {},
  horizontalLine: {
    height: 1,
    width: '15.5vw',
    backgroundColor: '#3c42571f',
  },
  verticalLine: {
    height: '25px',
    width: '2px',
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
    paddingTop: '3px',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#8792A2',
  },
  backBtn: {
    alignItems: 'flex-start',
    padding: '2vw',
  },
});
