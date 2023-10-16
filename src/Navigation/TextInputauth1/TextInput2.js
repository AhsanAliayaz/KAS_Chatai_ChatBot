import { View, Text,TextInput,Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors,fonts,styless } from '../../Screens/Config/styles';

export default function TextInput2({placeholder,Icon,EndImage1,EndXimage,emailstate,setEmail,borderColor,borderWidth}) {

   
  return (
    <View style={{width: wp(40), height: wp(15),alignItems: 'center',justifyContent: 'center',backgroundColor:colors.accent,borderRadius: 10,
    borderWidth: borderWidth,
    borderColor: borderColor,
    }}>
        
      <TextInput
      value={emailstate}
      onChangeText={setEmail}
      style={{width: wp(30),color: 'white',}} placeholder={placeholder} placeholderTextColor={colors.empty} />
     
    </View>
  )
}