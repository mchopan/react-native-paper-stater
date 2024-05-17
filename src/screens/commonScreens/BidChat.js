import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, } from 'react-native-paper';
import Card from '../../components/cards/Card';
import { Colors } from '../../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { MyContext } from '../../store/MyContext';
import NegotiationServices from '../../api/negotiationServices';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';


const BidCard = ({ price, item }) => {


    const { user } = useContext(MyContext)

    const { userType } = useContext(UserTypeContext)

    const navigation = useNavigation()

    console.log(user, "jajajjja")

    const { setNegotiationData, negotiationData } = useContext(MyContext)

    const [rebid, setRebid] = useState(false)
    const [newAmount, setNewAmount] = useState()


    const getNegotiationByBookingId = async () => {
        try {
            const response = await NegotiationServices.getAllNegotiationsByBookingId(item._id)
            setNegotiationData(response.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getNegotiationByBookingId()
    }, [])

    const handleAccept = async (id) => {
        try {
            const response = await NegotiationServices.updateNegotiationStatus(id, 'accept')
            if (response.status == 200) {
                if (userType == USER_TYPES.DEALER) {
                    navigation.navigate('Home')
                } else {
                    navigation.navigate('Load Details', { item, lastElement })
                }
            }
        } catch (error) {

        }
    }

    const handleReject = async (id) => {
        try {
            const response = await NegotiationServices.updateNegotiationStatus(id, 'reject')
            console.log(response.data)
            if (response.status == 200) {
                if (userType == USER_TYPES.DEALER) {
                    navigation.navigate('Home')
                } else {
                    navigation.goBack()
                }
            }
        } catch (error) {

        }


    }

    const handleRebid = () => {
        setRebid((pre) => !pre)
    }

    useEffect(() => {
    }, [])


    const handleAmountChange = async () => {
        try {
            const negotiationData = {
                driver: user._id,
                dealer: item.dealer,
                price: newAmount,
                booking: item._id,
                flag: user?.companyName ? "dealer" : "driver"
            }
            const response = await NegotiationServices.createNegotiation(negotiationData)
            setNewAmount('')
        } catch (error) {

        }
        setRebid(false)
        getNegotiationByBookingId()
        // setTotalBids([...totalBids, newAmount])
    }

    const prices = negotiationData.map((item) => item.price);

    const lastItem = negotiationData[negotiationData.length - 1]

    const lastElement = prices[prices.length - 1];



    return (
        <Card padding={10} bgColor={lastItem?.status == "accept" && "#bceabc" || lastItem?.status == "reject" && "#e59898"} >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.price}>₹{lastElement || price}</Text>
                <Text style={[styles.price, { fontSize: 16 }]}>
                    {lastItem?.status == "accept" ? "Accepted" : lastItem?.status == "reject" ? "Rejected" : "Pending"}
                </Text>

            </View>
            <Text style={styles.location}>{item.pickUpCityLocation.toUpperCase()} to {item.dropCityLocation.toUpperCase()}</Text>
            <View style={[styles.buttonContainer, { justifyContent: userType == USER_TYPES.DRIVER ? "flex-end" : "space-evenly" }]}>
                {userType == USER_TYPES.DEALER && <Button
                    disabled={lastItem?.status == "accept" && false || lastItem?.status == "reject" && true}
                    style={[styles.btnStyle,]} mode="outlined" onPress={() => handleAccept(lastItem._id)}>
                    {lastItem?.status == "accept" ? "Accepted" : "Accept"}

                </Button>}
                {userType == USER_TYPES.DEALER && <Button
                    disabled={lastItem?.status == "accept" && true || lastItem?.status == "reject" && false}
                    style={styles.btnStyle} mode="outlined" onPress={() => handleReject(lastItem._id)}>
                    {lastItem?.status == "reject" ? "Rejected" : "Reject"}
                </Button>}
                <Button
                    disabled={lastItem?.status == "accept" && true || lastItem?.status == "reject" && true}
                    style={styles.btnStyle} mode={"outlined"} onPress={handleRebid}>
                    Re-bid
                </Button>
            </View>
            {
                rebid && <View style={{ marginTop: 10, }}>
                    <CustomInput
                        inputIcon='check-bold'
                        keyboardType='number-pad'
                        type='text' placeholder='enter amount'
                        onChangeText={setNewAmount}
                        value={newAmount}
                        handleCheckPress={handleAmountChange}
                    />
                </View>
            }
        </Card >
    );
}

const BidChat = () => {
    const { negotiationData } = useContext(MyContext)
    const prices = negotiationData.map((item) => item.price);
    const flag = negotiationData.map((item) => item.flag);
    const lastone = prices.slice(0, -1).reverse()
    const route = useRoute()

    const newData = { lastone, flag }

    const { item } = route.params


    console.log(newData, "new data")

    return (
        <>
            <BidCard item={item} price={2000} />
            <Text style={[styles.price, { margin: 10 }]}>Previous Prices</Text>
            <FlatList
                data={lastone}
                renderItem={({ item }) => {
                    return (
                        <Card padding={10} bgColor={flag == "driver" ? Colors.primary : Colors.secondary} >
                            <Text style={styles.price}> ₹{item}</Text>
                        </Card>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    )
};

export default BidChat;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        // padding: 10,
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
        // borderRadius: 10,
        minWidth: 100
    }
});
