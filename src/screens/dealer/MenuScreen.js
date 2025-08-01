import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import indianCities from '../../assets/indianCities.json';
import { textVariants } from '../../theme/styleVariants';
import RouteRateMonitorCard from '../../components/cards/RouteRateMonitorCard';
import Card from '../../components/cards/Card';
import RequestCard from '../../components/cards/RequestCard';
import { MyContext } from '../../store/MyContext';
import Toast from 'react-native-toast-message';
import LocationAutocomplete from '../../components/AutoCompleteLocation';
import CustomInput from '../../components/CustomInput';
import BookingServices from '../../api/bookingServices';
import { useNavigation } from '@react-navigation/native';
import LocationRateService from '../../api/locationRateService';

const MenuScreen = () => {
  const navigation = useNavigation();

  const {
    user,
    dropLocation,
    pickUpLocation,
    setPickUpLocation,
    setDropLocation,
  } = useContext(MyContext);

  const [ongoingData, setOngoingData] = useState([]);
  const [rateLocations, setRateLocations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getBookingsByDealerId = useCallback(async () => {
    try {
      const res = await BookingServices.getBookingByDealerId(user._id);
      setOngoingData(res.data);
    } catch (error) {
      console.log('error in bookings', error.message);
    }
  }, [user]);

  const getAllRateLocations = async () => {
    try {
      const res = await LocationRateService.getAllLocationRates();
      setRateLocations(res);
    } catch (error) {
      console.log('error in getRatesByLocation', error.message);
    }
  };

  useEffect(() => {
    getBookingsByDealerId();
    getAllRateLocations();
  }, [getBookingsByDealerId]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([getBookingsByDealerId(), getAllRateLocations()]).finally(() =>
      setRefreshing(false),
    );
  }, [getBookingsByDealerId]);

  const handleSubmit = () => {
    // Todo Handle form submission
    if (pickUpLocation == '' || dropLocation == '') {
      Toast.show({
        type: 'error',
        text1: `${'Please select pickup and drop location'}`,
      });
      return;
    }
    navigation.navigate('Booking Details');
  };

  const bookingDatawithoutReverse = ongoingData.filter(
    item => item.status == 'ongoing',
  );
  const bookingData = bookingDatawithoutReverse.reverse();

  const getUniqueLocations = () => {
    const locations = new Set();
    rateLocations.forEach(rate => {
      locations.add(rate.fromLocation);
      locations.add(rate.toLocation);
    });
    return Array.from(locations);
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/mapbg.png')}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.overlay}>
          <View style={styles.mainFormContainer}>
            <Text
              style={[textVariants.textSubHeading, { color: Colors.primary }]}>
              Want to book a truck?
            </Text>
            <LocationAutocomplete
              value={pickUpLocation}
              onChange={text => setPickUpLocation(text)}
              placeholder="Pick Up City Location"
              suggestions={getUniqueLocations()}
              zIndex={2}
            />
            <LocationAutocomplete
              value={dropLocation}
              onChange={text => setDropLocation(text)}
              placeholder="Drop City Location"
              suggestions={getUniqueLocations()}
              zIndex={1}
            />

            <CustomButton
              mode="contained"
              label="Next"
              onPress={handleSubmit}
            />
          </View>
        </View>
        <View style={{ flex: 1, margin: 10 }}>
          <Card overflow={'hidden'} flex={1} padding={20}>
            <View style={styles.headerContainer}>
              <Text
                style={[textVariants.textSubHeading, { color: Colors.primary }]}>
                Route Rate Monitor
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Route Rate Monitor')}>
                <Text style={{ color: Colors.primary }}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No data found</Text>
                </View>
              )}
              nestedScrollEnabled
              style={{ height: 200 }}
              data={rateLocations.slice(0, 5)}
              renderItem={({ item }) => <RouteRateMonitorCard item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </Card>
          <RequestCard bookingDetails={bookingData} title={'Requests'} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  overlay: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    // justifyContent: "center"
  },
  mainFormContainer: {
    borderColor: Colors.gray,
    borderWidth: 1,
    gap: 20,
    width: '90%',
    backgroundColor: Colors.tertiary,
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
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardHeader: {
    position: 'static',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: Colors.primary,
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
