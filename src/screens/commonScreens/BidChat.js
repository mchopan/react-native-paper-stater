import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, } from 'react-native-paper';
import Card from '../../components/cards/Card';
import { Colors } from '../../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { MyContext } from '../../store/MyContext';
import NegotiationServices from '../../api/negotiationServices';


const BidCard = ({ price, item }) => {


    const { user } = useContext(MyContext)

    const navigation = useNavigation()

    const { totalBids, setNegotiationData, negotiationData } = useContext(MyContext)


    const [disable, setDisable] = useState(false)
    const [rebid, setRebid] = useState(true)
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

    const handleAccept = async () => {
        try {
            const response = await NegotiationServices.updateNegotiation()
        } catch (error) {

        }
    }


    const handleReject = () => {
        navigation.goBack()

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
            }
            const response = await NegotiationServices.createNegotiation(negotiationData)
        } catch (error) {

        }
        setRebid(false)
        getNegotiationByBookingId()
        // setTotalBids([...totalBids, newAmount])
    }

    const prices = negotiationData.map((item) => item.price);

    const lastElement = prices[prices.length - 1];

    return (
        <Card padding={10} >
            <Text style={styles.price}>Current Price: ₹{lastElement || price}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    disabled={disable}
                    style={styles.btnStyle} mode="outlined" onPress={handleAccept}>
                    Accept
                </Button>
                <Button
                    style={styles.btnStyle} mode="outlined" onPress={handleReject}>
                    Reject
                </Button>
                <Button
                    style={styles.btnStyle} mode="outlined" onPress={handleRebid}>
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
    console.log(negotiationData, "kkakaakkak")
    const prices = negotiationData.map((item) => item.price);
    console.log(prices)
    const lastone = prices.slice(0, -1).reverse()
    const route = useRoute()

    const { item } = route.params


    return (
        <>
            <BidCard item={item} price={2000} />
            <FlatList
                data={lastone}
                renderItem={({ item }) => {
                    return (
                        <Card padding={10} >
                            <Text style={styles.price}>Previous Price: ₹{item}</Text>
                        </Card >
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
        color: Colors.secondary,
        fontWeight: "700",
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
