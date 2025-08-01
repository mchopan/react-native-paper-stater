import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Card from './Card';
import {Text} from 'react-native-paper';
import {Colors} from '../../theme/colors';
import Spacer from '../Spacer';
import DottenLine from '../DottenLine';
import CustomButton from '../CustomButton';

const SelectTruckCard = ({onPress, driversData}) => {
  console.log('loggs', driversData, 'driver');
  return (
    <Card>
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Image
            style={{height: 20, width: 20}}
            source={require('../../assets/verified.png')}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              fontFamily: 'GothicA1-Regular',
              color: Colors.verified,
            }}>
            RC verified
          </Text>
        </View>
        <View style={{alignItems: 'center', gap: 10}}>
          <Image
            style={{height: 60, width: 150}}
            source={require('../../assets/whitetruck.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '500',
              fontFamily: 'GothicA1-Regular',
              color: Colors.gray,
            }}>
            <Text style={{fontWeight: '700'}}>{driversData.vehicleType}</Text>(
            {driversData.vehicleRegistrationNumber})
          </Text>
        </View>
        <Spacer />
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'center',
          }}>
          <Image
            tintColor={'#E66613'}
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../../assets/MapPinLight.png')}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              fontFamily: 'GothicA1-Regular',
              color: Colors.gray,
            }}>
            Current Location:{' '}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              fontFamily: 'GothicA1-Regular',
              color: Colors.primary,
            }}>
            {driversData.address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{height: 20, width: 20}}
              source={require('../../assets/weight.png')}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '800',
                fontFamily: 'GothicA1-Regular',
                color: Colors.gray,
              }}>
              4 Tons
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{height: 20, width: 20}}
              source={require('../../assets/fuel.png')}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '800',
                fontFamily: 'GothicA1-Regular',
                color: Colors.gray,
              }}>
              Diesel
            </Text>
          </View>
        </View>
      </View>
      <DottenLine />
      <View style={{padding: 10}}>
        <CustomButton label="Bid Now" mode="contained" onPress={onPress} />
      </View>
    </Card>
  );
};

export default SelectTruckCard;

const styles = StyleSheet.create({});
