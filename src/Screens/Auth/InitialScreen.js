
import { View, Text, TouchableOpacity, Image, Modal, Linking, TouchableWithoutFeedback } from 'react-native'

import React, { useState, useEffect } from 'react'

import { colors, styles, fonts } from '../Config/styles';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SubmitButton from '../../Components/Subnitbutton/SubmitButton';
import SplashScreen from 'react-native-splash-screen';
import { BackHandler, AppState } from 'react-native';
import { setApiKey } from '../../Redux/Action/Index';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
// import { useNavigation } from '@react-navigation/native';


export default function InitialScreen({ navigation }) {
    // const dispatch = useDispatch()

    const [confirm, setconfirm] = useState(false);

    useEffect(() => {
        // Increase the time to 3000 milliseconds (4 seconds)
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }, []);



    useEffect(() => {
        const handleBackPress = () => {
            // Show your exit modal here
            setconfirm(true);
            return true; // To prevent default behavior (exit the app)
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            // Remove the event listener when the component unmounts
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);


    const openPlayStore = () => {
        const packageName = 'com.essaywriter.aichatbot.chatassistant.aiassistant.chatai.khattak'; // Replace with your app's package name
        Linking.openURL(`market://details?id=${packageName}`);
    };


    

    // useEffect(() => {
    //     async function fetchUpdatedApiKey() {
    //         try {
    //             const snapshot = await database().ref('apikey/currentapikey').once('value');
    //             const apiKey = snapshot.val();

    //             dispatch(setApiKey(apiKey));

    //             console.log('apikay', apiKey)
    //         } catch (error) {
    //             console.error('Error fetching API key:', error);
    //         }
    //     }

    //     fetchUpdatedApiKey();
    // }, []);

    // const [showUpdateModal, setShowUpdateModal] = useState(false);
    // const [UpdatedVersion, setUpdatedVersion] = useState('');

    // // console.log('UpdatedV Versions',UpdatedVersion.Version)


    // useEffect(() => {
    //     async function fetchUpdatedVersions() {
    //         try {
    //             const snapshot = await database().ref('Versions').once('value');
    //             const versions = snapshot.val();

    //             setUpdatedVersion(versions);

    //             const currentVersion = DeviceInfo.getVersion();

    //             if (versions.currentVersion !== currentVersion) {
    //                 setShowUpdateModal(true);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching API key:', error);
    //         }
    //     }

    //     fetchUpdatedVersions();
    // }, []);





    return (
        <View style={{ flex: 1, backgroundColor: colors.primary, }}>
            <View style={{ ...styles.center, marginTop: wp(10), }}>
                <Image resizeMode='contain' style={{ width: 300, height: 300 }} source={require('../../assets/images/welcome.png')} />
            </View>




         

            <Modal animationType="slide" transparent={true} visible={confirm}>
          <TouchableWithoutFeedback
            onPress={() => setconfirm(false)}
          >

            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(129,128,128,0.8)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: wp(2),
                  elevation: 2,
                  width: wp(85),
                  height: wp(45),
                  alignSelf: 'center',
                }}>
                <View style={{
                  width: wp(80), alignSelf: 'center', justifyContent: 'center',
                  // backgroundColor: 'pink',
                  height: wp(25),
                }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontFamily: fonts['Poppins-Regular'],

                      textAlign: 'center',
                      // marginTop: wp(5),
                    }}>

                    Before you go, would you mind sharing your feedback? Your opinion matters to us!
                  </Text>
                </View>
                <View
                  style={{
                    width: wp(70),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginRight: wp(2),
                    // backgroundColor: 'pink',

                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setconfirm(false), BackHandler.exitApp(); }}
                    style={{
                      marginRight: wp(2),

                      borderRadius: 5,

                      // borderColor: Colors.primary,
                      elevation: 2,
                      marginTop: wp(5),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      width: wp(30),
                      height: wp(12),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.accent,
                      // borderRadius: wp(10),
                      borderWidth: 1,
                      borderColor: colors.secondary
                    }}>
                    <Text
                      style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold'] }}>
                      Exit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setconfirm(false),
                        openPlayStore()
                      // navigation.navigate('Signin')
                      // console.log('clear the logout',adduser)
                    }}
                    style={{
                      marginTop: wp(5),
                      alignSelf: 'center',
                      backgroundColor: colors.secondary,
                      borderRadius: 5,
                      elevation: 2,
                      width: wp(30),
                      height: wp(12),
                      alignItems: 'center',
                      justifyContent: 'center',
                      // borderRadius: wp(10),
                    }}>
                    <Text
                      style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold'] }}>
                      Rate us
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableWithoutFeedback>


        </Modal>



            <View style={{ flex: 1, width: wp(90), alignSelf: 'center', justifyContent: 'center', marginTop: wp(7), }}>
                <Text style={styles.h1}>Welcome to AI Chatbot</Text>
                <Text style={styles.p}>Unlock endless possibilities with our AI chatbot. Experience seamless conversations, instant assistance, and personalized solutions at your fingertips.</Text>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: wp(10) }}>
                    <SubmitButton
                        style={{ width: wp(90), height: wp(14), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                        title='Sign in' onPress={() => navigation.navigate('Signin')}
                        styleText={{ color: colors.white, fontSize: 14, fontFamily: fonts["Poppins-SemiBold"], right: wp(2), }}
                    />

                </View>
            </View>


            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginBottom: wp(5) }}>
                <Text style={styles.belowSubmitText}>
                    <Text>Don't have an account?  </Text>
                    <Text style={{ color: colors.secondary, fontFamily: fonts['Poppins-SemiBold'] }}>Sign up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}