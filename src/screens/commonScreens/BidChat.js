import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import Card from '../../components/cards/Card';
import { Colors } from '../../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { MyContext } from '../../store/MyContext';
import NegotiationServices from '../../api/negotiationServices';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';
import Loading from '../../components/Loading';

const formatDisplayLocationName = displayName => {
  const parts = displayName.split(', ');
  return parts.slice(0, 1).join(', ');
};

const BidCard = ({ isLoading, setIsLoading }) => {
  const { item, setItem, user } = useContext(MyContext);
  const { userType } = useContext(UserTypeContext);

  const { prices, setPrices } = useContext(MyContext);

  const navigation = useNavigation();
  const [rebid, setRebid] = useState(false);
  const [newAmount, setNewAmount] = useState('');

  const getNegotiationById = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await NegotiationServices.getNegotiationById(item._id);
      setItem(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [item._id, setItem, prices]);

  useEffect(() => {
    getNegotiationById();
    console.log('Fetching negotiation by ID');
  }, [getNegotiationById]);

  const handleAccept = async id => {
    setIsLoading(true);
    try {
      const response = await NegotiationServices.updateNegotiationStatus(
        id,
        'accept',
      );
      if (response.status === 200) {
        const negotiationId = item._id;
        const flag = userType === USER_TYPES.DEALER ? 'dealer' : 'driver';
        const id = user._id;
        await NegotiationServices.sendPushNotification({
          id,
          flag,
          negotiationId,
        });
        setIsLoading(false);
        fetchData();
      }
    } catch (error) {
      setIsLoading(true);
      console.error(error);
    }
  };

  const handleReject = async id => {
    setIsLoading(true);
    try {
      const response = await NegotiationServices.updateNegotiationStatus(
        id,
        'reject',
      );
      if (response.status === 200) {
        const negotiationId = item._id;
        const flag = userType === USER_TYPES.DEALER ? 'dealer' : 'driver';
        const id = user._id;
        await NegotiationServices.sendPushNotification({
          id,
          flag,
          negotiationId,
        });
        setIsLoading(false);
        fetchData();
        // if (userType === USER_TYPES.DEALER) {
        //     navigation.navigate('Home');
        // } else {
        //     navigation.goBack();
        // }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleRebid = () => {
    setRebid(prev => !prev);
  };

  const handleAmountChange = async () => {
    if (newAmount == '') {
      return;
    }
    setIsLoading(true);
    try {
      const data = {
        price: newAmount,
        offeredBy: userType === USER_TYPES.DEALER ? 'dealer' : 'driver',
        dealerId: userType === USER_TYPES.DEALER ? user._id : null,
      };
      const negotiationId = item._id;
      const response = await NegotiationServices.addPrice(negotiationId, data);
      console.log(response.data, 'Price updated');
      const flag = userType === USER_TYPES.DEALER ? 'dealer' : 'driver';
      const id = user._id;
      await NegotiationServices.sendPushNotification({ id, flag, negotiationId });
      setNewAmount('');
      setIsLoading(false);
      setRebid(false);
      fetchData();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await NegotiationServices.getNegotiationById(item._id);
      setPrices(response.data.prices);
    } catch (error) {
      console.error(error);
    }
  }, [item._id, setPrices]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isDriver = userType === USER_TYPES.DRIVER;
  const lastBidByDriver =
    item.prices[item.prices.length - 1].offeredBy === 'driver';

  return (
    <Card
      padding={10}
      bgColor={
        item?.status === 'accept'
          ? '#bceabc'
          : item?.status === 'reject'
            ? '#e59898'
            : '#fff'
      }>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.price}>₹{prices[prices.length - 1]?.price}</Text>
        <Text style={[styles.price, { fontSize: 12, fontWeight: '700' }]}>
          {item?.status === 'accept'
            ? 'Accepted'
            : item?.status === 'reject'
              ? 'Rejected'
              : 'Pending'}
        </Text>
      </View>
      <Text style={styles.location}>
        {formatDisplayLocationName(item.fromLocation)} to{' '}
        {formatDisplayLocationName(item.toLocation)}
      </Text>

      <View style={styles.buttonContainer}>
        {((isDriver && !lastBidByDriver) || (!isDriver && lastBidByDriver)) && (
          <>
            <Button
              disabled={
                item?.status === 'accept' ||
                item?.status === 'reject' ||
                isLoading
              }
              style={styles.btnStyle}
              mode="outlined"
              onPress={() => handleAccept(item._id)}>
              {item?.status === 'accept' ? 'Accepted' : 'Accept'}
            </Button>
            <Button
              disabled={
                item?.status === 'accept' ||
                item?.status === 'reject' ||
                isLoading
              }
              style={styles.btnStyle}
              mode="outlined"
              onPress={() => handleReject(item._id)}>
              {item?.status === 'reject' ? 'Rejected' : 'Reject'}
            </Button>
            <Button
              disabled={
                item?.status === 'accept' ||
                item?.status === 'reject' ||
                isLoading
              }
              style={[styles.btnStyle, { alignSelf: 'flex-start' }]}
              mode="outlined"
              onPress={handleRebid}>
              Re-bid
            </Button>
          </>
        )}
      </View>

      {rebid && (
        <View style={{ marginTop: 10 }}>
          <CustomInput
            disabled={isLoading}
            inputIcon="send"
            keyboardType="number-pad"
            type="text"
            placeholder="Enter amount"
            onChangeText={setNewAmount}
            value={newAmount}
            handleCheckPress={handleAmountChange}
          />
        </View>
      )}
    </Card>
  );
};

const BidChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { item, setItem } = useContext(MyContext);
  const { prices, setPrices } = useContext(MyContext);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await NegotiationServices.getNegotiationById(item._id);
      setPrices(response.data.prices);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [item._id, setPrices, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reverseArray = prices.slice(0, -1).reverse();

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <>
      <BidCard isLoading={isLoading} setIsLoading={setIsLoading} item={item} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.header, { margin: 10 }]}>Previous Prices</Text>
        <IconButton icon={'refresh'} size={30} onPress={handleRefresh} />
      </View>
      <FlatList
        data={reverseArray}
        renderItem={({ item }) => {
          const isDriver = item.offeredBy === 'driver';
          return (
            <View
              style={[
                styles.bubbleContainer,
                isDriver ? styles.rightBubble : styles.leftBubble,
              ]}>
              <Card
                radius={20}
                padding={10}
                bgColor={isDriver ? Colors.primary : Colors.secondary}>
                <View style={styles.bubbleHeader}>
                  <Text style={styles.bubbleText}>
                    {isDriver ? 'Driver' : 'Dealer'}
                  </Text>
                  <Text style={styles.bubbleText}>{'   '}</Text>
                </View>
                <Text style={styles.previousprice}>₹{item.price}</Text>
              </Card>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      {isLoading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  price: {
    fontSize: 18,
    fontFamily: 'GothicA1-Regular',
    color: Colors.primary,
  },
  location: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'GothicA1-Regular',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  btnStyle: {
    minWidth: 100,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  leftBubble: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightBubble: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleHeader: {
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    gap: 20,
  },
  bubbleText: {
    fontSize: 12,
  },
  previousprice: {
    fontSize: 16,
    color: '#fff',
  },
});

export default BidChat;
