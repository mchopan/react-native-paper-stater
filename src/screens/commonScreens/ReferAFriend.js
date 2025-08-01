import React from 'react';
import {View, Text, Button, Share, StyleSheet, Image} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../theme/colors';

const ReferAFriend = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app:',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{width: 300, height: 300}}
          source={require('../../assets/referafriendicon.png')}
        />
        <Text style={styles.title}>
          Help us grow by inviting your friends and family to join our app!
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 10,
          width: '90%',
          alignSelf: 'center',
        }}>
        <CustomButton label="Share" mode="contained" onPress={onShare} />
      </View>
    </View>
  );
};

export default ReferAFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 25,
    fontWeight: '600',
    fontFamily: 'GothicA1-Regular',
  },
});
