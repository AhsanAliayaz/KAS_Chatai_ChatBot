import { View, Text,StatusBar } from 'react-native'
import React,{useEffect} from 'react'
import StackNav from './src/Navigation/Stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store,{persistor} from './src/Redux/Store/Store';
import { colors } from './src/Screens/Config/styles';
import messaging from '@react-native-firebase/messaging';




export default function App() {



  useEffect(() => {
    // Request permission and retrieve FCM token
    messaging()
        .requestPermission()
        .then(() => {
            return messaging().getToken();
        })
        .then(token => {
            console.log('FCM Token:', token);
         
        })
        .catch(error => {
       
        });
  }, []);



  return (
    
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <>
    <StatusBar
          barStyle="light-content"
          // translucent
          backgroundColor={colors.black}
        />
     <StackNav  />
   </>
   </PersistGate>
   </Provider>


  )
}