import { View, Text, TouchableOpacity, Image,} from 'react-native'
import React from 'react'
import { colors, fonts, styles } from '../../Screens/Config/styles'
import LinearGradient from 'react-native-linear-gradient';
import SubmitButton from '../Subnitbutton/SubmitButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../Redux/Action/Index';

export default function ChatCardhome({ messages,onPress,ondelete}) {


    





    // console.log('messages???????????? in cardHome',messages.id)
    const dispatch = useDispatch()
    // console.log('Messages IN card ', messages)
   
    const handleDelete = (messages) => {
        // console.log('message id od od id didn',messages)
        dispatch(deleteMessage(messages));
      };

    return (
        <View style={styles.chatCardContainer}>
            {/* Header */}
            <View style={{ ...styles.chatCardHeader, ...styles.rowSpread }}>
            
                      <Text style={styles.chatCardDate}>{moment(messages.id).format('LLL')}</Text>
                    

                <TouchableOpacity onPress={() =>handleDelete(messages.id)} >
                    <Image style={{ width: 16, height: 18, }} source={require('../../assets/images/delete.png')} />
                </TouchableOpacity>
            </View>
            
            <View style={{ ...styles.chatCardBody, gap: 15 }}>
           
                   <View style={{flexDirection: 'row',}}>
                    <Image style={{width: 20,height: 20,}}  source={require('../../assets/images/12.png')} />
                    <Text style={{ fontSize: 12, color: colors.empty, fontFamily: fonts['Poppins-Medium'], left: wp(1)}} >{messages.userMessage}</Text>
                    </View>

                    <View style={{flexDirection: 'row',width: wp(90),}}>
                    <Image style={{width: 20,height: 20, }}  source={require('../../assets/images/logo.png')} />
                    <Text style={{ fontSize: 12, color: colors.empty,fontFamily: fonts['Poppins-Medium'],left: wp(1),width: wp(77), }} >{messages.botMessage}</Text>
                    </View>
        

            </View>

            <LinearGradient
                containerStyle={styles.bottomGradient}
                colors={['rgba(3, 27, 34, 0)', colors.primary]}
            />
        
            <View style={styles.chatCardButtonContainer}>
                <SubmitButton
                    title='See Chat'
                    style={{ width: wp(30), height: wp(11), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',right: wp(1) }}
                    textStyle={{ fontSize: 10,fontFamily: fonts['Poppins-Regular'],color:colors.brand,right: wp(2.5), }}
                     onPress={onPress}
                />
            </View>
        </View>
    )
}