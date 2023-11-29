import { View, Text, Image, TouchableOpacity, FlatList,ToastAndroid,Share,Modal,TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { colors, styles, fonts } from '../Config/styles'
import TextInputChat from '../../Navigation/TextInputauth1/TextInputChat'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import uuid from 'react-native-uuid';
import Loader from '../../Components/Loader/Loader'
import { addMessage } from '../../Redux/Action/Index'
import { useFocusEffect } from '@react-navigation/native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
// import Ionicons from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard';



import { RewardedAd, RewardedAdEventType, TestIds, BannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';




export default function Chatscreen({ navigation, route }) {


  //text id
  // const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/5224354917';


  //original id
  const adUnitId = 'ca-app-pub-9966072200427802/8068213236';


  const dispatch = useDispatch()
  const { act, Charactor,suggestion } = route?.params || {};
  const Itemid = route?.params?.Itemid;

  const userData = useSelector((state) => state.USER);
  const uid = userData?.userData?.uid
  const userid = userData?.userData?.userId
   const UserIds = userData?.userData?.uid ||userData?.userData?.userId

   const messages = useSelector((state) => state.USER.messages);
// const suggestion = ' please complete the response in 600 characters only '

   const selectedItemData = messages?.filter((item) => item.id === Itemid);
  // console.log('selectedItemData????????????????', selectedItemData,)

  const flatListRef = useRef(null);
  // const apiKey = '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';
  
  const [loading, setLoading] = useState(false)
  const [UserText, setUserText] = useState('')
  const [message, setmessage] = useState([]);
  const [Index, setIndex] = useState(-1)
  const [numIn, setnumIn] = useState(null);
  const [userTries, setUserTries] = useState(0);
  // const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [confirm, setconfirm] = useState(false);
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [rewarded, setRewarded] = useState(null);
  





  const watchAdAndAddCredits = () => {
    // Get the current user's tries from Firebase
    const userTriesRef = firebase.database().ref(`Users/${uid || userid}/tries`);

    userTriesRef.once('value').then(snapshot => {
      const currentTries = snapshot.val();

      // Check if the user has 0 tries before adding 5 credits
      if (currentTries === 0) {
        // Add 5 credits to the user's account in Firebase
        const updatedTries = currentTries + 3;
        userTriesRef.set(updatedTries);
        setUserTries(updatedTries);
      }



    });
  };


  useEffect(() => {
    // Create and set up the rewarded ad
    const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    setRewarded(rewardedAd);

    const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);

        // Set confirm to false and watch the ad
        setconfirm(false);
        watchAdAndAddCredits();
        setLoaded(false)
      },
    );

    // Start loading the rewarded ad straight away
    rewardedAd.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);


  const handleAdButtonPress = () => {
    if (loaded && rewarded) {
      rewarded.show();
      setconfirm(false);
    } else {
      // Handle the case where the ad is not loaded yet
      rewarded.load();
    }
  };
  
  






  const apiKey = useSelector((state) => state.apiKey);
  const concatenatedData = act + Charactor + UserText + suggestion
  console.log('apiKey', apiKey)


  const Chat_Api = async () => {
    setUserText('')

    try {
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: concatenatedData }],
        max_tokens: 300,
        temperature: 0.6,
        top_p: 0.8,
      };

      const response = await Axios.post(
        'https://api.openai.com/v1/chat/completions',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const text = response.data.choices[0].message.content.trim();

      if (text) {

        const messageId = Date.now();

        const newBotMessage = { id: messageId, type: 'bot', text };
        const newUserMessage = { id: messageId, type: 'user', text: UserText };

        const newMessage = [...message, newUserMessage, newBotMessage];

        setmessage(newMessage)
        dispatch(addMessage(newMessage))

      }
      const updatedTries = userTries - 1;
      const userTriesRef = firebase.database().ref(`Users/${uid || userid}/tries`);
      userTriesRef.set(updatedTries);
      setUserTries(updatedTries);

    } catch (err) {
      console.log('Error in API call:', err.message);

    }
  };


  useFocusEffect(
    React.useCallback(() => {
      // Fetch user's remaining tries from Firebase
      const userTriesRef = firebase.database().ref(`Users/${userData?.userData?.uid || userData?.userData?.userId}/tries`);
      userTriesRef.once('value').then(snapshot => {
        const tries = snapshot.val();
        setUserTries(tries);
      });
    }, []),
  );


  const handleSend = async () => {
    if (userTries > 0) {
    if (UserText.trim() !== '') {
      const newMessage = [
        ...message,
        { type: 'user', text: UserText },
        { type: 'bot', text: '' }, // Placeholder for the bot's reply
      ];
      setmessage(newMessage);

      await Chat_Api()
      // Remove the apiCall() call from here
     
    }
  }
  else{
    setconfirm(true)
  }
  }


  // const toggleStar = async (item, UserIds) => {
  //   const itemId = item.id;
  
  //   if (selectedFavorites.includes(itemId)) {
  //     try {
  //       // If it is, remove it to unmark as favorite
  //       setSelectedFavorites((prevSelected) =>
  //         prevSelected?.filter((id) => id !== itemId)
  //       );
  
  //       // Remove the item from the database under the user's UID
  //       await firebase.database().ref(`/Users/${UserIds}/favorites/${itemId}`).remove();
  
  //       // Show a toast message when item is removed
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Removed from Favorites',
  //         ToastAndroid.LONG,
  //         ToastAndroid.TOP,
  //         25,
  //         50
  //       );
  //     } catch (error) {
  //       // Handle the error
  //       console.error('Firebase remove error:', error);
  
  //       // Show an error toast
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Error removing from Favorites',
  //         ToastAndroid.LONG,
  //         ToastAndroid.TOP,
  //         25,
  //         50
  //       );
  //     }
  //   } else {
  //     // If it's not, add it to mark as favorite
  //     setSelectedFavorites((prevSelected) => [...prevSelected, itemId]);
  
  //     // Save the item to the database under the user's UID
  //     await firebase.database().ref(`/Users/${UserIds}/favorites/${itemId}`).set({
  //       text: item.text,
  //       // Add other properties if needed
  //     });
  
  //     // Show a toast message when item is added
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Added to Favorites',
  //       ToastAndroid.LONG,
  //       ToastAndroid.TOP,
  //       25,
  //       50
  //     );
  //   }
  // };


  const copyTextToClipboard = (text) => {

    Clipboard.setString(text);

    ToastAndroid.show('Text saved to clipboard', ToastAndroid.SHORT);

  };

  const handleShare = (item) => {
    // console.log('item?????', item)
    shareText(item);
  };

  const shareText = async (msg) => {
    try {

      if (msg.type === 'bot') {
        // Share the text for a bot
        const result = await Share.share({
          message: msg.text,
        });
      }
    } catch (error) {
      console.error('Error while sharing:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, }}>

      <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={{ width: 15, height: 15, }} source={require('../../assets/images/back.png')} />
        </TouchableOpacity>
        <View style={{width: wp(50),alignItems:'center',}}>
        <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white,}}>{Charactor ||'Chat AI'}</Text>
        </View>

          <View style={{width: wp(10), height: wp(13),  alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row',}}>
         <Text style={{fontFamily: fonts['Poppins-Regular'], color: colors.white,}}>{userTries}</Text>
         <Image style={{width: 20,height: 20, tintColor: colors.secondary}} source={require('../../assets/images/circle.png')} />
        </View>
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
                backgroundColor: colors.black,
                borderRadius: wp(2),
                elevation: 2,
                width: wp(90),
                height: wp(130),
                alignSelf: 'center',
              }}>

              <Image resizeMode='contain' style={{ width: 300, height: 250, alignSelf: 'center', marginVertical: wp(4), }} source={require('../../assets/images/admodal.png')} />

              <View style={{ width: wp(40), alignSelf: 'center', marginVertical: wp(2), }}>
                <Text style={{
                  fontFamily: fonts['Montserrat-SemiBold'],
                  fontSize: 14,
                  color: colors.white,
                  textAlign: 'center',
                }}>Watch ads to get more cradets</Text>
              </View>


              <View
                style={{

                  alignSelf: 'center',
                  marginVertical: wp(10),
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleAdButtonPress()

                  }}
                  style={{
                    // marginRight: wp(2),

                    borderRadius: 5,


                    elevation: 2,

                    width: wp(80),
                    height: wp(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.secondary,
                    // borderRadius: wp(10),
                  }}>
                  <Text
                    style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Montserrat-SemiBold'] }}>
                    Watch Ads
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>

        </TouchableWithoutFeedback>

      </Modal>




      <View style={{ flex: 1, }}>

        <FlatList
          data={message.length === 0 ? selectedItemData :message }
          keyExtractor={(item, index) => index.toString()}
          // extraData={bookmark}
          ref={flatListRef}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            // console.log('User Message ExtraData:', item.extraData);


            setIndex(index);
            if (item.type === 'user') {

              return (
                <View style={{ maxWidth: '100%', marginVertical: wp(2),flexDirection: 'row', justifyContent: 'flex-end',alignItems: 'center', }}>
                  
                  <View
                    style={{
                      maxWidth: '86%',
                      backgroundColor: colors.secondary,
                      elevation: 0,
                      // flexDirection: 'row',
                      paddingVertical: wp(3),
                      // alignSelf: 'flex-end',
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      // justifyContent: 'flex-end',
                      // alignItems: 'flex-end',
                    }}
                  >

                    <Text style={{ color: colors.white, marginLeft: wp(4), lineHeight: 25, fontFamily: fonts['Montserrat-SemiBold'], fontSize: 12, right: wp(2) }}>{item.text}</Text>
                    {item.extraData && <Text>{item.extraData}</Text>}
                  </View>
                  
                  <View style={{width: wp(8.5), alignItems: 'center',}}>
                    <Image resizeMode='contain' style={{width: 20,height:20}} source={require('../../assets/images/12.png')}/>
                  </View>
                </View>
              );


            } else if (item.type === 'bot') {

              // console.log('itemBot??????????????', item.text)


              return (
                <View style={{ marginVertical: wp(1), maxWidth: '95%', flexDirection: 'row',alignItems: 'center',  }}>
                  <View style={{width: wp(10), alignItems: 'center',}}>
                    <Image resizeMode='contain' style={{width: 20,height:20}} source={require('../../assets/images/logo.png')}/>
                  </View>
                  <View
                    style={{
                      maxWidth: '86%',
                      backgroundColor: colors.accent,
                      elevation: 5,
                      flexDirection: 'row',
                      paddingVertical: wp(5),
                      paddingHorizontal: wp(3),
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                    

                    }}>


                    {loading && index === Index ? (
                      <View style={{}}>

                      </View>
                    ) : (
                      <View style={{}}>


                        {item.text != '' ?

                          <Text style={{ color: colors.white, lineHeight: 25, fontFamily: fonts['Montserrat-SemiBold'], fontSize: 12, }}>{item.text}</Text> :

                          <View style={{ width: wp(20), justifyContent: 'center', height: wp(10,) }}>
                            <BarIndicator color={colors.secondary} size={15} count={5} />
                          </View>
                        }

                      </View>
                    )}

                  </View>
                  

                  <View style={{ width: wp(15), height: wp(12), justifyContent: 'space-evenly', }}>

                    <TouchableOpacity onPress={() => { copyTextToClipboard(item.text) }} style={{ width: wp(10), height: wp(8), alignItems: 'center', justifyContent: 'space-evenly', borderRadius: 50, borderColor: colors.border, }}>
                      {/* <Ionicons name='copy' size={12} color={colors.brand} /> */}
                      <Image style={{ width: 12, height: 12 }} source={require('../../assets/images/copy.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { handleShare(item) }} style={{ width: wp(10), height: wp(8), alignItems: 'center', justifyContent: 'space-evenly', borderRadius: 50, borderColor: colors.border, }}>
                      <Image style={{ width: 12, height: 12 }} source={require('../../assets/images/share.png')} />

                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => toggleStar(item,UserIds)} style={{ width: wp(10), height: wp(8), alignItems: 'center', justifyContent: 'space-evenly', borderRadius: 50, borderColor: colors.border, }}>

                      {selectedFavorites.includes(item.id) ? (
                        <Image style={{ width: 12, height: 12 }} source={require('../../assets/images/starfill.png')} />
                      ) : (
                        <Image style={{ width: 12, height: 12 }} source={require('../../assets/images/starn.png')} />
                      )}
                    </TouchableOpacity> */}
                  </View>

                </View>
              );
            }
            return null;


          }
          }
        />


      </View>

      <Loader visible={loading} />

      <View style={{ justifyContent: 'flex-end', marginBottom: wp(6)}}>
        <TextInputChat
          placeholder={'Type your query here...'}
          icon={require('../../assets/images/send.png')}
          value={UserText}
          onChangeText={(text) => setUserText(text)}
          onPress={() => handleSend()}
        />
      </View>
    </View>
  )
}