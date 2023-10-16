import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { colors } from '../../Screens/Config/styles'

export default function SumitButtonshort() {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
     <Image source={leftIcon} />
      <Text style={{color: colors.white,fontSize: 14,fontFamily:fonts["Poppins-Medium"] }}>{title}</Text>
    </TouchableOpacity>
  )
}