import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, } from 'react-native-paper';
import Card from '../../components/cards/Card';
import { Colors } from '../../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { MyContext } from '../../store/MyContext';


const BidCard = ({ price, item }) => {

    const navigation = useNavigation()

    const { totalBids, setTotalBids } = useContext(MyContext)


    const [disable, setDisable] = useState(false)
    const [rebid, setRebid] = useState(true)
    const [newAmount, setNewAmount] = useState()

    const handleAccept = () => {
        navigation.navigate("Load Details", { item })
    }

    const handleReject = () => {
        navigation.goBack()

    }

    const handleRebid = () => {
        setRebid((pre) => !pre)
    }

    const handleAmountChange = () => {
        setRebid(false)
        setTotalBids([...totalBids, newAmount])
    }


    const lastElement = totalBids[totalBids.length - 1];

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

    const { totalBids, setTotalBids } = useContext(MyContext)
    const reversedBids = totalBids.slice(0, -1).reverse();
    const route = useRoute()

    const { item } = route.params


    return (
        <>
            <BidCard item={item} price={2000} />
            <FlatList
                data={reversedBids}
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
