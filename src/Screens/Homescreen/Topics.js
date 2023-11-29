import { View, Text, FlatList,Image,Modal,Linking,TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { colors, fonts, styles } from '../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Topicscard from '../../Components/TopicCard/Topiccard';

import SubmitButton from '../../Components/Subnitbutton/SubmitButton';
// import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import SplashScreen from 'react-native-splash-screen';
import { BackHandler, AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database'
import { setApiKey } from '../../Redux/Action/Index';
import Loader from '../../Components/Loader/Loader';



export default function Topics({ navigation }) {

  const dispatch = useDispatch()


  const userData = useSelector((state) => state.USER);

    console.log('userdata???????//',userData)


  // const [data, setData] = useState([]);
  const [userTries, setUserTries] = useState(0);

  // const [confirm, setconfirm] = useState(false);

  const openPlayStore = () => {
    const packageName = 'com.essaywriter.aichatbot.chatassistant.aiassistant.chatai.khattak"'; // Replace with your app's package name
    Linking.openURL(`market://details?id=${packageName}`);
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
  
  

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to your Firebase database
    const dbRef = firebase.database().ref('Topics');

    // Listen for changes in the data
    const fetchData = async () => {
      try {
        dbRef.on('value', (snapshot) => {
          const dataSnapshot = snapshot.val();
          setData(dataSnapshot);
          setLoading(false); // Set loading to false once data is fetched
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();

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



  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, }}>

      <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row',}}>
        <View style={{width: wp(65),height: wp(13),alignItems: 'center',justifyContent: 'center',}}>
        <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, }}>Topics</Text>
        </View>
        <View style={{width: wp(15), height: wp(13),  alignItems: 'center',justifyContent: 'space-evenly',flexDirection: 'row',}}>
         <Text style={{fontFamily: fonts['Poppins-Regular'], color: colors.white,}}>{userTries}</Text>
         <Image style={{width: 20,height: 20, tintColor: colors.secondary}} source={require('../../assets/images/circle.png')} />
        </View>
        
      </View>

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
                    onPress={() => navigation.navigate('Chatscreen',{ act:'Act Like a ', Charactor: item.Title,suggestion: ' give the answer in 600 characters only ' })}
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
      <Loader visible={loading} />

    </View>
  )
}