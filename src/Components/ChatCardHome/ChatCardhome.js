import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, fonts, styles } from '../../Screens/Config/styles'
import LinearGradient from 'react-native-linear-gradient';
import SubmitButton from '../Subnitbutton/SubmitButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

export default function ChatCardhome({ messages,onPress,ondelete}) {

    console.log('Messages', messages)
   
    return (
        <View style={styles.chatCardContainer}>
            {/* Header */}
            <View style={{ ...styles.chatCardHeader, ...styles.rowSpread }}>
            {messages.map((message) => ( 
                         message.role =='user'?
                     <Text style={styles.chatCardDate}>{moment(message.timestamp).format('LLL')}</Text>: null
                     
           
                ))}
               
                <TouchableOpacity onPress={ondelete} >
                    <Image style={{ width: 16, height: 18, }} source={require('../../assets/images/delete.png')} />
                </TouchableOpacity>
            </View>
            {/* Body */}
            <View style={{ ...styles.chatCardBody, gap: 15 }}>
                {messages.map((message) => (
                   
                    <Text style={{ color: colors.empty, }} key={message.id}> {message.content}</Text>
             
                ))}

            </View>
            <LinearGradient
                containerStyle={styles.bottomGradient}
                colors={['rgba(3, 27, 34, 0)', colors.primary]}
            />
            {/* See Full Chat Button */}
            <View style={styles.chatCardButtonContainer}>
                <SubmitButton
                    title='See Full Chat'
                    style={{ width: wp(30), height: wp(11), backgroundColor: colors.secondary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
                    textStyle={{ fontSize: 10 }}
                onPress={onPress}
                />
            </View>
        </View>
    )
}