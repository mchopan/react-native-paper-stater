import {StyleSheet} from 'react-native';
import {Colors} from './colors';
export const textVariants = StyleSheet.create({
  default: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.primary,
    fontWeight: '500',
  },
  textForm: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'GothicA1-Regular',
  },
  textSubHeading: {
    fontSize: 16,
    color: Colors.whiteBackground,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
    textAlign: 'center',
  },
  textHeading: {
    fontSize: 18,
    color: Colors.whiteBackground,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
  },
  textMainHeading: {
    fontSize: 20,
    color: Colors.whiteBackground,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
  },
});

export const buttonVariants = StyleSheet.create({
  default: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.primary,
    fontWeight: '500',
  },
  buttonXS: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'GothicA1-Regular',
  },
  buttonS: {
    fontSize: 16,
    color: Colors.whiteBackground,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonL: {
    fontSize: 18,
    color: Colors.whiteBackground,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
  },
  buttonXL: {
    fontSize: 20,
    color: Colors.whiteBackground,
    fontFamily: 'GothicA1-Regular',
    fontWeight: '800',
  },
});
