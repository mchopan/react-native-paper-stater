import {StyleSheet, Text, View, ScrollView, Linking} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../../theme/colors';
import PlainLine from '../../components/cards/PlainLine';
// import { Typography } from '../../theme/typography'
import {USER_TYPES, UserTypeContext} from '../../store/UserTypeContext';

const PrivacyPolicy = () => {
  const {userType} = useContext(UserTypeContext);
  const isDealer = userType === USER_TYPES.DEALER;

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{padding: 10}}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <PlainLine />
        <Text style={styles.bodyText}>Last updated: 14-Jan-2025</Text>

        <Text style={styles.subHeading}>Information We Collect</Text>
        <Text style={styles.bodyText}>
          When you create an account with QuickLoad, we collect and process the
          following information:
        </Text>

        {isDealer ? (
          <View style={styles.listContainer}>
            <Text style={styles.bulletPoint}>• Name</Text>
            <Text style={styles.bulletPoint}>• Phone Number</Text>
            <Text style={styles.bulletPoint}>• Company/Business Name</Text>
            <Text style={styles.bulletPoint}>• GST Number (optional)</Text>
            <Text style={styles.bulletPoint}>• Profile Image</Text>
            <Text style={styles.bulletPoint}>• Password</Text>
            <Text style={styles.bulletPoint}>
              • Booking Details (pickup/drop locations, dates, vehicle
              preferences)
            </Text>
            <Text style={styles.bulletPoint}>• Payment Information</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <Text style={styles.bulletPoint}>• Full Name</Text>
            <Text style={styles.bulletPoint}>• Phone Number</Text>
            <Text style={styles.bulletPoint}>• Address</Text>
            <Text style={styles.bulletPoint}>• Vehicle Type</Text>
            <Text style={styles.bulletPoint}>• Driver's License Number</Text>
            <Text style={styles.bulletPoint}>
              • Vehicle Registration Number
            </Text>
            <Text style={styles.bulletPoint}>• Profile Image</Text>
            <Text style={styles.bulletPoint}>• Driver's License Document</Text>
            <Text style={styles.bulletPoint}>• Vehicle RC Document</Text>
            <Text style={styles.bulletPoint}>• Vehicle Insurance Document</Text>
            <Text style={styles.bulletPoint}>• Identity Document</Text>
            <Text style={styles.bulletPoint}>• Password</Text>
            <Text style={styles.bulletPoint}>
              • Current Location (when using the app)
            </Text>
            <Text style={styles.bulletPoint}>
              • Device Token for Notifications
            </Text>
          </View>
        )}

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
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction.
        </Text>

        <Text style={styles.subHeading}>Third-Party Services</Text>
        <Text style={styles.bodyText}>
          Our app may contain links to third-party services. We are not
          responsible for the privacy practices of these external sites.
        </Text>

        <Text style={styles.subHeading}>Children's Privacy</Text>
        <Text style={styles.bodyText}>
          Our services are not intended for children under 13. We do not
          knowingly collect personal information from children under 13.
        </Text>

        <Text style={styles.subHeading}>Changes to This Policy</Text>
        <Text style={styles.bodyText}>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </Text>

        <Text style={styles.subHeading}>Contact Us</Text>
        <Text style={styles.bodyTextMain}>
          If you have any questions about this Privacy Policy, please contact us
          at:{' '}
          <View style={{flexDirection: 'column', marginTop: 5}}>
            <Text
              style={[styles.bodyText, styles.link]}
              onPress={() => Linking.openURL('mailto:quickload050@gmail.com')}>
              quickload050@gmail.com
            </Text>

            <Text
              style={[styles.bodyText, styles.link]}
              onPress={() => Linking.openURL('tel:+917006268715')}>
              +91 7006268715
            </Text>
          </View>
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  heading: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'GothicA1-Regular',
    marginBottom: 10,
  },
  subHeading: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'GothicA1-Regular',
    marginTop: 15,
    marginBottom: 5,
  },
  bodyTextMain: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'GothicA1-Regular',
    marginBottom: 10,
  },
  bodyText: {
    color: Colors.gray,
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'GothicA1-Regular',
    lineHeight: 20,
    marginBottom: 10,
  },
  link: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  listContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  bulletPoint: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'GothicA1-Regular',
    marginVertical: 5,
  },
});
