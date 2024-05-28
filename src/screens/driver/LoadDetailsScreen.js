import { Alert, Image, Modal, Pressable, StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import LoadDetailsCard from '../../components/cards/LoadDetailsCard'
import CustomButton from '../../components/CustomButton'
import { Colors } from '../../theme/colors'
import { Text } from 'react-native-paper'
import PlainLine from '../../components/cards/PlainLine'
import Spacer from '../../components/Spacer'
import { useNavigation, useRoute } from '@react-navigation/native'
import Payment from './Razorpay'
import { MyContext } from '../../store/MyContext'


const BiltiPayment = ({ setShowSuccessScreen }) => {

    const handleSubmit = () => {
        setShowSuccessScreen(false)
    }

    return (
        <View style={{ flex: 1, margin: 20 }}>
            <View >
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Bilti Payment</Text>
            </View>
            <Spacer />
            <PlainLine />
            <Spacer />
            <View >
                <Text style={{ fontSize: 15, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.orange }}>Total amount to be paid is ₹ 200</Text>
            </View>
            <Spacer space={20} />

            <View >
                <Text style={{ fontSize: 15, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Choose Payment Method :</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Payment onPress={handleSubmit} />
                {/* <CustomButton mode='contained' label="Pay Now" onPress={handleSubmit} /> */}
            </View>
        </View>

    )
}


const PaymentSuccess = ({ setShowSuccessScreen }) => {

    const handleSubmit = () => {
        setShowSuccessScreen(true)
        console.log("first")
    }

    return (
        <View style={{ flex: 1, margin: 20 }}>
            <View >
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Payment Successful</Text>
            </View>
            <Spacer />
            <PlainLine />
            <Spacer />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 180, height: 180 }} source={require("../../assets/paymentsuccess.png")} />
                <Pressable onPress={() => console.log("copied to clipboard")} style={{ gap: 10, flexDirection: "row", alignItems: "center", backgroundColor: Colors.tertiary, padding: 10, borderRadius: 10 }}>
                    <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Transaction ID:192740KD93JDS98</Text>
                    <Image resizeMode="contain" style={{ width: 20, height: 20 }} source={require("../../assets/copy.png")} />
                </Pressable>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Download Receipt" onPress={handleSubmit} />
            </View>
        </View>

    )
}

const LoadDetailsScreen = () => {

    const { paymentData } = useContext(MyContext)

    const navigation = useNavigation()
    const route = useRoute();
    const { item } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false)

    const handleSubmit = () => {
        navigation.navigate("Home")
    }
    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            <View style={{ alignItems: "center", marginBottom: 20, marginTop: 20, }}>
                <Image style={{ width: 300, height: 120 }} resizeMode='contain' source={require("../../assets/loadingtruck.png")} />
            </View>
            <LoadDetailsCard item={item} />
            <View style={styles.buttonContainer}>

                {/* <CustomButton mode='contained' label="Accept and Pay" onPress={handleSubmit} /> */}
                <Payment label="Accept and Pay" item={item} />
                <CustomButton mode='outlined' label="Not Interested" onPress={handleSubmit} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalStyles}>
                    {
                        showSuccessScreen ? <BiltiPayment setShowSuccessScreen={setShowSuccessScreen} /> : <PaymentSuccess setShowSuccessScreen={setShowSuccessScreen} />
                    }
                </View>
            </Modal>
        </View>
    )
}

export default LoadDetailsScreen

const styles = StyleSheet.create({
    buttonContainer: {
        gap: 10,
        width: '100%',
        position: "absolute",
        bottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    modalStyles: {
        height: "60%",
        width: "100%",
        backgroundColor: Colors.whiteBackground,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
    }
})