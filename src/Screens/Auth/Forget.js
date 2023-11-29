import { View, Text, Image,Alert,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors, fonts, styles } from '../Config/styles'
import TextInputauth1 from '../../Navigation/TextInputauth1/TextInputauth1'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SubmitButton from '../../Components/Subnitbutton/SubmitButton';
import Loader from '../../Components/Loader/Loader';
import auth from '@react-native-firebase/auth';


export default function Forget({navigation}) {

    
 

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handlePasswordReset = async () => {
        setLoading(true)
        try {
          await auth().sendPasswordResetEmail(email);
          Alert.alert('Password Reset Email Sent', 'Check your email for instructions to reset your password.');
          setLoading(false)
        } catch (e) {
          setError(e.message);
          Alert.alert('Error', e.message);
          setLoading(false)
        }
      };


    return (
        <ScrollView contentContainerStyle={{flexGrow:1,}}>
        <View style={{ flex: 1, backgroundColor: colors.primary, }}>
            <View style={{ ...styles.center, marginVertical: 50 }}>
                <Image style={{ width: 100, height: 100, }} source={require('../../assets/images/logo.png')} />
                {/* <Text style={{ ...styles.h1, marginTop: 20 }} >Hello</Text>
                    <Text style={{ ...styles.h1 }} >You've been missed</Text> */}
            </View>
            <View style={{width: wp(90),alignSelf: 'center', }}>
              <Text style={{fontFamily: fonts['Poppins-Medium'],color:colors.white}}>Enter your email to reset password.</Text>
            </View>
            <View style={{ width: wp(90), height: wp(20),  alignSelf: 'center', justifyContent: 'flex-end' }}>
                <TextInputauth1  
              emailstate={email} setEmail={(text) => { setEmail(text)}}

                placeholder={'Enter your Email'} 
                Icon={require('../../assets/images/mail.png')}
                />
            </View>
            <View style={{width: wp(90),alignSelf: 'center',marginVertical: wp(20)}}>
                <SubmitButton 
                title={'Done'}
                onPress={() => handlePasswordReset()}
                style={{ width: wp(90), height: wp(14), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                styleText={{color: colors.white,fontSize: 14,fontFamily:fonts["Poppins-Bold"],right: wp(3),}}
                />
            </View>
            <Loader visible={loading} />
        </View>
        </ScrollView>
    )
}