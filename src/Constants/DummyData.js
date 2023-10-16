import email from 'react-native-email'
import { Linking } from 'react-native'
const  handleEmail = () => {
  const to = ['khattakapps@gmail.com', ] // string or array of email addresses
  email(to, {
    
      body: '',
      checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
  }).catch(console.error)
}
const openURL = async () => {
  const url = 'https://kattakappsstudio.blogspot.com/2023/04/khattak-apps-studio-user-privacy-is.html';
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
  }
};



const openPlayStoreForRating = () => {
  const packageName = 'com.essaywriter.aichatbot.chatassistant.aiassistant.chatai.khattak'; // Replace with your Android app's package name
  const url = `market://details?id=${packageName}`;

  Linking.openURL(url)
    .then(() => {
      console.log('Opened Play Store for rating.');
    })
    .catch(error => {
      console.error('Error opening Play Store:', error);
    });
};

export const generalOptions = [
 
    {
      title: 'Rate us',
      subtitle: 'Rate your experience',
      icon: require('../assets/images/rate.png'),
      onPress: () => {openPlayStoreForRating()}
    },
    {
      title: 'Version',
      subtitle: '1.0',
      icon: require('../assets/images/version.png'),
      onPress: () => { }
    },
  ]
  export const supportOptions = [
  
    {
      title: 'Privacy Policy',
      subtitle: 'Read our Privacy Policy',
      icon: require('../assets/images/privacy.png'),
      onPress: () => {openURL()}
    },
  
    {
      title: 'Feedback',
      subtitle: 'Send us your feedback',
      icon: require('../assets/images/feedback.png'),
      onPress: () => {handleEmail()}
    },
  ]