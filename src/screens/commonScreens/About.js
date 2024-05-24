import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'
import DottenLine from '../../components/DottenLine'
import PlainLine from '../../components/cards/PlainLine'

const About = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <Text style={styles.heading}>About Us</Text>
                <PlainLine />
                <Text style={styles.bodyText}>
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={styles.heading}>Our Purpose</Text>
                <PlainLine />
                <Text style={styles.bodyText}>
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam
                </Text>
            </View>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    heading: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "700",
        fontFamily: 'GothicA1-Regular',
    },
    bodyText: {
        color: Colors.gray,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: 'GothicA1-Regular',
        lineHeight: 20,
    }
})