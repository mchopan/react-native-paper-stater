import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import Card from '../../components/cards/Card'
import { Colors } from '../../theme/colors'
import { IconButton } from 'react-native-paper'
import { MyContext } from '../../store/MyContext'

const BidHistory = () => {

    const navigation = useNavigation();
    const router = useRoute()
    const { data } = router.params
    console.log(data, "hahha")
    const { setItem } = useContext(MyContext)

    const handleBidChat = (bidItem) => {
        setItem(bidItem)
        navigation.navigate("Bid Chat")
    }

    return (
        data.length > 1 ? <FlatList
            data={data.slice(1)}
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
    )
}

export default BidHistory

const styles = StyleSheet.create({})