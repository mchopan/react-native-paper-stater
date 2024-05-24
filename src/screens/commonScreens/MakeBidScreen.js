import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import BookingServices from '../../api/bookingServices'
import SelectLoadCard from '../../components/cards/SelectLoadCard'
import { Searchbar } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import { MyContext } from '../../store/MyContext'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const MakeBidScreen = () => {

    const { userType } = useContext(UserTypeContext)
    const { user } = useContext(MyContext)

    const [bitData, setBidData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = React.useState('');

    const [fromText, setFromText] = useState('')
    const [toText, setToText] = useState('')
    const [rate, setRate] = useState('')

    const getBidData = async () => {
        setIsLoading(true)
        if (userType == USER_TYPES.DRIVER) {
            const response = await BookingServices.getAllBookings();
            if (response.status == 200) {
                setIsLoading(false)
                setBidData(response.data)
                setFilteredData(response.data)
            }
        } else {
            const response = await BookingServices.getBookingByDealerId(user._id);
            console.log(response.data, "response")
            if (response.status == 200) {
                setIsLoading(false)
                setBidData(response.data)
                setFilteredData(response.data)
            }
        }
    }

    const filterData = (query) => {
        const filtered = bitData.filter(item => {
            return (
                item.pickUpCityLocation.toLowerCase().includes(query.toLowerCase()) ||
                item.dropCityLocation.toLowerCase().includes(query.toLowerCase())
            );
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        getBidData();
    }, []);

    useEffect(() => {
        filterData(searchQuery);
    }, [searchQuery, bitData]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <CustomInput label='From Location' type='text' onChangeText={(text) => setFromText(text)} value={fromText} />
                <CustomInput label='To Location' type='text' onChangeText={(text) => setToText(text)} value={toText} />
                <CustomInput label='Rate' keyboardType='number-pad' type='text' onChangeText={(text) => setRate(text)} value={rate} />
            </View>
            <View style={{ flex: 1, position: "absolute", bottom: 10, width: "90%", alignSelf: "center" }}>
                <CustomButton label='Make Bid' mode='contained' onPress={() => console.log("first")} />
            </View>
        </View>
    );
}

export default MakeBidScreen;

const styles = StyleSheet.create({});

{/* <Searchbar
theme={{ colors: { onSurfaceVariant: Colors.primary } }}
mode='bar'
style={{ margin: 10 }}
placeholder="Search"
onChangeText={setSearchQuery}
value={searchQuery}
/>
<FlatList
data={filteredData}
renderItem={({ item }) => {
    return (
        <SelectLoadCard item={item} />
    )
}}
/> */}
