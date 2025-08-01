import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme/colors';

const DottenLine = () => {
  return (
    <View
      style={{
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: Colors.gray,
      }}
    />
  );
};

export default DottenLine;

const styles = StyleSheet.create({});
