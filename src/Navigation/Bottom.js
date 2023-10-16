import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors, fonts, styles } from '../Screens/Config/styles';
import Home from '../Screens/Homescreen/Home';
import Settings from '../Screens/Homescreen/Settings';
import Topics from '../Screens/Homescreen/Topics';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'




const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {


    const userdata = useSelector(state => state?.USER)
    const [messages, setMessages] = useState([]);

    const maxMessagesToDisplay = 2;

    // useEffect(() => {
    //     const chatRoomId = userdata?.userData?.userId || userdata?.userData?.uid;


    //     const chatRoomRef = firebase.database().ref(`chatRooms/${chatRoomId}`);


    //     chatRoomRef.orderByChild('timestamp').limitToLast(maxMessagesToDisplay).on('value', (snapshot) => {
    //         const messageList = [];
    //         snapshot.forEach((childSnapshot) => {
    //             messageList.push(childSnapshot.val());
    //         });
    //         setMessages(messageList);


    //     });

    //     return () => {
    //         chatRoomRef.off('value');
    //     };
    // }, [messages]);




    // let initialScreen;

    // if (messages.length !== 0) {
    //   initialScreen = 'Home';
    // } else {
    //   initialScreen = '';
    // }



    const [initialRoute, setInitialRoute] = useState('Topics');

    useEffect(() => {
        const chatRoomId = userdata?.userData?.userId || userdata?.userData?.uid;
        const chatRoomRef = firebase.database().ref(`chatRooms/${chatRoomId}`);

        chatRoomRef.orderByChild('timestamp').limitToLast(maxMessagesToDisplay).on('value', (snapshot) => {
            const messageList = [];
            snapshot.forEach((childSnapshot) => {
                messageList.push(childSnapshot.val());
            });

            setMessages(messageList);

            // Set the initialRoute based on the messages array
            if (messageList.length > 0) {
                setInitialRoute('Home');
            } else {
                setInitialRoute('Topics');
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            chatRoomRef.off('value');
        };
    }, []);


    return (

        <Tab.Navigator

            initialRouteName={initialRoute}
            screenOptions={({ route }) => ({

                headerShown: false,
                tabBarStyle: {
                    height: wp(14),
                    width: wp(100),

                    shadowColor: colors.primary,
                    backgroundColor: colors.primary,
                    borderColor:colors.primary

                },




                tabBarIcon: ({ focused }) => {

                    if (route.name === 'Topics') {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: wp(1.5), }}>
                                {focused ? (
                                    <View style={{ alignItems: 'center' }}>
                                        <Image resizeMode='contain' style={{ width: 25, height: 22, tintColor: colors.secondary }} source={require('../assets/images/topics.png')}
                                        />
                                        <Text style={[{
                                            fontFamily: fonts['Poppins-SemiBold'],
                                            top: wp(0.4),
                                            color: focused ? colors.secondary : '',
                                              fontSize: 10,
                                        }]}>Topics</Text>
                                    </View>
                                ) : (
                                    <View style={{ alignItems: 'center', }}>
                                        <Image resizeMode='contain' style={{ width: 25, height: 22, }} source={require('../assets/images/topics.png')} />
                                        <Text style={[, {
                                            fontFamily: fonts['Poppins-SemiBold'],
                                            top: wp(0.4),
                                            color: focused ? colors.white : 'white',
                                            fontSize: 10,
                                        }]}>Topics</Text>
                                    </View>
                                )}
                            </View>
                        );
                    }

                    if (route.name === 'Home') {
                        return (

                            <View style={{ justifyContent: 'center', alignItems: 'center', bottom: wp(5) }}>
                                {focused ? (
                                    <View style={{ alignItems: 'center', }}>
                                        <Image resizeMode='contain' style={{ width: 25, height: 22, tintColor: colors.secondary }} source={require('../assets/images/home.png')}
                                        />

                                    </View>
                                ) : (
                                    <View style={{ alignItems: 'center', }}>
                                        <Image resizeMode='contain' style={{ width: 25, height: 22, }} source={require('../assets/images/home.png')} />

                                    </View>
                                )}
                            </View>
                        );
                    }


                    if (route.name === 'Settings') {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center', top: wp(1.5), }}>
                                {focused ? (
                                    <View style={{ alignItems: 'center' }}>
                                        <Image resizeMode='contain' style={{ width: 25, height: 22, tintColor: colors.secondary }} source={require('../assets/images/settings.png')}
                                        />
                                        <Text style={[{
                                            top: wp(0.4),
                                            color: focused ? colors.secondary : 'white',
                                             fontFamily: fonts['Poppins-SemiBold']
                                        }]}>Settings</Text>
                                    </View>
                                ) : (
                                    <View style={{ alignItems: 'center', }}>
                                        <Image resizeMode='contain' style={{ width: 25, height: 22, }} source={require('../assets/images/settings.png')} />
                                        <Text style={[{
                                            
                                            top: wp(0.4),
                                            color: focused ? colors.border : 'white',
                                            fontSize: 10,
                                            fontFamily: fonts['Poppins-SemiBold']
                                        }]}>Settings</Text>
                                    </View>
                                )}
                            </View>
                        );
                    }


                },
            })}>

            <Tab.Screen name="Topics" component={Topics} options={{ tabBarLabel: '', }} />
            <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: '', }} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarLabel: '' }} />


        </Tab.Navigator>

    );
}