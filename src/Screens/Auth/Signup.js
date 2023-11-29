import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import TextInputauth1 from '../../Navigation/TextInputauth1/TextInputauth1'
import { colors, styles, fonts } from '../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import CheckBox from '@react-native-community/checkbox';
import SubmitButton from '../../Components/Subnitbutton/SubmitButton';
import TextInput2 from '../../Navigation/TextInputauth1/TextInput2';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import { useSelector, useDispatch } from 'react-redux';
import { adduser } from '../../Redux/Action/Index';
import Loader from '../../Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';



export default function Signup({ navigation }) {

    const userdata = useSelector(state => state?.USER)
    //    console.log('userdata in sign up screen',userdata)
    const firebaseDatabase = database().ref();
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (newValue) => {
        setIsChecked(newValue);
    };

    // const handleSignup = () => {
    //     if (isChecked) {
    //       // Implement signup logic when the checkbox is checked
    //       console.log('Signing up...');
    //     }
    //   };

    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [loading, setLoading] = useState(false)
    const [Firstname, setFirstname] = useState('');
    // console.log('firstName in signup screen',Firstname)
    const [FirstnameError, setFirstnameError] = useState('');

    const [LastName, setLastName] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [Email, setEmail] = useState('')
    // console.log('email in signup screen',Email)
    const [EmailError, setEmailError] = useState('')
    // console.log('EmailError in signup screen',EmailError)
    const [Password, setPassword] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
    const [MatchPassword, setMatchPassword] = useState('');



    const validation = () => {
        if (!Firstname && !LastName && !Email && !Password && !ConfirmPassword) {
            setFirstnameError('hello');
            setLastNameError('Please enter some text.');
            setEmailError('Please enter some text.');
            setPasswordError('Please enter some text.');
            setConfirmPasswordError('Please enter some text.');

            return false;
        } else if (!Firstname) {
            setFirstnameError('hello');
            return false;
        } else if (!LastName) {
            setLastNameError('Please enter some text.');
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

        else if (!ConfirmPassword) {
            setConfirmPasswordError('Please enter some text.');
            return false;
        }
        else if (Password != ConfirmPassword) {
            setMatchPassword('Password Not Match.')
            return false

        }


        return true;
    };

    const privacyPolicyURL = "https://kattakappsstudio.blogspot.com/2023/04/khattak-apps-studio-user-privacy-is.html"; // Replace this with your privacy policy URL

    const handlePrivacyPolicyPress = () => {
        Linking.openURL(privacyPolicyURL)
            .catch(err => console.error("Error opening link:", err));
    };


    const handleSignup = async () => {
        

        if (validation()) {
            setLoading(true);
            try {
                // Register the user in Firebase Authentication
                const authResponse = await auth().createUserWithEmailAndPassword(Email, Password);

                // Save user data in Firebase Realtime Database
                await database().ref(`Users/${authResponse.user.uid}`).set({
                    email: Email,
                    firstname: Firstname,
                    lastname: LastName,
                    tries: 3,
                });

                setLoading(false);

                // Dispatch the addUser action to store the user data in Redux
                dispatch(adduser({
                    uid: authResponse.user.uid,
                    email: Email,
                    firstname: Firstname,
                    lastname: LastName,
                }));

                Alert.alert('Success', 'User registered successfully');
            } catch (error) {
                // Handle registration error
                Alert.alert('Error', error.message);
                setLoading(false);
            }
        }
    };

    const handlePasswordMatch = () => {
        if (Password !== ConfirmPassword) {
          setMatchPassword('Passwords do not match');
          Alert.alert('Error', MatchPassword);
        } else {
          setMatchPassword('');
        }
      };





    return (
        <ScrollView >
            <View style={{ flex: 1, backgroundColor: colors.primary, }}>
                <View style={{ ...styles.center, marginVertical: 50 }}>
                    <Image style={{ width: 100, height: 100, }} source={require('../../assets/images/logo.png')} />
                    <Text style={{ ...styles.h1, marginTop: 20 }} >Hello Again!</Text>
                    <Text style={{ ...styles.h1 }} >You've been missed</Text>
                </View>

                <View style={{ width: wp(90), alignSelf: 'center', height: wp(20), justifyContent: 'space-between', flexDirection: 'row', }}>
                    <TextInput2
                        emailstate={Firstname} setEmail={(text) => { setFirstname(text), setFirstnameError('') }} placeholder={'First Name'}
                        borderColor={FirstnameError ? 'red' : null}
                        borderWidth={FirstnameError ? 1 : 0}
                    />

                    <TextInput2 emailstate={LastName} setEmail={(text) => { setLastName(text), setLastNameError('') }} placeholder={'Last Name'}
                        borderColor={LastNameError ? 'red' : null}
                        borderWidth={LastNameError ? 1 : 0}
                    />

                </View>

                <View style={{ width: wp(90), alignSelf: 'center', height: wp(55), justifyContent: 'space-between', }}>
                    <TextInputauth1 emailstate={Email} setEmail={(text) => { setEmail(text), setEmailError('') }} placeholder={'Email'} Icon={require('../../assets/images/mail.png')}
                        borderColor={EmailError ? 'red' : null}
                        borderWidth={EmailError ? 1 : 0}
                    />

                    <TextInputauth1 emailstate={Password} setEmail={(text) => { setPassword(text), setPasswordError('') }} placeholder={'Password'} Icon={require('../../assets/images/lock.png')} EndImage1={require('../../assets/images/open_eye.png')}
                        EndXimage={require('../../assets/images/close_eye.png')}
                        borderColor={PasswordError ? 'red' : null}
                        borderWidth={PasswordError ? 1 : 0}
                    />

                    <TextInputauth1 emailstate={ConfirmPassword} setEmail={(text) => { setConfirmPassword(text), setConfirmPasswordError('') }} placeholder={'Confirm Password'} Icon={require('../../assets/images/lock.png')} EndImage1={require('../../assets/images/open_eye.png')}
                        EndXimage={require('../../assets/images/close_eye.png')}
                        borderColor={ConfirmPasswordError ? 'red' : null}
                        borderWidth={ConfirmPasswordError ? 1 : 0}
                    />

                    {MatchPassword ? (<Text>{MatchPassword}</Text>) : null}

                </View>

                <TouchableOpacity onPress={() => handlePrivacyPolicyPress()} activeOpacity={0.7} style={{ flexDirection: 'row', gap: 7, width: wp(90), alignSelf: 'center', marginVertical: wp(5), }}>
                    <CheckBox
                        value={isChecked}
                        onValueChange={handleCheckboxChange}
                        tintColors='white'
                    />
                    <Text style={{ color: colors.primaryText, fontSize: 12, width: wp(80), }}>
                        <Text>By signing up, you’re agree to our </Text>
                        <Text style={{ color: colors.secondary }}>Terms & Conditions </Text>
                        <Text>and </Text>
                        <Text style={{ color: colors.secondary }}>Privacy
                            Policy</Text>
                    </Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <View style={{ ...styles.submitContainer, marginTop: 50 }}>
                    {!isChecked ?
                    <SubmitButton
                        title={'Sign up'}
                        
                        style={{ width: wp(90), height: wp(14), backgroundColor: colors.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                        // onPress={() => handleSignup()}
                        styleText={{color: colors.border,fontSize: 14,fontFamily:fonts["Poppins-Bold"],right: wp(3),}}
                    />
                    :
                    <SubmitButton
                        title={'Sign up'}
                        
                        style={{ width: wp(90), height: wp(14), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                        onPress={() => {handleSignup(),handlePasswordMatch()}}
                        styleText={{color: colors.white,fontSize: 14,fontFamily:fonts["Poppins-SemiBold"],right: wp(3),}}
                    />
                    }
                    <TouchableOpacity style={{ marginTop: wp(5) }} onPress={() => navigation.navigate('Signin')} activeOpacity={0.7}>
                        <Text style={styles.belowSubmitText}>
                            <Text>Already have an account?   </Text>
                            <Text style={{ color: colors.secondary, fontFamily: fonts['Poppins-SemiBold'] }}>Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <Loader visible={loading} />
            </View>
        </ScrollView>
    )
}