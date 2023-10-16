import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
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
// import { addMessage } from '../../Redux/Action/Index'



export default function Chatscreen({ navigation,route }) {
  // const dispatch = useDispatch()
  const { question, topic } = route.params || {};

    console.log('topic',topic,)
   
  const flatListRef = useRef(null);
  // const apiKey = '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';
  const [Questions, setQuestion] = useState('')
  // console.log("Quest????????????????????",Questions)
  const [messages, setMessages] = useState([]);
  const userData = useSelector(state => state?.USER)
  const [loading, setLoading] = useState(false)

  const [chatRoomId, setChatRoomId] = useState(userData.userData.userId || userData.userData.uid);

  console.log(chatRoomId)
  // console.log('userdata', userdata)

  useEffect(() => {
    // Clear messages when the component mounts or chat room ID changes
    setMessages([]);

    // Rest of your code...
  }, []);


  const apiKey = useSelector((state) => state.apiKey);
  const concatenatedData = question + topic + Questions;
    console.log('concatenatedata',concatenatedData)
  const sendNewMessage = async () => {

    setLoading(true)
    if (Questions.trim() === '') {
      return;
    }

    try {
      const userMessage = Questions;

      // Reference to the current chat room in Firebase Realtime Database
      const chatRoomRef = firebase.database().ref(`chatRooms/${chatRoomId}`);

      // Save the user message to Firebase
      await chatRoomRef.push({
        role: 'user',
        content: userMessage,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });

      const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: concatenatedData }],
        max_tokens: 700,
        temperature: 0.6,
        top_p: 0.7,
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

      const botMessage = response.data.choices[0].message.content.trim();

      // Save the bot message to Firebase


      await chatRoomRef.push({
        role: 'bot',
        content: botMessage,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
      setLoading(false)
      // dispatch(addMessage(data));

      setQuestion('');
    } catch (err) {
      console.log('Error in API call:', err.message);
      setLoading(false)
    }
  };



  useEffect(() => {
    // Clear messages when the component mounts or chat room ID changes
    setMessages([]);
    
    const chatRoomRef = firebase.database().ref(`chatRooms/${chatRoomId}`);

    chatRoomRef.on('child_added', (snapshot) => {
      const messageData = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Clean up the listener when the component unmounts
    return () => {
      chatRoomRef.off('child_added');
    };
  }, []);



  // const generateChatRoomId = () => {
  //   // Generate a unique ID, for example, based on a timestamp
  //   return Date.now().toString();
  // };



  return (
    <View style={{ flex: 1, backgroundColor: colors.primary,  }}>

      <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={{ width: 20, height: 20, }} source={require('../../assets/images/back.png')} />

        </TouchableOpacity>
        <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, marginLeft: wp(10,) }}>{topic}</Text>
      </View>


      <View style={{ flex: 1, }}>

        <FlatList

          data={messages}
          ref={flatListRef}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {

            // console.log('item.content', item.content)

            return (
              // <View style={{height: wp(100),}}>

                <View
                  style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
                    margin: 5,


                  }}
                >
                  {item.role !== 'user' ? (
                    <Image
                      source={require('../../assets/images/logo.png')}
                      style={{ width: 24, height: 24, marginLeft: 8 }}
                    />
                  ) : null}
                  <View
                    style={{
                      backgroundColor: item.role === 'user' ? colors.secondary : colors.accent,
                      borderRadius: 15,
                      padding: 8,
                      maxWidth: '80%',
                      borderBottomEndRadius: item.role === 'user' ? 15 : 15,
                      borderBottomStartRadius: item.role === 'user' ? 15 : 15,
                      borderTopEndRadius: item.role === 'user' ? 0 : 15,
                      borderTopStartRadius: item.role === 'user' ? 15 : 0,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: fonts['Poppins-Medium'],
                        textAlign: 'center',
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                  {item.role === 'user' ? (
                    <Image
                      source={require('../../assets/images/user.png')}
                      style={{ width: 18, height: 24, marginRight: 8, left: 2, }}
                    />
                  ) : null}
                </View>
              // </View>
            );
          }



          }
        />




      </View>

      <Loader visible={loading} />

      <View style={{ justifyContent: 'flex-end', marginBottom: wp(6), }}>
        <TextInputChat
          placeholder={'Type your query here...'}
          icon={require('../../assets/images/send.png')}
          value={Questions}
          onChangeText={(text) => setQuestion(text)}
          onPress={() => sendNewMessage()}
        />
      </View>
    </View>
  )
}