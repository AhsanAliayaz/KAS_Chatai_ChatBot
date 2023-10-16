import { View, Text,TouchableOpacity,Image,Modal } from 'react-native'
import React,{useEffect,useState} from 'react'
import { colors,styles,fonts } from '../Config/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { generalOptions,supportOptions } from '../../Constants/DummyData';
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../../Redux/Action/Index';
// import { logoutUser } from '../../Redux/Action/Index';


export default function Settings({}) {
  const dispatch = useDispatch()
  const [confirm, setconfirm] = useState(false);

  const authOptions = [
    {
      title: 'Logout',
      subtitle: 'Log out of your account',
      icon: require('../../assets/images/logout.png'),
      onPress: () => {setconfirm(true)}
    }
  ]

  const data = [
    {
      title: 'Profile',
      options: authOptions
    },
    {
      
      title: 'General Settings',
      options: generalOptions
    },
    {
      title: 'Support',
      options: supportOptions
    },
  ]
  return (
  
      <View style={[styles.screenMargins,{
        flex: 1,
        backgroundColor: colors.primary,
      }]}>

        <View style={{ width: wp(90), height: wp(13), alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontFamily: fonts['Poppins-Regular'], color: colors.white, }}>Settings</Text>
      </View>

      <Modal animationType="slide" transparent={true} visible={confirm}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'rgba(129,128,128,0.8)',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: colors.accent,
                                    borderRadius: wp(2),
                                    elevation: 2,
                                    width: wp(90),
                                    height: wp(35),
                                    alignSelf: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: 14,
                                         fontFamily: fonts['Poppins-SemiBold'],
                                        alignSelf: 'center',
                                        marginTop: wp(5),
                                    }}>
                                    Are You Sure You Want To Logout
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginRight: wp(2),
                                        marginTop: wp(5),
                                    }}>
                                    <TouchableOpacity
                                    activeOpacity={0.8}
                                        onPress={() => setconfirm(false)}
                                        style={{
                                            marginRight: wp(2),
                                            
                                            borderRadius: 5,
                                         
                                            // borderColor: Colors.primary,
                                            elevation: 2,
                                            marginTop: wp(5),
                                            alignSelf: 'center',
                                            backgroundColor: 'white',
                                            width: wp(30),
                                            height: wp(12),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: colors.accent,
                                            // borderRadius: wp(10),
                                        }}>
                                        <Text
                                            style={{ color: colors.white, fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    activeOpacity={0.8}
                                        onPress={() => {
                                            dispatch(adduser(null))
                                            setconfirm(false)
                                            // navigation.navigate('Signin')
                                            // console.log('clear the logout',adduser)
                                        }}
                                        style={{
                                            marginTop: wp(5),
                                            alignSelf: 'center',
                                            backgroundColor: colors.accent,
                                            borderRadius: 5,
                                            elevation: 2,
                                            width: wp(30),
                                            height: wp(12),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            // borderRadius: wp(10),
                                        }}>
                                        <Text
                                            style={{ color: 'white', fontSize: 14, fontFamily: fonts['Poppins-SemiBold']}}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                       

                    </Modal>


        {
          data?.map((item, index) => (
            <View style={{ marginBottom: 20 }} key={index}>
              <Text style={{ ...styles.h2, marginBottom: 5, }}>{item.title}</Text>
              <View style={{
                padding: 10,
                backgroundColor: colors.accent,
                borderRadius: 10
              }}>
                {
                  item.options.map((option, idx) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={option.onPress} key={idx} style={{ ...styles.row, padding: 10, gap: 15 }}>
                      <Image resizeMode='contain' style={{width: 25,height: 25,}} source={option.icon} />
                      <View>
                        <Text style={styles.h3}>{option.title}</Text>
                        <Text style={{ ...styles.empty, paddingVertical: 0 }}>{option.subtitle}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
  
  )
}