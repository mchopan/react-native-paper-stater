import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Card from './Card'
import { Colors } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { MyContext } from '../../store/MyContext'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import Loading from '../Loading'

export const SmallCard = ({ title, fromLocation, toLocation, item }) => {

    const navigation = useNavigation()

    const { userType } = useContext(UserTypeContext)

    const handleSeeDetails = () => {
        navigation.navigate("Load Details", { item });
    }

    const formatDisplayLocationName = (displayName) => {
        const parts = displayName.split(', ');
        return parts.slice(0, 1).join(', ');
    };


    return (
        <View style={styles.smallCardStyles}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <View>
                    <Image style={{ width: 25, height: 25 }} source={require("../../assets/truck.png")} />
                </View>
                <View>
                    <Text style={{ color: Colors.primary, fontWeight: "800", fontSize: 14, fontFamily: "GothicA1-Regular" }}>{userType == USER_TYPES.DRIVER ? title : item?.driver.name}</Text>
                    <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 12, fontFamily: "GothicA1-Regular" }}>{formatDisplayLocationName(fromLocation)} to {formatDisplayLocationName(toLocation)}</Text>
                </View>
            </View>
            {
                userType == USER_TYPES.DEALER &&
                <Text style={{ color: Colors.primary, fontWeight: "600", fontSize: 12, fontFamily: "GothicA1-Regular" }}>
                    {item?.status}
                </Text>
            }
            {
                userType == USER_TYPES.DRIVER && <TouchableOpacity onPress={handleSeeDetails}>
                    <Text style={{ color: Colors.primary, fontWeight: "600", fontSize: 12, fontFamily: "GothicA1-Regular" }}>See Details</Text>
                </TouchableOpacity>
            }

        </View>
    )
}

const RequestCard = ({ title, bookingDetails, isLoading }) => {

    const navigation = useNavigation()

    const handleViewAll = () => {
        navigation.navigate("Shipment Requests", { bookingDetails });
    }

    return (
        <Card padding={20} direction={"column"} >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={{ color: Colors.primary, fontWeight: "800", fontSize: 14, fontFamily: "GothicA1-Regular" }}>{title}</Text>
            </View>
            {
                bookingDetails?.length < 1 ? <Image resizeMode='cover' style={{ height: 50, width: 50, alignSelf: "center" }} source={require("../../assets/emptyicon2.png")} /> : <>
                    <FlatList
                        data={bookingDetails?.slice(0, 3)}
                        renderItem={({ item }) => {
                            return (
                                isLoading ? <Loading height={50} size={"small"} position={'relative'} /> : <SmallCard item={item} title={item.selectGoodsType} fromLocation={item.pickUpCityLocation} toLocation={item.dropCityLocation} />
                            );
                        }}
                    />

                    <TouchableOpacity TouchableOpacity onPress={handleViewAll} style={{ marginTop: 10 }}>
                        <Text style={{ color: Colors.primary, fontWeight: "600", fontSize: 13, fontFamily: "GothicA1-Regular" }}>View All</Text>
                    </TouchableOpacity>
                </>
            }
        </Card >

    )
}

export default RequestCard

const styles = StyleSheet.create({
    smallCardStyles: {
        marginBottom: 10,
        flexDirection: "row",
        backgroundColor: Colors.whiteBackground,
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                elevation: 3,
            },
        }),
    },
})