import { View, Text, Image, TouchableOpacity, ScrollView,Modal, Alert,Linking } from 'react-native'
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




export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([]);
  const userdata = useSelector(state => state?.USER)
  // const userId =userdata.userData.userId 
  console.log('userdata???????????????/<<<<<<<<<<<<<<,,/', userdata)
  const maxMessagesToDisplay = 2;

console.log('message????????????',messages)
  const [loading, setLoading] = useState(false)
  const [confirm, setconfirm] = useState(false);


  const openPlayStore = () => {
    const packageName = 'com.essaywriter.aichatbot.chatassistant.aiassistant.chatai.khattak"'; // Replace with your app's package name
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




  useEffect(() => {
    const chatRoomId = userdata?.userData?.userId || userdata?.userData?.uid; // Replace with the chat room ID based on timestamp
  
    // Reference to the chat room in Firebase Realtime Database
    const chatRoomRef = firebase.database().ref(`chatRooms/${chatRoomId}`);
  
    // Order messages by timestamp in ascending order (oldest to newest)
    chatRoomRef.orderByChild('timestamp').limitToLast(maxMessagesToDisplay).on('value', (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push(childSnapshot.val());
      });
      setMessages(messageList);
  
      // Set loading to false when data retrieval is complete
      setLoading(false);
    });
  
    // Set loading to true when data retrieval starts
    setLoading(true);
  
    // Clean up the listener when the component unmounts
    return () => {
      chatRoomRef.off('value');
    };
  }, []);



  const deleteChat = () => {
    const chatRoomId = userdata?.userData?.userId || userdata?.userData?.uid; // Replace with your chat room ID
    const chatRoomRef = firebase.database().ref(`chatRooms/${chatRoomId}`);
  
    chatRoomRef.remove()
      .then(() => {
        Alert.alert(' Recent Chat Deleted Successfully')
        // Optionally, you can update your component's state to reflect that the chat is deleted.
        setMessages([]);
      })
      .catch((error) => {
        console.error('Error deleting chat:', error);
      });
  };



  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [UpdatedVersion, setUpdatedVersion] = useState('');

  // console.log('UpdatedV Versions',UpdatedVersion.Version)


  useEffect(() => {
    async function fetchUpdatedVersions() {
      try {
        const snapshot = await database().ref('Versions').once('value');
        const versions = snapshot.val();

        setUpdatedVersion(versions);

        const currentVersion = DeviceInfo.getVersion();

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

        console.log('apikay',apiKey)
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    }

    fetchUpdatedApiKey();
  }, []);


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
      <View style={{ flex: 1, backgroundColor: colors.primary, }}>


      <Modal animationType="slide" transparent={true} visible={confirm}>
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
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: 14,
                                         fontFamily: fonts['Poppins-SemiBold'],
                                        alignSelf: 'center',
                                        marginTop: wp(5),
                                    }}>

                                    Before you go, would you mind sharing your feedback? Your opinion matters to us!
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
                                            style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
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
                                            style={{ color: 'white', fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
                                            Rate us
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                       

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
                                            style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
                                            Cancel
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
                                            style={{ color: 'white', fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
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
          <Text style={{ ...styles.p, marginTop: 20 }} >Hello { userdata?.userData?.firstname||userdata?.userData?.displayName }</Text>
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
          <View style={{ flex: 1, paddingTop: 20 }}>
            {messages.length === 0 ? 
              <Text style={{width: wp(40),height: wp(30),alignSelf: 'center',alignItems: 'center',fontFamily: fonts['Poppins-Medium'],color: colors.white,justifyContent: 'center',}}>No History Found</Text>  :            
              <ChatCardhome ondelete={() => deleteChat()} onPress={() => {navigation.navigate('Chatscreen')}} messages={messages} />

            }
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