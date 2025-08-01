import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../theme/colors';

const Card = ({
  children,
  overflow,
  direction,
  padding,
  bgColor,
  flex,
  radius,
}) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          borderRadius: radius || 10,
          overflow: overflow,
          flex: flex || 0,
          backgroundColor: bgColor || Colors.tertiary,
          padding: padding || 0,
          flexDirection: direction == 'row' ? 'row' : 'column',
        },
      ]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    // minHeight: 300,
    borderColor: Colors.gray,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 10,
    gap: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 20,
    elevation: 10,
  },
});
