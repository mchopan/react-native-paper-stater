import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'
import PlainLine from '../../components/cards/PlainLine'

const PrivacyPolicy = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <Text style={styles.heading}>Privacy Policy</Text>
                <PlainLine />
                <Text style={styles.bodyText}>
                    Last updated: [Current Date]
                </Text>

                <Text style={styles.subHeading}>Information We Collect</Text>
                <Text style={styles.bodyText}>
                    We collect information that you provide directly to us when using our app, including [list specific data you collect, e.g., name, email, device information].
                </Text>

                <Text style={styles.subHeading}>How We Use Your Information</Text>
                <Text style={styles.bodyText}>
                    We use the collected information to:
                    {'\n'}- Provide and maintain our services
                    {'\n'}- Improve and personalize your experience
                    {'\n'}- Communicate with you
                    {'\n'}- Comply with legal obligations
                </Text>

                <Text style={styles.subHeading}>Data Security</Text>
                <Text style={styles.bodyText}>
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                </Text>

                <Text style={styles.subHeading}>Third-Party Services</Text>
                <Text style={styles.bodyText}>
                    Our app may contain links to third-party services. We are not responsible for the privacy practices of these external sites.
                </Text>

                <Text style={styles.subHeading}>Children's Privacy</Text>
                <Text style={styles.bodyText}>
                    Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </Text>

                <Text style={styles.subHeading}>Changes to This Policy</Text>
                <Text style={styles.bodyText}>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </Text>

                <Text style={styles.subHeading}>Contact Us</Text>
                <Text style={styles.bodyText}>
                    If you have any questions about this Privacy Policy, please contact us at: [your contact email]
                </Text>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    heading: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: "700",
        fontFamily: 'GothicA1-Regular',
        marginBottom: 10,
    },
    subHeading: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "600",
        fontFamily: 'GothicA1-Regular',
        marginTop: 15,
        marginBottom: 5,
    },
    bodyText: {
        color: Colors.gray,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: 'GothicA1-Regular',
        lineHeight: 20,
        marginBottom: 10,
    }
}) 