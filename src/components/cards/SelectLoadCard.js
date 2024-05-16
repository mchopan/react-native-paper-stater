import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { Text } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import DottenLine from '../DottenLine'
import CustomButton from '../CustomButton'
import Spacer from '../Spacer'
import { useNavigation, useRoute } from '@react-navigation/native'

const SelectLoadCard = ({ item }) => {

    const navigation = useNavigation()

    const route = useRoute();
    const screenName = route.name;

    const handleNavigation = async () => {
        if (screenName == "Make Bid") {
            navigation.navigate("Bid Chat", { item })
        } else {
            navigation.navigate("Load Details", { item })
        }
    }

    return (
        <Card bgColor={Colors.whiteBackground}  >
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image style={{ height: 20, width: 20 }} source={require("../../assets/verified.png")} />
                        <Text style={{ fontSize: 12, fontWeight: "500", fontFamily: "GothicA1-Regular", color: Colors.verified }}>Verified Load</Text>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>Posted on 12 May</Text>
                </View>

                <Spacer />


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ margin: 10, gap: 10 }}>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Image tintColor={Colors.primary} resizeMode='contain' style={{ height: 20, width: 20 }} source={require("../../assets/MapPinLight.png")} />
                            <Text style={{ fontSize: 14, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>{item.pickUpCityLocation}</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Image tintColor={"#E66613"} resizeMode='contain' style={{ height: 20, width: 20 }} source={require("../../assets/MapPinLight.png")} />
                            <Text style={{ fontSize: 14, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>{item.dropCityLocation}</Text>
                        </View>
                    </View>
                    <View style={{ margin: 10, }}>
                        <Text style={{ fontSize: 12, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.gray }}>3000 KM</Text>
                    </View>
                </View>
                <Spacer />
                <DottenLine />
                <Spacer />
                <View style={{ margin: 10, gap: 10 }}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Image tintColor={Colors.gray} resizeMode='contain' style={{ height: 20, width: 20 }} source={require("../../assets/materialtpye.png")} />
                        <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>{item.selectGoodsType} ({item.enterWeightKg} ton)</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Image tintColor={Colors.gray} resizeMode='contain' style={{ height: 20, width: 20 }} source={require("../../assets/trucktype.png")} />
                        <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>{item.selectVehicleType}</Text>
                    </View>
                </View>
                <DottenLine />
                <Spacer />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ margin: 10, gap: 10 }}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            {/* <Image tintColor={Colors.gray} resizeMode='contain' style={{ height: 20, width: 20 }} source={require("../../assets/materialtpye.png")} /> */}
                            <Text style={{ fontSize: 14, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>Expected Price</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            {/* <Image tintColor={Colors.gray} resizeMode='contain' style={{ height: 20, width: 20 }} source={require("../../assets/trucktype.png")} /> */}
                            <Text style={{ fontSize: 14, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>₹ 26,000</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <CustomButton label='Bid Now' mode='contained' onPress={handleNavigation} />
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default SelectLoadCard

const styles = StyleSheet.create({})