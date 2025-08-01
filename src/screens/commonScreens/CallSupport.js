import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {Colors} from '../../theme/colors';

const CallSupport = () => {
  const handCallPress = () => {
    const phoneNumber = '7780883366';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-around'}}>
      <View>
        <Text style={styles.title}>Need Assistance?</Text>
        <Text style={styles.subtitle}>
          To start a call, simply press the button below.
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handCallPress}>
          <Image
            style={{width: 200, height: 200, alignSelf: 'center'}}
            source={require('../../assets/callsupporticon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallSupport;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'GothicA1-Regular',
    color: Colors.primary,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'GothicA1-Regular',
    color: Colors.gray,
  },
});
