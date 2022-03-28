import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, } from 'react-native';
import brand from '../../../assets/images/brand.svg';
import { screenHeight, screenWidth } from "../../../utils/dimension";
import graphic01 from '../../../assets/images/graphic01.svg';
import Input from "../../../components/Input";
import Button from "../../../components/common/button"
import DropDown from "../../../components/common/dropDown"
import { countryData } from '../../../utils/CountryCode';
import GLOBALS from '../../../constants';
const { COLORS, FONTS } = GLOBALS;
const { HEADING_BLACK, LOGIN_BG, DARK_GREEN } = COLORS;
import Modal from 'modal-react-native-web';
const genderData = [
    { code: 1, name: 'Male' },
    { code: 2, name: 'Female' },
    { code: 3, name: 'Other' },
];

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [genderError, setGenderError] = useState('');

    const [showModal, setModalVisibility] = useState(false);
    const [list, setArryData] = useState([]);
    const [popUpTitle, setTitle] = useState("");

    /**On Sign UP Button Press */
    const onSubmit = () => {
        firstName.trim() === "" ? setFirstNameError('Please enter first name') : setFirstNameError('');
        lastName.trim() === "" ? setLastNameError('Please enter last name') : setLastNameError('');
        email.trim() === "" ? setEmailError('Please enter email') : setEmailError('');
        phoneNumber.trim() === "" ? setPhoneNumberError('Please enter phone number') : setPhoneNumberError('');
        gender.trim() === "" ? setGenderError('Please select gender') : setGenderError('');
        password.trim() === "" ? setPasswordError('Please enter password') : setPasswordError('');
        confirmPassword.trim() === "" ? setConfirmPasswordError('Please enter confirm password') : setConfirmPasswordError('');
    }
    const navigator = (type, data) => {
        switch (type) {
            case "gender":
                setArryData(genderData)
                setTitle("Select Gender")
                setModalVisibility(true)
                break;
            case "country":
                setArryData(countryData)
                setTitle("Select Country")
                setModalVisibility(true)
                break;
            case "selected_gender":
                console.log(data);
                setGender(data);
                setGenderError('')

                setModalVisibility(false)
                break;

            default:
                break;
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.loginLeft}>
                <ImageBackground
                    source={graphic01}
                    resizeMode="contain"
                    style={{
                        height: "100%",
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        resizeMode={"contain"}
                        style={styles.logo}
                        source={brand} />
                </ImageBackground>
            </View>
            <View style={styles.loginRight}>
                <View style={{ flex: 1, paddingHorizontal: 10, maxWidth: "90%", }}>
                    <View style={{ flex: 0.9 }}>
                        <Text style={styles.title}>Sign Up</Text>
                        <View style={styles.verifyForm}>
                            <View style={{ flexDirection: 'row' }} >
                                <Input
                                    type="user"
                                    inputStyle={{ padding: 10 }}
                                    containerStyle={{ marginRight: 20 }}
                                    setCode={(text) => setFirstName(text)}
                                    value={firstName}
                                    error={firstNameError}
                                    label="First Name"
                                    onSubmit
                                    maxLength={20}
                                    placeholder="" />
                                <Input maxLength={20}
                                    type="user"
                                    inputStyle={{ padding: 10 }}
                                    setCode={(text) => setLastName(text)}
                                    value={lastName} error={lastNameError}
                                    label="Last Name"
                                    placeholder=""></Input>
                            </View>

                            <View style={{ flexDirection: 'row' }} >
                                <Input
                                    type="email"
                                    maxLength={20}
                                    inputStyle={{ padding: 10 }}
                                    containerStyle={{ marginRight: 20 }}
                                    setCode={(text) => setEmail(text)}
                                    value={email} error={emailError}
                                    label="Email"
                                    placeholder=""></Input>
                                <Input
                                    type="phone"
                                    maxLength={20}
                                    inputStyle={{ padding: 10 }}
                                    setCode={(text) => setPhoneNumber(text)}
                                    value={phoneNumber}
                                    error={phoneNumberError}
                                    label="Phone No"
                                    placeholder=""
                                ></Input>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }} >
                                <Input
                                    btnPress={() => navigator("gender")}
                                    isDropdown={true}
                                    maxLength={20}
                                    inputStyle={{ padding: 10, }}
                                    containerStyle={{ marginRight: 20 }}
                                    setCode={(text) => setPassword(text)}
                                    value={gender}
                                    error={genderError}
                                    label="Gender"
                                    placeholder=""></Input>
                                <Input
                                    btnPress={() => navigator("country")}
                                    isDropdown={true}
                                    maxLength={20}
                                    isDropdown={true}
                                    inputStyle={{ padding: 10 }}
                                    setCode={(text) => setConfirmPassword(text)}
                                    value={confirmPassword}
                                    error={confirmPasswordError}
                                    label="Select Country"
                                    placeholder="" />
                            </View>

                            <View style={{ flexDirection: 'row' }} >
                                <Input
                                    maxLength={20}
                                    inputStyle={{ padding: 10 }}
                                    containerStyle={{ marginRight: 20 }}
                                    setCode={(text) => setPassword(text)}
                                    value={password}
                                    error={passwordError}
                                    label="Password"
                                    placeholder=""></Input>
                                <Input
                                    maxLength={20}
                                    inputStyle={{ padding: 10 }}
                                    setCode={(text) => setConfirmPassword(text)}
                                    value={confirmPassword}
                                    error={confirmPasswordError}
                                    label="Confirm Password"
                                    placeholder="" />
                            </View>


                        </View>
                    </View>
                    <View style={{ flex: 0.1, }}>
                        <Button onVerifyPress={() => onSubmit()} title="Signup" bgColor={DARK_GREEN} textColor={"white"}></Button>
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onDismiss={() => {
                    setModalVisibility(false)
                    console.log('Modal has been closed.');
                }}>
                <DropDown
                    onItemSelection={(type, data) => { navigator(type, data) }}
                    data={list}
                    title={popUpTitle} />
            </Modal>

        </View>
    )
}
export default SignUp;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: screenHeight,
    },
    loginLeft: {
        flex: 1,
        backgroundColor: LOGIN_BG,
        padding: 15, paddingRight: 0
    },
    logo: {
        width: "100%",
        paddingVertical: 35,
        marginTop: 30
    },
    loginRight: {
        flex: 1,
        paddingVertical: 35,
        paddingBottom: 20,
        alignItems: 'center'
    },
    title: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 40,
        color: HEADING_BLACK,
        textAlign: "center"
    },
    verifyForm: {
        paddingTop: 20
    },
    formLabel: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 16,
        color: HEADING_BLACK,
        paddingBottom: 12,
        textTransform: "capitalize",
        lineHeight: 21,
        fontWeight: '500'
    }
})