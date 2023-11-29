import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fonts, styles } from '../../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import TextInputauth1 from '../../../Navigation/TextInputauth1/TextInputauth1';

export default function Profile({ navigation }) {

  const userdata = useSelector(state => state?.USER)
  console.log('userdata', userdata?.userData?.displayName)
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, }}>

      <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={{ width: 15, height: 15, }} source={require('../../../assets/images/back.png')} />
        </TouchableOpacity>
        <View style={{ width: wp(85),alignItems: 'center' }}>
          <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, }}>Profile</Text>
        </View>
      </View>


      <View style={{ ...styles.center, marginVertical: 20 }}>
        <Image style={{ width: 100, height: 100 }} source={require('../../../assets/images/logo.png')} />
        <Text style={{ ...styles.p, marginTop: 20 }} >Hello {userdata?.userData?.firstname || userdata?.userData?.displayName}</Text>
      </View>


      <View style={{ width: wp(90), alignSelf: 'center', height: wp(35), justifyContent: 'space-between', }}>
        <TextInputauth1
          editable={false}
          // emailstate={Email} setEmail={(text) => { setEmail(text), setEmailError('') }}
          placeholder={userdata?.userData?.firstname || userdata?.userData?.displayName}
          Icon={require('../../../assets/images/12.png')}


        />

        <TextInputauth1
          editable={false}
          // emailstate={Password} setEmail={(text) => { setPassword(text), setPasswordError('') }}
          placeholder={userdata?.userData?.email}
          Icon={require('../../../assets/images/mail.png')}


        />

      </View>

    </View>
  )
}