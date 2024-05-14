import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import BookingServices from '../../api/bookingServices'
import DriverRegistrationService from '../../api/driverRegistrationService'
import SelectLoadCard from '../../components/cards/SelectLoadCard'
import Loading from '../../components/Loading'
import { PaperProvider, Searchbar } from 'react-native-paper'
import { Colors } from '../../theme/colors'

const MakeBidScreen = () => {

    const { userType } = useContext(UserTypeContext)

    const [bitData, setBidData] = useState([])
    const [filteredData, setFilteredData] = useState([]) // State to store filtered data
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = React.useState('');

    const getBidData = async () => {
        setIsLoading(true)
        if (userType == USER_TYPES.DRIVER) {
            const response = await BookingServices.getAllBookings();
            if (response.status == 200) {
                setIsLoading(false)
                setBidData(response.data)
                setFilteredData(response.data) // Initialize filteredData with the fetched data
            }
        } else {
            const response = await DriverRegistrationService.getAllDrivers();
            if (response.status == 200) {
                setIsLoading(false)
                setBidData(response.data)
                setFilteredData(response.data) // Initialize filteredData with the fetched data
            }
        }
    }

    // Function to filter data based on search query
    const filterData = (query) => {
        const filtered = bitData.filter(item => {
            // Assuming you want to filter based on pickUpCityLocation and dropCityLocation
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
        <View>
            <Searchbar
                theme={{ colors: { onSurfaceVariant: Colors.primary } }}
                mode='bar'
                style={{ margin: 10 }}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <View>
                <FlatList
                    data={filteredData} // Use filteredData instead of bitData
                    renderItem={({ item }) => {
                        return (
                            <SelectLoadCard item={item} />
                        )
                    }}
                />
            </View>
        </View>
    );
}

export default MakeBidScreen;

const styles = StyleSheet.create({});
