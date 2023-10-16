import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Screens/Config/styles';

export default function TextInputauth1({ placeholder, Icon, EndImage1, EndXimage, emailstate, setEmail, borderColor, borderWidth }) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={{
      width: wp(90), height: wp(15), alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, borderRadius: 10, flexDirection: 'row',
      borderWidth: borderWidth,
      bordercolor: borderColor,
    }}>
      <Image resizeMode='contain' style={{ width: 13, height: 17.5 }} source={Icon} />
      <TextInput
        value={emailstate}
        onChangeText={setEmail}
        secureTextEntry={placeholder === 'Password' || placeholder === 'Confirm Password' ? isPasswordVisible : false} style={{ width: wp(70), color: 'white',marginLeft: wp(2), }} placeholder={placeholder} placeholderTextColor={colors.empty} />
      <TouchableOpacity onPress={() => togglePasswordVisibility()}>
        <Image
          style={{ width: 20, height: 20 }}
          tintColor="white"
          source={isPasswordVisible ? EndImage1 : EndXimage}
        />
      </TouchableOpacity>
    </View>
  )
}