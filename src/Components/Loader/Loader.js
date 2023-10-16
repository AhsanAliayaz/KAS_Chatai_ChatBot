import { StyleSheet, Text, View, Modal, TouchableOpacity, } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../Screens/Config/styles';
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
export default function Loader({
    visible,
}) {
    return (
        // <View style={{ flex: 1 }}>
        <View style={{}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            // onRequestClose={onClose}
            >
                <View style={styles.container}>
                    <View style={{width: wp(18),height: wp(18),backgroundColor: 'white', borderRadius: 100,alignItems: 'center',justifyContent: 'center'}}>
                    <ActivityIndicator animating={true}
                        size="large"
                        
                        color={'black'} />
                        </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
           flex: 1,
       justifyContent: 'center',
        alignItems: 'center',
       
    },

})