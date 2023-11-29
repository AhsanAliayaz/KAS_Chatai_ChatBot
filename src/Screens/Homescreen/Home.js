import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Alert, Linking, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors, styles, fonts } from '../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MyRefreshControl from '../../Components/Refreshcontrol/Refreshcontrol';
import ChatCardhome from '../../Components/ChatCardHome/ChatCardhome';
import SplashScreen from 'react-native-splash-screen';
import firebase from '@react-native-firebase/app'

import Loader from '../../Components/Loader/Loader';
import database from '@react-native-firebase/database'
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { setApiKey } from '../../Redux/Action/Index';
import { BackHandler, AppState } from 'react-native';
import { adduser } from '../../Redux/Action/Index';





export default function Home({ navigation }) {
  const dispatch = useDispatch()

  const userdata = useSelector(state => state?.USER)
  console.log('userdata', userdata)
  const messages = useSelector((state) => state.USER.messages);



  const [loading, setLoading] = useState(false)
  const [confirm, setconfirm] = useState(false);


  // const flattenedArray = messages.flat();



  // console.log('messages????????????????????>>>>>',messages)


  const mergeUserBotMessages = (messages) => {
    if (!Array.isArray(messages)) {
      console.error("'flattenedArray' is not an array");
      return [];
    }

    const mergedMessages = [];
    for (let i = 0; i < messages.length; i += 2) {
      const userMessage = messages[i];
      const botMessage = messages[i + 1];

      if (userMessage.type === 'user' && botMessage.type === 'bot' && userMessage.id === botMessage.id) {
        const mergedMessage = {
          id: userMessage.id,
          userMessage: userMessage.text,
          botMessage: botMessage.text
        };
        mergedMessages.push(mergedMessage);
      } else {
        console.error("Mismatch in user and bot messages or IDs");
      }
    }

    return mergedMessages;
  };
  const mergedMessages = mergeUserBotMessages(messages);


  const openPlayStore = () => {
    const packageName = 'com.essaywriter.aichatbot.chatassistant.aiassistant.chatai.khattak'; // Replace with your app's package name
    Linking.openURL(`market://details?id=${packageName}`);
  };

  useEffect(() => {
    // Increase the time to 4000 milliseconds (4 seconds)
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
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


  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [UpdatedVersion, setUpdatedVersion] = useState('');

  // console.log('UpdatedV Versions',UpdatedVersion.Version)





  useEffect(() => {
    async function fetchUpdatedVersions() {
      try {
        const snapshot = await database().ref('Versions').once('value');
        const versions = snapshot.val();
        console.log('versions', versions)
        setUpdatedVersion(versions);

        const currentVersion = DeviceInfo.getVersion();
        //  console.log('current version',currentVersion)
        if (versions.currentVersion !== currentVersion) {
          setShowUpdateModal(true);
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    }

    fetchUpdatedVersions();
  }, []);



  useEffect(() => {
    async function fetchUpdatedApiKey() {
      try {
        const snapshot = await database().ref('apikey/currentapikey').once('value');
        const apiKey = snapshot.val();

        dispatch(setApiKey(apiKey));

        // console.log('apikay', apiKey)
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    }

    fetchUpdatedApiKey();
  }, []);


  // const handleReduceTries = async () => {
  //   if (userTries > 0) {
  //     // Update the user's remaining tries
  //     const updatedTries = userTries - 1;
  //     const userTriesRef = firebase.database().ref(`Users/${uid || userid}/tries`);
  //     userTriesRef.set(updatedTries);
  //     setUserTries(updatedTries);
  //   }
  // };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
      <View style={{ flex: 1, backgroundColor: colors.primary, }}>


        <Modal animationType="slide" transparent={true} visible={confirm}>

        {/* <TouchableWithoutFeedback
              onPress={() => setconfirm(false)}> */}
          <TouchableOpacity

            style={{
              flex: 1,
              backgroundColor: 'rgba(129,128,128,0.8)',
              // backgroundColor: 'green',
             
            }}
            activeOpacity={1} onPress={() => setconfirm(false) }
            >

            
              

           

          </TouchableOpacity>

          <View style={{flex: 1,backgroundColor: 'rgba(129,128,128,0.8)',  alignItems: 'center',
              justifyContent: 'center',}}>
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
          <TouchableOpacity activeOpacity={1} onPress={() => setconfirm(false) } style={{flex: 1,backgroundColor: 'rgba(129,128,128,0.8)',}}>

          </TouchableOpacity>

       


        </Modal>

        <Modal animationType="slide" transparent={true} visible={showUpdateModal}>
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
                width: wp(90),
                height: wp(35),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 14,
                  fontFamily: fonts['Poppins-SemiBold'],
                  alignSelf: 'center',
                  marginTop: wp(5),
                }}>
                {UpdatedVersion.message}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginRight: wp(2),
                  marginTop: wp(5),
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
                  }}>
                  <Text
                    style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold'] }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setconfirm(false),
                      openPlayStore()
                    dispatch(adduser(null))

                  }}
                  style={{
                    marginTop: wp(5),
                    alignSelf: 'center',
                    backgroundColor: colors.accent,
                    borderRadius: 5,
                    elevation: 2,
                    width: wp(30),
                    height: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderRadius: wp(10),
                  }}>
                  <Text
                    style={{ color: 'white', fontSize: 14, fontFamily: fonts['Poppins-SemiBold'] }}>
                    Update now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>



        </Modal>



        <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
          <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, }}>Chat AI : AI Chatbot</Text>
        </View>
        {/* Top Logo */}
        <View style={{ ...styles.center, marginVertical: 20 }}>
          <Image style={{ width: 100, height: 100 }} source={require('../../assets/images/logo.png')} />
          <Text style={{ ...styles.p, marginTop: 20 }} >Hello {userdata?.userData?.firstname || userdata?.userData?.displayName}</Text>
          <Text style={{ ...styles.p }} >Whats on your mind?</Text>
        </View>
        {/* History Card */}
        <View style={{ ...styles.historyCardContainer }}>
          {/* Top Row */}
          <View style={{ ...styles.row, justifyContent: 'space-between' }}>
            <Text style={styles.p}>History</Text>
            {/* <LinkText title='See All' onPress={() => navigate('HistoryScreen')} /> */}
          </View>
          {/* History */}
          {/* <View style={{ flex: 1, paddingTop: 20,alignItems: 'center', }}>
            {mergedMessages.length === 0 ? 
              <Text style={{width: wp(35),height: wp(30),alignSelf: 'center',fontFamily: fonts['Poppins-MediumItalic'],color: colors.white,left: wp(1)}}>No History Found</Text> 
               :    
              <ChatCardhome  onPress={() => {navigation.navigate('Chatscreen')}} messages={mergedMessages} />

           } 
          </View> */}

          <View style={{ flex: 1, }}>

            <FlatList
              data={mergedMessages}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: colors.border }}>No Data Available</Text>
                </View>
              }
              renderItem={({ item }) => {
                // console.log('item???>>>>>..', item)
                return (
                  <View>
                    <ChatCardhome onPress={() => { navigation.navigate('Chatscreen', { Itemid: item.id }) }} messages={item} />
                  </View>
                )
              }}
            />
          </View>

        </View>
        <View style={styles.floatingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Chatscreen')} style={styles.floatingButton}>
            <Image resizeMode='contain' style={{ width: 40, height: 40 }} source={require('../../assets/images/chat.png')} />
          </TouchableOpacity>
        </View>
        <Loader visible={loading} />
      </View>
    </ScrollView>

  )
}