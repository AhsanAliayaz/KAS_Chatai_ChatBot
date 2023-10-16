import { View, Text } from 'react-native'
import React from 'react'
import SubmitButton from '../Subnitbutton/SubmitButton';

import { colors,styles,fonts } from '../../Screens/Config/styles';
// import { FacebookIcon, GoogleIcon } from '../../config/svgs'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



// import useAuths

const SocialButtons = ({onPress}) => {
    // const { loading, onGoogleLogin, } = useAuth();
    return (
        <View style={{ marginBottom: 30 }}>
            <View style={{ ...styles.row, marginVertical: 50, gap: 20 }}>
                <View style={{ flex: 1, borderTopWidth: 1, borderColor: colors.border }} />
                <Text style={styles.p}>OR</Text>
                <View style={{ flex: 1, borderTopWidth: 1, borderColor: colors.border }} />
            </View>
            <View style={{ ...styles.row, gap: 20 }}>
                <SubmitButton
                    leftIcon={require('../../assets/images/google.png')}
                    title='Login with Google'
                    style={{width: wp(90),height: wp(14),backgroundColor:colors.accent ,borderRadius: 10,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',}}
                    textStyle={{ fontSize: 10 }}
                    // type='secondary'
                    onPress={onPress}
                    styleText={{color: colors.white,fontSize: 14,fontFamily:fonts['Poppins-Medium'],right: wp(3),}}
                    // loading={loading == 'google'}
                />
              
            </View>
        </View>
    )
}

export default SocialButtons