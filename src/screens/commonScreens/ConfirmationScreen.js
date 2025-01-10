import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import Card from '../../components/cards/Card'
import { Colors } from '../../theme/colors'
import DottenLine from '../../components/DottenLine'

const ConfirmationScreen = ({ navigation, route }) => {
    // Get registration details from route params if needed
    const { type = 'dealer' } = route.params || {};

    const getConfirmationMessage = () => {
        if (type === 'dealer') {
            return {
                title: 'Registration Successful',
                message: 'Your dealer account has been successfully created. You can now login to access your dashboard.',
                buttonLabel: 'Go to Login',
                navigateTo: 'Login'
            }
        }
        // Add other types of confirmations if needed
        return {
            title: 'Confirmed',
            message: 'Operation completed successfully',
            buttonLabel: 'Continue',
            navigateTo: 'Login'
        }
    }

    const confirmationDetails = getConfirmationMessage();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", marginTop: 50 }}>
                <Image
                    style={{ height: 200, width: 200, resizeMode: "contain" }}
                    source={require("../../assets/confirm.png")}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Card>
                    <Text style={styles.titleText}>
                        {confirmationDetails.title}
                    </Text>
                    <DottenLine />
                    <Text style={styles.messageText}>
                        {confirmationDetails.message}
                    </Text>
                </Card>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    label={confirmationDetails.buttonLabel}
                    mode='contained'
                    onPress={() => navigation.navigate(confirmationDetails.navigateTo)}
                />
            </View>
        </View>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
    titleText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
        fontFamily: "GothicA1-Regular",
        color: Colors.primary
    },
    messageText: {
        lineHeight: 20,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "GothicA1-Regular",
        color: Colors.gray
    },
    buttonContainer: {
        padding: 10,
        gap: 10,
        position: "absolute",
        bottom: 10,
        width: "100%",
        alignItems: "center"
    }
});