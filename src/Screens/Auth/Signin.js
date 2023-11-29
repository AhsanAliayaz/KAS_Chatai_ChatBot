import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles, colors, fonts } from '../Config/styles';
import SubmitButton from '../../Components/Subnitbutton/SubmitButton';
import TextInputauth1 from '../../Navigation/TextInputauth1/TextInputauth1';
import SocialButton from '../../Components/SocialLogin/SocialLogin';
import { adduser } from '../../Redux/Action/Index';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Loader from '../../Components/Loader/Loader';


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';




export default function Signin({ navigation }) {

    // GoogleSignin.configure();

    // const userdata = useSelector(state => state?.USER)


    //  useEffect(() => {
    //     GoogleSignin.configure({
    //       scopes: ['Email'],
    //       webClientId: '449453001220-qr6hcprespd7in3212fe7t999o7lqip6.apps.googleusercontent.com',
    //       offlineAccess: true
    //     });
       
    //   }, []);


    const [loading, setLoading] = useState(false)
    const [Email, setEmail] = useState('')
    // console.log('email in signup screen',Email)
    const [EmailError, setEmailError] = useState('')
    // console.log('EmailError in signup screen',EmailError)
    const [Password, setPassword] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const dispatch = useDispatch()

    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const validation = () => {

        if (!Email && !Password) {

            setEmailError('Please enter some text.');
            setPasswordError('Please enter some text.');


            return false;
        }
        else if (!Email) {
            setEmailError('Please enter some text.');
            return false;
        }
        else if (emailCheck.test(Email) === false) {
            setEmailError('Email is must have valid Syntax');
            return false;
        }




        return true;
    };


    // const handleSignIn = async () => {
        
    //     if (validation()) {
    //       setLoading(true);
    //       try {
    //         const authResponse = await auth().signInWithEmailAndPassword(Email, Password);
      
    //         // Get user data from Firebase Realtime Database
    //         const userSnapshot = await database()
    //           .ref('Users/' + authResponse.user.uid)
    //           .once('value');
      
    //         if (userSnapshot.exists()) {
    //           const userData = {
    //             userId: authResponse.user.uid,
    //             ...userSnapshot.val(), // Include other necessary fields here
    //           };
    //           setLoading(false);
      
    //           // Dispatch the serialized user data
    //           dispatch(adduser(userData));
    //           // navigation.navigate('BottomTab');
    //         } else {
    //           setLoading(false);
    //           Alert.alert('Error', 'User data not found in Realtime Database.');
    //         }
    //       } catch (error) {
    //         console.error('Error signing in:', error.message);
    //         setLoading(false);
    //         Alert.alert('Error', error.message);
    //         // Handle sign-in error, e.g., show an error message to the user
    //       }
    //     }
    //   };




    const handleSignIn = async () => {
      if (validation()) {
        setLoading(true);
        try {
          const authResponse = await auth().signInWithEmailAndPassword(Email, Password);
    
          // Get user data from Firebase Realtime Database
          const userRef = database().ref(`Users/${authResponse.user.uid}`);
          const userSnapshot = await userRef.once('value');
    
          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
    
            // Check if 'tries' field exists in user data
            if (!('tries' in userData)) {
              // If 'tries' doesn't exist, add it with a default value of 3
              await userRef.update({ tries: 3 });
            }
    
            // Include the uid in the userData
            userData.uid = authResponse.user.uid;
    
            setLoading(false);
            dispatch(adduser(userData));
            // Continue with the normal login process
            // navigation.navigate('BottomTab');
          } else {
            setLoading(false);
            Alert.alert('Error', 'User data not found in Realtime Database.');
          }
        } catch (error) {
          console.error('Error signing in:', error.message);
          setLoading(false);
          Alert.alert('Error', error.message);
          // Handle sign-in error, e.g., show an error message to the user
        }
      }
    };



    // const handleGoogleSignIn = async () => {
    //     setLoading(true)
    //     try {
    //       // Initialize Google Sign-In
    //       await GoogleSignin.configure({
    //         webClientId: '1096852808895-ljfbscrhp47ln1l7qqpnso2b0npmgstv.apps.googleusercontent.com',
    //       });
      
    //       // Sign in with Google
    //       const { idToken, user } = await GoogleSignin.signIn();
      
    //       // Create a Google credential from the Google ID token
    //       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
    //       // Sign in with Firebase using the Google credential
    //       const authResponse = await auth().signInWithCredential(googleCredential);
    //       console.log('first',authResponse)
    //       // Check if the user is new or existing
    //       if (authResponse.additionalUserInfo.isNewUser) {
    //         // Handle new user registration
    //         // You can save additional user information to Firestore here

    //         Alert.alert('Success', 'User registered successfully');
    //       }
    //   setLoading(false)
    //       dispatch(adduser(authResponse.user));
          
    //     } catch (error) {
    //       console.error('Error signing in with Google:', error);
    //       // Handle sign-in error, e.g., show an error message to the user
    //       setLoading(false)
    //     }
    //   };

     
    const handleGoogleSignIn = async () => {
      setLoading(true);
      try {
        // Initialize Google Sign-In
        await GoogleSignin.configure({
          webClientId: '1096852808895-ljfbscrhp47ln1l7qqpnso2b0npmgstv.apps.googleusercontent.com',
        });
    
        // Sign in with Google
        const { idToken, user } = await GoogleSignin.signIn();
    
        // Create a Google credential from the Google ID token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
        // Sign in with Firebase using the Google credential
        const authResponse = await auth().signInWithCredential(googleCredential);
    
        // Check if the user is new or existing
        if (authResponse.additionalUserInfo.isNewUser) {
          // Handle new user registration
          // You can save additional user information to Firestore here
    
          // Add the user data to the Realtime Database
          const userRef = database().ref(`Users/${authResponse.user.uid}`);
          await userRef.set({
            email: user.email,
            firstname: user.givenName,
            lastname: user.familyName,
            // Add other user data as needed
            tries: 3, // Set the initial value of 'tries'
          });
    
          Alert.alert('Success', 'User registered successfully');
        }
    
        setLoading(false);
        dispatch(adduser(authResponse.user));
      } catch (error) {
        console.error('Error signing in with Google:', error);
        // Handle sign-in error, e.g., show an error message to the user
        setLoading(false);
      }
    };
    

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: colors.primary, }}>
                {/* Header */}
                <View style={{ ...styles.center, marginVertical: 50 }}>
                    <Image style={{ width: 100, height: 100, }} source={require('../../assets/images/logo.png')} />
                    <Text style={{ ...styles.h1, marginTop: 20 }} >Hello Again!</Text>
                    <Text style={{ ...styles.h1 }} >You've been missed</Text>
                </View>

                <View style={{ width: wp(90), alignSelf: 'center', height: wp(35), justifyContent: 'space-between', }}>
                    <TextInputauth1
                        emailstate={Email} setEmail={(text) => { setEmail(text), setEmailError('') }}
                        placeholder={'Email'} Icon={require('../../assets/images/mail.png')}
                        borderWidth={EmailError ? 1 : 0}
                        borderColor={EmailError ? 'red' : null}

                    />

                    <TextInputauth1
                        emailstate={Password} setEmail={(text) => { setPassword(text), setPasswordError('') }}
                        placeholder={'Password'} Icon={require('../../assets/images/lock.png')} EndImage1={require('../../assets/images/open_eye.png')}
                        EndXimage={require('../../assets/images/close_eye.png')}
                        borderWidth={PasswordError ? 1 : 0}
                        borderColor={PasswordError ? 'red' : null}

                    />

                </View>

                <TouchableOpacity onPress={() =>  navigation.navigate('Forget')} activeOpacity={0.7} style={{ width: wp(90), alignSelf: 'center', marginVertical: wp(5), }}>
                    <Text style={{ color: colors.secondary, textAlign: 'right' }}>Forgot Password?</Text>
                </TouchableOpacity>


                <View style={{ ...styles.submitContainer, }}>

                    <SubmitButton
                        title={'Sign in'}
                        onPress={() => handleSignIn()}
                        style={{ width: wp(90), height: wp(14), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                        styleText={{color: colors.white,fontSize: 14,fontFamily:fonts["Poppins-Bold"],right: wp(3),}}
                    />
                    <SocialButton onPress={() =>{handleGoogleSignIn()}} />
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')} activeOpacity={0.7}>
                        <Text style={styles.belowSubmitText}>
                            <Text>Don't have an account? </Text>
                            <Text style={{ color: colors.secondary,fontFamily: fonts['Poppins-SemiBold'] }}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <Loader visible={loading} />

            </View>
        </ScrollView>

    )
}