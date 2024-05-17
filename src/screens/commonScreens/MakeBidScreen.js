import { FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import BookingServices from '../../api/bookingServices'
import SelectLoadCard from '../../components/cards/SelectLoadCard'
import { Searchbar } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import { MyContext } from '../../store/MyContext'

const MakeBidScreen = () => {

    const { userType } = useContext(UserTypeContext)
    const { user } = useContext(MyContext)

    const [bitData, setBidData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = React.useState('');

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
        <>
            <Searchbar
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
            />

        </>
    );
}

export default MakeBidScreen;

const styles = StyleSheet.create({});
