import { View, Text,TouchableOpacity,Image,Modal,ScrollView,TouchableNativeFeedback,Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import { colors,styles,fonts } from '../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { generalOptions,supportOptions, } from '../../Constants/DummyData';
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../../Redux/Action/Index';
import auth from '@react-native-firebase/auth';
import Loader from '../../Components/Loader/Loader';

export default function Settings({navigation}) {
  const dispatch = useDispatch()
  const [confirm, setconfirm] = useState(false);
  const [loading, setLoading] = useState(false)
  const userdata = useSelector(state => state?.USER)

  // console.log('userdata',userdata.userData.email)


  const handlePasswordReset = async () => {
    try {
      setLoading(true);
  
      // Check if the email is available
      const userEmail = userdata?.userData?.email;
  
      if (!userEmail) {
        // Handle the case where the email is not available
        Alert.alert('Error', 'User email not available.');
        setLoading(false);
        return;
      }
  
      await auth().sendPasswordResetEmail(userEmail);
      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for instructions to reset your password.'
      );
    } catch (error) {
      // Handle errors gracefully
      const errorMessage =
        error.code === 'auth/user-not-found'
          ? 'User not found. Please check the email address.'
          : error.message || 'An error occurred while sending the reset email.';
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const authOptions = [
    {
      title: 'Logout',
      subtitle: 'Log out of your account',
      icon: require('../../assets/images/logout.png'),
      onPress: () => {setconfirm(true)}
    },
  ]

  const profile = [
      {
        title: 'Profile',
        subtitle: 'View Your Personal Details',
        icon: require('../../assets/images/12.png'),
        onPress: () => navigation.navigate('Profile')
      },
      {
      
        title: 'Change Password',
        subtitle: 'Change your password',
        icon: require('../../assets/images/padlock.png'),
        onPress: () => handlePasswordReset()
      },
    
  ]

  const data = [
 
    {
      
      title: 'Profile Settings',
      options: profile
    },
    {
      
      title: 'General Settings',
      options: generalOptions
    },
    {
      title: 'Support',
      options: supportOptions
    },
    {
      title: 'Logout',
      options: authOptions
    },
  ]
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1,}}>
      <View style={[styles.screenMargins,{
        flex: 1,
        backgroundColor: colors.primary,
      }]}>

        <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, }}>Settings</Text>
      </View>

      <Modal animationType="slide" transparent={true} visible={confirm}>
     
                    <TouchableOpacity activeOpacity={1} onPress={() => setconfirm(false)} style={{flex: 1,  backgroundColor: 'rgba(129,128,128,0.8)',}}></TouchableOpacity>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'rgba(129,128,128,0.8)',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: colors.accent,
                                    borderRadius: wp(2),
                                    elevation: 2,
                                    width: wp(90),
                                    height: wp(35),
                                    alignSelf: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: 14,
                                         fontFamily: fonts['Poppins-SemiBold'],
                                        alignSelf: 'center',
                                        marginTop: wp(5),
                                    }}>
                                    Are You Sure You Want To Logout
                                </Text>
                                <View
                                    style={{
                                      width: wp(70),
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        // marginRight: wp(2),
                                        // marginTop: wp(5),
                                        alignSelf: 'center',
                                        // backgroundColor: 'pink',
                                    }}>
                                    <TouchableOpacity
                                    activeOpacity={0.8}
                                        onPress={() => setconfirm(false)}
                                        style={{
                                            marginRight: wp(2),
                                            
                                            borderRadius: 5,
                                         
                                            // borderColor: Colors.primary,
                                            elevation: 2,
                                            marginTop: wp(5),
                                            alignSelf: 'center',
                                            backgroundColor: 'white',
                                            width: wp(30),
                                            height: wp(12),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: colors.accent,
                                            // borderRadius: wp(10),
                                            borderWidth: 1,
                                            borderColor: colors.secondary,
                                        }}>
                                        <Text
                                            style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    activeOpacity={0.8}
                                        onPress={() => {
                                            dispatch(adduser(null))
                                            setconfirm(false)
                                            // navigation.navigate('Signin')
                                            // console.log('clear the logout',adduser)
                                        }}
                                        style={{
                                            marginTop: wp(5),
                                            alignSelf: 'center',
                                            backgroundColor: colors.secondary,
                                            borderRadius: 5,
                                            elevation: 2,
                                            width: wp(30),
                                            height: wp(12),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            // borderRadius: wp(10),
                                        }}>
                                        <Text
                                            style={{ color: 'white', fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity  activeOpacity={1} onPress={() => setconfirm(false)} style={{flex: 1, backgroundColor: 'rgba(129,128,128,0.8)',}}></TouchableOpacity>
                      

                    </Modal>


        {
          data?.map((item, index) => (
            <View style={{ marginBottom: 20 }} key={index}>
              <Text style={{ ...styles.h2, marginBottom: 5, }}>{item.title}</Text>
              <View style={{
                padding: 10,
                backgroundColor: colors.accent,
                borderRadius: 10
              }}>
                {
                  item.options.map((option, idx) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={option.onPress} key={idx} style={{ ...styles.row, padding: 10, gap: 15 }}>
                      <Image resizeMode='contain' style={{width: 25,height: 25,}} source={option.icon} />
                      <View>
                        <Text style={styles.h3}>{option.title}</Text>
                        <Text style={{ ...styles.empty, paddingVertical: 0 }}>{option.subtitle}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          ))
        }
        <Loader visible={loading} />
      </View>
      </ScrollView>
  
  )
}