/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

async function setupFCM() {
    await messaging().requestPermission();
    const token = await messaging().getToken();
    console.log('FCM Token: in index .js????????????????????????/', token);
  }
  
  setupFCM();

AppRegistry.registerComponent(appName, () => App);
