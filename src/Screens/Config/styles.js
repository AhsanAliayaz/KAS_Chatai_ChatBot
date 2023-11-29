import { StyleSheet, Dimensions, Platform } from "react-native"

export const { width, height } = Dimensions.get('window');
export const paddingHorizontal = 30;
export const screenPadding = paddingHorizontal - 10;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const colors = {
  primary: '#031B22',
  lightPrimary: 'rgba(3, 27, 34, 0.5)',
  secondary: '#19B890',
  lightSecondary: 'rgba(25, 184, 144, 0.5)',
  accent: '#0D2A31',
  ternary: '#143D47',
  primaryText: '#fff',
  border: 'rgba(255,255,255,0.25)',
  icon: '#3B3B3B',
  empty: '#7B949C',
  white: 'white',
  black: 'black',
  brand: '#F5F5F5',
  success: '#04B200',
  danger: 'rgb(255,0,0)',
  invisible: 'rgba(0,0,0,0)'
}

export const fonts = {
  'Poppins-Black': 'Poppins-Black',
  'Poppins-BlackItalic': 'Poppins-BlackItalic',
  'Poppins-Bold': 'Poppins-Bold',
  'Poppins-BoldItalic': 'Poppins-BoldItalic',
  'Poppins-ExtraBold': 'Poppins-ExtraBold',
  'Poppins-ExtraBoldItalic': 'Poppins-ExtraBoldItalic',
  'Poppins-ExtraLight': 'Poppins-ExtraLight',
  'Poppins-ExtraLightItalic': 'Poppins-ExtraLightItalic',
  'Poppins-Italic': 'Poppins-Italic',
  'Poppins-Light': 'Poppins-Light',
  'Poppins-LightItalic': 'Poppins-LightItalic',
  'Poppins-Medium': 'Poppins-Medium',
  'Poppins-MediumItalic': 'Poppins-MediumItalic',
  'Poppins-Regular': 'Poppins-Regular',
  'Poppins-SemiBold': 'Poppins-SemiBold',
  'Poppins-SemiBoldItalic': 'Poppins-SemiBoldItalic',
  'Poppins-Thin': 'Poppins-Thin',
  'Poppins-ThinItalic': 'Poppins-ThinItalic',
}

const center = {
  alignItems: 'center',
  justifyContent: 'center'
};
const border = {
  borderWidth: 1,
  borderColor: colors.border
};
const appMargins = {
  paddingHorizontal: paddingHorizontal
};
const screenMargins = {
  paddingHorizontal: screenPadding
};

const chatCardBorderRadius = 15;

export const styles = StyleSheet.create({
  // Basic
  center,
  border,
  appMargins,
  screenMargins,

  diaglogContainerStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dialogStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: screenPadding,
    borderRadius: 10,
    elevation: 10
  },
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 20
  },
  row: {
    
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center'
  },
  rowSpread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  submitContainer: {
    width:  wp(90),
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginVertical: 50,


  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  counter: {
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  // Navigators
  tabBarLabel: {
    fontFamily: fonts["Poppins-Medium"],
    fontSize: 12
  },
  tabBarStyle: {
    height: 60,
    borderTopWidth: 0.2,
    borderColor: colors.border,
    backgroundColor: colors.primary
  },
  tabBarButton: {
    height: 65,
    width: 65,
    bottom: 60 / 2,

    marginHorizontal: 10,

    // border
    borderColor: colors.border,
    borderWidth: 0.2,
    backgroundColor: colors.primary
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fonts["Poppins-Medium"],
    color: colors.primaryText
  },
  headerButtonStyle: {
    padding: 20
  },
  // Text
  h1: {
    fontSize: 20,
    color: colors.primaryText,
    fontFamily: fonts["Poppins-SemiBold"]
  },
  h2: {
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: fonts["Poppins-Medium"]
  },
  h3: {
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: fonts["Poppins-Medium"]
  },
  p: {
   color: 'rgba(255, 255, 255,0.7)',
    fontSize: 12,
    fontFamily: fonts['Poppins-SemiBold']
  },
  link: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: fonts["Poppins-Regular"],
    borderBottomWidth: 0.2,
    borderColor: colors.secondary,
  },
  belowSubmitText: {
    fontSize: 11,
    color: colors.primaryText,
    fontFamily: fonts["Poppins-Regular"],
    textAlign: 'center'
  },
  error: {
    fontSize: 14,
    color: colors.danger,
    fontFamily: fonts["Poppins-Regular"],
    textAlign: 'center',
    marginBottom: 5
  },
  empty: {
    color: colors.empty,
    fontSize: 12,
    fontFamily: fonts["Poppins-Regular"],
    paddingVertical: 20
  },
  // Form
  formLabel: {
    fontFamily: fonts["Poppins-Medium"],
    fontSize: 14,
    color: colors.primaryText,
    marginLeft: 5,
    marginBottom: 5
  },
  formInput: {
    fontFamily: fonts["Poppins-Regular"],
    fontSize: 13,
    flex: 1,
    marginBottom: -3,
    color: colors.primaryText,
    height: 45,
  },
  formInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    marginBottom: 17,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.03)'
  },
  // Buttons
  disabledButton: {
    backgroundColor: colors.lightSecondary
  },
  primaryButton: {
    backgroundColor: colors.secondary,
    borderRadius: 13,
    paddingVertical: 12,
    ...center
  },
  primaryText: {
    color: colors.white,
    fontFamily: fonts["Poppins-Medium"],
    fontSize: 16,
  },
  ternaryButton: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    ...center
  },
  ternaryText: {
    color: colors.border,
    fontFamily: fonts["Poppins-Medium"],
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 12,
    ...center
  },
  secondaryText: {
    color: colors.white,
    fontFamily: fonts["Poppins-Medium"],
    fontSize: 15,
  },

  // Screens

  // Home Screen
  historyCardContainer: {
    flex: 1,
    padding: 20,
    borderColor: colors.border,

    borderWidth: 1,
    borderTopEndRadius: 37,
    borderTopStartRadius: 37,
  },
  chatCardContainer: {
    backgroundColor: colors.secondary,
    marginBottom: 20,
    borderRadius: chatCardBorderRadius
  },
  chatCardHeader: {
    padding: 10,
    backgroundColor: colors.ternary,
    borderTopLeftRadius: chatCardBorderRadius,
    borderTopRightRadius: chatCardBorderRadius,
  },
  chatCardDate: {
    color: colors.secondary,
    fontSize: 12
  },
  chatCardBody: {
    padding: 10,
    backgroundColor: colors.accent,
    borderBottomLeftRadius: chatCardBorderRadius,
    borderBottomRightRadius: chatCardBorderRadius,
    minHeight: 100,
    
  },
  chatCardMessage: {
    color: colors.primaryText,
    fontSize: 12,
    marginLeft: 20,
    flexWrap: 'wrap',
    flex: 1
  },
  chatCardButtonContainer: {
    ...center,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 10,
  },
  floatingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    padding: 15
  },
  floatingButton: {
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 99
  },

  // Topics Screen
  topicCardContainer: {
    backgroundColor: colors.accent,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20
  },
  topicCardTitle: {
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: fonts["Poppins-Medium"]
  },
  topicCardDescription: {
    fontSize: 14,
    color: colors.primaryText,
    fontFamily: fonts["Poppins-Regular"]
  },
  topicCardImageContainer: {
    height: 88,
    width: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    ...center
  },
  topicQuestionContainer: {
    backgroundColor: colors.accent,
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10
  },
  topicQuestion: {
    color: colors.primaryText,
    fontSize: 14,
    fontFamily: fonts["Poppins-Regular"]
  },

  // Premium Screen
  packageCardContainer: {
    ...border,
    ...center,
    padding: 10,
    paddingVertical: 30,
    flex: 1,
    borderRadius: 20,
  },

  // ChatScreen
  inputContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    ...screenMargins,
    marginBottom: 10
  },
  bottomGradient: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: '80%',
    // backgroundColor: 'white'
  },
  bubbleLeft: {
    flexDirection: 'row',
    gap: 10
  },
  bubbleRight: {
    flexDirection: 'row-reverse',
    gap: 10
  },
  bubble: {
    padding: 15,
    borderRadius: 15,
    maxWidth: '65%',
    marginBottom: 20
  },
})