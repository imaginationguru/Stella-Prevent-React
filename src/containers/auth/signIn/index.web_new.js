import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
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

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    /**On Sign UP Button Press */
    const onSubmit = () => {
        email.trim() === "" ? setEmailError('Please enter email') : setEmailError('');
        password.trim() === "" ? setPasswordError('Please enter password') : setPasswordError('');
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
                    }} >
                    <Image
                        resizeMode={"contain"}
                        style={styles.logo}
                        source={brand} />
                </ImageBackground>
            </View>
            <View style={styles.loginRight}>
                <View style={{ flex: 1, paddingHorizontal: 10, maxWidth: "90%", }}>
                    <View style={{}}>
                        <Image
                            resizeMode={"contain"}
                            style={styles.logo}
                            source={brand} />
                        <Text style={styles.title}>Log In</Text>

                        <Button onVerifyPress={() => onSubmit()} title="Log In with Facebook" bgColor={COLORS.facebook} textColor={"white"} textStyle={styles.socialText} btnStyle={styles.socialBtnStyle}></Button>
                        <Button
                            onVerifyPress={() => onSubmit()}
                            title="Log In with Google"
                            bgColor={COLORS.WHITE}
                            textColor={"white"}
                            textStyle={[styles.socialText, { color: COLORS.HEADING_BLACK }]}
                            btnStyle={[styles.socialBtnStyle, {
                                borderColor: COLORS.SHADOW_COLOR, borderWidth: 0.1
                            }]}>
                        </Button>
                        <Button
                            onVerifyPress={() => onSubmit()}
                            title="Log In with Apple"
                            bgColor={COLORS.BLACK}
                            textColor={"white"}
                            textStyle={styles.socialText}
                            btnStyle={styles.socialBtnStyle}></Button>

                        <View style={styles.verifyForm}>
                            <View >
                                <Input
                                    type="email"
                                    maxLength={20}
                                    inputStyle={{ padding: 10 }}
                                    setCode={(text) => setEmail(text)}
                                    value={email} error={emailError}
                                    label="Email"
                                    placeholder=""></Input>

                            </View>
                            <View>
                                <Input
                                    maxLength={20}
                                    inputStyle={{ padding: 10 }}
                                    setCode={(text) => setPassword(text)}
                                    value={password}
                                    error={passwordError}
                                    label="Password"
                                    placeholder=""></Input>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <Button onVerifyPress={() => onSubmit()} title="Login" bgColor={DARK_GREEN} textColor={"white"} btnStyle={{ height: 40 }}></Button>
                        </View>

                        <TouchableOpacity>
                            <Text style={styles.noAccount}>Don’t have an account? <Text style={{ color: COLORS.DARK_GREEN, textDecorationLine: "underline", }}>Sign up</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.terms}>terms & conditions.</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    )
}
export default SignIn;
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
        height: 40,
        marginBottom: 10

    },
    loginRight: {
        flex: 1,
        paddingVertical: 35,
        paddingBottom: 20,
        alignItems: 'center'
    },
    title: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 25,
        fontWeight: "500",
        color: HEADING_BLACK,
        textAlign: "left",
        marginBottom: 10
    },
    verifyForm: {
        paddingTop: 5
    },
    formLabel: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 16,
        color: HEADING_BLACK,
        paddingBottom: 12,
        textTransform: "capitalize",
        lineHeight: 21,
        fontWeight: '500'
    },
    forgotPassText: {
        textAlign: "right",
        fontStyle: FONTS.NEW_REGULAR,
        color: COLORS.DARK_GREEN,
        textDecorationLine: "underline",
        fontWeight: "500",
        marginBottom: 30,
        fontSize: 14
    },
    noAccount: {
        color: COLORS.BLACK,
        textAlign: "center",
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 14,
        marginTop: 20
    },
    terms: {
        color: COLORS.DARK_GREEN,
        textAlign: "center",
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 14,
        marginTop: 5,
        fontWeight: 300
    },
    socialText: {
        fontSize: 14
    },
    socialBtnStyle: {
        height: 35,
        marginBottom: 6
    }
})