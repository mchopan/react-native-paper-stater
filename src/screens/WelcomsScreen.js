import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import CustomButton from '../components/CustomButton'
import { Colors } from '../theme/colors'

const WelcomeScreen = ({ navigation }) => {
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/quickload-splash.png')} style={styles.logo} />
            </View>
            <View style={styles.buttonGroup}>
                <CustomButton label='I’m Dealer' mode='contained' onPress={() => navigation.navigate("Registration")} />
                <CustomButton label='I’m Driver' mode='outlined' onPress={() => console.log("pressed")} />
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteBackground,
        flex: 1,
        justifyContent: "space-between",
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        resizeMode: 'contain',
    },
    buttonGroup: {
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'center',
        gap: 10
    }
})
