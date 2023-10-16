import { View, Text, FlatList,Image,Modal,Linking,TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { colors, fonts } from '../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Topicscard from '../../Components/TopicCard/Topiccard';

import SubmitButton from '../../Components/Subnitbutton/SubmitButton';
// import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import SplashScreen from 'react-native-splash-screen';
import { BackHandler, AppState } from 'react-native';

export default function Topics({ navigation }) {

  const [data, setData] = useState([]);

  const [confirm, setconfirm] = useState(false);

  const openPlayStore = () => {
    const packageName = 'com.essaywriter.aichatbot.chatassistant.aiassistant.chatai.khattak"'; // Replace with your app's package name
    Linking.openURL(`market://details?id=${packageName}`);
  };


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
    // Reference to your Firebase database
    const dbRef = firebase.database().ref('Topics');

    // Listen for changes in the data
    dbRef.on('value', (snapshot) => {
      const dataSnapshot = snapshot.val();
      setData(dataSnapshot);
    });
    // Clean up the listener when the component unmounts
    return () => {
      dbRef.off();
    };
  }, []);


  useEffect(() => {
    // Increase the time to 4000 milliseconds (4 seconds)
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
  }, []);


  






  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, }}>
      <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, }}>Topics</Text>
      </View>



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

      <View style={{ paddingBottom: wp(16), }}>

        <FlatList

          data={data}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {

            // console.log('item.content', item.content)
        //  console.log('?????????',item)
            return (
              <View style={{ width: wp(90), height: wp(30), backgroundColor: colors.accent,  borderRadius: 10, justifyContent: 'center', alignSelf: 'center', alignItems: 'center',margin:wp(2) }}>
                <View style={{width: wp(87), height: wp(27), borderRadius: 10,  alignSelf: 'center', alignItems: 'center',justifyContent: 'space-between', flexDirection: 'row',}}>
                  <Image style={{width: 70,height:70,borderRadius: 50,}} source={{uri:item.image}}
              />
                  <View style={{width: wp(63), height: wp(27),  borderRadius: 10, justifyContent: 'space-evenly', alignSelf: 'center',}}>
                  <Text style={{ color: colors.white, fontFamily: fonts['Poppins-Bold'],fontSize: 14, }}>{item.Title}</Text>
                  <View style={{width: wp(90),height: wp(9),bottom: wp(2), justifyContent:'center', }}>
                  <Text style={{ color: 'rgba(255, 255, 255,0.7)', fontSize: 12, fontFamily: fonts['Poppins-Regular'], width: wp(60), }} numberOfLines={2}>{item.message}</Text>
                  </View>
                  <View style={{bottom: wp(1),}}>
                  <SubmitButton
                    title={'Start Chat'}
                    onPress={() => navigation.navigate('Chatscreen',{ question:'Act Like a ', topic: item.Title })}
                    style={{ width: wp(25), height: wp(8), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                   styleText={{color: colors.white,fontSize: 10,fontFamily:fonts["Poppins-Bold"],right: wp(3),}}  
                  />
                  </View>
                  </View>
                </View>
              </View>
            );
          }



          }
        />




      </View>

    </View>
  )
}