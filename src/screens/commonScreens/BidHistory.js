import { FlatList, StyleSheet, Text, View } from 'react-native'
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

    const { setItem } = useContext(MyContext)

    const handleBidChat = (bidItem) => {
        setItem(bidItem)
        navigation.navigate("Bid Chat")
    }

    return (
        <FlatList
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
        />
    )
}

export default BidHistory

const styles = StyleSheet.create({})