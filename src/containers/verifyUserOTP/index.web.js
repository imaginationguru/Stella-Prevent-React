import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import brand from '../../assets/images/brand.svg';
import { screenHeight, screenWidth } from "../../utils/dimension";
import graphic01 from '../../assets/images/graphic01.svg';
import {navigatorPush,navigatorPop,navigatortoStart} from '../../config/navigationOptions.web';
import rightCover from '../../assets/images/candle.png';
import Input from "../../components/Input";
import Button from "../../components/common/button";
import history from '../../helpers/history';
import Loader from '../../components/Loader';
import GLOBALS from '../../constants';
const { COLORS, FONTS } = GLOBALS;
const {IMAGE_BASE_URL} = GLOBALS;
const { HEADING_BLACK, LOGIN_BG, DARK_GREEN,WHITE } = COLORS;

import * as AppActions from '../../actions';
import {useDispatch, useSelector} from 'react-redux';

const VerifyUserOTP = () => {
    const [registerCode, setRegisterCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [code, setCode] = useState("");
    const {quotes = {}} = useSelector((state) => state.moduleOne);
    const {loginData = []} = useSelector((state) => state.authReducer);
    const {isLoading} = useSelector((state) => state.common);
    const [finishStatus, setfinishStatus] = useState(false);
    const dispatch = useDispatch();
    const onBackButtonEvent = (e) => {
        if(loginData){
            dispatch(AppActions.logout());
        }else{
            navigatorPop();
          //  props.history.push("/");
        }   
        // e.preventDefault();
        // if (!finishStatus) {
        //    if (window.confirm("Do you want to go back ?")) {
        //       setfinishStatus(true)
        //       // your logic
        //       props.history.push("/");
        //    } else {
        //       window.history.pushState(null, null, window.location.pathname);
        //       setfinishStatus(false)
        //    }
        // }
     }
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
           window.removeEventListener('popstate', onBackButtonEvent);
        };
     }, []);
    useEffect(() => {
        console.log("seeting...");
      
        setRegisterCode(loginData?.user?.registration_code)
      }, [loginData]);
    /**On Verify Button Press */
    const VerifyHandler = () => {
        setCodeError('');
        console.log(loginData,"ll")
        if (code.trim() === "") {
            setCodeError('Please enter verification code');
        }else if (code.trim() != registerCode) {
            setCodeError('Invalid verification code');
        }else {
             let param={
                isInterest:true,
                user_id:loginData.user._id,                  
             }
            dispatch(AppActions.acceptWelcomeScreen(param));
        }
    }

    const resend =()=>{
        let postData = {
            user_id: loginData.user._id,
          };
          dispatch(AppActions.resendRegistrationCode(postData, cb=>{
              if(cb){
                console.log("resend otp res",cb)
                setRegisterCode(cb.registration_code)
              }
          }));
    }
    return (
        <View style={styles.container}>
             {isLoading && <Loader />}
            <View style={styles.loginLeft}>
                <ImageBackground
                   source={quotes.quoteImg != '' ?`${IMAGE_BASE_URL}${quotes.quoteImg}` : `${rightCover}`}
                  resizeMode="cover"
                    style={{
                        height: "100%",
                        width: '100%',
                        alignItems: 'center',
                        justifyContent:'center',
                        paddingHorizontal:"130px"
                    }}
                > 
                 <Text style={styles.quoteText}>{quotes.quoteText}</Text>
                 </ImageBackground>
            </View>
            <View style={styles.loginRight}>
                <View style={{ flex: 1, paddingHorizontal: 60,
                     maxWidth: "90%",
                     
                     }}>
                    <View style={{ flex: 1,paddingTop:"10vw"}}>
                        <Text style={styles.heading}>Verify Yourself</Text>
                        <View style={styles.verifyForm}>
                            <Input maxLength={10} placeholder="Code" setCode={(code) => {setCode(code); setCodeError('')}} value={code} error={codeError} label="Enter Verification Code"></Input>
                        </View>

                        <Button onVerifyPress={() => VerifyHandler()} title="Verify" bgColor={DARK_GREEN} textColor={"white"}></Button>
                       
                       <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                       <TouchableOpacity onPress={()=>resend()}>
                            <Text style={styles.noAccount}>Resend Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{   dispatch(AppActions.logout()); }}>
                            <Text style={styles.noAccount}>Log In</Text>
                        </TouchableOpacity>
                       </View>
                      
                    </View>
                </View>
            </View>

        </View>
    )
}
export default VerifyUserOTP;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: screenHeight,
    },
    loginLeft: {
        flex: 1,
        backgroundColor: LOGIN_BG,
        paddingRight: 0
    },
    logo: {
        width: "100%",
        paddingVertical: 35,
        marginTop: 30
    },
    loginRight: {
        flex: 1,
        paddingVertical: 35,
    },
    title: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 40,
        lineHeight: 52,
        color: HEADING_BLACK,
    },
    verifyForm: {
        paddingVertical: "3vw"
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
    quoteText :{
        color: WHITE,
        //@extend: 'HKGrotesk-Medium';
        fontFamily: 'BerkshireSwash Regular',
        fontSize: "2.50vw",
        lineHeight:"40px",
        textAlign: "center"
      },
      heading: {
        fontFamily:FONTS.SEMI_BOLD,
        fontWeight: "500",
        fontSize: "2.5vw",
        lineHeight: "40px",
        color: "#0f243d"
      },
      noAccount: {
        color: COLORS.BLACK,
        textAlign: "right",
        fontStyle: FONTS.SEMI_BOLD,
        fontSize: "1.3vw",
        marginTop: 20,
        color: COLORS.DARK_GREEN, textDecorationLine: "underline",
    },
})