import { View, Text, } from 'react-native'
import React, { Fragment } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Welcomescreen from '../Screens/Auth/InitialScreen';
import BottomTab from './Bottom';
import Signin from '../Screens/Auth/Signin';
import Signup from '../Screens/Auth/Signup';
import InitialScreen from '../Screens/Auth/InitialScreen';
import Chatscreen from '../Screens/Homescreen/Chatscreen';
import { useDispatch, useSelector } from 'react-redux';
import Forget from '../Screens/Auth/Forget';








const Stack = createStackNavigator();

export default function StackNav() {


    const {userData} = useSelector((state) => state.USER);

    console.log("userdata",userData)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                 preloadingEnabled: true
      }}>
        {!userData ?
        (
                 <Fragment>
                 <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false, }}/>
                 <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false}}/>
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false}}/>
                <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false}}/>
                

                </Fragment>
        ):(
               
                <Fragment>
                <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false}}/>
                <Stack.Screen name="Chatscreen" component={Chatscreen} options={{ headerShown: false}}/>
               
                </Fragment>
                )

}
            </Stack.Navigator>
            
        
        </NavigationContainer>
    )
}