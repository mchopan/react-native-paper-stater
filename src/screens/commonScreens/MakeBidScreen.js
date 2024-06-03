import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import BookingServices from '../../api/bookingServices'
import SelectLoadCard from '../../components/cards/SelectLoadCard'
import { IconButton, Searchbar, Text } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import { MyContext } from '../../store/MyContext'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import NegotiationServices from '../../api/negotiationServices'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import Card from '../../components/cards/Card'
import { capitalizeFirstLetter } from '../../../utils/captalize'


const filterDuplicates = (data) => {
    const seen = new Set();
    return data.filter(item => {
        const key = `${item.fromLocation}-${item.toLocation}`;
        if (seen.has(key)) {
            return false;
        } else {
            seen.add(key);
            return true;
        }
    });
};

const MakeBidScreen = () => {

    const navigation = useNavigation()

    const { userType } = useContext(UserTypeContext)
    const { user, item, setItem } = useContext(MyContext)

    const [isLoading, setIsLoading] = useState(false)
    const [bidData, setBidData] = useState([])

    const [fromText, setFromText] = useState('')
    const [toText, setToText] = useState('')
    const [rate, setRate] = useState('')



    const handleMakeBid = async () => {
        try {
            const userId = user._id;
            const data = {
                fromLocation: fromText.trim(),
                toLocation: toText.trim(),
                initialPrice: Number(rate),
                driver: userId
            };
            const response = await NegotiationServices.createNegotiation(data);
            if (response.status === 201) {
                Toast.show({
                    type: "success",
                    text1: "Bid Created Successfully",
                });
                setFromText("");
                setToText("");
                setRate("");
                getBidData(); // Fetch the latest bid data
            }
        } catch (error) {
            console.error('Error creating bid:', error);
        }
    };

    const getBidData = async () => {
        setIsLoading(true)
        if (userType == USER_TYPES.DRIVER) {
            const response = await NegotiationServices.getAllNegotiationsByDriverId(user._id);
            if (response.status == 200) {
                setIsLoading(false)
                setBidData(response.data)
            }
        } else {
            const response = await NegotiationServices.getAllNegotiations();
            console.log(response.data, "response")
            if (response.status == 200) {
                setIsLoading(false)
                setBidData(response.data)
            }
        }
    }

    useEffect(() => {
        getBidData();
    }, [item]);

    const filterData = filterDuplicates(bidData)
    const data = filterData.reverse()

    const handleBidChat = (bidItem) => {
        setItem(bidItem)
        navigation.navigate("Bid Chat")
    }

    return (
        <View style={{ flex: 1 }}>
            {
                userType == USER_TYPES.DRIVER && <>
                    <View style={{ padding: 10 }}>
                        <CustomInput label='From Location' type='text' onChangeText={(text) => setFromText(text)} value={fromText} />
                        <CustomInput label='To Location' type='text' onChangeText={(text) => setToText(text)} value={toText} />
                        <CustomInput label='Rate' keyboardType='number-pad' type='text' onChangeText={(text) => setRate(text)} value={rate} />
                    </View>
                    <View style={{ width: "90%", alignSelf: "center" }}>
                        <CustomButton label='Place Bid' mode='contained' onPress={handleMakeBid} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                        <Text style={{ color: Colors.primary, fontWeight: "800", padding: 10 }}>Ongoing Bids</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Bid History", { data }) }}>
                            <Text style={{ color: Colors.primary, fontWeight: "800", padding: 10 }}>View All</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {
                filterData?.length > 0 || data.length > 0 ? <FlatList
                    data={userType == USER_TYPES.DEALER ? filterData : [data[0]]}
                    renderItem={({ item }) => {
                        return (
                            <Card padding={5} bgColor={item?.status === "accept" ? "#bceabc" : item?.status === "reject" ? "#e59898" : "#fff"}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: Colors.primary, fontFamily: 'GothicA1-Regular', fontWeight: "600", fontSize: 16 }}>{item?.fromLocation} to {item?.toLocation}</Text>
                                    <IconButton
                                        icon="arrow-right-bold-box-outline"
                                        iconColor={Colors.primary}
                                        size={25}
                                        onPress={() => handleBidChat(item)}
                                    />
                                </View>
                            </Card>
                        )
                    }}
                /> : <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image resizeMode='cover' style={{ height: 150, width: 150, alignSelf: "center" }} source={require("../../assets/emptyicon2.png")} />
                    <Text style={{ color: Colors.secondary, textAlign: "center", fontSize: 20 }}>No History</Text>
                </View>
            }
            <View>
            </View>
        </View >
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
