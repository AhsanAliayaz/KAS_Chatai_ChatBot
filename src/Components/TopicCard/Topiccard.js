import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { colors,font,styles } from '../../Screens/Config/styles'
import SubmitButton from '../Subnitbutton/SubmitButton';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Topicscard({navigation}) {
  return (
    <TouchableOpacity style={{width: wp(90),height: wp(18),backgroundColor: colors.accent,}}>
      <Text></Text>
      <Text></Text>
      <SubmitButton />
    </TouchableOpacity>
  )
}