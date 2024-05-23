import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text, } from 'react-native-paper';
import Card from '../../components/cards/Card';
import { Colors } from '../../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { MyContext } from '../../store/MyContext';
import NegotiationServices from '../../api/negotiationServices';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';


const BidCard = ({ price, item }) => {


    const formatDisplayLocationName = (displayName) => {
        // const displayName1 = capitalizeFirstLetter(displayName)
        const parts = displayName.split(', ');
        return parts.slice(0, 1).join(', ');
    };

    const { user } = useContext(MyContext);
    const { userType } = useContext(UserTypeContext);
    const navigation = useNavigation();
    const { setNegotiationData, negotiationData } = useContext(MyContext);

    const [rebid, setRebid] = useState(false);
    const [newAmount, setNewAmount] = useState();

    const getNegotiationByBookingId = async () => {
        try {
            const response = await NegotiationServices.getAllNegotiationsByBookingId(item._id);
            setNegotiationData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getNegotiationByBookingId();
    }, []);

    const handleAccept = async (id) => {
        try {
            const response = await NegotiationServices.updateNegotiationStatus(id, 'accept');
            if (response.status === 200) {
                if (userType === USER_TYPES.DEALER) {
                    getNegotiationByBookingId();
                } else {
                    // navigation.navigate('Load Details', { item, lastElement });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await NegotiationServices.updateNegotiationStatus(id, 'reject');
            if (response.status === 200) {
                if (userType === USER_TYPES.DEALER) {
                    navigation.navigate('Home');
                } else {
                    navigation.goBack();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRebid = () => {
        setRebid((prev) => !prev);
    };

    const handleAmountChange = async () => {
        try {
            const negotiationData = {
                driver: user._id,
                dealer: item.dealer,
                price: newAmount,
                booking: item._id,
                flag: user?.companyName ? "dealer" : "driver"
            };
            const response = await NegotiationServices.createNegotiation(negotiationData);
            setNewAmount('');
            setRebid(false);
            getNegotiationByBookingId();
        } catch (error) {
            console.error(error);
        }
    };

    const prices = negotiationData.map((item) => item.price);
    const lastItem = negotiationData[negotiationData.length - 1];
    const lastElement = prices[prices.length - 1];

    return (
        <Card padding={10} bgColor={lastItem?.status === "accept" ? "#bceabc" : lastItem?.status === "reject" ? "#e59898" : "#fff"}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.price}>₹{lastElement || price}</Text>
                <Text style={[styles.price, { fontSize: 12, fontWeight: "700" }]}>
                    {lastItem?.status === "accept" ? "Accepted" : lastItem?.status === "reject" ? "Rejected" : "Pending"}
                </Text>
            </View>
            <Text style={styles.location}>{formatDisplayLocationName(item.pickUpCityLocation.toUpperCase())} to {formatDisplayLocationName(item.dropCityLocation.toUpperCase())}</Text>

            {/* Buttons for Dealer */}
            {userType === USER_TYPES.DEALER && negotiationData.length > 0 && (
                <View style={styles.buttonContainer}>
                    <Button
                        disabled={lastItem?.status === "accept" || lastItem?.status === "reject"}
                        style={styles.btnStyle}
                        mode="outlined"
                        onPress={() => handleAccept(lastItem._id)}
                    >
                        {lastItem?.status === "accept" ? "Accepted" : "Accept"}
                    </Button>
                    <Button
                        disabled={lastItem?.status === "accept" || lastItem?.status === "reject"}
                        style={styles.btnStyle}
                        mode="outlined"
                        onPress={() => handleReject(lastItem._id)}
                    >
                        {lastItem?.status === "reject" ? "Rejected" : "Reject"}
                    </Button>
                    <Button
                        disabled={lastItem?.status === "accept" || lastItem?.status === "reject"}
                        style={styles.btnStyle}
                        mode="outlined"
                        onPress={handleRebid}
                    >
                        Re-bid
                    </Button>
                </View>
            )}

            {/* Re-bid Button for Driver */}
            {userType === USER_TYPES.DRIVER && (
                <View style={[styles.buttonContainer, { justifyContent: "flex-end" }]}>
                    <Button
                        disabled={lastItem?.status === "accept" || lastItem?.status === "reject"}
                        style={styles.btnStyle}
                        mode="outlined"
                        onPress={handleRebid}
                    >
                        Re-bid
                    </Button>
                </View>
            )}

            {rebid && (
                <View style={{ marginTop: 10 }}>
                    <CustomInput
                        inputIcon='check-bold'
                        keyboardType='number-pad'
                        type='text'
                        placeholder='Enter amount'
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
    const { negotiationData } = useContext(MyContext);
    const prices = negotiationData.map((item) => item.price);
    const flag = negotiationData.map((item) => item.flag);
    const lastFlag = flag.slice(0, -1).reverse();
    const lastone = prices.slice(0, -1).reverse();
    const route = useRoute();
    const { item } = route.params;

    const newData = lastFlag.map((flag, index) => ({
        lastFlag: flag,
        lastone: lastone[index]
    }));

    return (
        <>
            <BidCard item={item} price={2000} />
            <Text style={[styles.header, { margin: 10 }]}>Previous Prices</Text>
            <FlatList
                data={newData}
                renderItem={({ item }) => {
                    const isDriver = item.lastFlag === "driver";
                    return (
                        <View style={[styles.bubbleContainer, isDriver ? styles.rightBubble : styles.leftBubble]}>
                            <Card radius={20} padding={10} bgColor={isDriver ? Colors.primary : Colors.secondary}>
                                <View style={styles.bubbleHeader}>
                                    <Text style={styles.bubbleText}>{isDriver ? "Driver" : "Dealer"}</Text>
                                    <Text style={styles.bubbleText}>{"   "}</Text>
                                </View>
                                <Text style={styles.previousprice}>₹{item.lastone}</Text>
                            </Card>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
    price: {
        fontSize: 18,
        fontFamily: "GothicA1-Regular",
        color: Colors.primary,
    },
    location: {
        fontSize: 14,
        color: Colors.primary,
        fontFamily: "GothicA1-Regular",
        marginBottom: 10,
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "space-evenly",
        flexDirection: 'row',
    },
    btnStyle: {
        minWidth: 100
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary
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
        gap: 20
    },
    bubbleText: {
        fontSize: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.primary,
    },
    previousprice: {
        fontSize: 16,
        color: '#fff',
    }
});

export default BidChat;
