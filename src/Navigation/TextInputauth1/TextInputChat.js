import { View, Text,TextInput,Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors,fonts,styless } from '../../Screens/Config/styles';

export default function TextInputChat({placeholder,icon,value,onChangeText,onPress}) {
      console.log('value',value)
   
  return (
    <View style={{width: wp(90), height: wp(15),justifyContent: 'center',backgroundColor:colors.accent,borderRadius: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    }}>
        
      <TextInput
      value={value}
      onChangeText={onChangeText}
      style={{width: wp(70),color: 'white', right: wp(2),}} placeholder={placeholder} placeholderTextColor={colors.empty} />
      {!value ?
      <View>
        
      <Image style={{width: 20,height: 20, tintColor: colors.border,}} source={icon} />
      </View>
      
     :
     <TouchableOpacity onPress={onPress}>
        
     <Image style={{width: 20,height: 20,}} source={icon} />
     </TouchableOpacity>
     }
    </View>
  )
}