import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../theme/colors';
import CustomInput from '../components/CustomInput';
import CustomSelect from '../components/CustomSelect';
import CustomButton from '../components/CustomButton';



const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
]

const vehicleTypeData = [
    { "label": "Truck Type 1", "value": "truck_type_1" },
    { "label": "Truck Type 2", "value": "truck_type_2" },
    { "label": "Truck Type 3", "value": "truck_type_3" }
]

const goodsData = [
    { "label": "Electronics", "value": "electronics", "stock": 100 },
    { "label": "Clothing", "value": "clothing", "stock": 150 },
    { "label": "Books", "value": "books", "stock": 200 },
    { "label": "Toys", "value": "toys", "stock": 120 },
    { "label": "Furniture", "value": "furniture", "stock": 80 }
]

const weightData = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
]

const payment_options = [
    { "label": "Subscription Billing", "value": "Subscription Billing" },
    { "label": "One-Time Payments", "value": "One-Time Payments" },
    { "label": "Custom Payment Plans", "value": "Custom Payment Plans" },
    { "label": "Discounts and Coupons", "value": "Discounts and Coupons" },
    { "label": "Multi-Currency Support", "value": "Multi-Currency Support" }
]

const payment_mode = [
    { "label": "Pay Online", "value": "Pay Online" },
    { "label": "Cash in Hand", "value": "Cash in Hand" }
]


const BookingDetailsScreen = ({ navigation }) => {


    const [vehicleType, setVehicleType] = useState("")
    const [goods, setGoods] = useState("")
    const [weight, setWeight] = useState("")
    const [paymentOptions, setPaymetOptions] = useState('')
    const [paymentMode, setPaymentMode] = useState("")
    const [date, setDate] = useState(new Date())

    const handleSubmit = () => {
        // Todo Handle form submission
        navigation.navigate("My Profile")
    };

    const dateTime = new Date();

    console.log(dateTime, "date ")

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.formContainer}>
                        <CustomInput type='date' />
                        <CustomSelect
                            renderIcon={() => {
                                return (
                                    <Image
                                        style={{ width: 25, marginRight: 10 }}
                                        source={require('../assets/dateIcon.png')}
                                        resizeMode="contain"
                                    />
                                );
                            }}
                            mode="flat"
                            placeholder='Select Date'
                            data={data}
                            value={date}
                            onChange={(text) => { setDate(text) }
                            }
                        />
                        <CustomSelect
                            renderIcon={() => {
                                return (
                                    <Image
                                        style={{ width: 25, marginRight: 10 }}
                                        source={require('../assets/vehicleIcon.png')}
                                        resizeMode="contain"
                                    />
                                );
                            }}
                            mode="flat"
                            placeholder='Select Vehicle Type'
                            data={vehicleTypeData}
                            value={vehicleType}
                            onChange={(text) => { setVehicleType(text) }
                            }
                        />
                        <CustomSelect
                            renderIcon={() => {
                                return (
                                    <Image
                                        style={{ width: 25, marginRight: 10 }}
                                        source={require('../assets/goodsIcon.png')}
                                        resizeMode="contain"
                                    />
                                );
                            }}
                            mode="flat"
                            placeholder='Select Goods Type'
                            data={goodsData}
                            value={goods}
                            onChange={(text) => { setGoods(text) }
                            }
                        />
                        <CustomSelect
                            renderIcon={() => {
                                return (
                                    <Image
                                        style={{ width: 25, marginRight: 10 }}
                                        source={require('../assets/weightIcon.png')}
                                        resizeMode="contain"
                                    />
                                );
                            }}
                            mode="flat"
                            placeholder='Enter Weight'
                            data={weightData}
                            value={weight}
                            onChange={(text) => { setWeight(text) }
                            }
                        />
                        <CustomSelect
                            renderIcon={() => {
                                return (
                                    <Image
                                        style={{ width: 25, marginRight: 10 }}
                                        source={require('../assets/paymentIcon.png')}
                                        resizeMode="contain"
                                    />
                                );
                            }}
                            mode="flat"
                            placeholder='Advance Payment Option'
                            data={payment_options}
                            value={paymentOptions}
                            onChange={(text) => { setPaymetOptions(text) }
                            }
                        />

                        <CustomSelect
                            renderIcon={() => {
                                return (
                                    <Image
                                        style={{ width: 25, marginRight: 10 }}
                                        source={require('../assets/paymentTypeIcon.png')}
                                        resizeMode="contain"
                                    />
                                );
                            }}
                            mode="flat"
                            placeholder='Select Payment Method'
                            data={payment_mode}
                            value={paymentMode}
                            onChange={(text) => { setPaymentMode(text) }
                            }
                        />
                    </ScrollView>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Send Request" onPress={handleSubmit} />
            </View>
        </View>
    )
}

export default BookingDetailsScreen


const styles = StyleSheet.create({
    backgroundImage: {
        backgroundColor: Colors.whiteBackground,
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "cover"
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
        width: '100%',
        position: "absolute",
        bottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
});
