import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { colors,fonts,styles } from '../../Screens/Config/styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function SubmitButton({title,onPress,leftIcon,style,styleText}) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
     <Image style={{width:18,height: 18,right: wp(4)}} source={leftIcon} />
      <Text style={styleText}>{title}</Text>
    </TouchableOpacity>
  )
}