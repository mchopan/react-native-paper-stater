import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../theme/colors';
import {textVariants} from '../../theme/styleVariants';
import RouteRateMonitorCard from '../../components/cards/RouteRateMonitorCard';
import LocationRateService from '../../api/locationRateService';
import Card from '../../components/cards/Card';

const RouteRateMonitor = () => {
  const [rateLocations, setRateLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllRateLocations = async () => {
    try {
      setLoading(true);
      const res = await LocationRateService.getAllLocationRates();
      setRateLocations(res);
    } catch (error) {
      console.log('error in getRatesByLocation', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRateLocations();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No data found</Text>
          </View>
        )}
        data={rateLocations}
        renderItem={({item}) => <RouteRateMonitorCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={getAllRateLocations}
      />
    </View>
  );
};

export default RouteRateMonitor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.tertiary,
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
});
