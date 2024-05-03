import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Card from './Card'
import { textVariants } from '../../theme/styleVariants'
import indianCities from '../../assets/indianCities.json'
import CustomSelect from '../CustomSelect'
import { Colors } from '../../theme/colors'
import CustomButton from '../CustomButton'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'

const BookTruckCard = ({ navigation, title }) => {

    const { userType } = useContext(UserTypeContext)

    const cityOptions = Object.entries(indianCities).map(([cityName, cityData]) => ({
        label: cityName,
        value: cityData
    }));

    const [pickUpLocation, setPickUpLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');

    const handleSubmit = () => {
        if (userType == USER_TYPES.DEALER) {
            navigation.navigate("Booking Details")
        } else {
            navigation.navigate("Find Load")

        }
    }

    return (
        <Card padding={20}>
            <View style={styles.mainFormContainer}>
                <Text style={styles.heading}>{title}</Text>
                <CustomSelect
                    mode='outlined'
                    placeholder='Pick Up City Location'
                    data={cityOptions}
                    search={true}
                    value={pickUpLocation}
                    onChange={(text) => { console.log(text, "pick"); setPickUpLocation(text) }
                    }
                />
                <CustomSelect
                    mode='outlined'
                    placeholder='Drop City Location'
                    data={cityOptions}
                    search={true}
                    value={dropLocation}
                    onChange={(text) => { console.log(text, "drop"); setDropLocation(text) }
                    }
                />
            </View>
            <CustomButton mode='contained' label="Find Now" onPress={handleSubmit} />

        </Card>
    )
}

export default BookTruckCard

const styles = StyleSheet.create({
    mainFormContainer: {
        gap: 10,
        marginBottom: 10
    },
    heading: {
        fontSize: 16,
        color: Colors.primary,
        fontFamily: 'GothicA1-Regular',
        fontWeight: '800',
        textAlign: 'center',
    }
})