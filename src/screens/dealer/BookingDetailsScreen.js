import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import CustomButton from '../../components/CustomButton';
import { TextInput } from 'react-native-paper';
import { textVariants } from '../../theme/styleVariants';
import { MyContext } from '../../store/MyContext';
import Toast from 'react-native-toast-message';
import BookingServices from '../../api/bookingServices';
import Loading from '../../components/Loading';
import LocationRateService from '../../api/locationRateService';
import { useNavigation } from '@react-navigation/native';

const vehicleTypeData = [
  { label: 'Mini Truck', value: 'Mini Truck' },
  {
    label: 'Light Commercial Vehicle (LCV)',
    value: 'Light Commercial Vehicle (LCV)',
  },
  { label: 'Medium Duty Truck (MDT)', value: 'Medium Duty Truck (MDT)' },
  { label: 'Heavy Duty Truck (HDT)', value: 'Heavy Duty Truck (HDT)' },
  { label: 'Multi-Axle Truck', value: 'Multi-Axle Truck' },
  { label: 'Refrigerated Truck', value: 'Refrigerated Truck' },
  { label: 'Container Truck', value: 'Container Truck' },
  { label: 'Tanker Truck', value: 'Tanker Truck' },
  { label: 'Tipper Truck', value: 'Tipper Truck' },
  { label: 'Trailer', value: 'Trailer' },
];

const goodsData = [
  { label: 'Scraps', value: 'Scraps' },
  { label: 'Plastic', value: 'Plastic' },
  { label: 'Tyre', value: 'Tyre' },
  { label: 'Paper Waste', value: 'Paper Waste' },
  { label: 'Fruits', value: 'Fruits' },
  { label: 'Wood', value: 'Wood' },
  { label: 'Coal', value: 'Coal' },
];

const payment_mode = [
  { label: 'Advance Payment', value: 'Advance Payment' },
  { label: 'COD', value: 'COD' },
];

const BookingDetailsScreen = () => {
  const navigation = useNavigation();

  const {
    date,
    setDate,
    vehicleType,
    setVehicleType,
    pickUpLocation,
    setPickUpLocation,
    dropLocation,
    setDropLocation,
    goods,
    setGoods,
    weight,
    setWeight,
    paymentMode,
    setPaymentMode,
    user,
  } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [routeRate, setRouteRate] = useState(0);

  const checkRouteRate = useCallback(async () => {
    if (!pickUpLocation || !dropLocation || !vehicleType?.value) {
      Toast.show({
        type: 'info',
        text1: 'Please select pickup location, drop location and vehicle type',
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await LocationRateService.getRouteRateFromTo(
        pickUpLocation,
        dropLocation,
        vehicleType.value,
      );

      if (res.length === 0) {
        Toast.show({
          type: 'info',
          text1: 'No rate found for this route',
          text2: 'Please contact support for rate information',
        });
        setRouteRate(0);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Rate found for this route',
          text2: `₹${res[0].price}`,
        });
        setRouteRate(res[0].price);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching route rate',
        text2: error.message,
      });
      setRouteRate(0);
    } finally {
      setIsLoading(false);
    }
  }, [pickUpLocation, dropLocation, vehicleType]);

  useEffect(() => {
    if (pickUpLocation && dropLocation && vehicleType?.value) {
      checkRouteRate();
    }
  }, [checkRouteRate, pickUpLocation, dropLocation, vehicleType]);

  const handleSubmit = async () => {
    if (vehicleType == '' || goods == '' || weight == '' || paymentMode == '') {
      Toast.show({
        type: 'info',
        text1: `${'All fields are required'}`,
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await BookingServices.createBooking({
        dealer: user._id,
        pickUpCityLocation: pickUpLocation,
        dropCityLocation: dropLocation,
        selectDate: date,
        selectVehicleType: vehicleType.value,
        selectGoodsType: goods.value,
        enterWeightKg: weight,
        advancePayment: paymentMode.value,
        dealerPhoneNumber: user.phoneNumber,
        freightRate: routeRate,
      });
      if (res.status == 201) {
        await BookingServices.sendPushNotificationsToDrivers(res.data._id);
        Toast.show({
          type: 'success',
          text1: 'Notification send successfully',
        });
        setIsLoading(false);
      }
      setDropLocation('');
      setPickUpLocation('');
      setPaymentMode('');
      setGoods('');
      setVehicleType('');
      setWeight('');
      setDate(new Date());
      setIsLoading(false);
      navigation.navigate('Driver Menu Screen');
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'error');
    }
    setIsLoading(false);
  };

  const handleSingleBit = () => {
    if (vehicleType == '' || goods == '' || weight == '' || paymentMode == '') {
      Toast.show({
        type: 'info',
        text1: `${'All fields are required'}`,
      });
      return;
    }
    navigation.navigate('Find Truck');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.formContainer}>
            <CustomInput type="date" />
            <TextInput
              outlineColor={Colors.gray}
              textColor={Colors.primary}
              placeholderTextColor={Colors.secondary}
              style={[textVariants.textForm, { marginLeft: -25, fontSize: 12 }]}
              onChangeText={text => {
                setWeight(text);
              }}
              value={weight}
              theme={{ colors: { onSurfaceVariant: Colors.gray }, roundness: 10 }}
              mode="flat"
              keyboardType="number-pad"
              label="Enter Weight (TON)"
              // placeholder={placeholder}
              left={
                <TextInput.Icon
                  style={{ marginLeft: 20 }}
                  icon={'weight'}
                  size={25}
                  color={Colors.primary}
                // onPress={handleShowPassword}
                />
              }
            />
            <CustomSelect
              renderIcon={() => {
                return (
                  <Image
                    style={{ width: 25, marginRight: 10 }}
                    source={require('../../assets/vehicleIcon.png')}
                    resizeMode="contain"
                  />
                );
              }}
              mode="flat"
              placeholder="Select Vehicle Type"
              data={vehicleTypeData}
              value={vehicleType}
              onChange={text => {
                setVehicleType(text);
              }}
            />
            <CustomSelect
              renderIcon={() => {
                return (
                  <Image
                    style={{ width: 25, marginRight: 10 }}
                    source={require('../../assets/goodsIcon.png')}
                    resizeMode="contain"
                  />
                );
              }}
              mode="flat"
              placeholder="Select Goods Type"
              data={goodsData}
              value={goods}
              onChange={text => {
                setGoods(text);
              }}
            />

            <CustomSelect
              renderIcon={() => {
                return (
                  <Image
                    style={{ width: 25, marginRight: 10 }}
                    source={require('../../assets/paymentTypeIcon.png')}
                    resizeMode="contain"
                  />
                );
              }}
              mode="flat"
              placeholder="Select Payment Method"
              data={payment_mode}
              value={paymentMode}
              onChange={text => {
                setPaymentMode(text);
              }}
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          mode="contained"
          label="Send Request To Selected Driver"
          onPress={handleSingleBit}
        />
        <CustomButton
          mode="outlined"
          label="Send Request To All The Drivers"
          onPress={handleSubmit}
        />
        <View style={styles.rateContainer}>
          {isLoading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <>
              <Text style={styles.rateLabel}>Route Rate:</Text>
              <Text style={styles.rateValue}>
                {routeRate ? `₹${routeRate}` : 'Not available'}
              </Text>
            </>
          )}
        </View>
      </View>

      {isLoading && <Loading />}
    </View>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: Colors.whiteBackground,
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: Colors.whiteBackground,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContainer: {
    gap: 10,
    flexGrow: 1,
    paddingBottom: 20,
  },
  buttonContainer: {
    gap: 10,
    width: '100%',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rateContainer: {
    padding: 12,
    backgroundColor: Colors.whiteBackground,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateLabel: {
    fontSize: 14,
    fontFamily: 'GothicA1-SemiBold',
    color: Colors.primary,
  },
  rateValue: {
    fontSize: 16,
    fontFamily: 'GothicA1-Bold',
    color: Colors.primary,
  },
});
