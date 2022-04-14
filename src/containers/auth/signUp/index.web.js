// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import brand from '../../../assets/images/brand.svg';
// import graphic01 from '../../../assets/images/graphic01.svg';
// import icon01 from '../../../assets/images/icon01.svg';
// import icon02 from '../../../assets/images/icon02.svg';
// import icon03 from '../../../assets/images/icon03.svg';
// import icon04 from '../../../assets/images/icon04.svg';
// import MasterLayout from '../../../components/MasterLayout';
// import { LANGUAGELIST } from '../../../i18n/constants';
// import { translate as ts, changeLanguage } from '../../../i18n/translate';
// import DropDown from '../../../components/Dropdown';
// import { changeLanguageAction } from '../../../actions/common';
// import { Link } from 'react-router-dom';
// import { countryData } from '../../../utils/CountryCode';
// // import 'react-calendar/dist/Calendar.css';
// import commonStyles from '../../dailyLearningWeeks/commonStyles';
// import { emailRegex } from '../../../utils/RegexUtils';
// const genderData = [
//   {
//     id: 1,
//     label: 'Male',
//   },
//   {
//     id: 2,
//     label: 'Female',
//   },
//   {
//     id: 3,
//     label: 'Other',
//   },
// ];
// const SignUp = () => {
//   const [language, setLanguage] = useState('');
//   const [gender, setGender] = useState('');
//   const [country, setCountry] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [middleName, setMiddleName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dob, setDob] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [firstNameError, setFirstNameError] = useState('');
//   const [middleNameError, setMiddleNameError] = useState('');
//   const [lastNameError, setLastNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [countryError, setCountryError] = useState('');
//   const [phoneNumberError, setPhoneNumberError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const [dobError, setDobError] = useState('');
//   const [zipCodeError, setZipCodeError] = useState('');
//   const [genderError, setGenderError] = useState('');
//   const [languageError, setLanguageError] = useState('');
//   const dispatch = useDispatch();
//   const languageHandler = (val) => {
//     dispatch(changeLanguageAction(val));
//     setLanguage(val);
//     changeLanguage(val);
//   };

//   const data = LANGUAGELIST.length
//     ? LANGUAGELIST.map((item) => {
//       return { id: item.locale, label: item.title };
//     })
//     : [];
//   const countryName = countryData.length
//     ? countryData.map((item) => {
//       return { id: item.dial_code, label: item.name };
//     })
//     : [];

//   const handleChange = (e) => {
//     console.log('name>>>>>>>>>>>>', e.target.name, e.target.value);
//     const { name, value } = e.target;
//     if (name === 'firstName') {
//       setFirstName(value);
//       setFirstNameError('');
//     }
//     if (name === 'middleName') {
//       setMiddleName(value);
//       setMiddleNameError('');
//     }
//     if (name === 'lastName') {
//       setLastName(value);
//       setLastNameError('');
//     }
//     if (name === 'email') {
//       setEmail(value);
//       setEmailError('');
//     }
//     if (name === 'password') {
//       setPassword(value);
//       setPasswordError('');
//     }
//     if (name === 'confirmPassword') {
//       setConfirmPassword(value);
//       setConfirmPasswordError('');
//     }
//     if (name === 'country') {
//       setCountry(value);
//       setCountryError('');
//     }
//     if (name === 'dob') {
//       setDob(value);
//       setDobError();
//     }
//     if (name === 'gender') {
//       setGender(value);
//       setGenderError();
//     }
//     if (name === 'phoneNumber') {
//       setPhoneNumber(value);
//       setPhoneNumberError('');
//     }
//     if (name === 'zipCode') {
//       setZipCode(value);
//       setZipCodeError('');
//     }
//     if (name === 'language') {
//       setLanguage(value);
//       setLanguageError('');
//     }
//   };

//   const onSignup = (e) => {
//     e.preventDefault();

//     const params = {
//       email: email,
//       password: password,
//       firstName: firstName,
//       middleName: middleName,
//       lastName: lastName,
//       gender: gender,
//       dob: dob,
//       profession: null,
//       phoneNumber: phoneNumber,
//       phoneCountry: country,
//       countryCode: country,
//       zipcode: zipCode,
//       hregister: null,
//       hospital_id: '5ed71bfc2e0030dee029b301',
//       userType: 'patient',
//       registeredFromStellaPrevent: true,
//       language: language,
//     };
//     console.log('language>>>>data>>>>>>', params);
//     if (firstName.length === 0) {
//       setFirstNameError('please fill first name');
//     }
//     /*
//     else if (middleName.length === 0) {
//       setMiddleNameError('please fill middle name');
//     }
//     */
//     else if (lastName.length === 0) {
//       setLastNameError('please fill last name');
//     } else if (email.length === 0) {
//       setEmailError('please fill email');
//     } else if (email.length && !emailRegex.test(email)) {
//       setEmailError('please fill  valid email');
//     } else if (country.length === 0) {
//       setCountryError('please fill country name');
//     } else if (phoneNumber.length === 0) {
//       setPhoneNumberError('please fill phone number');
//     } else if (password.length === 0) {
//       setPasswordError('Please fill Password');
//     } else if (confirmPassword.length === 0) {
//       setConfirmPasswordError('Please fill Confirm Password');
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords don't match");
//     }
//     /*
//     else if (zipCode.length === 0) {
//       setZipCodeError('please fill zip ');
//     }
//     else if (zipCode.length > 6) {
//       setZipCodeError('Not greater than 6 digit');
//     }
//     */
//     else if (dob.length === 0) {
//       setDobError('please fill dob');
//     } else if (gender.length === 0) {
//       setGenderError('please fill gender');
//     }
//     /*
//      else if (language.length === 0) {
//       setLanguageError('please fill language');
//     }
//     */
//     dispatch(AppActions.register(params));
//   };

//   console.log('dial_code>>>>>>>>>>>', country);
//   return (
//     <>
//       <MasterLayout>
//         <div className="login">
//           <div className="signup-left">
//             <div className="b-name">
//               <img src={brand} className="b1-name" />
//             </div>
//             <div className="graphics">
//               <img src={graphic01} className="b1-name" />
//             </div>
//           </div>
//           <div className="login-right">
//             <div className="login-content full-width">
//               <h2 className="heading text-center">{ts('SIGNUP')}</h2>

//               <div className="login-form">
//                 <form noValidate onSubmit={(e) => onSignup(e)}>
//                   <div className="formRow">
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">{ts('FIRST_NAME')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="text"
//                           className="f-field"
//                           name="firstName"
//                           onChange={handleChange}
//                           value={firstName}
//                         />
//                         <span className="f-icon">
//                           <img src={icon03} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{firstNameError}</span>
//                     </div>
//                     <div className="w50" style={commonStyles.w501}>
//                       {/*
//                       <label className="formLabel">{ts('MIDDLE_NAME')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="text"
//                           className="f-field"
//                           name="middleName"
//                           onChange={handleChange}
//                           value={middleName}
//                         />
//                         <span className="f-icon">
//                           <img src={icon03} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{middleNameError}</span>
//                        */}
//                       <label className="formLabel">{ts('LAST_NAME')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="text"
//                           className="f-field"
//                           name="lastName"
//                           onChange={handleChange}
//                           value={lastName}
//                         />
//                         <span className="f-icon">
//                           <img src={icon03} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{lastNameError}</span>
//                     </div>
//                   </div>

//                   <div className="formRow">
//                     <div className="w50" style={commonStyles.w501}>
//                       {/*
//                       <label className="formLabel">{ts('LAST_NAME')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="text"
//                           className="f-field"
//                           name="lastName"
//                           onChange={handleChange}
//                           value={lastName}
//                         />
//                         <span className="f-icon">
//                           <img src={icon03} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{lastNameError}</span>
//                       */}
//                       <label className="formLabel">{ts('EMAIL')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="email"
//                           className="f-field"
//                           name="email"
//                           onChange={handleChange}
//                           value={email}
//                         />
//                         <span className="f-icon">
//                           <img src={icon01} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{emailError}</span>

//                     </div>
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">{ts('PHONE_NUMBER')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="number"
//                           className="f-field"
//                           name="phoneNumber"
//                           onChange={handleChange}
//                           value={phoneNumber}
//                         />
//                         <span className="f-icon">
//                           <img src={icon04} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{phoneNumberError}</span>
//                     </div>
//                   </div>

//                   <div className="formRow">
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">
//                         {ts('SELECT_COUNTRY')}
//                       </label>

//                       <div className="formField">
//                         <DropDown
//                           value={country}
//                           handleChange={(e) => {
//                             setCountry(e.target.value);
//                             setCountryError('');
//                           }}
//                           data={countryName}
//                           name="country"
//                         />
//                       </div>
//                       <span style={commonStyles.error}>{countryError}</span>
//                     </div>
//                     <div className="w50" style={commonStyles.w501}>

//                     </div>
//                   </div>
//                   <div className="formRow">
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">{ts('PASSWORD')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="password"
//                           className="f-field"
//                           name="password"
//                           onChange={handleChange}
//                           value={password}
//                         />
//                         <span className="f-icon">
//                           <img src={icon02} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>{passwordError}</span>
//                     </div>
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">
//                         {ts('CONFIRM_PASSWORD')}
//                       </label>
//                       <div className="formField has-icon">
//                         <input
//                           type="password"
//                           className="f-field"
//                           name="confirmPassword"
//                           onChange={handleChange}
//                           value={confirmPassword}
//                         />
//                         <span className="f-icon">
//                           <img src={icon02} />
//                         </span>
//                       </div>
//                       <span style={commonStyles.error}>
//                         {confirmPasswordError}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="formRow">
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">{ts('DOB')}</label>
//                       <div className="formField">
//                         <input
//                           type="date"
//                           className="f-field"
//                           name="dob"
//                           onChange={handleChange}
//                           value={dob}
//                         />
//                       </div>
//                       <span style={commonStyles.error}>{dobError}</span>
//                     </div>
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">{ts('GENDER')}</label>
//                       <div className="formField">
//                         <DropDown
//                           value={gender}
//                           handleChange={(e) => {
//                             setGender(e.target.value);
//                             setGenderError('');
//                           }}
//                           name="gender"
//                           data={genderData}
//                         />
//                       </div>
//                       <span style={commonStyles.error}>{genderError}</span>
//                     </div>
//                   </div>
//                   {/*
//                   <div className="formRow">
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">{ts('ZIP_CODE')}</label>
//                       <div className="formField has-icon">
//                         <input
//                           type="number"
//                           className="f-field"
//                           name="zipCode"
//                           onChange={handleChange}
//                           value={zipCode}
//                         />
//                       </div>
//                       <span style={commonStyles.error}>{zipCodeError}</span>
//                     </div>
//                     <div className="w50" style={commonStyles.w501}>
//                       <label className="formLabel">
//                         {ts('LANGUAGE_SELECT')}
//                       </label>
//                       <div className="formField">
//                         <DropDown
//                           value={language}
//                           handleChange={(e) => {
//                             languageHandler(e.target.value);
//                             setLanguage(e.target.value);
//                             setLanguageError('');
//                           }}
//                           data={data}
//                           name={language}
//                         />
//                       </div>
//                       <span style={commonStyles.error}>{languageError}</span>
//                     </div>
//                   </div>
//                   */}
//                   <div className="formRow">
//                     <div className="w100">
//                       <div className="formSubmit">
//                         <input
//                           type="submit"
//                           className="btn-solid"
//                           value={ts('SIGNUP')}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <p className="additional-link">
//                 {ts('ALREADY_ACCOUNT')}&nbsp;
//                 <Link to="/" className="link">
//                   {ts('LOGIN')}
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </MasterLayout>
//     </>
//   );
// };

// export default SignUp;
