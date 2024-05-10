import React from 'react'
import { FlatList, View } from 'react-native'
import { SmallCard } from '../../components/cards/RequestCard'
import { useRoute } from '@react-navigation/native';

const ShipmentRequestScreen = () => {

    const route = useRoute();
    const { bookingDetails } = route.params;

    return (
        <View style={{ margin: 10 }}>
            <FlatList
                data={bookingDetails}
                renderItem={({ item }) => {
                    return (
                        <SmallCard item={item} title={item.selectGoodsType} fromLocation={item.pickUpCityLocation} toLocation={item.dropCityLocation} />

                    )
                }}
            />
        </View>
    )
}

export default ShipmentRequestScreen